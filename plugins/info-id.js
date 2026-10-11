//Plugin ZENOBOT — porting da id.js (ZENO ULTIMATE); comando 'info' escluso perché già usato da info-msg.js
import { getTarget } from './util-target.js'

let handler = async (m, { conn, text }) => {
  const target = getTarget(m, text) || m.sender
  const isSelf = target === m.sender
  let groupName = 'Chat privata'
  if (m.isGroup) { try { groupName = (await conn.groupMetadata(m.chat)).subject } catch {} }

  return conn.sendMessage(m.chat, {
    text: `🌸 *INFO ${isSelf ? 'TUE' : 'UTENTE'}*\n\n👤 @${target.split('@')[0]}\n🪪 JID: \`${target}\`\n💬 Chat: ${groupName}`,
    mentions: [target]
  }, { quoted: m })
}

handler.command = /^(id|myid)$/i
handler.help = ['id [@utente]']
handler.tags = ['info']

export default handler
