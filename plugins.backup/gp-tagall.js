//Codice di gp-tagall.js

//Plugin by Zeno






let handler = async (m, { isOwner, isAdmin, conn, text, participants, args, usedPrefix, command, groupMetadata }) => {
    if (command === 'tagall' || command === 'marcar') {
        if (!(isAdmin || isOwner)) {
            global.dfail('admin', m, conn);
            throw false;
        }

        let pesan = args.join` ` || ' 🚨 *ᴀʟʟᴇʀᴛᴀ!*';
        let oi = `📢  ${pesan}`;

        let prova = {
            key: {
                participants: "0@s.whatsapp.net",
                fromMe: false,
                id: "Halo"
            },
            message: {
                locationMessage: {
                    name: 'ɴᴏɴ ꜱɪ ᴅᴏʀᴍᴇ!!! ',
                    jpegThumbnail: await (await fetch('https://telegra.ph/file/92576d96e97bb7e3939e2.png')).buffer(),
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            },
            participant: "0@s.whatsapp.net"
        };

        let teks = `
┌⋆˚｡⋆୨🌸୧⋆｡˚⋆┐\n┆ *ᴛᴀɢᴀʟʟ:* 
┆ 🏠 *ɢʀᴜᴘᴘᴏ:*  ${groupMetadata.subject || 'Non sei in un gruppo'}
┆ 👥 *ᴍᴇᴍʙʀɪ:*  ${participants.length}
┆ 💬 *ᴍᴇꜱꜱᴀɢɢɪᴏ:*  ${oi}
⋆˚｡⋆୨🌸୧⋆｡˚⋆

 *ᴍᴇɴᴢɪᴏɴɪ:* \n
`.trim(); 

        const validParticipants = participants.filter(mem => mem && typeof mem.id === 'string' && mem.id.includes('@'))
        const mentionList = validParticipants.map(mem => mem.id)

        for (let mem of validParticipants) {
            teks += `\n➤ @${mem.id.split('@')[0]}`
        }

        teks += `\nʙʏ❖ ᴢᴇɴᴏʙᴏᴛ`;

        await conn.sendMessage(m.chat, {
            text: teks,
            contextInfo: { mentionedJid: mentionList }
        }, { quoted: prova });
    }
};

handler.help = ['ᴛᴀɢᴀʟʟ'];
handler.tags = ['admin'];
handler.admin = true
handler.mods = true;
handler.command = /^(tagall|marcar)$/i;
handler.group = true;

export default handler;