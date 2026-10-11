//Plugin by plugins zero

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const dbPath = path.join(__dirname, '../database/antilink.json')
const WHITELIST_DOMAINS = ['tiktok.com', 'instagram.com', 'youtube.com', 'youtu.be']
const RAW_LINK = /(https?:\/\/[^\s"\\]+)|(www\.[^\s"\\]+\.[a-z]{2,})/gi
const CRASH = /[\u0600-\u06FF\u0900-\u0DFF\u200B-\u200F]{300,}/
const MAX_RAW = 8000
const SKIP = new Set(['url', 'directPath', 'mediaKey', 'fileSha256', 'fileEncSha256', 'mediaKeyTimestamp',
    'jpegThumbnail', 'thumbnailDirectPath', 'thumbnailSha256', 'thumbnailEncSha256', 'waveform',
    'streamingSidecar', 'scansSidecar', 'scanLengths', 'midQualityFileSha256', 'quotedMessage'])
const strip = (k, v) => (SKIP.has(k) || v?.type === 'Buffer' || v instanceof Uint8Array) ? undefined : v
const MEDIA = ['imageMessage', 'videoMessage', 'audioMessage', 'stickerMessage', 'documentMessage', 'ptvMessage', 'lottieStickerMessage']
const BTN_IDS = ['antilinkkick', 'antilinkwarn', 'antilinkoff']

const pureId = (jid) => (jid || '').split('@')[0].split(':')[0]

function isOwnerCheck(sender) {
    if (!sender) return false
    const num = pureId(sender)
    const owners = global.owner || []
    return owners.some(o => {
        const id = Array.isArray(o) ? o[0] : o
        return String(id).replace(/\D/g, '') === num
    })
}

async function isImmuneCheck(conn, jid, sender) {
    if (isOwnerCheck(sender)) return true
    try {
        const meta = await conn.groupMetadata(jid)
        const p = meta.participants.find(x => x.id === sender)
        return !!(p && (p.admin === 'admin' || p.admin === 'superadmin'))
    } catch {
        return false
    }
}

function getDB() {
    if (!fs.existsSync(dbPath)) {
        fs.mkdirSync(path.dirname(dbPath), { recursive: true })
        fs.writeFileSync(dbPath, JSON.stringify({}))
    }
    try { return JSON.parse(fs.readFileSync(dbPath, 'utf-8')) } catch { return {} }
}
function saveDB(data) { fs.writeFileSync(dbPath, JSON.stringify(data, null, 2)) }

const isWhitelisted = (l) => WHITELIST_DOMAINS.some(d => l.toLowerCase().includes(d))

async function sendAntilinkButtons(conn, jid, status, m) {
    try {
        await conn.sendMessage(jid, {
            text: `🔗 *GESTIONE ANTILINK*\n\nStato: *${status}*\nWhitelist: TikTok, Instagram, YouTube\n\nScegli:`,
            footer: 'Zeno Bot - Moderazione',
            buttons: [
                { buttonId: 'antilinkkick', buttonText: { displayText: '🦵 Modalità Kick' }, type: 1 },
                { buttonId: 'antilinkwarn', buttonText: { displayText: '⚠️ Modalità Warn' }, type: 1 },
                { buttonId: 'antilinkoff', buttonText: { displayText: '❌ Disattiva' }, type: 1 }
            ],
            headerType: 1
        }, { quoted: m })
    } catch (e) {
        await conn.sendMessage(jid, {
            text: `🔗 *GESTIONE ANTILINK*\n\nStato: *${status}*\nWhitelist: TikTok, Instagram, YouTube\n\nComandi:\n• .antilinkkick\n• .antilinkwarn\n• .antilinkoff`
        }, { quoted: m })
    }
}

async function handleButton(conn, m, id) {
    const jid = m.chat
    const sender = m.sender
    const db = getDB()

    const isOwnerUser = isOwnerCheck(sender)
    const isImmuneUser = await isImmuneCheck(conn, jid, sender)
    if (!isOwnerUser && !isImmuneUser) {
        return conn.sendMessage(jid, { text: '❌ Solo admin!' }, { quoted: m })
    }

    if (id === 'antilinkkick') {
        db[jid] = { enabled: true, mode: 'kick' }; saveDB(db)
        return conn.sendMessage(jid, { text: '🔗🦵 Antilink *KICK* attivato.' }, { quoted: m })
    }
    if (id === 'antilinkwarn') {
        db[jid] = { enabled: true, mode: 'warn' }; saveDB(db)
        return conn.sendMessage(jid, { text: '🔗⚠️ Antilink *WARN* attivato.' }, { quoted: m })
    }
    if (id === 'antilinkoff') {
        delete db[jid]; saveDB(db)
        return conn.sendMessage(jid, { text: '🔗❌ Antilink disattivato.' }, { quoted: m })
    }
}

let handler = async (m, { conn, command, isROwner }) => {
    const jid = m.chat
    if (!jid.endsWith('@g.us'))
        return conn.sendMessage(jid, { text: '❌ Solo nei gruppi!' }, { quoted: m })

    const sender = m.sender
    const isOwnerUser = isROwner || isOwnerCheck(sender)
    const isImmuneUser = await isImmuneCheck(conn, jid, sender)
    if (!isOwnerUser && !isImmuneUser)
        return conn.sendMessage(jid, { text: '❌ Solo admin!' }, { quoted: m })

    const db = getDB()
    const cmd = (command || '').toLowerCase()

    if (cmd === 'antilinkkick') {
        db[jid] = { enabled: true, mode: 'kick' }; saveDB(db)
        return conn.sendMessage(jid, { text: '🔗🦵 Antilink *KICK* attivato.' }, { quoted: m })
    }
    if (cmd === 'antilinkwarn') {
        db[jid] = { enabled: true, mode: 'warn' }; saveDB(db)
        return conn.sendMessage(jid, { text: '🔗⚠️ Antilink *WARN* attivato.' }, { quoted: m })
    }
    if (cmd === 'antilinkoff') {
        delete db[jid]; saveDB(db)
        return conn.sendMessage(jid, { text: '🔗❌ Antilink disattivato.' }, { quoted: m })
    }

    const current = db[jid]
    const status = current ? `Attivo (${current.mode.toUpperCase()})` : 'Disattivo'
    return sendAntilinkButtons(conn, jid, status, m)
}

// ⚠️ before come proprietà dell'handler, NON come export separato
handler.before = async function (m, { conn, isAdmin, isBotAdmin }) {
    try {
        const jid = m.chat
        if (!jid || !jid.endsWith('@g.us')) return false

        const msg = m.message || {}

        // ---- CLICK SUI BOTTONI ----
        const btnReply =
            msg.buttonsResponseMessage?.selectedButtonId ||
            msg.templateButtonReplyMessage?.selectedId ||
            msg.listResponseMessage?.singleSelectReply?.selectedRowId ||
            msg.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson

        let btnId = ''
        if (btnReply) {
            btnId = btnReply
            if (typeof btnId === 'string' && btnId.trim().startsWith('{')) {
                try {
                    const parsed = JSON.parse(btnId)
                    btnId = parsed.id || parsed.buttonId || ''
                } catch {}
            }
        }

        // fallback: click che arriva come testo puro senza prefisso
        if (!btnId) {
            const txt = String(m.text || msg.conversation || msg.extendedTextMessage?.text || '').trim().toLowerCase()
            if (BTN_IDS.includes(txt)) btnId = txt
        }

        if (BTN_IDS.includes(btnId)) {
            await handleButton(conn, m, btnId)
            return true
        }

        // ---- CONTROLLO LINK ----
        const db = getDB()
        const settings = db[jid]
        if (!settings || !settings.enabled) return false

        const sender = m.sender
        if (!sender) return false

        if (isAdmin) return false
        if (await isImmuneCheck(conn, jid, sender)) return false

        const inner = msg.viewOnceMessage?.message || msg.viewOnceMessageV2?.message ||
                      msg.viewOnceMessageV2Extension?.message || msg.ephemeralMessage?.message ||
                      msg.documentWithCaptionMessage?.message || msg
        const mediaKey = MEDIA.find(k => inner[k])
        let raw = ''
        if (mediaKey) {
            raw = inner[mediaKey].caption || ''
        } else {
            try { raw = JSON.stringify(inner, strip) } catch {}
        }
        const crash = CRASH.test(raw) || (!mediaKey && raw.length > MAX_RAW)
        const hasLink = (raw.match(RAW_LINK) || []).some(l => !isWhitelisted(l))
        if (!crash && !hasLink) return false

        try { await conn.sendMessage(jid, { delete: m.key }) } catch {}

        if (crash || settings.mode === 'kick') {
            try {
                await conn.groupParticipantsUpdate(jid, [sender], 'remove')
                await conn.sendMessage(jid, { text: `🚫 @${pureId(sender)} rimosso per link.`, mentions: [sender] })
            } catch {
                await conn.sendMessage(jid, { text: `⚠️ @${pureId(sender)} ha mandato un link ma non riesco a rimuoverlo.`, mentions: [sender] })
            }
        } else {
            await conn.sendMessage(jid, { text: `⚠️ @${pureId(sender)}, link non consentiti!`, mentions: [sender] })
        }

        return true
    } catch (e) {
        console.error('antilink before:', e.message)
        return false
    }
}

handler.help = ['antilink', 'antilinkkick', 'antilinkwarn', 'antilinkoff']
handler.tags = ['admin']
handler.command = /^(antilink|antilinkkick|antilinkwarn|antilinkoff)$/i

export default handler

export const disabled = false
