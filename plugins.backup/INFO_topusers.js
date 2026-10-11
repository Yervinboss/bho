//Plugin by Zeno



let handler = async (m, { conn }) => {
    const chat = global.db.data.chats[m.chat];
    if (!chat?.topUsers || Object.keys(chat.topUsers).length === 0) {
        return await conn.sendMessage(m.chat, { text: 'Nessun messaggio registrato in questo gruppo.' });
    }

    const users = Object.entries(chat.topUsers)
        .filter(([jid]) => !jid.endsWith('@g.us') && jid !== conn.user.jid);

    if (users.length === 0) {
        return await conn.sendMessage(m.chat, { text: 'Nessun messaggio registrato in questo gruppo.' });
    }

    users.sort((a, b) => b[1] - a[1]);
    const top = users.slice(0, 10);

    const titles = [
        'ʀᴇ ᴅᴇʟ ɢʀᴜᴘᴘᴏ',
        'ɴᴇʀᴅ',
        'ɴᴇʀᴅ ɪɴᴇꜱᴘᴇʀᴛᴏ',
        'ᴘʀᴇꜱᴇɴᴛᴇ ᴛʀᴀ ɴᴏɪ',
        'ᴀ ᴠᴏʟᴛᴇ ᴄ’ᴇ̀ ᴀ ᴠᴏʟᴛᴇ ɴᴏ',
        'ᴇ́ ᴛɪᴍɪᴅᴏ',
        'ɪɴᴜᴛɪʟᴇ',
        'ꜰᴀ ꜰɪɴᴛᴀ ᴅɪ ꜱᴄʀɪᴠᴇʀᴇ',
        'ᴄᴏɴ ᴜɴᴀ ᴠɪᴛᴀ ꜱᴏᴄɪᴀʟᴇ',
        'ꜰᴀɪ ᴘʀɪᴍᴀ ᴀ ǫᴜɪᴛᴛᴀʀᴇ'
    ];

    chat.prevFirst = chat.prevFirst || null;
    const newFirst = top[0][0];

    if (chat.prevFirst && chat.prevFirst !== newFirst) {
        await conn.sendMessage(m.chat, {
            text: `🏆 @${newFirst.split('@')[0]} ha superato @${chat.prevFirst.split('@')[0]} ed è diventato primo!`,
            mentions: [newFirst, chat.prevFirst]
        });
    }

    chat.prevFirst = newFirst;

    let text = `🏆 ᴛᴏᴘ 𝟷𝟶 ᴜᴛᴇɴᴛɪ ᴘɪᴜ̀ ᴀᴛᴛɪᴠɪ ᴅᴇʟ ɢʀᴜᴘᴘᴏ\n> ꜱᴇ ꜱᴇɪ ɪʟ ᴘʀɪᴍᴏ ʀɪᴄᴏʀᴅᴀ ᴅɪ ʀɪꜱᴄᴀᴛᴛᴀʀᴇ ɪʟ ᴛᴜᴏ ᴘʀᴇᴍɪᴏ ᴄᴏɴ ’’.ᴘʀᴇᴍɪᴏᴛᴏᴘ’’!\n\n`;

    const posEmojis = ['🥇','🥈','🥉','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟'];

    for (let i = 0; i < top.length; i++) {
        const [jid, count] = top[i];
        const title = titles[i] || 'Chat member';
        text += `${posEmojis[i]} @${jid.split('@')[0]} — ${title} • ${count} messaggi\n`;
    }

    await conn.sendMessage(m.chat, {
    text,
    mentions: top.map(u => u[0]),
    buttons: [
        { buttonId: ".topgruppi", buttonText: { displayText: "🌍 ᴛᴏᴘ ɢʀᴜᴘᴘɪ" }, type: 1 },
        { buttonId: ".statsgiornaliere", buttonText: { displayText: "📊 ꜱᴛᴀᴛɪꜱᴛɪᴄʜᴇ ɢɪᴏʀɴᴀʟɪᴇʀᴇ" }, type: 1 },
    ],
    headerType: 1
});
};

handler.help = ['top10'];
handler.tags = ['group'];
handler.command = ['top'];

export default handler;