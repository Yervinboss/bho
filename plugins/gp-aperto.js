//Plugin by Zeno, Lucifero & zenobot staff

let handler = async (m, { conn, args }) => {
  let setting = { "": "not_announcement" }[args[0] || ""]
  if (setting === undefined) return
  await conn.groupSettingUpdate(m.chat, setting)
  global.logAdmin?.increment?.(m.chat, m.sender, 'open')
  conn.reply(m.chat, "ʜᴏ ᴀᴘᴇʀᴛᴏ ɪʟ ɢʀᴜᴘᴘᴏ ᴄᴏɴ ꜱᴜᴄᴄᴇꜱꜱᴏ! ᴄʜᴀᴛ ᴀᴘᴇʀᴛᴀ ᴀ ᴛᴜᴛᴛɪ.\n\n> ᴅɪɢɪᴛᴀ ''.ᴄʜɪᴜᴅɪ'' ᴘᴇʀ ᴄʜɪᴜᴅᴇʀᴇ ʟᴀ ᴄʜᴀᴛ ᴀ ꜱᴏʟɪ ᴀᴅᴍɪɴ")
}

handler.help = ["ᴀᴘᴇʀᴛᴏ/ᴀᴘʀɪ"]
handler.tags = ["admin"]
handler.command = /^(aperto|apri)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler