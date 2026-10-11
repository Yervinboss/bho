//Plugin by Zeno

let handler = async (m, { conn, isOwner, participants }) => {
if (!m.isGroup) return m.reply('Questo comando può essere usato solo nei gruppi.')

let groupMembers = new Set((participants || []).map(user => user.id))
let users = Object.entries(global.db.data.users)
	.filter(([jid, user]) => user.muto && groupMembers.has(jid))
let caption = `
┌〔ᴜᴛᴇɴᴛɪ ᴍᴜᴛᴀᴛɪ 🔇〕
├ ᴛᴏᴛᴀʟᴇ : ${users.length} ${users ? '\n' + users.map(([jid], i) => `
├ ${isOwner ? '@' + jid.split`@`[0] : jid}`.trim()).join('\n') : '├'}
└⋆˚｡⋆୨🌸୧⋆｡˚⋆


`.trim()
handler.help = ['ʟɪꜱᴛᴀᴍᴜᴛɪ'];
handler.tags = ['owner'];
m.reply(caption, null, {mentions: conn.parseMention(caption)})}
handler.command = /^listamuti?$/i
handler.rowner = true
export default handler
