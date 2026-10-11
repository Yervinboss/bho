//Codice di menu-funzioni.js

//Plugin by Zeno

import fs from 'fs'

let handler = async (m, { conn, usedPrefix, isOwner, isROwner }) => {
  const userName = m.pushName || 'Utente'
  const userNumber = m.sender.split('@')[0]

  const chat = global.db.data.chats[m.chat] || {}
  const bot = global.db.data.settings[conn.user.jid] || {}

  const {
    rileva, jadibotmd, welcome, goodbye, modoadmin,
    antivoip, antitrava, antiArab, antiLink, antilinkig, antilinktiktok,
    antilinktg, antimedia, antispam, antitoxic, antiBot, antioneview,
    antibusiness, reaction, bestemmiometro, ai, vocali,
    slowmode, antinuke, taglia, parola, antiban
  } = chat

  const { antiprivato, soloCreatore, read, anticall } = bot

  const imgBuffer = fs.readFileSync('icone/zenobot.jpg')

  const fake = {
    key: {
      participants: '0@s.whatsapp.net',
      fromMe: false,
      id: 'zenobotFunzioni'
    },
    message: {
      locationMessage: {
        name: '⚙️ ᴍᴇɴᴜ ꜰᴜɴᴢɪᴏɴɪ ᴢᴇɴᴏʙᴏᴛ ʙᴏᴛ',
        jpegThumbnail: imgBuffer.toString('base64'),
        vcard: 'BEGIN:VCARD\nVERSION:3.0\nN:;zenobot;;;\nFN:zenobot\nEND:VCARD'
      }
    },
    participant: '0@s.whatsapp.net'
  }

  const s = (val) => val ? '✔️' : '✖️'
  const p = usedPrefix
  const tagliaEnabled = taglia !== false
  const parolaEnabled = parola !== false

  const catalogsInfo = `⋆｡˚ ❀ ˚｡⋆
ℹ️  Per attivare/disattivare più funzioni insieme usa '&'
 Esempio: ${p}attiva antilink & antispam & antitrava
 Oppure: ${p}disabilita antilink & antispam
⋆｡˚ ❀ ˚｡⋆`

  const ownerSection = (isOwner || isROwner) ? `
⋆｡˚ ❀ ˚｡⋆
👑 ꜰᴜɴᴢɪᴏɴɪ ᴏᴡɴᴇʀ
⋆｡˚ ❀ ˚｡⋆
${s(antiprivato)} ❀ ${p}antiprivato
${s(antiban)} ❀ ${p}antiban
${s(soloCreatore)} ❀ ${p}solocreatore
${s(read)} ❀ ${p}lettura
${s(anticall)} ❀ ${p}anticall
⋆｡˚ ❀ ˚｡⋆
👤 Richiesto da: *${userName}*
📱 Numero: *+${userNumber}*` : ''

  const menuFunzioniText =
`⋆˚｡⋆୨🌸୧⋆｡˚⋆
⚙️ ᴍᴇɴᴜ ꜰᴜɴᴢɪᴏɴɪ ᴅɪ
🌸 ᴢᴇɴᴏʙᴏᴛ
⋆｡˚ ❀ ˚｡⋆
🔧 ꜰᴜɴᴢɪᴏɴɪ ɢʀᴜᴘᴘᴏ
⋆｡˚ ❀ ˚｡⋆
${s(welcome)} ❀ ${p}benvenuto
${s(goodbye)} ❀ ${p}addio
${s(modoadmin)} ❀ ${p}modoadmin
${s(slowmode)} ❀ ${p}slowmode
${s(tagliaEnabled)} ❀ ${p}taglia
${s(parolaEnabled)} ❀ ${p}parola
${s(bestemmiometro)} ❀ ${p}bestemmiometro
⋆｡˚ ❀ ˚｡⋆
🚫 ᴀɴᴛɪ
⋆｡˚ ❀ ˚｡⋆
${s(antispam)} ❀ ${p}antispam
${s(antitrava)} ❀ ${p}antitrava
${s(antiBot)} ❀ ${p}antibot
${s(antibusiness)} ❀ ${p}antibusiness
${s(antivoip)} ❀ ${p}antivoip
${s(antimedia)} ❀ ${p}antimedia
${s(antinuke)} ❀ ${p}antinuke
${s(antiLink)} ❀ ${p}antilink
${s(antilinkig)} ❀ ${p}antlinkig
${s(antilinktiktok)} ❀ ${p}antilinktiktok
${s(antilinktg)} ❀ ${p}antilinktg
${catalogsInfo}${ownerSection}
⋆｡˚ ❀ ˚｡⋆
✔️ = Attivo  ✖️ = Disattivo
⋆｡˚ ❀ ˚｡⋆
ℹ️ ᴜꜱᴏ
${p}attiva antilink
${p}disabilita antilink
⋆˚｡⋆୨🌸୧⋆｡˚⋆`.trim()

  await conn.sendMessage(m.chat, {
    text: menuFunzioniText
  }, { quoted: fake })
}

handler.help = ['funzioni']
handler.tags = ['menu']
handler.command = /^(funzioni)$/i

export default handler