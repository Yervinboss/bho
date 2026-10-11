//Plugin by Zeno

let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  let money = user.money || 0
  const bet = (x) => money >= x ? `.blackjackplay ${x}` : `no_${x}`

  await conn.sendMessage(m.chat, {
    text:
`┌┄🃏 ʙʟᴀᴄᴋᴊᴀᴄᴋ ┄┐
┆ 💰 Portafoglio: *${money} ZenoCoin*
┆
┆ Scegli la puntata
└⋆˚｡⋆୨🌸୧⋆｡˚⋆┘`,
    buttons: [
      { buttonId: bet(100), buttonText: { displayText: "100 ZenoCoin" }, type: 1 },
      { buttonId: bet(200), buttonText: { displayText: "200 ZenoCoin" }, type: 1 },
      { buttonId: bet(500), buttonText: { displayText: "500 ZenoCoin" }, type: 1 },
      { buttonId: bet(1000), buttonText: { displayText: "1000 ZenoCoin" }, type: 1 },
      { buttonId: bet(10000), buttonText: { displayText: "10000 ZenoCoin" }, type: 1 }
    ],
    headerType: 1
  }, { quoted: m })
}
handler.command = /^blackjack$/i
export default handler