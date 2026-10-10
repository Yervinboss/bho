//Plugin by Zeno, Lucifero & zenobot staff

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

    if (!who) return m.reply(`ᴍᴇɴᴢɪᴏɴᴀ ʟᴀ ᴘᴇʀꜱᴏɴᴀ ᴅᴀ ꜱᴘᴀʀᴀʀᴇ 🔫`);

    const thumbnailUrl = "https://cdn.phototourl.com/free/2026-05-07-6bcb47a5-00d2-485b-9507-47b4536e15c5.jpg"; 
    const thumbnailBuffer = await (await fetch(thumbnailUrl)).buffer();
    const thumbnailText = "ꜱᴘᴀʀᴀ"; 

    let abrazo = await conn.sendMessage(m.chat, {
        text: `┄┄┄┄┄┄•‹✧›•┄┄┄┄┄┄
@${who.split('@')[0]} ꜱᴇɪ ꜱᴛᴀᴛᴏ/ᴀ ꜱᴘᴀʀᴀᴛᴏ/ᴀ ᴅᴀ @${m.sender.split('@')[0]} (ʜᴀ ᴜɴᴀ ᴍɪʀᴀ ᴅɪ ᴍᴇʀᴅᴀ)
┄┄┄┄┄┄•‹✧›•┄┄┄┄┄┄`,
        mentions: [who, m.sender],
    }, {
        quoted: {
            key: {
                participants: "0@s.whatsapp.net",
                fromMe: false,
                id: "Halo",
            },
            message: {
                locationMessage: {
                    name: thumbnailText, 
                    jpegThumbnail: thumbnailBuffer, 
                },
            },
            participant: "0@s.whatsapp.net",
        },
    });

    conn.sendMessage(m.chat, { react: { text: '', key: abrazo.key } });
};

handler.command = ['shot'];
handler.help = ['shot @ᴛᴀɢ'];
handler.tags = ['fun'];

export default handler;