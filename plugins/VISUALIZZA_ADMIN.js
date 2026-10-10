//Plugin by Zeno, Lucifero & zenobot staff

import fetch from 'node-fetch'

const handler = m => m
handler.all = async function (m) {
  const chat = global.db.data.chats[m.chat]

  if (m.messageStubType == 29) {
    let pic
    try {
      pic = await conn.profilePictureUrl(m.messageStubParameters[0], 'image')
    } catch {
      pic = null
    }

    const ppBuffer = pic
      ? await (await fetch(pic)).buffer()
      : await (await fetch('https://telegra.ph/file/17e7701f8b0a63806e312.png')).buffer()

    const fake = {
      key: {
        participants: '0@s.whatsapp.net',
        fromMe: false,
        id: 'zenobotPromozione'
      },
      message: {
        locationMessage: {
          name: 'ᴘʀᴏᴍᴏᴢɪᴏɴᴇ ᴀᴅᴍɪɴ 👑',
          jpegThumbnail: ppBuffer.toString('base64'),
          vcard: 'BEGIN:VCARD\nVERSION:3.0\nN:;Admin;;;\nFN:Admin\nEND:VCARD'
        }
      },
      participant: '0@s.whatsapp.net'
    }

    conn.sendMessage(m.chat, {
      text: `@${m.sender.split('@')[0]} ʜᴀ ᴅᴀᴛᴏ ɪ ᴘᴏᴛᴇʀɪ ᴀ @${m.messageStubParameters[0].split('@')[0]}`,
      mentions: [m.sender, m.messageStubParameters[0]]
    }, { quoted: fake })
  }

  if (m.messageStubType == 30) {
    let pic
    try {
      pic = await conn.profilePictureUrl(m.messageStubParameters[0], 'image')
    } catch {
      pic = null
    }

    const ppBuffer = pic
      ? await (await fetch(pic)).buffer()
      : await (await fetch('https://telegra.ph/file/17e7701f8b0a63806e312.png')).buffer()

    const fake = {
      key: {
        participants: '0@s.whatsapp.net',
        fromMe: false,
        id: 'zenobotRetrocessione'
      },
      message: {
        locationMessage: {
          name: 'ʀᴇᴛʀᴏᴄᴇꜱꜱɪᴏɴᴇ ᴀᴅᴍɪɴ 🙇🏻‍♂️',
          jpegThumbnail: ppBuffer.toString('base64'),
          vcard: 'BEGIN:VCARD\nVERSION:3.0\nN:;Admin;;;\nFN:Admin\nEND:VCARD'
        }
      },
      participant: '0@s.whatsapp.net'
    }

    conn.sendMessage(m.chat, {
      text: `@${m.sender.split('@')[0]} ʜᴀ ʟᴇᴠᴀᴛᴏ ɪ ᴘᴏᴛᴇʀɪ ᴀ @${m.messageStubParameters[0].split('@')[0]}`,
      mentions: [m.sender, m.messageStubParameters[0]]
    }, { quoted: fake })
  }
}

export default handler