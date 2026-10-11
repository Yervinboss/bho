//Plugin by Zeno

import fetch from 'node-fetch';
import { getRpgXpStatus } from '../lib/rpg-xp.js';

let handler = async (m, { conn }) => {
  const users = global.db.data.users;

  const who = m.quoted 
    ? m.quoted.sender 
    : m.mentionedJid && m.mentionedJid[0] 
    ? m.mentionedJid[0] 
    : m.sender;

  if (!users[who]) {
    users[who] = { messaggi: 0, warn: 0, nomeinsta: '', blasphemy: 0, bank: 0 };
  }

  const u = users[who];
  const tag = '@' + who.split('@')[0];
  const nome = u.name || conn.getName?.(who) || tag;

  const profilePic = await conn.profilePictureUrl(who, 'image').catch(() => null);
  const ppBuffer = profilePic 
    ? await (await fetch(profilePic)).buffer() 
    : await (await fetch('https://telegra.ph/file/8ca14ef9fa43e99d1d196.jpg')).buffer();

  const fake = {
    key: {
      participants: '0@s.whatsapp.net',
      fromMe: false,
      id: 'zenobotInfo'
    },
    message: {
      locationMessage: {
        name: `ɪɴꜰᴏ ᴅɪ ${nome}`,
        jpegThumbnail: ppBuffer.toString('base64'),
        vcard: 'BEGIN:VCARD\nVERSION:3.0\nN:;Info;;;\nFN:Info\nEND:VCARD'
      }
    },
    participant: '0@s.whatsapp.net'
  }

  const insta = u.nomeinsta 
    ? `🤳🏻 ɪɴꜱᴛᴀɢʀᴀᴍ: @${u.nomeinsta}` 
    : '🤳🏻 ɪɴꜱᴛᴀɢʀᴀᴍ: ɴᴏɴ ɪᴍᴘᴏꜱᴛᴀᴛᴏ';

  const warnEmoji = u.warn === 0 ? '👌' : u.warn === 1 ? '⚠️' : '‼️';
  const curse = u.blasphemy || 0;
  const rankLevel = Number(u.lvl ?? u.level ?? u.rankData?.level ?? 0) || 0;
  const rpgStatus = getRpgXpStatus(u);

  const regInfo = u.registered
    ? `┆🧾 ɴᴏᴍᴇ: ${u.nome}\n┆🎂 ᴇᴛᴀ̀: ${u.eta}\n┆📍 ᴄɪᴛᴛᴀ̀: ${u.citta}`
    : `┆🧾 ʀᴇɢɪꜱᴛʀᴀᴢɪᴏɴᴇ: ✖️ ɴᴏɴ ᴇꜰꜰᴇᴛᴛᴜᴀᴛᴀ`;

  const messageText = `📌 ɪɴꜰᴏ ᴜᴛᴇɴᴛᴇ
┌⋆˚｡⋆୨🌸୧⋆｡˚⋆┐
┆👤 ᴜᴛᴇɴᴛᴇ: ${tag}
┆
${regInfo}
┆
┆💬 ᴍᴇꜱꜱᴀɢɢɪ: ${u.messaggi || 0}
┆
┆🏆 ʟɪᴠᴇʟʟᴏ ʀᴀɴᴋ: ${rankLevel}
┆
┆💰 ʙᴀɴᴄᴀ: ${u.bank || 0} ZenoCoin
┆
┆${warnEmoji} ᴡᴀʀɴ: ${u.warn || 0} / 3
┆
┆💢 ʙᴇꜱᴛᴇᴍᴍɪᴇ: ${curse}
┆
┆${insta}
└⋆˚｡⋆୨🌸୧⋆｡˚⋆┘`;

  await conn.sendMessage(m.chat, {
    text: messageText,
    mentions: [who],
    buttons: [
      { buttonId: '.statsgiornaliere', buttonText: { displayText: '📊 Statistiche giornaliere' }, type: 1 }
    ]
  }, { quoted: fake });
};

handler.command = ['info', 'bal'];
handler.tags = ['info'];
handler.help = ['infouser'];

export default handler;