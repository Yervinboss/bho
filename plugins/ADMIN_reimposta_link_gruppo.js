//Plugin by Zeno, Lucifero & zenobot staff

let handler = async(m, { conn }) => {
m.reply(`ʟɪɴᴋ ʀᴇɪᴍᴘᴏꜱᴛᴀᴛᴏ\n\n▹ ɴᴜᴏᴠᴏ ʟɪɴᴋ: ${'https://chat.whatsapp.com/' + await conn.groupRevokeInvite(m.chat)}`)}
handler.command = ['reimposta', 'revoke']
handler.help = ['.ʀᴇɪᴍᴘᴏꜱᴛᴀ']
handler.tags = ['admin']
handler.botAdmin = true
handler.admin = true
handler.group = true
export default handler
