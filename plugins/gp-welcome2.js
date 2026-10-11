//Plugin ZENOBOT — porting da welcome.js (ZENO ULTIMATE)
import fs from 'fs'
import path from 'path'

const dbPath = path.join(process.cwd(), 'database', 'welcome2.json')
const FALLBACK_PIC = 'https://telegra.ph/file/8ca14ef9fa43e99d1d196.jpg'
const DEFAULT_TEXT = '@user 🌸 benvenuto/a nel gruppo @group'
let listenerRegistered = false

const readDb = () => {
  if (!fs.existsSync(dbPath)) { fs.mkdirSync(path.dirname(dbPath), { recursive: true }); fs.writeFileSync(dbPath, '{}') }
  try { return JSON.parse(fs.readFileSync(dbPath, 'utf8')) } catch { return {} }
}
const writeDb = (d) => fs.writeFileSync(dbPath, JSON.stringify(d, null, 2))
const getCfg = (db, jid) => ({ text: db[jid]?.text || null, enabled: db[jid]?.enabled !== false })

async function sendWelcome(conn, jid, users, force = false) {
  const cfg = getCfg(readDb(), jid)
  if ((!cfg.enabled && !force) || !users.length) return
  let meta
  try { meta = await conn.groupMetadata(jid) } catch { return }
  const text = users.map(u => (cfg.text || DEFAULT_TEXT)
    .replace(/@user/g, '@' + u.split('@')[0])
    .replace(/@group/g, meta.subject || '')
    .replace(/@count/g, String(meta.participants.length))
  ).join('\n')
  await conn.sendMessage(jid, { text: `${text}\n\n👥 Membri attuali: ${meta.participants.length}`, mentions: users }).catch(() => {})
}

function registerListener(conn) {
  if (listenerRegistered || !conn?.ev) return
  listenerRegistered = true
  conn.ev.on('group-participants.update', async (ev) => {
    try {
      if (ev.action !== 'add') return
      const bot = (conn.user?.id || '').split(':')[0]
      const users = ev.participants.filter(p => p.split('@')[0] !== bot)
      if (users.length) await sendWelcome(conn, ev.id, users)
    } catch (e) { console.error('[WELCOME2]', e.message) }
  })
}

export async function before(m, { conn }) { registerListener(conn) }

let handler = async (m, { conn, args, text, command }) => {
  const db = readDb()
  const cfg = getCfg(db, m.chat)

  if (command === 'setwelcome2' || command === 'setbenvenuto2') {
    if (!text?.trim()) return m.reply(`ⓘ Variabili: @user @group @count\n\n_Esempio:_ .setwelcome2 Benvenuto @user in @group!\n_Reset:_ .setwelcome2 reset\n\n*Attuale:*\n${cfg.text || DEFAULT_TEXT}`)
    if (text.trim().toLowerCase() === 'reset') { db[m.chat] = { text: null, enabled: cfg.enabled }; writeDb(db); return m.reply('✔️ Messaggio ripristinato al predefinito.') }
    db[m.chat] = { text: text.trim(), enabled: cfg.enabled }; writeDb(db)
    return m.reply('✔️ Messaggio di benvenuto aggiornato!')
  }

  if (command === 'welcome2') {
    const a = (args[0] || '').toLowerCase()
    if (a === 'on' || a === 'off') { db[m.chat] = { text: cfg.text, enabled: a === 'on' }; writeDb(db); return m.reply(a === 'on' ? '✔️ Benvenuto attivato.' : '⭕ Benvenuto disattivato.') }
    return m.reply(`👋 *WELCOME*\n\nStato: ${cfg.enabled ? 'ATTIVO' : 'Disattivato'}\nTesto: ${cfg.text || DEFAULT_TEXT}\n\n.welcome2 on/off\n.setwelcome2 <testo>\n.testwelcome2`)
  }

  if (command === 'testwelcome2') return sendWelcome(conn, m.chat, [m.sender], true)
}

handler.command = /^(setwelcome2|setbenvenuto2|welcome2|testwelcome2)$/i
handler.group = true
handler.admin = true

export default handler
