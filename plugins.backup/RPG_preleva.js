//Plugin by Zeno

const pendingPrelievo = global.pendingPrelievo || (global.pendingPrelievo = {})

const parsePrelievoInput = (input, bank) => {
  input = input.trim().toLowerCase()
  if (input === 'tutto') return { amount: bank }
  if (input.endsWith('%')) {
    const percent = parseInt(input.replace('%', ''))
    if (isNaN(percent) || percent <= 0) return { error: 'ɪɴꜱᴇʀɪꜱᴄɪ ᴜɴ ᴘᴇʀᴄᴇɴᴛᴏ ᴠᴀʟɪᴅᴏ.' }
    return { amount: Math.floor(bank * percent / 100) }
  }
  if (!isNaN(input)) {
    const value = Number(input)
    if (value <= 0) return { error: 'ʟ\'ɪᴍᴘᴏʀᴛᴏ ᴅᴇᴠᴇ ᴇꜱꜱᴇʀᴇ ᴍᴀɢɢɪᴏʀᴇ ᴅɪ 0.' }
    return { amount: value }
  }
  return { error: 'ᴀꜱꜱɪᴄᴜʀᴀᴛɪ ᴅɪ ɪɴꜱᴇʀɪʀᴇ ᴜɴ ɴᴜᴍᴇʀᴏ, 25%, 50%, 75% ᴏ ᴛᴜᴛᴛᴏ.' }
}

let handler = async (m, { conn, text }) => {
  let users = global.db.data.users
  const who = m.sender

  if (!users[who]) users[who] = {}

  users[who].bank = Number(users[who].bank) || 0
  users[who].money = Number(users[who].money) || 0

  const buttons = [
    { buttonId: '.preleva 25%', buttonText: { displayText: '25%' }, type: 1 },
    { buttonId: '.preleva 50%', buttonText: { displayText: '50%' }, type: 1 },
    { buttonId: '.preleva 75%', buttonText: { displayText: '75%' }, type: 1 },
    { buttonId: '.preleva tutto', buttonText: { displayText: 'Preleva tutto' }, type: 1 }
  ]

  const totale = users[who].bank + users[who].money
  const prelievoInput = text?.trim().split(/\s+/)[0].toLowerCase() || ''

  if (pendingPrelievo[who] && prelievoInput) {
    const parsed = parsePrelievoInput(prelievoInput, users[who].bank)
    if (parsed.error) {
      const message = `⋆˚｡⋆୨🌸୧⋆｡˚⋆ •‹❖›• ⋆˚｡⋆୨🌸୧⋆｡˚⋆\nᴇʀʀᴏʀᴇ: ${parsed.error}\n\nꜱᴄᴇɢʟɪ ᴄᴏɴ ɪ ᴘᴜʟꜱᴀɴᴛɪ ᴏ ꜱᴄʀɪᴠɪ ʟ\'ɪᴍᴘᴏʀᴛᴏ ꜱᴇɴᴢᴀ ᴘᴜɴᴛᴏ.`
      return conn.sendMessage(m.chat, { text: message, buttons, headerType: 1 }, { quoted: m })
    }

    const prelievo = parsed.amount
    if (prelievo > users[who].bank) {
      const message = `⋆˚｡⋆୨🌸୧⋆｡˚⋆ •‹❖›• ⋆˚｡⋆୨🌸୧⋆｡˚⋆\n🏦 ɴᴏɴ ʜᴀɪ ᴀʙʙᴀꜱᴛᴀɴᴢᴀ *ZenoCoin* ɪɴ ʙᴀɴᴄᴀ 👛\n\nꜱᴄᴇɢʟɪ ᴄᴏɴ ɪ ᴘᴜʟꜱᴀɴᴛɪ ᴏ ꜱᴄʀɪᴠɪ ʟ\'ɪᴍᴘᴏʀᴛᴏ ꜱᴇɴᴢᴀ ᴘᴜɴᴛᴏ.`
      return conn.sendMessage(m.chat, { text: message, buttons, headerType: 1 }, { quoted: m })
    }

    users[who].bank -= prelievo
    users[who].money += prelievo
    users[who].ultimoprelievo = prelievo
    if (pendingPrelievo[who]?.timeout) clearTimeout(pendingPrelievo[who].timeout)
    delete pendingPrelievo[who]

    let testo = `⋆˚｡⋆୨🌸୧⋆｡˚⋆ •‹❖›• ⋆˚｡⋆୨🌸୧⋆｡˚⋆\nʜᴀɪ ᴘʀᴇʟᴇᴠᴀᴛᴏ *${prelievo}* ZenoCoin\n\n💰ᴄᴏɴᴛᴀɴᴛɪ: ${users[who].money} ZenoCoin\n🏦 ʙᴀɴᴄᴀ: ${users[who].bank} ZenoCoin\n⋆˚｡⋆୨🌸୧⋆｡˚⋆ •‹❖›• ⋆˚｡⋆୨🌸୧⋆｡˚⋆`
    return conn.reply(m.chat, testo, m)
  }

  if (pendingPrelievo[who]?.timeout) clearTimeout(pendingPrelievo[who].timeout)
  pendingPrelievo[who] = {
    chat: m.chat,
    timeout: setTimeout(() => delete pendingPrelievo[who], 60000)
  }

  let message = `⋆˚｡⋆୨🌸୧⋆｡˚⋆ •‹❖›• ⋆˚｡⋆୨🌸୧⋆｡˚⋆\nǫᴜᴀɴᴛɪ *ZenoCoin* ᴠᴜᴏɪ ᴘʀᴇʟᴇᴠᴀʀᴇ?\nꜱᴏʟᴅɪ ɪɴ ʙᴀɴᴄᴀ: ${users[who].bank} ZenoCoin\nᴛᴏᴛᴀʟᴇ: ${totale} ZenoCoin\n\nꜱᴄᴇɢʟɪ ᴄᴏɴ ɪ ᴘᴜʟꜱᴀɴᴛɪ ᴏ ꜱᴄʀɪᴠɪ ǫᴜᴀɴᴛɪ ꜱᴏʟᴅɪ ᴘʀᴇʟᴇᴠᴀʀᴇ ꜱᴇɴᴢᴀ ᴘᴜɴᴛᴏ.`

  return conn.sendMessage(m.chat, { text: message, buttons, headerType: 1 }, { quoted: m })
}

handler.before = async function (m, { conn }) {
  const who = m.sender
  const pending = pendingPrelievo[who]
  if (!pending) return

  const text = m.text?.trim()
  if (!text) return
  if (/^[.!\/#?]/.test(text)) return

  const prelievoInput = text.split(/\s+/)[0].toLowerCase()
  if (!/^\d+$/.test(prelievoInput) && prelievoInput !== 'tutto' && !/^\d+%$/.test(prelievoInput)) return

  let users = global.db.data.users
  if (!users[who]) users[who] = {}
  users[who].bank = Number(users[who].bank) || 0
  users[who].money = Number(users[who].money) || 0

  const parsed = parsePrelievoInput(prelievoInput, users[who].bank)
  if (parsed.error) {
    const message = `ᴇʀʀᴏʀᴇ: ${parsed.error}\n\nꜱᴄᴇɢʟɪ ᴄᴏɴ ɪ ᴘᴜʟꜱᴀɴᴛɪ ᴏ ꜱᴄʀɪᴠɪ ʟ\'ɪᴍᴘᴏʀᴛᴏ ꜱᴇɴᴢᴀ ᴘᴜɴᴛᴏ.`
    await conn.sendMessage(m.chat, { text: message, buttons: [
      { buttonId: '.preleva 25%', buttonText: { displayText: '25%' }, type: 1 },
      { buttonId: '.preleva 50%', buttonText: { displayText: '50%' }, type: 1 },
      { buttonId: '.preleva 75%', buttonText: { displayText: '75%' }, type: 1 },
      { buttonId: '.preleva tutto', buttonText: { displayText: 'Preleva tutto' }, type: 1 }
    ], headerType: 1 }, { quoted: m })
    return true
  }

  const prelievo = parsed.amount
  if (prelievo > users[who].bank) {
    const message = `ɴᴏɴ ʜᴀɪ ᴀʙʙᴀꜱᴛᴀɴᴢᴀ ꜱᴏʟᴅɪ ɪɴ *ZenoCoin* 👛\n\nꜱᴄᴇɢʟɪ ᴄᴏɴ ɪ ᴘᴜʟꜱᴀɴᴛɪ ᴏ ꜱᴄʀɪᴠɪ ʟ\'ɪᴍᴘᴏʀᴛᴏ ꜱᴇɴᴢᴀ ᴘᴜɴᴛᴏ.`
    await conn.sendMessage(m.chat, { text: message, buttons: [
      { buttonId: '.preleva 25%', buttonText: { displayText: '25%' }, type: 1 },
      { buttonId: '.preleva 50%', buttonText: { displayText: '50%' }, type: 1 },
      { buttonId: '.preleva 75%', buttonText: { displayText: '75%' }, type: 1 },
      { buttonId: '.preleva tutto', buttonText: { displayText: 'Preleva tutto' }, type: 1 }
    ], headerType: 1 }, { quoted: m })
    return true
  }

  users[who].bank -= prelievo
  users[who].money += prelievo
  users[who].ultimoprelievo = prelievo
  if (pending.timeout) clearTimeout(pending.timeout)
  delete pendingPrelievo[who]

  const testo = `⋆˚｡⋆୨🌸୧⋆｡˚⋆ •‹❖›• ⋆˚｡⋆୨🌸୧⋆｡˚⋆\nʜᴀɪ ᴘʀᴇʟᴇᴠᴀᴛᴏ *${prelievo}* ZenoCoin\n\n💰ᴄᴏɴᴛᴀɴᴛɪ: ${users[who].money} ZenoCoin\n🏦 ʙᴀɴᴄᴀ: ${users[who].bank} ZenoCoin\n⋆˚｡⋆୨🌸୧⋆｡˚⋆ •‹❖›• ⋆˚｡⋆୨🌸୧⋆｡˚⋆`
  await conn.reply(m.chat, testo, m)
  return true
}

handler.command = /^(preleva|prelievo|ritira)$/i
handler.tags = ['RPG']

export default handler
