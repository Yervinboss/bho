//Plugin by Zeno

async function handler(m, { conn }) {
  const users = global.db.data.users;
  if (!users[m.sender]) users[m.sender] = {};
  const user = users[m.sender];

  user.magazzino = user.magazzino || [];

  if (user.magazzino.length === 0) {
    return conn.sendMessage(m.chat, { 
      text: '📦 ɪʟ ᴍᴀɢᴀᴢᴢɪɴᴏ ᴇ̀ ᴠᴜᴏᴛᴏ!' 
    }, { quoted: m });
  }

  let testo = `┌⋆˚｡⋆୨🌸୧⋆｡˚⋆┐
┆ 📦 ᴍᴀɢᴀᴢᴢɪɴᴏ
┆⋆˚｡⋆୨🌸୧⋆｡˚⋆`;

  user.magazzino.forEach((item, index) => {
    testo += `
┆
┆ *${index + 1}. ${item.nome} x${item.quantità}*
┆ ᴠᴀʟᴏʀᴇ ᴍᴇʀᴄᴇ: *${item.valore} ZenoCoin*
┆`;

    if (index !== user.magazzino.length - 1) {
      testo += `⋆˚｡⋆୨🌸୧⋆｡˚⋆`;
    }
  });

  testo += `
┆
> ᴜꜱᴀ ɪʟ ᴄᴏᴍᴀɴᴅᴏ ’’.ᴠᴇɴᴅɪ’’\n> ᴘᴇʀ ᴠᴇɴᴅᴇʀᴇ ᴛᴜᴛᴛᴀ ʟᴀ ᴍᴇʀᴄᴇ
└⋆˚｡⋆୨🌸୧⋆｡˚⋆┘`;

  conn.sendMessage(m.chat, { text: testo }, { quoted: m });
}

handler.command = /^magazzino$/i;
handler.tags = ['rpg'];
handler.help = ['magazzino'];

export default handler;