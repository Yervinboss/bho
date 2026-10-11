//Plugin by Zeno

export async function before(m, { conn, isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return true;
  if (!m.isGroup) return false;

  const chat = global.db.data.chats[m.chat];
  if (!chat.antilinktiktok || chat.isBanned) return true;

  if (isAdmin || !isBotAdmin) return true;

  const text = (m.text || '').toLowerCase();
  const tiktokRegex = /(tiktok\.com|vm\.tiktok\.com)/gi;

  if (!tiktokRegex.test(text)) return true;

  let user = global.db.data.users[m.sender];
  if (!user) global.db.data.users[m.sender] = { warnTiktok: 0 };

  let warn = global.db.data.users[m.sender].warnTiktok || 0;

  await conn.sendMessage(m.chat, {
    delete: {
      remoteJid: m.chat,
      fromMe: false,
      id: m.key.id,
      participant: m.sender
    }
  });

  warn++;
  global.db.data.users[m.sender].warnTiktok = warn;

  if (warn < 3) {
    await conn.sendMessage(m.chat, {
      text: `⚠️ @${m.sender.split('@')[0]} ɪ ʟɪɴᴋ ᴅɪ ᴛɪᴋᴛᴏᴋ ɴᴏɴ ꜱᴏɴᴏ ᴄᴏɴꜱᴇɴᴛɪᴛɪ!!\n\n▹ ᴡᴀʀɴ: ${warn} / 3`,
      mentions: [m.sender]
    });
  } else {
    global.db.data.users[m.sender].warnTiktok = 0;

    await conn.sendMessage(m.chat, {
      text: `🚫 @${m.sender.split('@')[0]} ᴇꜱᴘᴜʟꜱᴏ ᴘᴇʀ ʟɪɴᴋ ᴛɪᴋᴛᴏᴋ!!\n\nᴡᴀʀɴ ᴛᴏᴛᴀʟɪ: 𝟹/𝟹`,
      mentions: [m.sender]
    });

    try {
      await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
    } catch (e) {
      console.error('[antilinktiktok] Errore rimozione partecipante:', e || 'Errore non specificato');
    }
  }

  return false;
}