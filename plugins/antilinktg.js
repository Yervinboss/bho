//Plugin by Zeno, Lucifero & zenobot staff

export async function before(m, { conn, isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return true;
  if (!m.isGroup) return false;

  const chat = global.db.data.chats[m.chat];
  if (!chat.antilinktg || chat.isBanned) return true;

  if (isAdmin || !isBotAdmin) return true;

  const text = (m.text || '').toLowerCase();
  const tgRegex = /(t\.me|telegram\.me|telegram\.dog)/gi;

  if (!tgRegex.test(text)) return true;

  await conn.sendMessage(m.chat, {
    delete: {
      remoteJid: m.chat,
      fromMe: false,
      id: m.key.id,
      participant: m.sender
    }
  });

  await conn.sendMessage(m.chat, {
    text: `🚫 @${m.sender.split('@')[0]} ɪ ʟɪɴᴋ ᴅɪ ᴛᴇʟᴇɢʀᴀᴍ ɴᴏɴ ꜱᴏɴᴏ ᴄᴏɴꜱᴇɴᴛɪᴛɪ!!\n\nᴄᴏɴꜱᴇɢᴜᴇɴᴢᴇ: ᴇꜱᴘᴜʟꜱɪᴏɴᴇ ᴅᴀʟ ɢʀᴜᴘᴘᴏ.`,
    mentions: [m.sender]
  });

  try {
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
  } catch (e) {
    console.log('Errore durante espulsione Telegram:', e);
    await conn.sendMessage(m.chat, {
      text: '⚠️ Non sono riuscito ad espellere l\'utente. Assicurati che io sia admin.'
    });
  }

  return false;
}