//Plugin by Zeno

global.estrazione = global.estrazione || {
  players: {},
  active: false,
  endTime: 0
}

global.casinoRateLimit = global.casinoRateLimit || {}

const checkRateLimit = (userId, commandName) => {
  const key = `${userId}_${commandName}`
  const now = Date.now()
  const lastUse = global.casinoRateLimit[key]
  
  if (lastUse && now - lastUse < 120000) {
    const timeLeft = Math.ceil((120000 - (now - lastUse)) / 1000)
    return { allowed: false, timeLeft }
  }
  
  global.casinoRateLimit[key] = now
  return { allowed: true }
}

let handler = async (m, { conn, args, command }) => {

  let user = global.db.data.users[m.sender]
  if (!user) return

  if (command === "estrazione") {
    const rateCheck = checkRateLimit(m.sender, 'estrazione')
    if (!rateCheck.allowed) {
      return m.reply(`⏳ *Devi aspettare ${rateCheck.timeLeft} secondi* prima di giocare di nuovo all'estrazione!`)
    }

    if (global.estrazione.active)
      return m.reply("⏳ ᴄ'ᴇ̀ ɢɪᴀ̀ ᴜɴ'ᴇꜱᴛʀᴀᴢɪᴏɴᴇ ɪɴ ᴄᴏʀꜱᴏ")

    global.estrazione = {
      players: {},
      active: true,
      endTime: Date.now() + 60 * 1000
    }

    let money = user.money || 0
    const bet = (x) => money >= x ? `.estrazionegioca ${x}` : `no_${x}`

    await conn.sendMessage(m.chat, {
      text:
`┌⋆˚｡⋆୨🌸୧⋆｡˚⋆🎯 ᴇꜱᴛʀᴀᴢɪᴏɴᴇ ʟɪᴠᴇ ⋆˚｡⋆୨🌸୧⋆｡˚⋆┐
┆ 💰 ᴘᴏʀᴛᴀꜰᴏɢʟɪᴏ: *${money} ZenoCoin*
┆
┆ ⏳ Tempo: *60 secondi*
┆ 🎲 Scegli *1 numero (1–100)*
┆ 🏆 3 numeri vincenti
└⋆˚｡⋆୨🌸୧⋆｡˚⋆┘`,
      buttons: [
        { buttonId: bet(100), buttonText: { displayText: "💵 100 ZenoCoin" }, type: 1 },
        { buttonId: bet(200), buttonText: { displayText: "💵 200 ZenoCoin" }, type: 1 },
        { buttonId: bet(500), buttonText: { displayText: "💰 500 ZenoCoin" }, type: 1 },
        { buttonId: bet(1000), buttonText: { displayText: "💰 1000 ZenoCoin" }, type: 1 },
        { buttonId: bet(10000), buttonText: { displayText: "💎 10000 ZenoCoin" }, type: 1 }
      ],
      headerType: 1
    }, { quoted: m })

    setTimeout(async () => {

      let players = global.estrazione.players
      let list = Object.entries(players).filter(([_, v]) => v.number !== null)

      if (!list.length) {
        global.estrazione.active = false
        return conn.sendMessage(m.chat, {
          text:
`┌┄💀 ᴇꜱᴛʀᴀᴢɪᴏɴᴇ ᴀɴɴᴜʟʟᴀᴛᴀ ┄┐
┆ Nessuno ha partecipato...
┆
┆ Che tristezza 😐
└⋆˚｡⋆୨🌸୧⋆｡˚⋆┘`
        })
      }

      await conn.sendMessage(m.chat, {
        text: "🎯 Estrazione in corso..."
      })

      await new Promise(r => setTimeout(r, 2000))

      let winNumbers = []
      while (winNumbers.length < 3) {
        let r = Math.floor(Math.random() * 100) + 1
        if (!winNumbers.includes(r)) winNumbers.push(r)
      }

      let winners = list.filter(([_, v]) => winNumbers.includes(v.number))
      let pool = list.reduce((acc, [_, v]) => acc + v.bet, 0)

      let text =
`┌⋆˚｡⋆୨🌸୧⋆｡˚⋆🎯 ʀɪꜱᴜʟᴛᴀᴛᴏ ⋆˚｡⋆୨🌸୧⋆｡˚⋆┐
┆ 🎲 Numeri usciti:
┆ ➤ ${winNumbers.join(" • ")}
┆
┆ 💰 Montepremi:
┆ ➤ *${pool} ZenoCoin*
└⋆˚｡⋆୨🌸୧⋆｡˚⋆┘\n\n`

      if (winners.length) {

        let prize = Math.floor(pool / winners.length)

        winners.forEach(([jid]) => {
          global.db.data.users[jid].money += prize
        })

        text += `🏆 ᴠɪɴᴄɪᴛᴏʀɪ\n`
        winners.forEach(([jid]) => {
          text += `➤ @${jid.split("@")[0]}\n`
        })

        text += `\n💎 Premio: *${prize} ZenoCoin* ciascuno`

      } else {
        text += `💀 Nessun vincitore...\n\nRiprova, magari oggi sei meno sfortunato 😈`
      }

      global.estrazione = {
        players: {},
        active: false,
        endTime: 0
      }

      await conn.sendMessage(m.chat, {
        text,
        mentions: winners.map(w => w[0]),
        buttons: [
          { buttonId: ".estrazione", buttonText: { displayText: "🎯 Nuova estrazione" }, type: 1 }
        ],
        headerType: 1
      })

    }, 60000)
  }

  if (command === "estrazionegioca") {

    if (!global.estrazione.active)
      return m.reply("✖️ Nessuna estrazione attiva")

    let bet = parseInt(args[0])
    if (!bet || bet < 50) return m.reply("💸 Puntata minima 50 ZenoCoin")
    if (user.money < bet) return m.reply(`💸 Devi avere almeno ${bet} ZenoCoin`)

    global.estrazione.players[m.sender] = {
      bet,
      number: null
    }

    user.money -= bet

    return m.reply(
`┌┄🎯 ᴘᴀʀᴛᴇᴄɪᴘᴀᴢɪᴏɴᴇ ┄┐
┆ 💰 Puntata: *${bet} ZenoCoin*
┆
┆ ✍️ Scrivi:
┆ *.scegli numero*
┆
┆ Esempio:
┆ *.scegli 77*
└⋆˚｡⋆୨🌸୧⋆｡˚⋆┘`)
  }

  if (command === "scegli") {

    if (!global.estrazione.active)
      return m.reply("✖️ Nessuna estrazione attiva")

    let game = global.estrazione.players[m.sender]
    if (!game) return m.reply("✖️ Non stai partecipando")

    if (game.number !== null)
      return m.reply("✖️ Hai già scelto un numero")

    let num = parseInt(args[0])
    if (!num || num < 1 || num > 100)
      return m.reply("⚠️ Numero valido: 1–100")

    let already = Object.values(global.estrazione.players)
      .find(p => p.number === num)

    if (already)
      return m.reply("✖️ Numero già preso")

    game.number = num

    return m.reply(
`┌┄✔️ ɴᴜᴍᴇʀᴏ ꜱᴄᴇʟᴛᴏ ┄┐
┆ 🎯 Numero: *${num}*
┆
┆ ⏳ Attendi l’estrazione...
└⋆˚｡⋆୨🌸୧⋆｡˚⋆┘`)
  }
}

handler.command = /^(estrazione|estrazionegioca|scegli)$/i
export default handler