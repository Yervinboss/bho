//Plugin ZENOBOT — porting da promote_demote.js (ZENO ULTIMATE)
import { getTarget } from './util-target.js'

let handler = async (m, { conn, text, command }) => {
  const target = getTarget(m, text)
  if (!target) return m.reply('⚠️ Tagga o rispondi a chi vuoi promuovere/retrocedere.')

  const promote = /^(promote|promuovi|mettiadmin|p)$/i.test(command)
  try {
    await conn.groupParticipantsUpdate(m.chat, [target], promote ? 'promote' : 'demote')
    const msg = promote ? `⚡ @${target.split('@')[0]} è stato promosso *ADMIN* 👑` : `📉 @${target.split('@')[0]} non è più admin`
    return conn.sendMessage(m.chat, { text: msg, mentions: [target] }, { quoted: m })
  } catch (e) {
    console.error('[PROMOTE/DEMOTE]', e.message)
    return m.reply('✖️ Errore: assicurati che il bot sia admin.')
  }
}

handler.command = /^(promote|promuovi|mettiadmin|p|demote|retrocedi|togliadmin)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
