//Plugin by Zeno, Lucifero & zenobot staff

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

let pesca = () => Math.floor(Math.random() * 10) + 1

let handler = async (m, { conn, args, command }) => {

  global.blackjack = global.blackjack || {}

  let user = global.db.data.users[m.sender]

  if (command === "blackjackplay") {
    const rateCheck = checkRateLimit(m.sender, 'blackjack')
    if (!rateCheck.allowed) {
      return m.reply(`⏳ *Devi aspettare ${rateCheck.timeLeft} secondi* prima di giocare di nuovo a blackjack!`)
    }

    let bet = parseInt(args[0])
    if (!bet || bet < 50) return m.reply("💸 Puntata minima 50 ZenoCoin")
    if (user.money < bet) return m.reply(`💸 Devi avere almeno ${bet} ZenoCoin`)

    global.blackjack[m.sender] = {
      player: [pesca(), pesca()],
      dealer: [pesca(), pesca()],
      bet
    }

    let g = global.blackjack[m.sender]
    let sum = g.player.reduce((a,b)=>a+b,0)

    return conn.sendMessage(m.chat, {
      text:
`┌┄🃏 ʙʟᴀᴄᴋᴊᴀᴄᴋ ┄┐
┆ 🧑 Tu: ${g.player.join(" + ")} = ${sum}
┆ 🤖 Banco: ${g.dealer[0]} + ?
┆
┆ 🎮 Scegli:
└┄┄┄┄┄┄┘`,
      buttons: [
        { buttonId: ".pesco", buttonText: { displayText: "🃏 Pesco" }, type: 1 },
        { buttonId: ".sto", buttonText: { displayText: "✋ Sto" }, type: 1 }
      ],
      headerType: 1
    }, { quoted: m })
  }

  let g = global.blackjack[m.sender]
  if (!g) return m.reply("✖️ Nessuna partita")

  if (command === "pesco") {
    g.player.push(pesca())
    let sum = g.player.reduce((a,b)=>a+b,0)

    if (sum > 21) {
      user.money -= g.bet
      delete global.blackjack[m.sender]

      return conn.sendMessage(m.chat, {
        text: `💀 Hai sballato (${sum})\n-${g.bet} ZenoCoin`,
        buttons: [
          { buttonId: ".blackjackplay", buttonText: { displayText: "🔁 Gioca di nuovo" }, type: 1 },
          { buttonId: ".casino", buttonText: { displayText: "🎰 Torna al casinò" }, type: 1 }
        ],
        headerType: 1
      }, { quoted: m })
    }

    return conn.sendMessage(m.chat, {
      text: `🃏 Carte: ${g.player.join(", ")} = ${sum}`,
      buttons: [
        { buttonId: ".pesco", buttonText: { displayText: "🃏 Pesco" }, type: 1 },
        { buttonId: ".sto", buttonText: { displayText: "✋ Sto" }, type: 1 }
      ],
      headerType: 1
    }, { quoted: m })
  }

  if (command === "sto") {
    let sumP = g.player.reduce((a,b)=>a+b,0)
    let sumD = g.dealer.reduce((a,b)=>a+b,0)

    while (sumD < 17) {
      g.dealer.push(pesca())
      sumD = g.dealer.reduce((a,b)=>a+b,0)
    }

    let msg =
`┌┄🃏 ʙʟᴀᴄᴋᴊᴀᴄᴋ ┄┐
┆ 🧑 Tu: ${sumP}
┆ 🤖 Banco: ${sumD}
┆
`

    if (sumD > 21 || sumP > sumD) {
      user.money += g.bet
      msg += `┆ 🏆 VITTORIA +${g.bet} ZenoCoin\n`
    } else if (sumP < sumD) {
      user.money -= g.bet
      msg += `┆ 💀 SCONFITTA -${g.bet} ZenoCoin\n`
    } else {
      msg += `┆ 😐 Pareggio\n`
    }

    msg += `┆ 💼 Saldo: ${user.money} ZenoCoin\n└┄┄┄┄┄┄┘`

    delete global.blackjack[m.sender]

    return conn.sendMessage(m.chat, {
      text: msg,
      buttons: [
        { buttonId: ".blackjack", buttonText: { displayText: "🔁 Gioca di nuovo" }, type: 1 },
        { buttonId: ".casino", buttonText: { displayText: "🎰 Torna al casinò" }, type: 1 }
      ],
      headerType: 1
    }, { quoted: m })
  }
}

handler.command = /^(blackjackplay|pesco|sto)$/i
export default handler