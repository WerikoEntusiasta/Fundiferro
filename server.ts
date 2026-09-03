/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Body Parsers
app.use(express.json({ limit: '250mb' }));
app.use(express.urlencoded({ extended: true, limit: '250mb' }));

/**
 * Helper to build transporter lazily
 */
function getEmailTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass
    },
    tls: {
      rejectUnauthorized: false
    }
  });
}

/**
 * Generate formatted HTML Email for Leads & Quotations
 */
function generateLeadHtmlEmail(data: any): string {
  const {
    protocol,
    nome,
    email,
    telefone,
    empresa,
    segmentoObra,
    localizacaoObra,
    prazoInicio,
    temProjeto,
    mensagem,
    arquivos,
    dadosEstimador,
    source,
    timestamp
  } = data;

  const dateFormatted = timestamp ? new Date(timestamp).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }) : new Date().toLocaleString('pt-BR');
  const cleanPhone = (telefone || '').replace(/\D/g, '');
  const waReplyUrl = cleanPhone ? `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(`Olá ${nome || ''}, tudo bem? Sou da engenharia comercial da Fundiferro Formas referente ao seu pedido de orçamento (${protocol || 'FF-ORÇAMENTO'}).`)}` : '#';

  // Files rows
  let filesHtml = '';
  if (arquivos && Array.isArray(arquivos) && arquivos.length > 0) {
    filesHtml = `
      <div style="margin-top: 20px; background-color: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px;">
        <h4 style="margin: 0 0 10px 0; color: #004a99; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
          📎 Plantas e Arquivos Anexados (${arquivos.length})
        </h4>
        <ul style="margin: 0; padding-left: 20px; color: #334155; font-size: 13px; line-height: 1.6;">
          ${arquivos.map((f: any) => `<li><strong>${f.name || 'Arquivo'}</strong> (${f.size || 'Tamanho n/d'} - ${f.type || 'Anexo'})</li>`).join('')}
        </ul>
        <p style="margin: 10px 0 0 0; font-size: 11px; color: #64748b;">
          * Os arquivos originais foram vinculados ao registro do lead no sistema Fundiferro.
        </p>
      </div>
    `;
  }

  // Estimator Data
  let estimatorHtml = '';
  if (dadosEstimador) {
    estimatorHtml = `
      <div style="margin-top: 20px; background-color: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 16px;">
        <h4 style="margin: 0 0 12px 0; color: #166534; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
          ⚡ Estimador Técnico de Modulação (Cálculo Preliminar)
        </h4>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <tr>
            <td style="padding: 6px 0; color: #475569; width: 45%;">Tipologia da Obra:</td>
            <td style="padding: 6px 0; color: #0f172a; font-weight: bold;">${dadosEstimador.tipologia || 'Não informado'}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #475569;">Área de Parede / Pavimento:</td>
            <td style="padding: 6px 0; color: #0f172a; font-weight: bold;">${dadosEstimador.areaParedeM2 || 0} m² (Pé-Direito: ${dadosEstimador.peDireito || 2.8}m)</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #475569;">Total de Pavimentos / Unidades:</td>
            <td style="padding: 6px 0; color: #0f172a; font-weight: bold;">${dadosEstimador.pavimentosOuUnidades || 1} un.</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #475569;">Ciclo Alvo de Concretagem:</td>
            <td style="padding: 6px 0; color: #0f172a; font-weight: bold;">${dadosEstimador.cicloDesejado || '24 horas'}</td>
          </tr>
          <tr style="border-top: 1px solid #bbf7d0;">
            <td style="padding: 8px 0 4px 0; color: #166534; font-weight: bold;">Fôrmas Calculadas:</td>
            <td style="padding: 8px 0 4px 0; color: #004a99; font-weight: bold; font-size: 15px;">~${dadosEstimador.areaFormasCalculada || 0} m² (${dadosEstimador.jogosEstimados || 1} Jogo(s))</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #166534; font-weight: bold;">Estimativa de Acessórios:</td>
            <td style="padding: 4px 0; color: #0f172a;">
              ${dadosEstimador.acessoriosEstimados?.pinosCunhas?.toLocaleString('pt-BR') || 0} pinos/cunhas, 
              ${dadosEstimador.acessoriosEstimados?.tirantes?.toLocaleString('pt-BR') || 0} tirantes, 
              ${dadosEstimador.acessoriosEstimados?.alinhadores || 0} alinhadores
            </td>
          </tr>
          <tr style="border-top: 1px solid #bbf7d0;">
            <td style="padding: 8px 0 0 0; color: #166534; font-weight: bold;">Economia Estimada vs Alvenaria:</td>
            <td style="padding: 8px 0 0 0; color: #15803d; font-weight: bold; font-size: 14px;">
              R$ ${(dadosEstimador.economiaEstimadaReais || 0).toLocaleString('pt-BR')} • ${dadosEstimador.diasPoupados || 0} dias poupados
            </td>
          </tr>
        </table>
      </div>
    `;
  }

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nova Solicitação de Orçamento - Fundiferro</title>
    </head>
    <body style="font-family: Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a;">
      <div style="max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #004A99 0%, #002B5C 100%); padding: 28px 32px; color: #ffffff; text-align: left;">
          <table style="width: 100%;">
            <tr>
              <td>
                <span style="display: inline-block; background-color: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); color: #bae6fd; font-size: 11px; font-weight: bold; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                  Novo Lead Comercial & Engenharia
                </span>
                <h1 style="margin: 0; font-size: 22px; font-weight: 900; letter-spacing: -0.5px; color: #ffffff;">
                  FUNDIFERRO FORMAS
                </h1>
                <p style="margin: 4px 0 0 0; font-size: 13px; color: #93c5fd;">
                  Solicitação de Proposta & Modulação Técnica de Fôrmas
                </p>
              </td>
              <td style="text-align: right; vertical-align: top;">
                <div style="background-color: #ffffff; color: #004a99; font-weight: bold; font-family: monospace; font-size: 12px; padding: 6px 12px; border-radius: 6px; display: inline-block;">
                  ${protocol || 'FF-ORC'}
                </div>
                <div style="font-size: 11px; color: #cbd5e1; margin-top: 6px;">
                  ${dateFormatted}
                </div>
              </td>
            </tr>
          </table>
        </div>

        <!-- Body Content -->
        <div style="padding: 32px;">
          
          <h2 style="font-size: 16px; margin: 0 0 16px 0; color: #0f172a; text-transform: uppercase; font-weight: 800; letter-spacing: 0.5px; border-bottom: 2px solid #004a99; padding-bottom: 6px;">
            👤 Dados do Solicitante / Contato
          </h2>

          <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 24px;">
            <tr style="background-color: #f8fafc;">
              <td style="padding: 8px 12px; color: #475569; width: 35%; font-weight: 600;">Nome Completo:</td>
              <td style="padding: 8px 12px; color: #0f172a; font-weight: bold;">${nome || 'Não informado'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; color: #475569; font-weight: 600;">E-mail:</td>
              <td style="padding: 8px 12px; color: #004a99; font-weight: bold;">
                <a href="mailto:${email}" style="color: #004a99; text-decoration: none;">${email || 'Não informado'}</a>
              </td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 8px 12px; color: #475569; font-weight: 600;">Telefone / WhatsApp:</td>
              <td style="padding: 8px 12px; color: #0f172a; font-weight: bold;">${telefone || 'Não informado'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; color: #475569; font-weight: 600;">Empresa / Construtora:</td>
              <td style="padding: 8px 12px; color: #0f172a; font-weight: bold;">${empresa || 'Não informada'}</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 8px 12px; color: #475569; font-weight: 600;">Localização da Obra:</td>
              <td style="padding: 8px 12px; color: #0f172a; font-weight: bold;">${localizacaoObra || 'Não informada'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; color: #475569; font-weight: 600;">Origem da Solicitação:</td>
              <td style="padding: 8px 12px; color: #0f172a;">${source || 'Website Fundiferro'}</td>
            </tr>
          </table>

          <h2 style="font-size: 16px; margin: 0 0 16px 0; color: #0f172a; text-transform: uppercase; font-weight: 800; letter-spacing: 0.5px; border-bottom: 2px solid #004a99; padding-bottom: 6px;">
            🏗️ Parâmetros da Obra & Sistema
          </h2>

          <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px;">
            <tr style="background-color: #f8fafc;">
              <td style="padding: 8px 12px; color: #475569; width: 35%; font-weight: 600;">Solução Desejada:</td>
              <td style="padding: 8px 12px; color: #004a99; font-weight: bold;">${segmentoObra || 'Parede de Concreto'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; color: #475569; font-weight: 600;">Status do Projeto:</td>
              <td style="padding: 8px 12px; color: #0f172a; font-weight: bold;">${temProjeto || 'Não informado'}</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 8px 12px; color: #475569; font-weight: 600;">Prazo Desejado:</td>
              <td style="padding: 8px 12px; color: #0f172a; font-weight: bold;">${prazoInicio || 'A combinar'}</td>
            </tr>
          </table>

          <!-- Mensagem / Descrição -->
          <div style="margin-top: 20px;">
            <h3 style="font-size: 14px; margin: 0 0 8px 0; color: #334155; font-weight: bold;">
              📝 Mensagem & Especificações do Cliente:
            </h3>
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #004a99; padding: 14px 16px; border-radius: 6px; font-size: 13px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${mensagem || 'Nenhuma observação adicional fornecida.'}</div>
          </div>

          <!-- Files & Estimator if any -->
          ${filesHtml}
          ${estimatorHtml}

          <!-- Direct Action Buttons -->
          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e2e8f0; text-align: center;">
            <table style="margin: 0 auto;">
              <tr>
                ${cleanPhone ? `
                  <td style="padding-right: 12px;">
                    <a href="${waReplyUrl}" target="_blank" style="display: inline-block; background-color: #16a34a; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 8px; font-size: 13px; font-weight: bold;">
                      💬 Responder via WhatsApp
                    </a>
                  </td>
                ` : ''}
                <td>
                  <a href="mailto:${email}?subject=${encodeURIComponent(`Proposta Técnica Fundiferro - Protocolo ${protocol || ''}`)}" style="display: inline-block; background-color: #004a99; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 8px; font-size: 13px; font-weight: bold;">
                    ✉️ Responder por E-mail
                  </a>
                </td>
              </tr>
            </table>
          </div>

        </div>

        <!-- Footer -->
        <div style="background-color: #0f172a; padding: 16px 24px; text-align: center; color: #94a3b8; font-size: 11px;">
          <p style="margin: 0 0 4px 0; font-weight: bold; color: #f1f5f9;">
            Fundiferro Indústria e Comércio de Fôrmas Metálicas Ltda.
          </p>
          <p style="margin: 0;">
            Catanduva/SP • Telefone: (17) 3522-8000 • WhatsApp: (17) 99181-2122
          </p>
        </div>

      </div>
    </body>
    </html>
  `;
}

/**
 * Plain text fallback for emails
 */
function generateLeadPlainText(data: any): string {
  const {
    protocol,
    nome,
    email,
    telefone,
    empresa,
    segmentoObra,
    localizacaoObra,
    prazoInicio,
    temProjeto,
    mensagem,
    arquivos,
    dadosEstimador,
    source
  } = data;

  let text = `NOVA SOLICITAÇÃO DE ORÇAMENTO - FUNDIFERRO FORMAS\n`;
  text += `Protocolo: ${protocol || 'FF-ORC'}\n`;
  text += `Data: ${new Date().toLocaleString('pt-BR')}\n`;
  text += `Origem: ${source || 'Site'}\n\n`;
  text += `--- DADOS DO SOLICITANTE ---\n`;
  text += `Nome: ${nome}\n`;
  text += `E-mail: ${email}\n`;
  text += `Telefone/WhatsApp: ${telefone}\n`;
  text += `Empresa: ${empresa || 'Não informada'}\n`;
  text += `Localização da Obra: ${localizacaoObra || 'Não informada'}\n\n`;
  text += `--- DADOS DA OBRA ---\n`;
  text += `Solução/Segmento: ${segmentoObra}\n`;
  text += `Status de Projeto: ${temProjeto}\n`;
  text += `Prazo Desejado: ${prazoInicio}\n\n`;

  if (dadosEstimador) {
    text += `--- DADOS DO ESTIMADOR TÉCNICO ---\n`;
    text += `Tipologia: ${dadosEstimador.tipologia}\n`;
    text += `Área de Fôrmas Calculada: ~${dadosEstimador.areaFormasCalculada} m² (${dadosEstimador.jogosEstimados} Jogo(s))\n`;
    text += `Economia Estimada: R$ ${dadosEstimador.economiaEstimadaReais?.toLocaleString('pt-BR')} (${dadosEstimador.diasPoupados} dias economizados)\n\n`;
  }

  if (arquivos && arquivos.length > 0) {
    text += `--- ARQUIVOS ANEXADOS (${arquivos.length}) ---\n`;
    arquivos.forEach((f: any) => {
      text += `• ${f.name} (${f.size} - ${f.type})\n`;
    });
    text += `\n`;
  }

  text += `--- MENSAGEM DO CLIENTE ---\n`;
  text += `${mensagem}\n\n`;
  text += `Fundiferro Formas - Catanduva/SP`;
  return text;
}

// -----------------------------------------------------------------------------
// API ROUTES
// -----------------------------------------------------------------------------

/**
 * Health check
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

/**
 * Check Email Configuration Status
 */
app.get('/api/email-status', (req, res) => {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const emailTo = process.env.EMAIL_TO || 'werikplaystore@gmail.com';
  const emailFrom = process.env.EMAIL_FROM || 'Fundiferro Formas <no-reply@fundiferro.com.br>';
  const resendKey = process.env.RESEND_API_KEY;

  const isConfigured = Boolean((host && user && pass) || resendKey);

  res.json({
    isConfigured,
    smtpHost: host ? `${host.slice(0, 4)}***` : null,
    smtpPort: process.env.SMTP_PORT || '587',
    smtpUser: user ? `${user.slice(0, 3)}***@***` : null,
    emailTo,
    emailFrom,
    provider: resendKey ? 'Resend API' : host ? 'SMTP' : 'Pendente de Configuração'
  });
});

/**
 * Send Lead Email Endpoint
 */
app.post('/api/send-lead-email', async (req, res) => {
  try {
    const leadData = req.body;

    if (!leadData.nome || !leadData.email) {
      return res.status(400).json({
        success: false,
        error: 'Nome e E-mail são obrigatórios para envio.'
      });
    }

    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const emailTo = process.env.EMAIL_TO || user || 'werikplaystore@gmail.com';
    const emailFrom = process.env.EMAIL_FROM || user || 'Fundiferro Formas <no-reply@fundiferro.com.br>';
    const resendKey = process.env.RESEND_API_KEY;

    console.log(`[LEAD RECEIVED] Protocol: ${leadData.protocol || 'N/A'} - Lead: ${leadData.nome} (${leadData.email})`);

    const htmlContent = generateLeadHtmlEmail(leadData);
    const textContent = generateLeadPlainText(leadData);
    const subject = `[NOVO ORÇAMENTO] ${leadData.protocol || 'FF-ORC'} - ${leadData.nome} (${leadData.empresa || leadData.segmentoObra || 'Parede de Concreto'})`;

    // 1. Check if Resend API Key is provided
    if (resendKey) {
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: emailFrom,
            to: emailTo.split(',').map((e: string) => e.trim()),
            subject,
            html: htmlContent,
            text: textContent,
            reply_to: leadData.email
          })
        });

        if (response.ok) {
          const resendData = await response.json();
          console.log('[RESEND SUCCESS] Sent lead email:', resendData);
          return res.json({
            success: true,
            emailSent: true,
            provider: 'Resend',
            messageId: resendData.id,
            emailTo
          });
        }
      } catch (resendErr) {
        console.error('[RESEND ERROR]', resendErr);
      }
    }

    // 2. Try Nodemailer SMTP
    const transporter = getEmailTransporter();

    if (transporter) {
      try {
        const info = await transporter.sendMail({
          from: emailFrom,
          to: emailTo,
          replyTo: leadData.email,
          subject,
          text: textContent,
          html: htmlContent
        });

        console.log(`[SMTP SUCCESS] Email sent successfully to ${emailTo}. Message ID: ${info.messageId}`);

        return res.json({
          success: true,
          emailSent: true,
          provider: 'SMTP',
          messageId: info.messageId,
          emailTo
        });
      } catch (smtpErr: any) {
        console.error('[SMTP SEND ERROR]', smtpErr);
        return res.json({
          success: true,
          emailSent: false,
          error: smtpErr.message || 'Falha ao autenticar no servidor SMTP.',
          note: 'O lead foi gravado com sucesso no sistema local. Verifique as credenciais SMTP nas variáveis de ambiente.'
        });
      }
    }

    // 3. Fallback: SMTP Not configured yet
    console.log('[SMTP NOTICE] SMTP variables not configured yet. Lead recorded in database.');
    return res.json({
      success: true,
      emailSent: false,
      note: 'Lead registrado com sucesso. Para envio automático de e-mails, configure as variáveis SMTP_HOST, SMTP_USER, SMTP_PASS no ambiente.',
      emailTo
    });

  } catch (error: any) {
    console.error('[SERVER ERROR in /api/send-lead-email]:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Erro interno ao processar lead.'
    });
  }
});

/**
 * Diagnostic / Test Email Endpoint (for Admin Panel)
 */
app.post('/api/test-email', async (req, res) => {
  try {
    const { targetEmail } = req.body;
    const recipient = targetEmail || process.env.EMAIL_TO || process.env.SMTP_USER || 'werikplaystore@gmail.com';

    const testLead = {
      protocol: `FF-TEST-${Math.floor(1000 + Math.random() * 9000)}`,
      nome: 'Eng. Teste de Configuração Fundiferro',
      email: 'teste@fundiferro.com.br',
      telefone: '(17) 99181-2122',
      empresa: 'Fundiferro Formas & Engenharia',
      segmentoObra: 'Parede de Concreto (Edifício Vertical)',
      localizacaoObra: 'Catanduva / SP',
      prazoInicio: 'Imediato',
      temProjeto: 'Sim (DWG / BIM)',
      mensagem: 'Este é um e-mail de teste automático disparado pelo Painel Administrativo da Fundiferro para validar a conectividade do servidor SMTP e variáveis de ambiente.',
      source: 'Teste de Diagnóstico',
      timestamp: new Date().toISOString()
    };

    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const emailFrom = process.env.EMAIL_FROM || user || 'Fundiferro Formas <no-reply@fundiferro.com.br>';

    if (!host || !user || !pass) {
      return res.json({
        success: false,
        error: 'Credenciais SMTP incompletas. Preencha SMTP_HOST, SMTP_USER e SMTP_PASS nas variáveis de ambiente (.env).'
      });
    }

    const transporter = getEmailTransporter();
    if (!transporter) {
      return res.json({
        success: false,
        error: 'Não foi possível inicializar o transporte SMTP.'
      });
    }

    const info = await transporter.sendMail({
      from: emailFrom,
      to: recipient,
      subject: `[TESTE DE CONEXÃO SMTP] Fundiferro Formas - ${testLead.protocol}`,
      text: generateLeadPlainText(testLead),
      html: generateLeadHtmlEmail(testLead)
    });

    return res.json({
      success: true,
      message: `E-mail de teste enviado com sucesso para ${recipient}!`,
      messageId: info.messageId
    });

  } catch (err: any) {
    return res.json({
      success: false,
      error: err.message || 'Erro ao testar envio de e-mail.'
    });
  }
});

// -----------------------------------------------------------------------------
// VITE MIDDLEWARE & STATIC SERVER
// -----------------------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[FUNDIFERRO SERVER] Running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
