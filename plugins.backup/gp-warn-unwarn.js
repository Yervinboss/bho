//Plugin by Zeno

import fs from 'fs';

const loadIcon = async (name) => {
  try {
    return fs.readFileSync(`./icone/${name}.png`);
  } catch {
    return Buffer.alloc(0);
  }
};

const time = async (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
let handler = async (m, { conn, text, args, groupMetadata, usedPrefix, command }) => {
let reason = args.slice(1).join(' ') || 'non specificato\n┆ ma meritato'
if (command == 'warn' || command == "ammonisci") {
  let mention = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.quoted
  if (!mention) return m.reply('ⓘ ᴍᴇɴᴢɪᴏɴᴀ ʟᴀ ᴘᴇʀꜱᴏɴᴀ ᴅᴀ ᴡᴀʀɴᴀʀᴇ')
    let war = '2'
    let who;
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : true;
else who = m.chat;
if (!who) return;
if (!(who in global.db.data.users)) {
global.db.data.users[who] = { warn: 0 };
}
let warn = global.db.data.users[who].warn;
    let user = global.db.data.users[who];
 let prova = {
      "key": {
        "participants": "0@s.whatsapp.net",
        "fromMe": false,
        "id": "Halo"
      },
      "message": {
        "locationMessage": {
          name: 'ᴡᴀʀɴ ⚠️',
          jpegThumbnail: await loadIcon('warn'),
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
        }
      },
      "participant": "0@s.whatsapp.net"
    };
if (warn < war) {
  global.db.data.users[who].warn += 1;

  conn.reply(m.chat, `┌⋆˚｡⋆୨🌸୧⋆｡˚⋆┐
┆ @${mention.split`@`[0]}\n┆ ʜᴀɪ ʀɪᴄᴇᴠᴜᴛᴏ ᴜɴ ᴡᴀʀɴ ᴅᴀ\n┆ @${m.sender.split`@`[0]}
┆⋆˚｡⋆୨🌸୧⋆｡˚⋆
┆▹ ᴡᴀʀɴ: ${user.warn} / 3
┆▹ ᴍᴏᴛɪᴠᴏ: ${reason}
┆⋆˚｡⋆୨🌸୧⋆｡˚⋆
> ᴀᴛᴛᴇɴᴢɪᴏɴᴇ! ᴀ 𝟹 ᴡᴀʀɴ ᴠᴇʀʀᴀɪ ᴇꜱᴘᴜʟꜱᴏ ᴅᴀʟ ɢʀᴜᴘᴘᴏ.
└⋆˚｡⋆୨🌸୧⋆｡˚⋆┘`, prova, { mentions: [mention, m.sender] });

} else if (warn == war) {

  global.db.data.users[who].warn = 0;

  conn.reply(m.chat, `ᴜᴛᴇɴᴛᴇ ʀɪᴍᴏꜱꜱᴏ ᴅᴏᴘᴏ 𝟹 ᴀᴠᴠᴇʀᴛɪᴍᴇɴᴛɪ`, prova);

  await time(1000);
  await conn.groupParticipantsUpdate(m.chat, [who], 'remove');
    }
  }
if (command == 'unwarn' || command == "delwarn") {

let mention = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : null
if (!mention) return m.reply('ⓘ ᴍᴇɴᴢɪᴏɴᴀ ʟᴀ ᴘᴇʀꜱᴏɴᴀ ᴀ ᴄᴜɪ ᴛᴏɢʟɪᴇʀᴇ ɪʟ ᴡᴀʀɴ')

let who = mention

if (!(who in global.db.data.users)) {
global.db.data.users[who] = { warn: 0 }
}

let user = global.db.data.users[who]

if (user.warn > 0) {

user.warn -= 1

let prova = {
  "key": {
    "participants": "0@s.whatsapp.net",
    "fromMe": false,
    "id": "Halo"
  },
  "message": {
    "locationMessage": {
      name: 'ᴜɴᴡᴀʀɴ ✔️',
      jpegThumbnail: await loadIcon('unwarn')
    }
  },
  "participant": "0@s.whatsapp.net"
}

conn.reply(m.chat, `┌⋆˚｡⋆୨🌸୧⋆｡˚⋆┐
┆ @${who.split('@')[0]},\n┆ ᴛɪ ᴇ̀ ꜱᴛᴀᴛᴏ ᴛᴏʟᴛᴏ ᴜɴ ᴡᴀʀɴ ᴅᴀ\n┆ @${m.sender.split('@')[0]},\n┆ ʀɪɴɢʀᴀᴢɪᴀ!
┆⋆˚｡⋆୨🌸୧⋆｡˚⋆
┆▹ ᴡᴀʀɴ: ${user.warn} / 3
┆⋆˚｡⋆୨🌸୧⋆｡˚⋆
> ᴢᴇɴᴏʙᴏᴛ ʙᴏᴛ
└⋆˚｡⋆୨🌸୧⋆｡˚⋆┘`, prova, { mentions: [who, m.sender] })

} else {

m.reply('ⓘ ǫᴜᴇꜱᴛᴏ ᴜᴛᴇɴᴛᴇ ɴᴏɴ ʜᴀ ᴡᴀʀɴ')
}
  }
}

handler.command = ['warn', 'ammonisci', 'unwarn', 'delwarn'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;