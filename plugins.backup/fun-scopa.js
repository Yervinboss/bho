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

    if (!who) return m.reply(`ᴍᴇɴᴢɪᴏɴᴀ ʟᴀ ᴘᴇʀꜱᴏɴᴀ ᴅᴀ ꜱᴄᴏᴘᴀʀᴇ`);


    const thumbnailUrl = "https://files.catbox.moe/eu24ui.png"; 
    const thumbnailBuffer = await (await fetch(thumbnailUrl)).buffer();
    const thumbnailText = "SCOPA"; 

    let abrazo = await conn.sendMessage(m.chat, {
        text: `⋆˚｡⋆୨🌸୧⋆｡˚⋆•‹✧›•⋆˚｡⋆୨🌸୧⋆｡˚⋆
@${who.split('@')[0]} ꜱᴇɪ ꜱᴛᴀᴛᴀ ꜱᴄᴏᴘᴀᴛᴀ ɪɴ ᴍᴏᴅᴏ ᴠɪᴏʟᴇɴᴛᴏ ᴅᴀ @${m.sender.split('@')[0]}, ᴛɪ ʜᴀ ᴘʀᴇꜱᴀ, ᴛɪ ʜᴀ ꜱʙᴀᴛᴛᴜᴛᴀ ᴀ ʟᴇᴛᴛᴏ ᴇ ʜᴀ ɪɴɪᴢɪᴀᴛᴏ ᴀ ꜱꜰᴏɴᴅᴀʀᴛɪ ᴍᴇɴᴛʀᴇ ᴜʀʟᴀᴠɪ ɪʟ ꜱᴜᴏ ɴᴏᴍᴇ, ᴅᴏᴘᴏ ꜱᴏʟɪ 𝟸𝟶 ꜱᴇᴄᴏɴᴅɪ ᴛɪ ᴠɪᴇɴᴇ ɪɴ ɢᴏʟᴀ.
⋆˚｡⋆୨🌸୧⋆｡˚⋆•‹✧›•⋆˚｡⋆୨🌸୧⋆｡˚⋆`,
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

handler.command = ['scopa'];
handler.help = ['stupra @ᴛᴀɢ'];
handler.tags = ['fun'];

export default handler;