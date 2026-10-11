//Plugin ZENOBOT — porting da anti-bot.js (ZENO ULTIMATE): avvisa se un numero è già segnato come bot
import fs from 'fs'
import path from 'path'
import { getTarget } from './util-target.js'

const dbPath = path.join(process.cwd(), 'database', 'antibot.json')
const readDb = () => {
  if (!fs.existsSync(dbPath)) { fs.mkdirSync(path.dirname(dbPath), { recursive: true }); fs.writeFileSync(dbPath, '{}') }
  try { return JSON.parse(fs.readFileSync(dbPath, 'utf8')) } catch { return {} }
}
const writeDb = (d) => fs.writeFileSync(dbPath, JSON.stringify(d, null, 2))

let handler = async (m, { conn, text, args }) => {
  const sub = (args[0] || '').toLowerCase()
  const db = readDb()

  if (sub === 'add') {
    const target = getTarget(m, args.slice(1).join(' '))
    if (!target) return m.reply('⚠️ Tagga o rispondi al numero da segnare come bot.')
    db[target] = true; writeDb(db)
    return conn.sendMessage(m.chat, { text: '🤖 Numero segnato come bot.', mentions: [target] }, { quoted: m })
  }
  if (sub === 'del') {
    const target = getTarget(m, args.slice(1).join(' '))
    if (!target) return m.reply('⚠️ Tagga o rispondi al numero da togliere.')
    delete db[target]; writeDb(db)
    return conn.sendMessage(m.chat, { text: '🌸 Numero rimosso dalla lista bot.', mentions: [target] }, { quoted: m })
  }

  const list = Object.keys(db)
  if (!list.length) return m.reply('📋 Nessun numero segnato come bot.')
  return conn.sendMessage(m.chat, { text: `🤖 *NUMERI SEGNATI COME BOT*\n\n${list.map((j, i) => `${i + 1}. @${j.split('@')[0]}`).join('\n')}`, mentions: list }, { quoted: m })
}

handler.command = /^antibot$/i
handler.help = ['antibot add/del <utente>']
handler.tags = ['owner']
handler.group = true
handler.admin = true

export default handler
