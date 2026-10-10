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


    if (!who) return m.reply(`ᴍᴇɴᴢɪᴏɴᴀ ʟᴀ ᴘᴇʀꜱᴏɴᴀ ᴅᴀ ᴀʙʙʀᴀᴄᴄɪᴀʀᴇ 🫂`);


    const thumbnailUrl = "https://files.catbox.moe/gg4nzm.png"; // URL dell'immagine in miniatura
    const thumbnailBuffer = await (await fetch(thumbnailUrl)).buffer();
    const thumbnailText = "ᴀʙʙʀᴀᴄᴄɪᴏ"; // Testo miniatura compatibile


    let abrazo = await conn.sendMessage(m.chat, {
        text: `┄┄┄┄┄┄•‹✧›•┄┄┄┄┄┄
@${who.split('@')[0]} ꜱᴇɪ ꜱᴛᴀᴛᴏ/ᴀ ᴀʙʙʀᴀᴄᴄɪᴀᴛᴏ/ᴀ ᴅᴀ @${m.sender.split('@')[0]}
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
                    name: thumbnailText, // Scritta in miniatura compatibile
                    jpegThumbnail: thumbnailBuffer, // Immagine in miniatura
                },
            },
            participant: "0@s.whatsapp.net",
        },
    });


    conn.sendMessage(m.chat, { react: { text: '', key: abrazo.key } });
};

handler.command = ['abbraccia'];
handler.help = ['ᴀʙʙʀᴀᴄᴄɪᴀ @ᴛᴀɢ'];
handler.tags = ['fun'];

export default handler;