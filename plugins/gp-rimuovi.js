//Codice di gp-rimuovi.js

//Plugin by Zeno, Lucifero & zenobot staff

import fetch from 'node-fetch'

const logAdminAction = async (chatId, adminJid, actionKey, amount = 1) => {
  if (typeof global.logAdmin?.increment === 'function') {
    await global.logAdmin.increment(chatId, adminJid, actionKey, amount)
  } else {
    global.logAdminQueue = global.logAdminQueue || []
    global.logAdminQueue.push({ chatId, adminJid, actionKey, amount })
  }
}

async function handler(m, {
isBotAdmin, isOwner, text, conn
}) {

if (!isBotAdmin) return m.reply('ⓘ ᴅᴇᴠᴏ ᴇꜱꜱᴇʀᴇ ᴀᴅᴍɪɴ ᴘᴇʀ ᴘᴏᴛᴇʀ ꜰᴜɴᴢɪᴏɴᴀʀᴇ')

const mention = m.mentionedJid?.[0] || m.quoted?.sender || null
const who = mention || m.sender
const normalize = jid => jid && conn.decodeJid ? conn.decodeJid(jid) : jid
const target = normalize(who)
const sender = normalize(m.sender)
const user = global.db.data.users[target] || {}

if (!target) return m.reply('ⓘ ᴍᴇɴᴢɪᴏɴᴀ ʟᴀ ᴘᴇʀꜱᴏɴᴀ ᴅᴀ ʀɪᴍᴜᴏᴠᴇʀᴇ')
if (target === sender || target === normalize(conn.user?.jid || conn.user?.id)) return m.reply('ⓘ ᴍᴇɴᴢɪᴏɴᴀ ʟᴀ ᴘᴇʀꜱᴏɴᴀ ᴅᴀ ʀɪᴍᴜᴏᴠᴇʀᴇ')

const groupMetadata = conn.chats?.[m.chat]?.metadata || await conn.groupMetadata(m.chat).catch(() => null)
const participants = groupMetadata?.participants || []
if (!participants.length) return m.reply('Impossibile verificare lo status del gruppo o del partecipante.')

const getParticipantIds = p => [p?.id, p?.jid, p?.lid].filter(Boolean).map(normalize)
const utente = participants.find(u => getParticipantIds(u).includes(target))
const senderData = participants.find(u => getParticipantIds(u).includes(sender))

const owner = utente?.admin === 'superadmin'
const admin = utente?.admin === 'admin' || utente?.admin === true
const senderIsAdmin = senderData?.admin === 'admin' || senderData?.admin === 'superadmin' || senderData?.admin === true
const configuredBotOwners = (global.owner || []).map(o => typeof o === 'string' ? normalize(`${o.replace(/[^0-9]/g, '')}@s.whatsapp.net`) : normalize(`${o?.[0]?.replace(/[^0-9]/g, '')}@s.whatsapp.net`)).filter(Boolean)
const dbOwners = Array.isArray(global.db?.data?.owners) ? global.db.data.owners.map(normalize).filter(Boolean) : []
const isBotOwner = configuredBotOwners.includes(target) || dbOwners.includes(target)

if (owner) return m.reply(`> ⚠️ ᴀɴᴛɪ-ᴋɪᴄᴋ\n> ⓘ ʟ'ᴜᴛᴇɴᴛᴇ ᴄʜᴇ ʜᴀɪ ᴘʀᴏᴠᴀᴛᴏ ᴀ ʀɪᴍᴜᴏᴠᴇʀᴇ ᴇ́ ɪʟ ᴄʀᴇᴀᴛᴏʀᴇ ᴅᴇʟ ɢʀᴜᴘᴘᴏ.`)
if (isBotOwner) return m.reply(`> ⚠️ ᴀɴᴛɪ-ᴋɪᴄᴋ\n> ⓘ ʟ'ᴜᴛᴇɴᴛᴇ ᴄʜᴇ ʜᴀɪ ᴘʀᴏᴠᴀᴛᴏ ᴀ ʀɪᴍᴜᴏᴠᴇʀᴇ ᴇ́ ᴜɴ ᴏᴡɴᴇʀ ᴅᴇʟ ʙᴏᴛ, ɴᴏɴ ᴘᴜᴏ̀ ᴇꜱꜱᴇʀᴇ ʀɪᴍᴏꜱꜱᴏ.`)
if (admin) return m.reply(`> ⚠️ ᴀɴᴛɪ-ᴋɪᴄᴋ\n> ⓘ ʟ'ᴜᴛᴇɴᴛᴇ ᴄʜᴇ ʜᴀɪ ᴘʀᴏᴠᴀᴛᴏ ᴀ ʀɪᴍᴜᴏᴠᴇʀᴇ ᴇ́ ᴀᴅᴍɪɴ.`)
if (senderIsAdmin && admin) return m.reply(`> ⚠️ ᴀɴᴛɪ-ᴋɪᴄᴋ\n> ⓘ ᴜɴ ᴀᴍᴍɪɴɪꜱᴛʀᴀᴛᴏʀᴇ ɴᴏɴ ᴘᴜᴏ̀ ʀɪᴍᴜᴏᴠᴇʀᴇ ᴜɴ ᴀʟᴛʀᴏ ᴀᴍᴍɪɴɪꜱᴛʀᴀᴛᴏʀᴇ.`)

async function remove() {
  const reason = text ? '\n\n> ᴍᴏᴛɪᴠᴏ: ' + text.replace(m.sender, '') : ''

  const fake = {
    key: {
      participants: '0@s.whatsapp.net',
      fromMe: false,
      id: 'zenobotKick'
    },
    message: {
      contactMessage: {
        displayName: `🚫 ʀɪᴍᴏᴢɪᴏɴᴇ`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${mention.split('@')[0]}:${mention.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    participant: '0@s.whatsapp.net'
  }

  conn.sendMessage(m.chat, {
    text: `@${mention.split`@`[0]} ᴇ́ ꜱᴛᴀᴛᴏ ꜱʙᴀᴛᴛᴜᴛᴏ ꜰᴜᴏʀɪ ᴀ ᴄᴀʟᴄɪ ɪɴ ᴄᴜʟᴏ ᴅᴀ @${m.sender.split`@`[0]} ${reason}`,
    mentions: [mention, m.sender, ...conn.parseMention(text)]
  }, { quoted: fake })

  await conn.groupParticipantsUpdate(m.chat, [mention], 'remove')
  await logAdminAction(m.chat, m.sender, 'removes')
}

if (mention) await remove()
}

handler.customPrefix = /kick|avadachedabra|puffo/i
handler.tags = ['admin']
handler.help = ['ᴋɪᴄᴋ/ᴘᴜꜰꜰᴏ/avadachedabra']
handler.command = new RegExp
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler