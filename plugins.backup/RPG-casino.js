//Codice di RPG-casino.js

// Plugin fatto da Zenos & zenobot Staff
//Codice di RPG-casino.js

let handler = async (m, { conn }) => {

  await conn.sendMessage(m.chat, {
    text:
`┌┄ 🎰 ᴄᴀꜱɪɴᴏ ᴢᴇɴᴏʙᴏᴛ ┄┐
┆
┆ 💸 *Benvenuto nel paradiso*
┆ *della rovina economica*
┆
┆ 🎯 ʀᴏᴜʟᴇᴛᴛᴇ
┆ 🎲 ᴅᴀᴅɪ
┆ 🎰 ꜱʟᴏᴛ
┆ 🃏 ʙʟᴀᴄᴋᴊᴀᴄᴋ
┆ 🐎 ᴄᴀᴠᴀʟʟɪ
┆ 💎 ᴍɪɴɪᴇʀᴀ
┆ ❓ ᴇꜱᴛʀᴀᴢɪᴏɴᴇ
┆ 🎯 ꜰʀᴇᴄᴄᴇᴛᴛᴇ
┆ ♠️ ᴘᴏᴋᴇʀ
┆ 🎳 ʙᴏᴡʟɪɴɢ
┆ 🎡 ʀᴜᴏᴛᴀ
┆ 🎟️ ɢʀᴀᴛᴛᴀ ᴇ ᴠɪɴᴄɪ
┆ 🏟️ ᴄᴀʟᴄɪᴏ ꜱᴄᴏᴍᴍᴇꜱꜱᴇ
┆
└⋆˚｡⋆୨🌸୧⋆｡˚⋆┘

👇 ꜱᴄᴇɢʟɪ ɪʟ ɢɪᴏᴄᴏ ᴀ ᴄᴜɪ ɢɪᴏᴄᴀʀᴇ`,
    footer: "ᴢᴇɴᴏʙᴏᴛ ᴄᴀꜱɪɴᴏ",
    buttons: [
      { buttonId: ".roulette", buttonText: { displayText: "🎯 ʀᴏᴜʟᴇᴛᴛᴇ" }, type: 1 },
      { buttonId: ".dadi", buttonText: { displayText: "🎲 ᴅᴀᴅɪ" }, type: 1 },
      { buttonId: ".slot", buttonText: { displayText: "🎰 ꜱʟᴏᴛ" }, type: 1 },
      { buttonId: ".blackjack", buttonText: { displayText: "🃏 ʙʟᴀᴄᴋᴊᴀᴄᴋ" }, type: 1 },
      { buttonId: ".cavalli", buttonText: { displayText: "🐎 ᴄᴀᴠᴀʟʟɪ" }, type: 1 },
      { buttonId: ".miniera", buttonText: { displayText: "💎 ᴍɪɴɪᴇʀᴀ" }, type: 1 },
      { buttonId: ".estrazione", buttonText: { displayText: "❓ ᴇꜱᴛʀᴀᴢɪᴏɴᴇ" }, type: 1 },
      { buttonId: ".freccette", buttonText: { displayText: "🎯 ꜰʀᴇᴄᴄᴇᴛᴛᴇ" }, type: 1 },
      { buttonId: ".poker", buttonText: { displayText: "♠️ ᴘᴏᴋᴇʀ" }, type: 1 },
      { buttonId: ".bowling", buttonText: { displayText: "🎳 ʙᴏᴡʟɪɴɢ" }, type: 1 },
      { buttonId: ".ruota", buttonText: { displayText: "🎡 ʀᴜᴏᴛᴀ" }, type: 1 },
      { buttonId: ".gratta", buttonText: { displayText: "🎟️ ɢʀᴀᴛᴛᴀ ᴇ ᴠɪɴᴄɪ" }, type: 1 },
      { buttonId: ".calcioscommesse", buttonText: { displayText: "🏟️ ᴄᴀʟᴄɪᴏ ꜱᴄᴏᴍᴍᴇꜱꜱᴇ" }, type: 1 },

    ],
    headerType: 1
  }, { quoted: m })
}

handler.command = /^casino$/i
handler.group = true
export default handler