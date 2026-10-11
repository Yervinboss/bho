//Plugin by Zeno

let handler = async(m, { conn, text }) => {
  if (!text) throw ` ⓘ ꜱᴄᴇɢʟɪ ᴜɴ ᴘʀᴇꜰɪꜱꜱᴏ`
  global.prefix = new RegExp('^[' + (text || global.opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')
  await m.reply(`ⓘ ɪʟ ᴘʀᴇꜰɪꜱꜱᴏ ᴅᴇʟ ʙᴏᴛ ᴇ' ꜱᴛᴀᴛᴏ ᴄᴀᴍʙɪᴀᴛᴏ ɪɴ: *${text}*`)
}
handler.help = ['ᴘʀᴇꜰɪꜱꜱᴏ'].map(v => v + ' [prefix]')
handler.tags = ['owner']
handler.command = /^(prefisso)$/i
handler.rowner = true

export default handler 