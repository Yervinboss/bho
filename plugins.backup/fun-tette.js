//Plugin by Zeno





let handler = async (m, { conn, command, text }) => {
let target = m.mentionedJid?.[0] 
  || m.quoted?.sender 
  || m.sender

let number = target.split("@")[0]

    let boobsSizes = ['prima', 'seconda', 'terza', 'quarta', 'quinta', 'sesta', 'settima', 'ottava', 'nona', 'decima'];


    let size = pickRandom(boobsSizes);


    let boobs = `*🍒 ᴄᴀʟᴄᴏʟɪᴀᴍᴏ ʟᴇ ᴛᴜᴇ ʙᴏᴏʙꜱ 🍒*\n
⋆˚｡⋆୨🌸୧⋆｡˚⋆
*@${number}* ʜᴀ ᴜɴᴀ *${size}*
⋆˚｡⋆୨🌸୧⋆｡˚⋆\n> ᴢᴇɴᴏʙᴏᴛ`.trim()


    m.reply(boobs, null, { mentions: conn.parseMention(boobs) })
}


function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

handler.help = ['ᴛᴇᴛᴛᴇ @ᴛᴀɢ']
handler.tags = ['fun']
handler.command = /^(tette)$/i

export default handler;