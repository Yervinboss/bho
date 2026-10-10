//Plugin by Zeno, Lucifero & zenobot staff

let handler = async (m, { conn, command, text }) => {
let target = m.mentionedJid?.[0] 
  || m.quoted?.sender 
  || m.sender

let number = target.split("@")[0]

    let boobsSizes = ['floscio', 'palestrato', 'pieno di cellulite', 'piccolo', 'smerdato', 'peloso', 'enorme', 'piatto'];


    let size = pickRandom(boobsSizes);


    let boobs = `*🍑 ᴄᴀʟᴄᴏʟɪᴀᴍᴏ ɪʟ ᴛᴜᴏ ᴄᴜʟᴇᴛᴛᴏ 🍑*\n
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
*@${number}* ʜᴀ ɪʟ ᴄᴜʟᴏ *${size}*
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n> ᴢᴇɴᴏʙᴏᴛ`.trim()


    m.reply(boobs, null, { mentions: conn.parseMention(boobs) })
}


function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

handler.help = ['ᴄᴜʟᴏ @ᴛᴀɢ']
handler.tags = ['fun']
handler.command = /^(culo)$/i

export default handler;