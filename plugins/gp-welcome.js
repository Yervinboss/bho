//Plugin by Zeno, Lucifero & zenobot staff

import fetch from 'node-fetch';

const pendingWelcomes = new Map();
const welcomeBatchDelay = 3000;

async function sendWelcomeBatch(chatId, conn, users) {
  const chat = global.db.data.chats[chatId];
  if (!chat?.welcome || !users.length) return;

  const groupMetadata = await conn.groupMetadata(chatId) || (conn.chats[chatId] || {}).metadata;
  if (!groupMetadata) return;

  let profilePic;
  try {
    profilePic = await conn.profilePictureUrl(users[0], 'image');
  } catch {
    profilePic = 'https://telegra.ph/file/8ca14ef9fa43e99d1d196.jpg';
  }

  let ppBuffer;
  try {
    ppBuffer = await (await fetch(profilePic)).buffer();
  } catch {
    ppBuffer = await (await fetch('https://telegra.ph/file/8ca14ef9fa43e99d1d196.jpg')).buffer();
  }

  const welcomeText = users.map(user => {
    let text = chat.sWelcome || `@user ʙᴇɴᴠᴇɴᴜᴛᴏ/ᴀ ɴᴇʟ ɢʀᴜᴘᴘᴏ @group`;

    return text
      .replace(/@user/g, `@${user.split('@')[0]}`)
      .replace(/@group/g, groupMetadata.subject)
      .replace(/@count/g, groupMetadata.participants.length)
      .replace(/@desc/g, groupMetadata.desc?.toString() || 'Nessuna descrizione');
  }).join('\n');

  const fakeWelcome = {
    key: {
      participants: '0@s.whatsapp.net',
      fromMe: false,
      id: 'zenobotWelcome'
    },
    message: {
      locationMessage: {
        name: 'ʙᴇɴᴠᴇɴᴜᴛᴏ 👋',
        jpegThumbnail: ppBuffer.toString('base64'),
        vcard: 'BEGIN:VCARD\nVERSION:3.0\nN:;Welcome;;;\nFN:Welcome\nEND:VCARD'
      }
    },
    participant: '0@s.whatsapp.net'
  };

  await conn.sendMessage(chatId, {
    text: `${welcomeText}\n\n👥 ᴍᴇᴍʙʀɪ ᴀᴛᴛᴜᴀʟɪ: ${groupMetadata.participants.length}`,
    mentions: users
  }, { quoted: fakeWelcome });
}

export async function before(m, { conn, participants }) {
  if (!m.isGroup) return;

  const chat = global.db.data.chats[m.chat];
  if (!chat?.welcome || m.messageStubType !== 27) return;

  const participantsNew = m.messageStubParameters || [];
  if (!participantsNew.length) return;

  const batch = pendingWelcomes.get(m.chat) || { conn, users: new Set(), timer: null };
  for (const user of participantsNew) batch.users.add(user);
  batch.conn = conn;

  if (batch.timer) clearTimeout(batch.timer);
  batch.timer = setTimeout(async () => {
    pendingWelcomes.delete(m.chat);
    try {
      await sendWelcomeBatch(m.chat, batch.conn, [...batch.users]);
    } catch (error) {
      console.error('Errore nell invio del welcome:', error);
    }
  }, welcomeBatchDelay);

  pendingWelcomes.set(m.chat, batch);
}