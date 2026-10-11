//Plugin by Zeno

import { addRpgXp, ensureRpgXp } from '../lib/rpg-xp.js'

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

let handler = async (m, { conn, command }) => {

  global.ruotaSession = global.ruotaSession || {}
  global.ruotaTimeout = global.ruotaTimeout || {}

  let user = global.db.data.users[m.sender]
  if (!user) {
    global.db.data.users[m.sender] = { bank: 0, ruotaCount: 0, ruotaLast: 0 }
    user = global.db.data.users[m.sender]
  }
  ensureRpgXp(user)

  let oggi = new Date().toDateString()
  if (user.ruotaLast !== oggi) {
    user.ruotaCount = 0
    user.ruotaLast = oggi
  }

  if (command === 'ruota') {
    const rateCheck = checkRateLimit(m.sender, 'ruota')
    if (!rateCheck.allowed) {
      return m.reply(`⏳ *Devi aspettare ${rateCheck.timeLeft} secondi* prima di giocare di nuovo alla ruota!`)
    }

    if (user.ruotaCount >= 3)
      return conn.reply(m.chat, '✖️ ʜᴀɪ ɢɪᴀ̀ ɢɪʀᴀᴛᴏ ʟᴀ ʀᴜᴏᴛᴀ 𝟹 ᴠᴏʟᴛᴇ ᴏɢɢɪ! ᴛᴏʀɴᴀ ᴅᴏᴍᴀɴɪ!', m)

    if (global.ruotaSession[m.sender])
      return conn.reply(m.chat, 'ᴄ’ᴇ̀ ɢɪᴀ̀ ᴜɴᴀ ꜱᴄᴇʟᴛᴀ ɪɴ ᴄᴏʀꜱᴏ! ʀɪꜱᴘᴏɴᴅɪ ᴄᴏɴ .ꜱɪ ᴏ .ɴᴏ', m)

    global.ruotaSession[m.sender] = true

    global.ruotaTimeout[m.sender] = setTimeout(() => {
      if (global.ruotaSession[m.sender]) {
        delete global.ruotaSession[m.sender]
        conn.reply(m.chat, '⏰ ᴛᴇᴍᴘᴏ ꜱᴄᴀᴅᴜᴛᴏ! ɢɪʀᴏ ᴀɴɴᴜʟʟᴀᴛᴏ.', m)
      }
    }, 30 * 1000) 

    return conn.reply(
      m.chat,
      `┌⋆˚｡⋆୨🌸୧⋆｡˚⋆┐
┆ 🎡 ʀᴜᴏᴛᴀ ᴅᴇʟʟᴀ ꜰᴏʀᴛᴜɴᴀ! 
┆⋆˚｡⋆୨🌸୧⋆｡˚⋆
┆ ʟᴀ ʀᴜᴏᴛᴀ ʜᴀ 𝟷𝟾 ꜱᴘɪᴄᴄʜɪ:\n┆ 𝟷𝟶 ᴠɪɴᴄᴇɴᴛɪ\n┆ (ᴍᴀx: 𝟷𝟶𝟶.𝟶𝟶𝟶 ZenoCoin)\n┆ 𝟾 ᴘᴇʀᴅᴇɴᴛɪ \n┆ (ᴍᴀx: ᴘᴇʀᴅɪᴛᴀ ᴛᴏᴛᴀʟᴇ)
┆ ᴠᴜᴏɪ ᴛᴇɴᴛᴀʀᴇ ʟᴀ ꜰᴏʀᴛᴜɴᴀ? 
┆⋆˚｡⋆୨🌸୧⋆｡˚⋆
┆ ʀɪꜱᴘᴏɴᴅɪ:
┆ .ꜱɪ ᴘᴇʀ ᴀᴄᴄᴇᴛᴛᴀʀᴇ
┆ .ɴᴏ ᴘᴇʀ ʀɪꜰɪᴜᴛᴀʀᴇ
┆⋆˚｡⋆୨🌸୧⋆｡˚⋆
┆ ⏳ʜᴀɪ 𝟹𝟶 ꜱᴇᴄᴏɴᴅɪ ᴅɪ ᴛᴇᴍᴘᴏ\n┆ ᴘᴇʀ ʀɪꜱᴘᴏɴᴅᴇʀᴇ\n┆⋆˚｡⋆୨🌸୧⋆｡˚⋆\n> ʟᴀ ʀᴜᴏᴛᴀ ꜱɪ ᴘᴜᴏ̀ ɢɪʀᴀʀᴇ ᴍᴀꜱꜱɪᴍᴏ 𝟹 ᴠᴏʟᴛᴇ ᴀʟ ɢɪᴏʀɴᴏ!\n└⋆˚｡⋆୨🌸୧⋆｡˚⋆┘`,
      m
    )
  }

  if (command === 'si') {
    if (!global.ruotaSession[m.sender])
      return conn.reply(m.chat, 'ɴᴇꜱꜱᴜɴ ɢɪʀᴏ ᴅɪ ʀᴜᴏᴛᴀ ᴀᴛᴛɪᴠᴏ!', m)

    if (global.ruotaTimeout[m.sender]) {
      clearTimeout(global.ruotaTimeout[m.sender])
      delete global.ruotaTimeout[m.sender]
    }

    delete global.ruotaSession[m.sender]

    user.ruotaCount += 1

    const premi = [
      { name: '*100 ZenoCoin*', amount: 100, weight: 20 },
      { name: '*200 ZenoCoin*', amount: 200, weight: 15 },
      { name: '*300 ZenoCoin*', amount: 300, weight: 10 },
      { name: '*400 ZenoCoin*', amount: 400, weight: 8 },
      { name: '*500 ZenoCoin*', amount: 500, weight: 5 },
      { name: '*1000 ZenoCoin*', amount: 1000, weight: 4 },
      { name: '*Raddoppia*', amount: 'double', weight: 3 },
      { name: '*5000 ZenoCoin*', amount: 5000, weight: 2 },
      { name: '*10.000 ZenoCoin*', amount: 10000, weight: 1 },
      { name: '*100.000 ZenoCoin*', amount: 100000, weight: 0.5 }
    ]

    const perdite = [
      { name: '*-100 ZenoCoin*', amount: -100, weight: 20 },
      { name: '*-200 ZenoCoin*', amount: -200, weight: 15 },
      { name: '*-300 ZenoCoin*', amount: -300, weight: 10 },
      { name: '*-400 ZenoCoin*', amount: -400, weight: 8 },
      { name: '*-500 ZenoCoin*', amount: -500, weight: 5 },
      { name: '*-1000 ZenoCoin*', amount: -1000, weight: 4 },
      { name: '*-10.000 ZenoCoin*', amount: -10000, weight: 2 },
      { name: '*PERDI TUTTO ZenoCoin*', amount: 'all', weight: 1 }
    ]

    function pick(lista) {
      const total = lista.reduce((a, b) => a + b.weight, 0)
      let rand = Math.random() * total
      for (let item of lista) {
        if (rand < item.weight) return item
        rand -= item.weight
      }
    }

    const frames = [
      "🎡 ▰▱▱▱▱",
      "🎡 ▰▰▰▱▱",
      "🎡 ▰▰▰▰▰"
    ]

    await conn.reply(m.chat, "🎡 ʟᴀ ʀᴜᴏᴛᴀ ꜱᴛᴀ ɢɪʀᴀɴᴅᴏ...", m)

    for (let f of frames) {
      await new Promise(r => setTimeout(r, 3000))
      await conn.reply(m.chat, f + "\n\n❖ ᴢᴇɴᴏʙᴏᴛ", m)
    }

    let lista = Math.random() < 0.5 ? premi : perdite
    let risultato = pick(lista)

    if (risultato.amount === 'double') user.bank *= 2
    else if (risultato.amount === 'all') user.bank = 0
    else user.bank += risultato.amount

    const xpChange = risultato.amount === 'all'
      ? -25
      : (risultato.amount === 'double' || risultato.amount > 0 ? 20 : -10)
    addRpgXp(user, xpChange)

    if (user.bank < 0) user.bank = 0

    let finalText = (risultato.amount > 0 || risultato.amount === 'double') ?
      `🏆 ᴠɪᴛᴛᴏʀɪᴀ!\nʜᴀɪ ᴠɪɴᴛᴏ: ${risultato.name}\n⚡ ZenoCoin: +${xpChange}\n💰 ꜱᴀʟᴅᴏ ʙᴀɴᴄᴀʀɪᴏ ᴀᴛᴛᴜᴀʟᴇ: *${user.bank} ZenoCoin*\nꜰᴏʀᴛᴜɴᴀᴛᴏ!` :
      `💀 ꜱᴄᴏɴꜰɪᴛᴛᴀ!\nʜᴀɪ ᴘᴇʀꜱᴏ: ${risultato.name}\n⚡ ZenoCoin: ${xpChange}\n💰 ꜱᴀʟᴅᴏ ʙᴀɴᴄᴀʀɪᴏ ᴀᴛᴛᴜᴀʟᴇ: *${user.bank} ZenoCoin*\nʀɪᴛᴇɴᴛᴀ, ꜱᴀʀᴀɪ ᴘɪᴜ̀ ꜰᴏʀᴛᴜɴᴀᴛᴏ!`

    await conn.reply(m.chat, finalText, m)
  }
}

handler.command = /^(ruota|si|no)$/i

export default handler