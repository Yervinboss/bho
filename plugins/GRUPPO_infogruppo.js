//Plugin by Zeno, Lucifero & zenobot staff


const handler = async (m, { conn }) => {
  if (!m.isGroup) return m.reply('✖️ Questo comando funziona solo nei gruppi.');

  function progress(percent) {
    let bar = ''
    const total = 20
    const filled = Math.floor(percent * total / 100)
    for (let i = 0; i < total; i++) {
      bar += i < filled ? '█' : '▒'
    }
    return `${bar} ${percent}%`
  }

  const msg = await conn.sendMessage(m.chat,{
    text:`┌┄┄〔ᴢᴇɴᴏʙᴏᴛ ᴀᴠᴠɪᴀᴛᴏ〕┄┄┐

⌛ ᴀᴠᴠɪᴏ ꜱᴄᴀɴꜱɪᴏɴᴇ ɢʀᴜᴘᴘᴏ...

${progress(5)}`
  },{quoted:m})

  async function update(percent,text){
    await conn.sendMessage(m.chat,{
      text:`┌┄┄〔ᴢᴇɴᴏʙᴏᴛ ᴀᴠᴠɪᴀᴛᴏ〕┄┄┐

⌛ ${text}

${progress(percent)}`,
      edit:msg.key
    })
  }

  await new Promise(r=>setTimeout(r,700))
  await update(30,"ʀᴀᴄᴄᴏʟᴛᴀ ɪɴꜰᴏʀᴍᴀᴢɪᴏɴɪ")
  await new Promise(r=>setTimeout(r,700))
  await update(60,"ᴀɴᴀʟɪꜱɪ ᴍᴇᴍʙʀɪ")
  await new Promise(r=>setTimeout(r,700))
  await update(85,"ᴠᴇʀɪꜰɪᴄᴀ ᴘᴇʀᴍᴇꜱꜱɪ")
  await new Promise(r=>setTimeout(r,700))
  await update(100,"ᴄᴏᴍᴘʟᴇᴛᴀᴛᴏ ᴄᴏɴ ꜱᴜᴄᴄᴇꜱꜱᴏ!")

  const metadata = await conn.groupMetadata(m.chat)
  const nome = metadata.subject
  const id = m.chat
  const creatoreJid = metadata.owner
  const descrizione = metadata.desc || "Nessuna descrizione"
  const membri = metadata.participants.length
  const adminsList = metadata.participants.filter(p=>p.admin)
  const admins = adminsList.length
  const percentualeAdmin = Math.floor((admins/membri)*100)
  const creatoIl = new Date(metadata.creation*1000).toLocaleDateString('it-IT')
  const giorniVita = Math.floor((Date.now() - metadata.creation*1000)/86400000)
  const annunci = metadata.announce ? "ꜱᴏʟᴏ ᴀᴅᴍɪɴ ᴘᴏꜱꜱᴏɴᴏ ꜱᴄʀɪᴠᴇʀᴇ" : "ᴄʜᴀᴛ ᴀᴘᴇʀᴛᴀ ᴀ ᴛᴜᴛᴛɪ"
  const restrizioni = metadata.restrict ? "ꜱᴏʟᴏ ᴀᴅᴍɪɴ ᴘᴏꜱꜱᴏɴᴏ\n┆ ᴍᴏᴅɪꜰɪᴄᴀʀᴇ ɪɴꜰᴏ" : "ᴛᴜᴛᴛɪ ᴘᴏꜱꜱᴏɴᴏ\n┆ ᴍᴏᴅɪꜰɪᴄᴀʀᴇ ɪɴꜰᴏ"

  const chatData = global.db.data.chats[m.chat] || {}
  let messaggiTotali = chatData.totalmsg || 0
  if (!messaggiTotali && chatData.topUsers) {
    messaggiTotali = Object.values(chatData.topUsers).reduce((sum, value) => sum + (value || 0), 0)
  }
  if (!messaggiTotali && chatData.users) {
    messaggiTotali = Object.values(chatData.users).reduce((sum, user) => sum + ((user?.messages || 0)), 0)
  }

  const getSafeName = async (jid) => {
    const fallback = jid.split('@')[0]
    if (!conn.getName) return fallback
    try {
      const name = await Promise.resolve(conn.getName(jid))
      return typeof name === 'string' && name ? name : fallback
    } catch {
      return fallback
    }
  }

  const creatoreNome = creatoreJid ? await getSafeName(creatoreJid) : null
  const creatore = creatoreNome ? '@'+creatoreNome : "Sconosciuto"

  let listaAdmin=''
  let mentions=[]
  for (let admin of adminsList){
    const numero = admin.id.split('@')[0]
    listaAdmin += `┆ @${numero}\n`
    mentions.push(admin.id)
  }
  if (creatoreJid) mentions.push(creatoreJid)

  await conn.sendMessage(m.chat,{delete:msg.key})

  const messaggio=`
┌┄┄『 👥 ɪɴꜰᴏ ɢʀᴜᴘᴘᴏ 』┄┄┐
┆
┆ 📛 ɴᴏᴍᴇ ɢʀᴜᴘᴘᴏ: *${nome}*
┆
┆ 🛡️ ᴄʀᴇᴀᴛᴏ ᴅᴀ: ${creatore}
┆ 📆 ɪʟ ɢɪᴏʀɴᴏ: *${creatoIl}*
┆ ⏳ ᴀᴛᴛɪᴠᴏ ᴅᴀ: *${giorniVita}* ɢɪᴏʀɴɪ
┆
┆ 👥 ᴍᴇᴍʙʀɪ ᴛᴏᴛᴀʟɪ: *${membri}*
┆ 🔧 ᴀᴅᴍɪɴ ᴛᴏᴛᴀʟɪ: *${admins}* 
┆
┆ 💬 ᴍᴇꜱꜱᴀɢɢɪ ᴛᴏᴛᴀʟɪ: *${messaggiTotali}*
┆ (vengono contati\n┆ dal momento in\n┆ cui il bot entra\n┆ nel gruppo)
┆
┆ 🔒 ᴀɴɴᴜɴᴄɪ: ${annunci}
┆ ⚙️ ʀᴇꜱᴛʀɪᴢɪᴏɴɪ: ${restrizioni}
┆
┆ 👑 ᴀᴅᴍɪɴ ᴅᴇʟ ɢʀᴜᴘᴘᴏ:
${listaAdmin}┆
└┄┄┄┄┄┄┄┄┄┄┄┘
`

  await conn.sendMessage(
    m.chat,
    {
      text: messaggio,
      contextInfo: { mentionedJid: mentions },
      footer: '❖ ᴢᴇɴᴏʙᴏᴛ ',
      buttons: [
        { buttonId: '.link', buttonText: { displayText: '🔗 ʟɪɴᴋ ᴅᴇʟ ɢʀᴜᴘᴘᴏ' }, type: 1 },
        { buttonId: '.menu', buttonText: { displayText: '📜 ᴍᴇɴᴜ ᴘʀɪɴᴄɪᴘᴀʟᴇ' }, type: 1 }
      ],
      headerType: 1
    },
    { quoted: m }
  )
}

handler.command=['infogruppo','groupinfo','infogc']
handler.group=true
export default handler