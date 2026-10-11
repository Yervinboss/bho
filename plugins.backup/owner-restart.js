//Plugin by Zeno

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const handler = async (m, { conn, isOwner }) => {
    const userId = m.sender;
    const groupId = m.chat;

    if (!isOwner) return m.reply("✖️ ꜱᴏʟᴏ ɪʟ ᴘʀᴏᴘʀɪᴇᴛᴀʀɪᴏ ᴘᴜᴏ̀ ᴜꜱᴀʀᴇ ǫᴜᴇꜱᴛᴏ ᴄᴏᴍᴀɴᴅᴏ.")

    try {
        const { key } = await conn.sendMessage(m.chat, {
            text: `┌⋆˚｡⋆୨🌸୧⋆｡˚⋆┐\n┆🔄 ʀɪᴀᴠᴠɪᴏ ɪɴ ᴄᴏʀꜱᴏ...\n┆⏱️ ᴀᴛᴛᴇɴᴅɪ ǫᴜᴀʟᴄʜᴇ ꜱᴇᴄᴏɴᴅᴏ.\n└⋆˚｡⋆୨🌸୧⋆｡˚⋆┘\n> ᴢᴇɴᴏʙᴏᴛ ʀᴇꜱᴛᴀʀᴛ`
        }, { quoted: m });

        await delay(1000);

        await conn.sendMessage(m.chat, {
            text: '🚀🚀🚀🚀',
            edit: key
        });

        await delay(1000);

        await conn.sendMessage(m.chat, {
            text: `┌⋆˚｡⋆୨🌸୧⋆｡˚⋆┐\n┆⚙️ ᴀᴠᴠɪᴏ ᴘʀᴏᴄᴇᴅᴜʀᴀ...\n┆🔃 ᴄᴀʀɪᴄᴀᴍᴇɴᴛᴏ ᴍᴏᴅᴜʟɪ ɪɴ ᴄᴏʀꜱᴏ.\n└⋆˚｡⋆୨🌸୧⋆｡˚⋆┘\n> ᴢᴇɴᴏʙᴏᴛ ʀᴇꜱᴛᴀʀᴛ`,
            edit: key
        });

        await delay(1000);

        await conn.sendMessage(m.chat, {
            text: `┌⋆˚｡⋆୨🌸୧⋆｡˚⋆┐\n┆✔️ ʀɪᴀᴠᴠɪᴏ ᴄᴏᴍᴘʟᴇᴛᴀᴛᴏ!\n┆🟢 ʙᴏᴛ ᴏɴʟɪɴᴇ ᴀ ʙʀᴇᴠᴇ.\n└⋆˚｡⋆୨🌸୧⋆｡˚⋆┘\n> ᴢᴇɴᴏʙᴏᴛ ʀᴇꜱᴛᴀʀᴛ`,
            edit: key
        });

        await delay(1000);

        process.exit(42);

    } catch (error) {
        m.reply(`✖️ ᴇʀʀᴏʀᴇ ᴅᴜʀᴀɴᴛᴇ ɪʟ ʀɪᴀᴠᴠɪᴏ: ${error.message}`)
    }
};

handler.help = ['riavvia', 'restart'];
handler.tags = ['owner'];
handler.command = /^(riavvia|restart)$/i;
handler.owner = true;

export default handler;