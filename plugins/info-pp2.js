//Plugin ZENOBOT — porting da pp.js (ZENO ULTIMATE); comando 'pp' escluso perché potenzialmente in uso altrove
import { getTarget } from './util-target.js'

let handler = async (m, { conn, text }) => {
  const target = getTarget(m, text) || m.sender
  let url
  try { url = await conn.profilePictureUrl(target, 'image') }
  catch { try { url = await conn.profilePictureUrl(target, 'preview') } catch { url = null } }

  if (!url) return m.reply('✖️ Foto profilo non disponibile (potrebbe essere nascosta).')
  return conn.sendMessage(m.chat, { image: { url }, caption: `🖼️ Foto profilo di @${target.split('@')[0]}`, mentions: [target] }, { quoted: m })
}

handler.command = /^fotoutente$/i
handler.help = ['fotoutente [@utente]']
handler.tags = ['info']

export default handler
