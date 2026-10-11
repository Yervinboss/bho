//Plugin by Zeno

let handler = async (m, { conn, isAdmin, isBotAdmin, usedPrefix }) => {
  if (!m.isGroup) return m.reply("✖️ ᴄᴏᴍᴀɴᴅᴏ ᴜᴛɪʟɪᴢᴢᴀʙɪʟᴇ ꜱᴏʟᴏ ꜱᴜɪ ɢʀᴜᴘᴘɪ.")
  if (!isAdmin) return m.reply("👑 ᴄᴏᴍᴀɴᴅᴏ ᴅɪꜱᴘᴏɴɪʙɪʟᴇ ꜱᴏʟᴏ ᴘᴇʀ ᴀᴅᴍɪɴ.")
  if (!isBotAdmin) return m.reply("🤖 ᴅᴇᴠᴏ ᴇꜱꜱᴇʀᴇ ᴀᴅᴍɪɴ ᴘᴇʀ ꜰᴜɴᴢɪᴏɴᴀʀᴇ!.")

  const pulsanti = [
    ['🧊 𝟷 ᴍɪɴᴜᴛᴏ', `${usedPrefix}freeze_1`],
    ['🧊 𝟻 ᴍɪɴᴜᴛɪ', `${usedPrefix}freeze_5`],
    ['🧊 𝟷𝟶 ᴍɪɴᴜᴛɪ', `${usedPrefix}freeze_10`]
  ]

  await conn.sendButton(
    m.chat,
    `🚨 ꜰʀᴇᴇᴢᴇ❖ ᴢᴇɴᴏʙᴏᴛ\n\nꜱᴄᴇɢʟɪ ᴘᴇʀ ǫᴜᴀɴᴛᴏ ᴛᴇᴍᴘᴏ ᴄʜɪᴜᴅᴇʀᴇ ɪʟ ɢʀᴜᴘᴘᴏ:`,
    `> ᴢᴇɴᴏʙᴏᴛ`,
    null,
    pulsanti,
    m
  )
}

handler.command = /^freezegp$/i
handler.group = true
handler.admin = true
export default handler