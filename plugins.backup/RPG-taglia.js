//Plugin by Zeno

import { loadBounty, saveBounty } from '../lib/bounty-store.js'

global.bounty = global.bounty || loadBounty()

let handler = m => m

handler.before = async function (m) {

    if (!m.isGroup) return
    if (!m.text) return

    const chat = global.db.data.chats[m.chat] || {}
    if (chat.taglia === false) return

    global.bounty = global.bounty || {}

    let data = global.bounty[m.chat] || {}

    if (data.last && Date.now() - data.last < 30 * 60 * 1000) return

    if (data.active) return

    if (Math.random() > 0.005) return

    let metadata = await this.groupMetadata(m.chat)
    let members = metadata.participants.map(p => p.id)

    let target = members[Math.floor(Math.random() * members.length)]

    let reward = Math.floor(Math.random() * (10000 - 100 + 1)) + 100

    let existing = global.bounty[m.chat] || {}

    global.bounty[m.chat] = {
        ...existing,
        active: true,
        target,
        reward,
        last: Date.now(),
        shots: []
    }
    saveBounty(global.bounty)

    await this.sendMessage(m.chat, {
        text: `🎯 ᴛᴀɢʟɪᴀ ᴀᴛᴛɪᴠᴀ!

👤 @${target.split('@')[0]} ʜᴀ ᴜɴᴀ ᴛᴀɢʟɪᴀ ᴅɪ ${reward} ZenoCoin

💥 ꜱᴄʀɪᴠɪ ’’.ꜱᴘᴀʀᴀ’’ ᴇɴᴛʀᴏ 𝟹𝟶 ꜱᴇᴄᴏɴᴅɪ ᴘᴇʀ ʀɪꜱᴄᴀᴛᴛᴀʀʟᴀ!`,
        contextInfo: {
            mentionedJid: [target]
        }
    })

    setTimeout(async () => {

        let current = global.bounty[m.chat]
        if (!current || !current.active) return

        current.active = false
        saveBounty(global.bounty)

        await this.sendMessage(m.chat, {
            text: `⌛ Tempo scaduto! Nessuno ha preso la taglia.`
        })

    }, 30000)
}

export default handler