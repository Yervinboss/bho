//Plugin by Zeno

import fetch from 'node-fetch'

const handler = async (m, { conn }) => {
  const users = global.db.data.users
  const mention = m.mentionedJid[0] || m.quoted?.sender
  const who = mention || m.sender

  if (!users[who]) {
    users[who] = {
      sposato: false,
      coniuge: null,
      testimone: null,
      ex: [],
      adottati: [],
      miglioreamico: null
    }
  }

  const user = users[who]
  const tag = '@' + who.split('@')[0]

  let adottatoDa = null
  for (const jid in users) {
    if (users[jid].adottati && users[jid].adottati.includes(who)) {
      adottatoDa = jid
      break
    }
  }

  const exList = (user.ex || []).map(j => '@' + j.split('@')[0])
  const adopList = (user.adottati || []).map(j => '@' + j.split('@')[0])
  let pic
  try {
    pic = await conn.profilePictureUrl(who, 'image')
  } catch {
    pic = 'https://telegra.ph/file/17e7701f8b0a63806e312.png'
  }

  const ppBuffer = await (await fetch(pic)).buffer()

  const fake = {
    key: {
      participants: '0@s.whatsapp.net',
      fromMe: false,
      id: 'zenobotFamiglia'
    },
    message: {
      locationMessage: {
        name: `『 ꜰᴀᴍɪɢʟɪᴀ 』 ${tag}`,
        jpegThumbnail: ppBuffer.toString('base64'),
        vcard: 'BEGIN:VCARD\nVERSION:3.0\nN:;Famiglia;;;\nFN:Famiglia\nEND:VCARD'
      }
    },
    participant: '0@s.whatsapp.net'
  }

  await conn.sendMessage(m.chat, {
    text: `ೋೋ┄┄ • ┄┄ೋೋ
> ꜰᴀᴍɪɢʟɪᴀ
ೋೋ┄┄ • ┄┄ೋೋ
ɴᴏᴍᴇ: ${tag}

ꜱᴘᴏꜱᴀᴛᴏ/ᴀ: ${user.sposato ? 'si' : 'no'}
ᴄᴏɴɪᴜɢᴇ: ${user.coniuge ? '@' + user.coniuge.split('@')[0] : 'nessuno'}
ᴛᴇꜱᴛɪᴍᴏɴᴇ: ${user.testimone ? '@' + user.testimone.split('@')[0] : 'nessuno'}

ᴇx ᴄᴏɴɪᴜɢɪ: ${exList.length ? exList.join(', ') : 'Nessuno'}

ᴀᴅᴏᴛᴛᴀᴛᴏ ᴅᴀ: ${adottatoDa ? '@' + adottatoDa.split('@')[0] : 'Nessuno'}
ꜰɪɢʟɪ ᴀᴅᴏᴛᴛᴀᴛɪ: ${adopList.length ? adopList.join(', ') : 'Nessuno'}

ᴍɪɢʟɪᴏʀᴇ ᴀᴍɪᴄᴏ: ${user.miglioreamico ? '@' + user.miglioreamico.split('@')[0] : 'nessuno'}
ೋೋ┄┄ • ┄┄ೋೋ`,
    mentions: [
      who,
      user.coniuge,
      user.testimone,
      user.miglioreamico,
      adottatoDa,
      ...(user.ex || []),
      ...(user.adottati || [])
    ].filter(Boolean)
  }, { quoted: fake })
}

handler.help = ['famiglia']
handler.tags = ['fun']
handler.command = ['famiglia']

export default handler