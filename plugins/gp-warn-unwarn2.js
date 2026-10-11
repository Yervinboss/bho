//Plugin ZENOBOT — porting da moderazione_warn.js (ZENO ULTIMATE)
import fs from 'fs'
import path from 'path'
import { getTarget } from './util-target.js'

const dbPath = path.join(process.cwd(), 'database', 'warns2.json')
const readDb = () => {
  if (!fs.existsSync(dbPath)) { fs.mkdirSync(path.dirname(dbPath), { recursive: true }); fs.writeFileSync(dbPath, '{}') }
  try { return JSON.parse(fs.readFileSync(dbPath, 'utf8')) } catch { return {} }
}
const writeDb = (d) => fs.writeFileSync(dbPath, JSON.stringify(d, null, 2))

let handler = async (m, { conn, text, command }) => {
  const target = getTarget(m, text)
  if (!target) return m.reply('⚠️ Tagga o rispondi a chi vuoi richiamare/perdonare.')
  if (target === m.sender) return m.reply('✖️ Non puoi sanzionare te stesso.')

  const db = readDb()
  db[m.chat] = db[m.chat] || {}
  db[m.chat][target] = db[m.chat][target] || 0

  if (command === 'warn' || command === 'richiamo') {
    db[m.chat][target]++
    const n = db[m.chat][target]
    if (n >= 3) {
      db[m.chat][target] = 0
      writeDb(db)
      await conn.sendMessage(m.chat, { text: `🚨 *ESPULSIONE!*\n\n@${target.split('@')[0]} ha raggiunto *3/3 richiami*. 👋`, mentions: [target] })
      try { await conn.groupParticipantsUpdate(m.chat, [target], 'remove') } catch { await m.reply('✖️ Non riesco a espellere (controlla i permessi admin del bot).') }
      return
    }
    writeDb(db)
    return conn.sendMessage(m.chat, { text: `⚠️ *RICHIAMO*\n\n👤 @${target.split('@')[0]}\n📊 Richiami: *${n}/3*\n\n📌 _Al 3° richiamo viene espulso._`, mentions: [target] }, { quoted: m })
  }

  if (command === 'unwarn' || command === 'grazia') {
    if (db[m.chat][target] <= 0) return conn.sendMessage(m.chat, { text: `😇 @${target.split('@')[0]} è già pulito (0 richiami).`, mentions: [target] }, { quoted: m })
    db[m.chat][target]--
    writeDb(db)
    return conn.sendMessage(m.chat, { text: `😇 *GRAZIA CONCESSA*\n\n👤 @${target.split('@')[0]}\n📊 Richiami rimasti: *${db[m.chat][target]}/3*`, mentions: [target] }, { quoted: m })
  }
}

handler.command = /^(warn|unwarn|richiamo|grazia)$/i
handler.group = true
handler.admin = true

export default handler
