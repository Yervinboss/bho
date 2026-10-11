//Plugin by plugins zero

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { pureId, isImmune, sendButtons } from '../lib/utils.js'
import { isOwner } from '../lib/owner.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const dbPath = path.join(__dirname, '../database/antilink.json')
const WHITELIST_DOMAINS = ['tiktok.com', 'instagram.com', 'youtube.com', 'youtu.be']
const LINK_REGEX = /(https?:\/\/[^\s]+)|(www\.[^\s]+\.[a-z]{2,})/gi
const RAW_LINK = /(https?:\/\/[^\s"\\]+)|(www\.[^\s"\\]+\.[a-z]{2,})/gi
const CRASH = /[\u0600-\u06FF\u0900-\u0DFF\u200B-\u200F]{300,}/
const MAX_RAW = 8000
const SKIP = new Set(['url', 'directPath', 'mediaKey', 'fileSha256', 'fileEncSha256', 'mediaKeyTimestamp',
    'jpegThumbnail', 'thumbnailDirectPath', 'thumbnailSha256', 'thumbnailEncSha256', 'waveform',
    'streamingSidecar', 'scansSidecar', 'scanLengths', 'midQualityFileSha256', 'quotedMessage'])
const strip = (k, v) => (SKIP.has(k) || v?.type === 'Buffer' || v instanceof Uint8Array) ? undefined : v
const MEDIA = ['imageMessage', 'videoMessage', 'audioMessage', 'stickerMessage', 'documentMessage', 'ptvMessage', 'lottieStickerMessage']

function getDB() {
    if (!fs.existsSync(dbPath)) {
        fs.mkdirSync(path.dirname(dbPath), { recursive: true });
        fs.writeFileSync(dbPath, JSON.stringify({}));
    }
    try { return JSON.parse(fs.readFileSync(dbPath, 'utf-8')); } catch { return {}; }
}
function saveDB(data) { fs.writeFileSync(dbPath, JSON.stringify(data, null, 2)); }

const isWhitelisted = (l) => WHITELIST_DOMAINS.some(d => l.toLowerCase().includes(d));
const containsForbidden = (t) => {
    if (!t) return false;
    const m = t.match(LINK_REGEX);
    if (!m) return false;
    return m.some(l => !isWhitelisted(l));
};

export async function before(m, { conn }) {
    try {
        const jid = m.chat;
        if (!jid || !jid.endsWith('@g.us')) return true;

        const db = getDB();
        const settings = db[jid];
        if (!settings || !settings.enabled) return true;

        const sender = m.sender;
        if (!sender) return true;

        if (await isImmune(conn, jid, sender)) return true;

        const msg = m.message || {};
        const inner = msg.viewOnceMessage?.message || msg.viewOnceMessageV2?.message ||
                      msg.viewOnceMessageV2Extension?.message || msg.ephemeralMessage?.message ||
                      msg.documentWithCaptionMessage?.message || msg;
        const mediaKey = MEDIA.find(k => inner[k]);
        let raw = '';
        if (mediaKey) {
            raw = inner[mediaKey].caption || '';
        } else {
            try { raw = JSON.stringify(inner, strip); } catch {}
        }
        const crash = CRASH.test(raw) || (!mediaKey && raw.length > MAX_RAW);
        const hasLink = (raw.match(RAW_LINK) || []).some(l => !isWhitelisted(l));
        if (!crash && !hasLink) return true;

        try { await conn.sendMessage(jid, { delete: m.key }); } catch {}

        if (crash || settings.mode === 'kick') {
            try {
                await conn.groupParticipantsUpdate(jid, [sender], 'remove');
                await conn.sendMessage(jid, { text: `🚫 @${pureId(sender)} rimosso per link.`, mentions: [sender] });
            } catch {
                await conn.sendMessage(jid, { text: `⚠️ @${pureId(sender)} ha mandato un link ma non riesco a rimuoverlo.`, mentions: [sender] });
            }
        } else {
            await conn.sendMessage(jid, { text: `⚠️ @${pureId(sender)}, link non consentiti!`, mentions: [sender] });
        }

        return false;
    } catch (e) {
        console.error('antilink before:', e.message);
        return true;
    }
}

export const commands = ['antilink', 'antilinkkick', 'antilinkwarn', 'antilinkoff']

export async function run(m, { conn, args, command }) {
    const jid = m.chat;
    if (!jid.endsWith('@g.us'))
        return await conn.sendMessage(jid, { text: '❌ Solo nei gruppi!' }, { quoted: m });

    const sender = m.sender;
    if (!isOwner(sender) && !(await isImmune(conn, jid, sender)))
        return await conn.sendMessage(jid, { text: '❌ Solo admin!' }, { quoted: m });

    const db = getDB();
    if (command === 'antilinkkick') { db[jid] = { enabled: true, mode: 'kick' }; saveDB(db); return conn.sendMessage(jid, { text: '🔗🦵 Antilink *KICK* attivato.' }, { quoted: m }); }
    if (command === 'antilinkwarn') { db[jid] = { enabled: true, mode: 'warn' }; saveDB(db); return conn.sendMessage(jid, { text: '🔗⚠️ Antilink *WARN* attivato.' }, { quoted: m }); }
    if (command === 'antilinkoff') { delete db[jid]; saveDB(db); return conn.sendMessage(jid, { text: '🔗❌ Antilink disattivato.' }, { quoted: m }); }

    const current = db[jid];
    const status = current ? `Attivo (${current.mode.toUpperCase()})` : 'Disattivo';
    return await sendButtons(conn, jid,
        `🔗 *GESTIONE ANTILINK*\n\nStato: *${status}*\nWhitelist: TikTok, Instagram, YouTube\n\nScegli:`,
        'Zeno Bot - Moderazione',
        [
            { text: '🦵 Modalità Kick', id: 'antilinkkick' },
            { text: '⚠️ Modalità Warn', id: 'antilinkwarn' },
            { text: '❌ Disattiva', id: 'antilinkoff' }
        ], m
    );
}

export const disabled = false
