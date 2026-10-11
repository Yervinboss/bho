//Plugin ZENOBOT — porting da kick.js (ZENO ULTIMATE)
import { getTarget } from './util-target.js'

let handler = async (m, { conn, text }) => {
  const target = getTarget(m, text)
  if (!target) return m.reply('⚠️ Tagga, rispondi o scrivi il numero di chi vuoi espellere.')
  if (target === m.sender) return m.reply('✖️ Non puoi espellere te stesso 😂')

  try {
    await conn.groupParticipantsUpdate(m.chat, [target], 'remove')
    await conn.sendMessage(m.chat, { text: `🌸 Utente rimosso dal gruppo.`, mentions: [target] }, { quoted: m })
  } catch (e) {
    console.error('[KICK]', e.message)
    m.reply('✖️ Espulsione fallita (controlla che il bot sia admin).')
  }
}

handler.command = /^kick$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
