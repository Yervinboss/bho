let handler = async (m, { conn }) => {
  let activeGroups = {}
  try {
    activeGroups = await conn.groupFetchAllParticipating()
  } catch {}
  let groups = Object.values(activeGroups)
    .filter(group => group && group.id)
    .map(group => {
      let jid = group.id.includes('@') ? group.id : `${group.id}@g.us`
      let data = global.db.data.chats?.[jid] || {}
      let total = data.totalmsg || 0
      if (!total && data.topUsers) {
        total = Object.values(data.topUsers).reduce((sum, value) => sum + (value || 0), 0)
      }
      if (!total && data.users) {
        total = Object.values(data.users).reduce((sum, user) => sum + ((user?.messages || 0)), 0)
      }
      let name = group.subject || group.name || data.name || data.subject || null
      return { jid, total, name }
    })
  groups.sort((a, b) => b.total - a.total)
  let top10 = groups.slice(0, 10)
  const medals = ['🥇', '🥈', '🥉']
  let text = `┌┄〔 🏆 ᴛᴏᴘ 𝟷𝟶 ɢʀᴜᴘᴘɪ 🏆 〕┄⬣\n`
  text += `┆ 📊 ᴄʟᴀꜱꜱɪꜰɪᴄᴀ ᴅᴇɪ ɢʀᴜᴘᴘɪ ᴘɪᴜ̀ ᴀᴛᴛɪᴠɪ\n`
  text += `┆\n`
  if (top10.length === 0) {
    text += `┆ ✖️ Nessun gruppo trovato\n`
  } else {
    for (let i = 0; i < top10.length; i++) {
      let g = top10[i]
      let name = g.name || 'Gruppo Privato 🔒'
      let icon = medals[i] || '🔹'
      text += `┆ ${icon} *${i + 1}°* ${name}\n`
      text += `┆ └ 💬 ${g.total} messaggi\n┆\n`
    }
  }
  text += `└┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄⬣`
  conn.sendMessage(m.chat, {
    text,
    contextInfo: {
      externalAdReply: {
        title: '🏆 ᴛᴏᴘ 𝟷𝟶 ɢʀᴜᴘᴘɪ',
        body: 'ᴇɴᴛʀᴀ ɴᴇλ ᴄᴀɴᴀλᴇ ᴅɪ ᴢᴇɴᴏʙᴏᴛ ʙᴏᴛ!',
        sourceUrl: 'https://whatsapp.com',
        mediaType: 1,
        renderLargerThumbnail: true
      }
    },
    buttons: [
      { buttonId: '.top', buttonText: { displayText: '🏆 ᴛᴏᴘ ᴜᴛᴇɴᴛɪ' }, type: 1 },
      { buttonId: '.statsgiornaliere', buttonText: { displayText: '📊 ꜱᴛᴀᴛɪꜱᴛɪᴄʜᴇ ɢɪᴏʀɴᴀʟɪᴇʀᴇ' }, type: 1 }
    ]
  }, { quoted: m })
}
handler.command = /^topgruppi$/i
handler.tags = ['info']
handler.help = ['topgruppi']
export default handler