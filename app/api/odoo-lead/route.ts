import { NextRequest, NextResponse } from 'next/server'
import xmlrpc from 'xmlrpc'

const ODOO_URL = process.env.ODOO_URL!
const ODOO_DB = process.env.ODOO_DB!
const ODOO_USER = process.env.ODOO_USER!
const ODOO_API_KEY = process.env.ODOO_API_KEY!

// helper générique pour appeler Odoo
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
    console.error('Configuration Odoo manquante')
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
    // 1) Authentification sur Odoo → uid
    const uid = await odooCall({
      service: 'common',
      method: 'authenticate',
      args: [ODOO_DB, ODOO_USER, ODOO_API_KEY, {}],
    })

    if (!uid) {
      throw new Error('Échec authentification Odoo')
    }

    // 2) Construire le titre de l’opportunité
    const opportunityTitle =
      company && company.trim().length > 0
        ? `جلسة تدقيق تسويقي – ${company.trim()}`
        : fullName && fullName.trim().length > 0
        ? `جلسة تدقيق تسويقي – ${fullName.trim()}`
        : 'جلسة تدقيق تسويقي – عميل جديد'

    // 3) Construire les notes avec toutes les infos du formulaire
    const marketingNeeds = needs && needs.length > 0 ? needs.join('، ') : '-'

    const internalNotes = `
الاسم: ${fullName || '-'}
رقم الهاتف: ${phone || '-'}
البريد الإلكتروني: ${email || '-'}

اسم الشركة: ${company || '-'}
عدد الموظفين: ${employeesCount || '-'}

فريق تسويق داخلي: ${
      hasInternalMarketingTeam === 'yes'
        ? 'نعم'
        : hasInternalMarketingTeam === 'no'
        ? 'لا'
        : '-'
    }

ميزانية التسويق السنوية (تقديرية): ${annualMarketingBudget || '-'}

الاحتياجات التسويقية:
${marketingNeeds}

رابط الصفحة / الموقع:
${socialOrWebsite || '-'}
    `.trim()

    // 4) Data du lead au format Odoo
    const leadData: any = {
      // Titre opportunité (champ "Name" dans ton template)
      name: opportunityTitle,

      // Contact
      contact_name: fullName || undefined,
      partner_name: company || undefined,
      email_from: email || undefined,
      phone: phone || undefined,

      // Site / page
      website: socialOrWebsite || undefined,

      // Notes internes (champ "Notes" dans ton template)
      description: internalNotes,
    }

    // 5) Création du lead dans crm.lead
    const leadId = await odooCall({
      service: 'object',
      method: 'execute_kw',
      args: [ODOO_DB, uid, ODOO_API_KEY, 'crm.lead', 'create', [leadData]],
    })

    console.log('Lead Odoo créé avec ID:', leadId)

    return NextResponse.json({ success: true, leadId })
  } catch (error) {
    console.error('Erreur Odoo:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création du lead dans Odoo' },
      { status: 500 }
    )
  }
}
