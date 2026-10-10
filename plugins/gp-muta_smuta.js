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

global.muteTimeouts = global.muteTimeouts || {}

const clearMuteTimeout = (jid) => {
  if (global.muteTimeouts[jid]) {
    clearTimeout(global.muteTimeouts[jid])
    delete global.muteTimeouts[jid]
  }
}

const scheduleMuteExpiry = (conn, chatId, targetJid, durationMs) => {
  clearMuteTimeout(targetJid)
  if (durationMs <= 0) return

  global.muteTimeouts[targetJid] = setTimeout(async () => {
    const currentUser = global.db?.data?.users?.[targetJid]
    if (currentUser?.muto && currentUser.muteUntil && Date.now() >= currentUser.muteUntil) {
      currentUser.muto = false
      delete currentUser.muteUntil
      delete global.muteTimeouts[targetJid]
      await conn.sendMessage(chatId, {
        text: `✔️ @${targetJid.split('@')[0]} *è stato smutato.*`,
        mentions: [targetJid]
      }).catch(() => {})
    } else {
      delete global.muteTimeouts[targetJid]
    }
  }, durationMs)
}

const muteDurations = [
  { id: '1m', label: '1 minuto', ms: 60 * 1000 },
  { id: '5m', label: '5 minuti', ms: 5 * 60 * 1000 },
  { id: '10m', label: '10 minuti', ms: 10 * 60 * 1000 },
  { id: '30m', label: '30 minuti', ms: 30 * 60 * 1000 },
  { id: '1h', label: '1 ora', ms: 60 * 60 * 1000 },
  { id: 'perm', label: 'Finché non viene smutato/a', ms: 0 }
]

const waitForMuteChoice = (conn, sender, timeout = 60000) => new Promise(resolve => {
  const listener = async ({ messages }) => {
    const msg = messages?.[0]
    if (!msg?.message) return
    const from = msg.key?.participant || msg.key?.remoteJid
    if (from !== sender) return
    const selectedButtonId = msg.message?.buttonsResponseMessage?.selectedButtonId
    if (!selectedButtonId) return
    conn.ev.off('messages.upsert', listener)
    resolve(selectedButtonId)
  }

  conn.ev.on('messages.upsert', listener)
  setTimeout(() => {
    conn.ev.off('messages.upsert', listener)
    resolve(null)
  }, timeout)
})

let handler = async (m, {
  conn, command, text, groupMetadata, isAdmin, isMods
}) => {

  const isOwner = (jid) => {
    return global.owner.some(([number]) => jid.includes(number))
  }

  const isGroupAdmin = (jid) => {
    const normalizedJid = conn.decodeJid?.(jid) || jid
    return groupMetadata?.participants?.some(participant => {
      const participantIds = [participant.id, participant.jid, participant.lid]
        .filter(Boolean)
        .map(participantId => conn.decodeJid?.(participantId) || participantId)
      return participantIds.includes(normalizedJid) && (participant.admin === 'admin' || participant.admin === 'superadmin' || participant.admin === true)
    })
  }

  if (command == 'muta') {

    const mods = global.db.data.chats[m.chat]?.moderatori || []
    const isMod = mods.some(mod => (conn.decodeJid?.(mod) || mod) === (conn.decodeJid?.(m.sender) || m.sender))

if (!isAdmin && !isMod)
  return m.reply('ꜱᴏʟᴏ ᴜɴ ᴀᴅᴍɪɴ ᴏ ᴜɴ ᴍᴏᴅᴇʀᴀᴛᴏʀᴇ ᴘᴜᴏ̀ ᴇꜱᴇɢᴜɪʀᴇ ǫᴜᴇꜱᴛᴏ ᴄᴏᴍᴀɴᴅᴏ 👑')

    let menzione = m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.quoted
      ? m.quoted.sender
      : text

    if (!menzione) return m.reply('ᴍᴇɴᴢɪᴏɴᴀ ᴜɴ ᴜᴛᴇɴᴛᴇ 👤')

    if (isMod && isGroupAdmin(menzione)) return m.reply('⛔ Un moderatore non può mutare un amministratore.')

    if (menzione == conn.user.jid) return 'ⓘ ɴᴏɴ ᴘᴜᴏɪ ᴍᴜᴛᴀʀᴇ ɪʟ ʙᴏᴛ'

    if (isOwner(menzione)) return '👑 ɴᴏɴ ᴘᴜᴏɪ ᴍᴜᴛᴀʀᴇ ᴜɴ ᴏᴡɴᴇʀ'

    let utente = global.db.data.users[menzione]
    if (!utente) return m.reply('ᴜᴛᴇɴᴛᴇ ɴᴏɴ ᴛʀᴏᴠᴀᴛᴏ')

    if (utente.muteUntil && Date.now() >= utente.muteUntil) {
      utente.muto = false
      delete utente.muteUntil
      clearMuteTimeout(menzione)
    }

    if (utente.muto === true)
      return 'ǫᴜᴇꜱᴛᴏ ᴜᴛᴇɴᴛᴇ ᴇ̀ ɢɪᴀ ᴍᴜᴛᴀᴛᴏ 🔇'

    let prova = {
      key: { participants: "0@s.whatsapp.net", fromMe: false, id: "Halo" },
      message: {
        locationMessage: {
          name: 'ᴜᴛᴇɴᴛᴇ ᴍᴜᴛᴀᴛᏫ 🔇',
          jpegThumbnail: await (await fetch('https://telegra.ph/file/f8324d9798fa2ed2317bc.png')).buffer()
        }
      },
      participant: "0@s.whatsapp.net"
    }

    const rawText = (text || '').trim()
    const parts = rawText.split(/\s+/).filter(Boolean)
    let motivo = 'non specificato ma meritato'
    if (m.quoted) {
      if (rawText) motivo = rawText
    } else if (parts.length > 1) {
      const maybe = parts.slice(1).join(' ').trim()
      if (maybe) motivo = maybe
    } else if (parts.length === 1) {
      const tok = parts[0]
      if (!tok.includes('@') && !/^\+?\d+$/.test(tok)) motivo = tok
    }

    const targetJid = menzione && menzione.includes('@') ? menzione : (menzione ? menzione.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null)
    const actorJid = m.sender

    await conn.sendMessage(m.chat, {
      text: `⚙️ Per quanto vuoi mutare l'utente?`,
      buttons: muteDurations.map(option => ({
        buttonId: `mute_duration_${option.id}`,
        buttonText: { displayText: option.label },
        type: 1
      })),
      headerType: 1
    }, { quoted: prova })

    const selected = await waitForMuteChoice(conn, actorJid)
    if (!selected) return m.reply('⏳ Tempo scaduto, muta annullato.')

    const selectedDuration = muteDurations.find(option => `mute_duration_${option.id}` === selected)
    if (!selectedDuration) return m.reply('✖️ Scelta non valida.')

    utente.muto = true
    if (selectedDuration.ms > 0) {
      utente.muteUntil = Date.now() + selectedDuration.ms
      scheduleMuteExpiry(conn, m.chat, targetJid, selectedDuration.ms)
    } else {
      clearMuteTimeout(targetJid)
      delete utente.muteUntil
    }

    const durationText = selectedDuration.ms > 0 ? `per ${selectedDuration.label}` : 'finché non viene smutato/a'
    const finalText = `@${(targetJid||'').split('@')[0]} *mutato da* @${actorJid.split('@')[0]}.\n\n*motivo:* ${motivo}\n*durata:* ${durationText}`

    await conn.sendMessage(m.chat, { text: finalText, mentions: [targetJid, actorJid] }, { quoted: prova })
    await logAdminAction(m.chat, m.sender, 'mute')
  }

  if (command == 'smuta') {

    const mods = global.db.data.chats[m.chat]?.moderatori || []
    const isMod = mods.some(mod => (conn.decodeJid?.(mod) || mod) === (conn.decodeJid?.(m.sender) || m.sender))

if (!isAdmin && !isMod)
  return m.reply('ꜱᴏʟᴏ ᴜɴ ᴀᴅᴍɪɴ ᴏ ᴜɴ ᴍᴏᴅᴇʀᴀᴛᴏʀᴇ ᴘᴜᴏ̀ ᴇꜱᴇɢᴜɪʀᴇ ǫᴜᴇꜱᴛᴏ ᴄᴏᴍᴀɴᴅᴏ 👑')

    let menzione = m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.quoted
      ? m.quoted.sender
      : text

    if (!menzione) return m.reply('ᴍᴇɴᴢɪᴏɴᴀ ᴜɴ ᴜᴛᴇɴᴛᴇ 👤')

    if (isMod && isGroupAdmin(menzione)) return m.reply('⛔ Un moderatore non può smutare un amministratore.')

    if (isOwner(menzione)) return '👑 ɢʟɪ ᴏᴡɴᴇʀ ɴᴏɴ ʜᴀɴɴᴏ ʙɪꜱᴏɢɴᴏ ᴅɪ ᴇꜱꜱᴇʀᴇ ꜱᴍᴜᴛᴀᴛɪ 😏'

    let utente = global.db.data.users[menzione]
    if (!utente) return m.reply('ᴜᴛᴇɴᴛᴇ ɴᴏɴ ᴛʀᴏᴠᴀᴛᴏ')

    if (utente.arrestoExpire && Date.now() < utente.arrestoExpire) {
      return m.reply('✖️ Questo utente è attualmente in arresto e non può essere smutato con questo comando.')
    }

    if (utente.arrestoExpire && Date.now() >= utente.arrestoExpire) {
      utente.muto = false
      utente.arrestoExpire = null
    }

    if (utente.muteUntil && Date.now() >= utente.muteUntil) {
      utente.muto = false
      delete utente.muteUntil
    }

    clearMuteTimeout(menzione)
    utente.muto = false
    delete utente.muteUntil

    let prova = {
      key: { participants: "0@s.whatsapp.net", fromMe: false, id: "Halo" },
      message: {
        locationMessage: {
          name: 'ᴜᴛᴇɴᴛᴇ ꜱᴍᴜᴛᴀᴛᏫ 🔊',
          jpegThumbnail: await (await fetch('https://telegra.ph/file/aea704d0b242b8c41bf15.png')).buffer()
        }
      },
      participant: "0@s.whatsapp.net"
    }

    const rawText = (text || '').trim()
    const parts = rawText.split(/\s+/).filter(Boolean)
    let motivo = 'non specificato ma meritato'
    if (m.quoted) {
      if (rawText) motivo = rawText
    } else if (parts.length > 1) {
      const maybe = parts.slice(1).join(' ').trim()
      if (maybe) motivo = maybe
    } else if (parts.length === 1) {
      const tok = parts[0]
      if (!tok.includes('@') && !/^\+?\d+$/.test(tok)) motivo = tok
    }

    const targetJid = menzione && menzione.includes('@') ? menzione : (menzione ? menzione.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null)
    const actorJid = m.sender

    const finalText = `@${(targetJid||'').split('@')[0]} *smutato da* @${actorJid.split('@')[0]}.\n\n *motivo:* ${motivo}`

    await conn.sendMessage(m.chat, { text: finalText, mentions: [targetJid, actorJid] }, { quoted: prova })
    await logAdminAction(m.chat, m.sender, 'unmute')
  }
}

handler.command = /^(muta|smuta)$/i
handler.group = true
handler.botAdmin = true

export default handler