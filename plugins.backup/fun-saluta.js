//Plugin by Zeno

let handler = async (m, { conn, usedPrefix, command, text }) => {
    let who;

    if (m.isGroup) {
        who = m.mentionedJid[0] 
            ? m.mentionedJid[0] 
            : m.quoted ? m.quoted.sender 
            : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' 
            : false;
    } else {
        who = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat;
    }

    let user = global.db.data.users[who];
    if (!who) return m.reply(`ᴍᴇɴᴢɪᴏɴᴀ ʟᴀ ᴘᴇʀꜱᴏɴᴀ ᴅᴀ ꜱᴀʟᴜᴛᴀʀᴇ 👋`);

    let abrazo = await conn.reply(m.chat, `ʜᴇʏ ᴄɪᴀᴏ @${who.split('@')[0]}, ꜰɪɴɪᴛᴏ ᴅɪ ꜰᴀʀᴛɪ ɪ ᴄᴀᴢᴢɪ ᴛᴜᴏɪ? ꜱᴄʀɪᴠɪ ꜱᴜʟ ɢʀᴜᴘᴘᴏ, ᴀʟᴛʀɪᴍᴇɴᴛɪ @${m.sender.split('@')[0]} ꜱɪ ᴏꜰꜰᴇɴᴅᴇ!! 😡`, m, { mentions: [who, m.sender] });

    conn.sendMessage(m.chat, { react: { text: '', key: abrazo.key } });
};

handler.command = ['saluta'];
handler.help = ['saluta @ᴛᴀɢ'];
handler.tags = ['fun'];
export default handler;