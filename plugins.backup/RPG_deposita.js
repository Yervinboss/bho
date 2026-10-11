//Plugin by Zeno

const pendingDeposito = global.pendingDeposito || (global.pendingDeposito = {})

const parseDepositInput = (input, money) => {
  input = input.trim().toLowerCase()
  if (input === 'tutto') return { amount: money }
  if (input.endsWith('%')) {
    const percent = parseInt(input.replace('%', ''))
    if (isNaN(percent) || percent <= 0) return { error: 'ɪɴꜱᴇʀɪꜱᴄɪ ᴜɴ ᴘᴇʀᴄᴇɴᴛᴏ ᴠᴀʟɪᴅᴏ.' }
    return { amount: Math.floor(money * percent / 100) }
  }
  if (!isNaN(input)) {
    const value = Number(input)
    if (value <= 0) return { error: 'ʟ\'ɪᴍᴘᴏʀᴛᴏ ᴅᴇᴠᴇ ᴇꜱꜱᴇʀᴇ ᴍᴀɢɢɪᴏʀᴇ ᴅɪ 0.' }
    return { amount: value }
  }
  return { error: 'ᴀꜱꜱɪᴄᴜʀᴀᴛɪ ᴅɪ ɪɴꜱᴇʀɪʀᴇ ᴜɴ ɴᴜᴍᴇʀᴏ, 25%, 50%, 75% ᴏ ᴛᴜᴛᴛᴏ.' }
}

let handler = async (m, { conn, command, text }) => {
  let users = global.db.data.users
  const who = m.sender
  const user = users[who] || (users[who] = {})
  user.money = Number(user.money || 0)
  user.bank = Number(user.bank || 0)

  const buttons = [
    { buttonId: '.deposita 25%', buttonText: { displayText: '25%' }, type: 1 },
    { buttonId: '.deposita 50%', buttonText: { displayText: '50%' }, type: 1 },
    { buttonId: '.deposita 75%', buttonText: { displayText: '75%' }, type: 1 },
    { buttonId: '.deposita tutto', buttonText: { displayText: 'Deposita tutto' }, type: 1 }
  ]

  const totale = user.money + user.bank
  const depositoInput = text?.trim().split(/\s+/)[0].toLowerCase() || ''

  if (pendingDeposito[who] && depositoInput) {
    const totale = user.bank + user.money
    const parsed = parseDepositInput(depositoInput, user.money)
    if (parsed.error) {
      const message = `⋆˚｡⋆୨🌸୧⋆｡˚⋆ •‹❖›• ⋆˚｡⋆୨🌸୧⋆｡˚⋆\nɴᴏɴ ᴘᴜᴏɪ ᴇꜱᴇɢᴜɪʀᴇ ɪʟ ᴅᴇᴘᴏꜱɪᴛᴏ: ${parsed.error}\n\n🏦 ꜱᴏʟᴅɪ ɪɴ ʙᴀɴᴄᴀ: ${user.bank} ZenoCoin\n👛 ꜱᴏʟᴅɪ ɴᴇʟ ᴘᴏʀᴛᴀꜰᴏɢʟɪᴏ: ${user.money} ZenoCoin\n💰 ᴛᴏᴛᴀʟᴇ: ${totale} ZenoCoin\n\nꜱᴄᴇɢʟɪ ᴄᴏɴ ɪ ᴘᴜʟꜱᴀɴᴛɪ ᴏ ꜱᴄʀɪᴠɪ ʟ'ɪᴍᴘᴏʀᴛᴏ ꜱᴇɴᴢᴀ ᴘᴜɴᴛᴏ.`
      return conn.sendMessage(m.chat, { text: message, buttons, headerType: 1 }, { quoted: m })
    }

    const deposito = parsed.amount
    if (deposito > user.money) {
      const totale = user.bank + user.money
      const message = `⋆˚｡⋆୨🌸୧⋆｡˚⋆ •‹❖›• ⋆˚｡⋆୨🌸୧⋆｡˚⋆\nɴᴏɴ ʜᴀɪ ᴀʙʙᴀꜱᴛᴀɴᴢᴀ *ZenoCoin* ɴᴇʟ ᴘᴏʀᴛᴀꜰᴏɢʟɪᴏ 👛\n\n🏦 ꜱᴏʟᴅɪ ɪɴ ʙᴀɴᴄᴀ: ${user.bank} ZenoCoin\n👛 ꜱᴏʟᴅɪ ɴᴇʟ ᴘᴏʀᴛᴀꜰᴏɢʟɪᴏ: ${user.money} ZenoCoin\n💰 ᴛᴏᴛᴀʟᴇ: ${totale} ZenoCoin\n\nꜱᴄᴇɢʟɪ ᴄᴏɴ ɪ ᴘᴜʟꜱᴀɴᴛɪ ᴏ ꜱᴄʀɪᴠɪ ʟ'ɪᴍᴘᴏʀᴛᴏ ꜱᴇɴᴢᴀ ᴘᴜɴᴛᴏ.`
      return conn.sendMessage(m.chat, { text: message, buttons, headerType: 1 }, { quoted: m })
    }

    user.bank += deposito
    user.money -= deposito
    user.ultimodeposito = deposito
    if (pendingDeposito[who]?.timeout) clearTimeout(pendingDeposito[who].timeout)
    delete pendingDeposito[who]

    const testo = `⋆˚｡⋆୨🌸୧⋆｡˚⋆ •‹❖›• ⋆˚｡⋆୨🌸୧⋆｡˚⋆\nʜᴏ ᴅᴇᴘᴏꜱɪᴛᴀᴛᴏ *${deposito}* ZenoCoin ꜱᴜʟ ᴛᴜᴏ ᴄᴏɴᴛᴏ\n\n🏦 ʙᴀɴᴄᴀ: ${user.bank} ZenoCoin\n\n💰 ᴄᴏɴᴛᴀɴᴛɪ: ${user.money} ZenoCoin\n⋆˚｡⋆୨🌸୧⋆｡˚⋆ •‹❖›• ⋆˚｡⋆୨🌸୧⋆｡˚⋆`
    return conn.reply(m.chat, testo, m)
  }

  if (pendingDeposito[who]?.timeout) clearTimeout(pendingDeposito[who].timeout)
  pendingDeposito[who] = {
    chat: m.chat,
    timeout: setTimeout(() => delete pendingDeposito[who], 60000)
  }

  let message = `⋆˚｡⋆୨🌸୧⋆｡˚⋆ •‹❖›• ⋆˚｡⋆୨🌸୧⋆｡˚⋆\nǫᴜᴀɴᴛɪ *ZenoCoin* ᴠᴜᴏɪ ᴅᴇᴘᴏꜱɪᴛᴀʀᴇ?\n🏦 ꜱᴏʟᴅɪ ɪɴ ʙᴀɴᴄᴀ: ${user.bank} ZenoCoin\n👛 ꜱᴏʟᴅɪ ɴᴇʟ ᴘᴏʀᴛᴀꜰᴏɢʟɪᴏ: ${user.money} ZenoCoin\n💰 ᴛᴏᴛᴀʟᴇ: ${totale} ZenoCoin\n\nꜱᴄᴇɢʟɪ ᴄᴏɴ ɪ ᴛᴀꜱᴛɪ ǫᴜᴀ ꜱᴏᴛᴛᴏ ᴏ ꜱᴄʀɪᴠɪ ǫᴜᴀɴᴛɪ ꜱᴏʟᴅɪ ᴅᴇᴘᴏꜱɪᴛᴀʀᴇ`

  return conn.sendMessage(m.chat, { text: message, buttons, headerType: 1 }, { quoted: m })
}

handler.before = async function (m, { conn }) {
  const who = m.sender
  const pending = pendingDeposito[who]
  if (!pending) return

  const text = m.text?.trim()
  if (!text) return
  if (/^[.!\/\?#]/.test(text)) return

  const depositoInput = text.split(/\s+/)[0].toLowerCase()
  if (!/^\d+$/.test(depositoInput) && depositoInput !== 'tutto' && !/^\d+%$/.test(depositoInput)) return

  let users = global.db.data.users
  const user = users[who] || (users[who] = {})
  user.money = Number(user.money || 0)
  user.bank = Number(user.bank || 0)

  const totale = user.bank + user.money
  const parsed = parseDepositInput(depositoInput, user.money)
  if (parsed.error) {
    const message = `⋆˚｡⋆୨🌸୧⋆｡˚⋆ •‹❖›• ⋆˚｡⋆୨🌸୧⋆｡˚⋆\nᴇʀʀᴏʀᴇ: ${parsed.error}\n\n🏦 ꜱᴏʟᴅɪ ɪɴ ʙᴀɴᴄᴀ: ${user.bank} ZenoCoin\n👛 ꜱᴏʟᴅɪ ɴᴇʟ ᴘᴏʀᴛᴀꜰᴏɢʟɪᴏ: ${user.money} ZenoCoin\n💰 ᴛᴏᴛᴀʟᴇ: ${totale} ZenoCoin\n\nꜱᴄᴇɢʟɪ ᴄᴏɴ ɪ ᴘᴜʟꜱᴀɴᴛɪ ᴏ ꜱᴄʀɪᴠɪ ʟ'ɪᴍᴘᴏʀᴛᴏ ꜱᴇɴᴢᴀ ᴘᴜɴᴛᴏ.`
    await conn.sendMessage(m.chat, { text: message, buttons: [
      { buttonId: '.deposita 25%', buttonText: { displayText: '25%' }, type: 1 },
      { buttonId: '.deposita 50%', buttonText: { displayText: '50%' }, type: 1 },
      { buttonId: '.deposita 75%', buttonText: { displayText: '75%' }, type: 1 },
      { buttonId: '.deposita tutto', buttonText: { displayText: 'Deposita tutto' }, type: 1 }
    ], headerType: 1 }, { quoted: m })
    return true
  }

  const deposito = parsed.amount
  if (deposito > user.money) {
    const totale = user.bank + user.money
    const message = `⋆˚｡⋆୨🌸୧⋆｡˚⋆ •‹❖›• ⋆˚｡⋆୨🌸୧⋆｡˚⋆\nɴᴏɴ ʜᴀɪ ᴀʙʙᴀꜱᴛᴀɴᴢᴀ ꜱᴏʟᴅɪ ɴᴇʟ ᴘᴏʀᴛᴀꜰᴏɢʟɪᴏ 👛\n\n🏦 ꜱᴏʟᴅɪ ɪɴ ʙᴀɴᴄᴀ: ${user.bank} ZenoCoin\n👛 ꜱᴏʟᴅɪ ɴᴇʟ ᴘᴏʀᴛᴀꜰᴏɢʟɪᴏ: ${user.money} ZenoCoin\n💰 ᴛᴏᴛᴀʟᴇ: ${totale} ZenoCoin\n\nꜱᴄᴇɢʟɪ ᴄᴏɴ ɪ ᴘᴜʟꜱᴀɴᴛɪ ᴏ ꜱᴄʀɪᴠɪ ʟ'ɪᴍᴘᴏʀᴛᴏ ꜱᴇɴᴢᴀ ᴘᴜɴᴛᴏ.`
    await conn.sendMessage(m.chat, { text: message, buttons: [
      { buttonId: '.deposita 25%', buttonText: { displayText: '25%' }, type: 1 },
      { buttonId: '.deposita 50%', buttonText: { displayText: '50%' }, type: 1 },
      { buttonId: '.deposita 75%', buttonText: { displayText: '75%' }, type: 1 },
      { buttonId: '.deposita tutto', buttonText: { displayText: 'Deposita tutto' }, type: 1 }
    ], headerType: 1 }, { quoted: m })
    return true
  }

  user.bank += deposito
  user.money -= deposito
  user.ultimodeposito = deposito
  if (pending.timeout) clearTimeout(pending.timeout)
  delete pendingDeposito[who]

  const testo = `⋆˚｡⋆୨🌸୧⋆｡˚⋆ •‹❖›• ⋆˚｡⋆୨🌸୧⋆｡˚⋆\nʜᴏ ᴅᴇᴘᴏꜱɪᴛᴀᴛᴏ *${deposito}* ZenoCoin ꜱᴜʟ ᴛᴜᴏ ᴄᴏɴᴛᴏ\n\n🏦 ʙᴀɴᴄᴀ: ${user.bank} ZenoCoin\n\n💰 ᴄᴏɴᴛᴀɴᴛɪ: ${user.money} ZenoCoin\n⋆˚｡⋆୨🌸୧⋆｡˚⋆ •‹❖›• ⋆˚｡⋆୨🌸୧⋆｡˚⋆`
  await conn.reply(m.chat, testo, m)
  return true
}

handler.command = /^(deposita|deposit)$/i
export default handler