//Plugin ZENOBOT — porting da soloadmin.js (ZENO ULTIMATE)
import fs from 'fs'
import path from 'path'

const dbPath = path.join(process.cwd(), 'database', 'soloadmin.json')
const readDb = () => {
  if (!fs.existsSync(dbPath)) { fs.mkdirSync(path.dirname(dbPath), { recursive: true }); fs.writeFileSync(dbPath, '{}') }
  try { return JSON.parse(fs.readFileSync(dbPath, 'utf8')) } catch { return {} }
}
const writeDb = (d) => fs.writeFileSync(dbPath, JSON.stringify(d, null, 2))
export const isSoloAdminOn = (chat) => !!readDb()[chat]

let handler = async (m, { conn, args }) => {
  const action = (args[0] || '').toLowerCase()
  const db = readDb()

  if (action === 'on') {
    db[m.chat] = true; writeDb(db)
    return conn.sendMessage(m.chat, { text: '🔒 *Solo admin ATTIVO*\nIl bot ora risponde solo agli admin.' }, { quoted: m })
  }
  if (action === 'off') {
    delete db[m.chat]; writeDb(db)
    return conn.sendMessage(m.chat, { text: '🔓 *Solo admin DISATTIVATO*\nIl bot risponde a tutti.' }, { quoted: m })
  }
  return conn.sendMessage(m.chat, { text: `🔒 *SOLO ADMIN*\n\nStato: ${db[m.chat] ? 'ATTIVO' : 'Disattivato'}\n\n\`.soloadmin on\`\n\`.soloadmin off\`` }, { quoted: m })
}

handler.command = /^(soloadmin|solo)$/i
handler.group = true
handler.admin = true

export default handler
