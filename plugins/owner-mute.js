//Plugin ZENOBOT — porting da mute.js (ZENO ULTIMATE)
import fs from 'fs'
import path from 'path'
import { getTarget } from './util-target.js'

const dbPath = path.join(process.cwd(), 'database', 'mutati.json')
const readDb = () => {
  if (!fs.existsSync(dbPath)) { fs.mkdirSync(path.dirname(dbPath), { recursive: true }); fs.writeFileSync(dbPath, '{}') }
  try { return JSON.parse(fs.readFileSync(dbPath, 'utf8')) } catch { return {} }
}
const writeDb = (d) => fs.writeFileSync(dbPath, JSON.stringify(d, null, 2))
export const isMuted = (chat, jid) => !!readDb()[chat]?.includes(jid)

let handler = async (m, { conn, text, command }) => {
  const target = getTarget(m, text)
  if (!target) return m.reply('⚠️ Tagga o rispondi a chi vuoi mutare/smutare.')

  const db = readDb()
  db[m.chat] = db[m.chat] || []

  if (command === 'mute') {
    if (!db[m.chat].includes(target)) db[m.chat].push(target)
    writeDb(db)
    return conn.sendMessage(m.chat, { text: '🌙 Utente mutato: i suoi messaggi verranno ignorati dal bot.', mentions: [target] }, { quoted: m })
  } else {
    db[m.chat] = db[m.chat].filter(j => j !== target)
    writeDb(db)
    return conn.sendMessage(m.chat, { text: '🌸 Utente smutato.', mentions: [target] }, { quoted: m })
  }
}

handler.command = /^(mute|unmute)$/i
handler.group = true
handler.admin = true

export default handler
