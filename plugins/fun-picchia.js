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

    if (!who) return m.reply(`ᴍᴇɴᴢɪᴏɴᴀ ʟᴀ ᴘᴇʀꜱᴏɴᴀ ᴅᴀ ᴘɪᴄᴄʜɪᴀʀᴇ 👊🏻`);

    const thumbnailUrl = "https://cdn.phototourl.com/free/2026-05-07-dc18e3f0-5cbf-4675-ad2b-0d953837d05e.jpg"; 
    const thumbnailBuffer = await (await fetch(thumbnailUrl)).buffer();
    const thumbnailText = "ᴘɪᴄᴄʜɪᴀ"; 

    let abrazo = await conn.sendMessage(m.chat, {
        text: `┄┄┄┄┄┄•‹✧›•┄┄┄┄┄┄
@${who.split('@')[0]} ʜᴀɪ ʀɪᴄᴇᴠᴜᴛᴏ ᴜɴ ᴘᴜɢɴᴏ ɪɴ ꜰᴀᴄᴄɪᴀ ᴅᴀ @${m.sender.split('@')[0]} 
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

handler.command = ['picchia'];
handler.help = ['picchia @ᴛᴀɢ'];
handler.tags = ['fun'];

export default handler;