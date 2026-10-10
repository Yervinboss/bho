//Plugin by Zeno, Lucifero & zenobot staff

let handler = async (m, { conn }) => {
  const mention = m.mentionedJid ? m.mentionedJid[0] : (m.quoted ? m.quoted.sender : null)
  const who = mention

  if (!who) throw "✖️ ᴛᴀɢɢᴀ ʟᴀ ᴘᴇʀꜱᴏɴᴀ ᴀ ᴄᴜɪ ʀᴜʙᴀʀᴇ ɪ ꜱᴏʟᴅɪ!"

  if (who === m.sender) throw "✖️ ɴᴏɴ ᴘᴜᴏɪ ʀᴜʙᴀʀᴇ ᴀ ᴛᴇ ꜱᴛᴇꜱꜱᴏ!"

  const users = global.db.data.users

  if (!users[who]) {
    users[who] = { money: 0, bank: 0, rubati: 0, furti: 0, datafurto: 'Nessuno', warn: 0 }
  }

  if (!users[m.sender]) {
    users[m.sender] = { money: 0, bank: 0, rubati: 0, furti: 0, datafurto: 'Nessuno', warn: 0 }
  }

  const uSender = users[m.sender]
  const uVictim = users[who]

  uSender.furti = uSender.furti || 0
  uSender.rubati = uSender.rubati || 0
  uSender.datafurto = uSender.datafurto || 'Nessuno'
  uSender.money = uSender.money || 0
  uSender.bank = uSender.bank || 0
  uVictim.money = uVictim.money || 0
  uVictim.bank = uVictim.bank || 0

  const senderTotalFunds = uSender.bank + uSender.money
  if (senderTotalFunds < 1000)
    throw "🏦 ᴅᴇᴠɪ ᴀᴠᴇʀᴇ ᴀʟᴍᴇɴᴏ *1000 ZenoCoin* ɪɴ ʙᴀɴᴄᴀ ᴏ ɴᴇʟ ᴘᴏʀᴛᴀꜰᴏɢʟɪᴏ ᴘᴇʀ ꜰᴀʀᴇ ᴜɴᴀ ʀᴀᴘɪɴᴀ!"

  const payFine = (amount) => {
    let usedBank = Math.min(uSender.bank, amount)
    uSender.bank -= usedBank
    let remaining = amount - usedBank
    let usedMoney = 0
    if (remaining > 0) {
      usedMoney = Math.min(uSender.money, remaining)
      uSender.money -= usedMoney
      remaining -= usedMoney
    }
    return { usedBank, usedMoney, remaining }
  }

  const formatFineSource = ({ usedBank, usedMoney }) => {
    const parts = []
    if (usedBank > 0) parts.push(`*${usedBank} ZenoCoin* dalla banca`)
    if (usedMoney > 0) parts.push(`*${usedMoney} ZenoCoin* dal portafoglio`)
    return parts.join(' e ')
  }

  if (uVictim.money <= 0) {
    let multa = Math.floor(Math.random() * 60) + 40
    const paid = payFine(multa)
    uSender.warn = (uSender.warn || 0) + 1
    const sourceText = formatFineSource(paid) || '*0 ZenoCoin*'

    return conn.reply(
      m.chat,
      `🚨 @${who.split('@')[0]} ɴᴏɴ ʜᴀ ꜱᴏʟᴅɪ!\nꜱᴇɪ ꜱᴛᴀᴛᴏ ᴍᴜʟᴛᴀᴛᴏ ᴅɪ *${multa} ZenoCoin* (${sourceText})`,
      null,
      { mentions: [who] }
    )
  }

  let percentuale = Math.floor(Math.random() * 21) + 5

  const fallisce = Math.random() * 100 < 40

  let testo = ""

  if (fallisce) {
    let multa = Math.floor(Math.random() * 50) + 20
    const paid = payFine(multa)
    uSender.warn = (uSender.warn || 0) + 1
    const sourceText = formatFineSource(paid) || '*0 ZenoCoin*'

    testo = `🚨 ꜱᴇɪ ꜱᴛᴀᴛᴏ ꜱᴄᴏᴘᴇʀᴛᴏ!\nʟᴀ ᴘᴏʟɪᴢɪᴀ ᴛɪ ʜᴀ ᴍᴜʟᴛᴀᴛᴏ ᴅɪ *${multa} ZenoCoin* (${sourceText})`
  } else {
    let rubato = Math.floor((uVictim.money * percentuale) / 100)
    rubato = Math.min(rubato, uVictim.money)

    uVictim.money -= rubato
    uSender.money += rubato

    uSender.furti += 1
    uSender.rubati += rubato
    uSender.datafurto = new Date().toLocaleString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })

    testo = `💰 ꜱᴜᴄᴄᴇꜱꜱᴏ!\nʜᴀɪ ʀᴜʙᴀᴛᴏ *${rubato} ZenoCoin* (${percentuale}%) ᴀ @${who.split('@')[0]}`
  }

  conn.reply(m.chat, testo, null, { mentions: [who] })
}

handler.command = /^ruba$/i
export default handler