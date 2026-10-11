//Plugin by Zeno

let handler = async (m, { conn }) => {
  const chat = global.db.data.chats[m.chat] || {}

  if (!chat.isBanned) {
    return conn.sendMessage(m.chat, {
      text: `⚠️ *CHAT GIÀ ATTIVA*

Il bot è già operativo qui.`
    }, { quoted: m })
  }

  chat.isBanned = false
  global.db.data.chats[m.chat] = chat

  await conn.sendMessage(m.chat, {
    text: `┌⋆˚｡⋆୨🌸୧⋆｡˚⋆┐
┆ ✔️ *BANCHAT RIMOSSO*
┆
┆ Il bot è di nuovo attivo
┆ nel gruppo.
┆
┆ 🤖 I comandi funzionano
┆ normalmente.
┆
┆ 👑 Riattivato da:
┆ @${m.sender.split('@')[0]}
└⋆˚｡⋆୨🌸୧⋆｡˚⋆┘`,
    mentions: [m.sender]
  }, { quoted: m })
}

handler.command = ['unbanchat']
handler.owner = true
handler.group = true

export default handler