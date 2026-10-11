//Plugin ZENOBOT — porting da moderazione_gruppo.js (ZENO ULTIMATE)
let handler = async (m, { conn, command }) => {
  const close = /^(chiuso|chiudi)$/i.test(command)
  try {
    await conn.groupSettingUpdate(m.chat, close ? 'announcement' : 'not_announcement')
    return conn.sendMessage(m.chat, { text: close ? '🔒 *Gruppo chiuso*: solo gli admin possono scrivere.' : '🔓 *Gruppo riaperto*: tutti possono scrivere.' }, { quoted: m })
  } catch (e) {
    console.error('[APRI/CHIUDI]', e.message)
    return m.reply('✖️ Errore: assicurati che il bot sia admin.')
  }
}

handler.command = /^(aperto|chiuso|apri|chiudi)$/i
handler.group = true
handler.admin = true

export default handler
