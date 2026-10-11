//Plugin by Zeno

import { createHash } from 'crypto';
import PhoneNumber from 'awesome-phonenumber';

let balIconBuffer;
async function loadBalIcon() {
  if (!balIconBuffer) {
    try {
      balIconBuffer = await global.fs.promises.readFile('./icone/bal.png');
    } catch (error) {
      balIconBuffer = Buffer.alloc(0);
    }
  }
  return balIconBuffer;
}

const handler = async (m, { conn, usedPrefix, command }) => {
  const mention = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.quoted;
  const who = mention ? mention : m.sender;
  const user = global.db.data.users[who] || {};
  let prova = { "key": {"participants":"0@s.whatsapp.net", "fromMe": false, "id": "Halo"
            }, "message": { 
        "locationMessage": {
        name: `ᴏʙʙɪᴇᴛᴛɪᴠɪ`,
        jpegThumbnail: await loadBalIcon(),
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    "participant": "0@s.whatsapp.net"
  };

  let pic;
  try {
    pic = await conn.profilePictureUrl(who, 'image');
  } catch (error) {
    pic = null;
  }

  conn.sendMessage(m.chat, {
    text: `⋆˚｡⋆୨🌸୧⋆｡˚⋆•‹❖›•⋆˚｡⋆୨🌸୧⋆｡˚⋆
▹ ᴍᴇꜱꜱᴀɢɢɪ: ${user.messaggi > 0 ? '✔️' : '✖️'}
▹ ʀᴀɢɢɪᴜɴɢɪ ɪ 𝟷𝟶.𝟶𝟶𝟶 ᴍᴇꜱꜱᴀɢɢɪ: ${user.messaggi > 10000 ? '✔️' : '✖️'}
▹ ʙᴇꜱᴛᴇᴍᴍɪᴇ: ${user.blasphemy > 0 ? '✔️' : '✖️'}
▹ ʀᴀɢɢɪᴜɴɢɪ ʟᴇ 𝟷𝟶𝟶𝟶 ʙᴇꜱᴛᴇᴍᴍɪᴇ: ${user.blasphemy > 1000 ? '✔️' : '✖️'}
▹ ᴇꜱᴇɢᴜɪ 𝟷𝟶𝟶𝟶 ᴄᴏᴍᴀɴᴅɪ: ${user.command > 1000 ? '✔️' : '✖️'}
⋆˚｡⋆୨🌸୧⋆｡˚⋆•‹❖›•⋆˚｡⋆୨🌸୧⋆｡˚⋆`,
    contextInfo: {
      mentionedJid: [who],
      externalAdReply: {
        title: `${user.name && user.name.trim(who) !== '' ? user.name : 'Sconosciuto'}`,
        sourceUrl: "https://wa.me/" + (mention ? mention.split("@")[0] : m.sender.split("@")[0]),
        thumbnail: pic ? await (await fetch(pic)).buffer() : await (await fetch('https://telegra.ph/file/17e7701f8b0a63806e312.png')).buffer()
      }
    }
  }, { quoted: prova });
};

handler.command = ['obbiettivo','obbiettivi'];
export default handler;