//Plugin by Zeno






const handler = async (m, { conn, participants, groupMetadata, args }) => {
    const groupAdmins = participants.filter(p => p.admin);
    const mentionList = groupAdmins.map(p => p.id);
    const owner = groupMetadata.owner || 
        groupAdmins.find(p => p.admin === 'superadmin')?.id || 
        `${m.chat.split('-')[0]}@s.whatsapp.net`;

    let pesan = args.join(' ');
    let message = pesan ? pesan : '✖️ Nessun messaggio fornito';

    const listAdmin = groupAdmins
        .map((v, i) => `✧👑 ${i + 1}. @${v.id.split('@')[0]}`)
        .join('\n');

    let text = `
┌⋆˚｡⋆୨🌸୧⋆｡˚⋆┐
┆ 🔔 ꜱᴠᴇɢʟɪᴀ ᴀᴅᴍɪɴ!
⋆˚｡⋆୨🌸୧⋆｡˚⋆
✎ ᴍᴇꜱꜱᴀɢɢɪᴏ:
➥ ${message}

♔ *ʟɪꜱᴛᴀ ᴀᴅᴍɪɴ:*\n${listAdmin}

⋆˚｡⋆୨🌸୧⋆｡˚⋆
> ᴢᴇɴᴏʙᴏᴛ 
└⋆˚｡⋆୨🌸୧⋆｡˚⋆┘
`.trim();

    const groupProfilePicture = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) ||
        'https://telegra.ph/file/0f336691459a936a75f1b.jpg';

    await conn.sendMessage(m.chat, {
        image: { url: groupProfilePicture },
        caption: text,
        mentions: [...mentionList, owner]
    }, { quoted: m });
};

handler.command = ['admins', '@admins', 'dmins'];
handler.tags = ['admin'];
handler.help = ['admins <messaggio>'];
handler.group = true;
handler.mods = true;

export default handler;