import { NextRequest, NextResponse } from 'next/server'
import xmlrpc from 'xmlrpc'

const ODOO_URL = process.env.ODOO_URL!
const ODOO_DB = process.env.ODOO_DB!
const ODOO_USER = process.env.ODOO_USER!
const ODOO_API_KEY = process.env.ODOO_API_KEY!

// Generic helper to call Odoo
function odooCall({
  service,
  method,
  args,
}: {
  service: 'common' | 'object'
  method: string
  args: any[]
}): Promise<any> {
  return new Promise((resolve, reject) => {
    const client = xmlrpc.createSecureClient({
      url: `${ODOO_URL}/xmlrpc/2/${service}`,
    })

    client.methodCall(method, args, (err: any, value: any) => {
      if (err) return reject(err)
      resolve(value)
    })
  })
}

export async function POST(req: NextRequest) {
  if (!ODOO_URL || !ODOO_DB || !ODOO_USER || !ODOO_API_KEY) {
    console.error('Odoo configuration missing')
    return NextResponse.json(
      { error: 'Odoo configuration missing' },
      { status: 500 }
    )
  }

  const body = await req.json()

  const {
    fullName,
    phone,
    email,
    company,
    socialOrWebsite,
    employeesCount,
    hasInternalMarketingTeam,
    annualMarketingBudget,
    needs,
  } = body as {
    fullName: string
    phone: string
    email?: string | null
    company?: string | null
    socialOrWebsite?: string | null
    employeesCount?: string | null
    hasInternalMarketingTeam?: 'yes' | 'no' | null
    annualMarketingBudget?: string | null
    needs?: string[]
  }

  try {
    // 1) Authenticate → uid
    const uid = await odooCall({
      service: 'common',
      method: 'authenticate',
      args: [ODOO_DB, ODOO_USER, ODOO_API_KEY, {}],
    })

    if (!uid) {
      throw new Error('Odoo authentication failed')
    }

    // 2) Build opportunity title (Arabic for the user-facing title)
    const opportunityTitle =
      company && company.trim().length > 0
        ? `جلسة تدقيق تسويقي – ${company.trim()}`
        : fullName && fullName.trim().length > 0
        ? `جلسة تدقيق تسويقي – ${fullName.trim()}`
        : 'جلسة تدقيق تسويقي – عميل جديد'

    // 3) Build a clean English summary for the plain "description" field
    const marketingNeeds = needs && needs.length > 0 ? needs.join(', ') : '-'

    const internalNotes = [
      `Name: ${fullName || '-'}`,
      `Company: ${company || '-'}`,
      `Phone: ${phone || '-'}`,
      `Email: ${email || '-'}`,
      `Employees: ${employeesCount || '-'}`,
      `Internal marketing team: ${
        hasInternalMarketingTeam === 'yes'
          ? 'Yes'
          : hasInternalMarketingTeam === 'no'
          ? 'No'
          : '-'
      }`,
      `Annual marketing budget (approx): ${annualMarketingBudget || '-'}`,
      `Marketing needs: ${marketingNeeds}`,
      `Page / website: ${socialOrWebsite || '-'}`,
    ].join('  •  ')

    // 4) Lead data
    const leadData: any = {
      // Title (Arabic, as you want it in the pipeline)
      name: opportunityTitle,

      // Contact info
      contact_name: fullName || undefined,
      partner_name: company || undefined,
      email_from: email || undefined,
      phone: phone || undefined,

      // Website / social
      website: socialOrWebsite || undefined,

      // Internal Notes (plain text, English only to avoid RTL/LTR mess)
      description: internalNotes,
    }

    // 5) Create lead in crm.lead
    const leadId = await odooCall({
      service: 'object',
      method: 'execute_kw',
      args: [ODOO_DB, uid, ODOO_API_KEY, 'crm.lead', 'create', [leadData]],
    })

    console.log('Odoo lead created with ID:', leadId)

    return NextResponse.json({ success: true, leadId })
  } catch (error) {
    console.error('Error while creating lead in Odoo:', error)
    return NextResponse.json(
      { error: 'Error while creating lead in Odoo' },
      { status: 500 }
    )
  }
}
