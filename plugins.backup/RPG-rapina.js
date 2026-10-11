//Plugin by Zeno

import { addRpgXp, ensureRpgXp } from '../lib/rpg-xp.js';

const COOLDOWN = 10 * 60 * 1000; // 10 minuti
const BLOCCO_ARRESTO = 20 * 60 * 1000; // 20 minuti

async function handler(m, { conn }) {
  const users = global.db.data.users;
  if (!users[m.sender]) users[m.sender] = { money: 0, bank: 0, lastRapina: 0, arrestatoFino: 0 };
  const user = users[m.sender];
  const now = Date.now();
  ensureRpgXp(user);

  if (user.arrestatoFino && now < user.arrestatoFino) {
    const remaining = msToTime(user.arrestatoFino - now);
    return conn.sendMessage(m.chat, { 
      text: `🚔 ꜱᴇɪ ꜱᴏᴛᴛᴏ ᴄᴏɴᴛʀᴏʟʟᴏ ᴅᴇʟʟᴀ ᴘᴏʟɪᴢɪᴀ!\n\n⏳ ᴘᴏᴛʀᴀɪ ᴛᴏʀɴᴀʀᴇ ᴀ ʀᴀᴘɪɴᴀʀᴇ ᴛʀᴀ *${remaining}*.`
    }, { quoted: m });
  }

  if (now - user.lastRapina < COOLDOWN) {
    const remaining = msToTime(COOLDOWN - (now - user.lastRapina));
    return conn.sendMessage(m.chat, { 
      text: `⏳ ᴘᴜᴏɪ ꜰᴀʀᴇ ᴜɴᴀ ʀᴀᴘɪɴᴀ ᴏɢɴɪ 𝟷𝟶 ᴍɪɴᴜᴛɪ.\nʀɪᴘʀᴏᴠᴀ ᴛʀᴀ *${remaining}*.` 
    }, { quoted: m });
  }

  user.lastRapina = now;

  const targets = [
    { nome: "🏪 ɴᴇɢᴏᴢɪᴏ", successo: 0.7, min: 500, max: 2000 },
    { nome: "🚛 ᴘᴏʀᴛᴀᴠᴀʟᴏʀɪ", successo: 0.5, min: 2000, max: 5000 },
    { nome: "🏦 ʙᴀɴᴄᴀ", successo: 0.3, min: 5000, max: 12000 }
  ];

  const target = targets[Math.floor(Math.random() * targets.length)];
  const esito = Math.random();


  if (esito < target.successo) {
    const guadagno = Math.floor(Math.random() * (target.max - target.min + 1)) + target.min;
    const xpReward = 50;
    addRpgXp(user, xpReward);
    user.money += guadagno;

    return conn.sendMessage(m.chat, {
      text: `💣 ʀᴀᴘɪɴᴀ ʀɪᴜꜱᴄɪᴛᴀ!\n\n🎯 ᴏʙʙɪᴇᴛᴛɪᴠᴏ: ${target.nome}\n💰 ʙᴏᴛᴛɪɴᴏ ʀɪᴄᴀᴠᴀᴛᴏ: *${guadagno} ZenoCoin*\n⚡ ZenoCoin: +${xpReward}\n\n🔥 ꜱᴇɪ ꜱᴄᴀᴘᴘᴀᴛᴏ ꜱᴇɴᴢᴀ ʟᴀꜱᴄɪᴀʀᴇ ᴛʀᴀᴄᴄᴇ!`
    }, { quoted: m });
  }


  if (esito > 0.9) {
    const xpPenalty = 30;
    addRpgXp(user, -xpPenalty);
    user.arrestatoFino = now + BLOCCO_ARRESTO;

    return conn.sendMessage(m.chat, {
      text: `🚨 ᴀʀʀᴇꜱᴛᴀᴛᴏ!\n\nʟᴀ ᴘᴏʟɪᴢɪᴀ ᴛɪ ʜᴀ ʙᴇᴄᴄᴀᴛᴏ ᴅᴜʀᴀɴᴛᴇ ʟᴀ ʀᴀᴘɪɴᴀ ᴀʟʟᴀ ${target.nome}.\n⚡ ZenoCoin: -${xpPenalty}\n\n⛓️ ᴘᴇʀ 𝟸𝟶 ᴍɪɴᴜᴛɪ ꜱᴀʀᴀɪ ɪɴ ᴄᴀʀᴄᴇʀᴇ ᴇ ɴᴏɴ ᴘᴏᴛʀᴀɪ ꜰᴀʀᴇ ᴀʟᴛʀᴇ ʀᴀᴘɪɴᴇ`
    }, { quoted: m });
  }


  const multa = Math.floor(user.bank * 0.3);
  const xpPenalty = 15;
  addRpgXp(user, -xpPenalty);
  user.bank = Math.max(0, user.bank - multa);

  return conn.sendMessage(m.chat, {
    text: `🚔 ʀᴀᴘɪɴᴀ ꜰᴀʟʟɪᴛᴀ!\n\n🎯 ᴏʙʙɪᴇᴛᴛɪᴠᴏ: ${target.nome}\n💸 ʟᴀ ᴘᴏʟɪᴢɪᴀ ᴛɪ ʜᴀ ꜰᴀᴛᴛᴏ ᴜɴᴀ ᴍᴜʟᴛᴀ ᴅɪ *${multa} ZenoCoin*.\n⚡ ZenoCoin: -${xpPenalty}\n\nᴘʀᴏꜱꜱɪᴍᴀ ᴠᴏʟᴛᴀ ᴘɪᴀɴɪꜰɪᴄᴀ ᴍᴇɢʟɪᴏ ʟᴀ ʀᴀᴘɪɴᴀ...`
  }, { quoted: m });
}

handler.command = /^rapina$/i;
handler.tags = ['rpg'];
handler.help = ['rapina'];

export default handler;

function msToTime(duration) {
  let minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((duration % (1000 * 60)) / 1000);
  return `${minutes}m ${seconds}s`;
}