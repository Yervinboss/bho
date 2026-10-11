//Plugin by Zeno

global.rigori = global.rigori || {}

let handler = async (m, { conn, command }) => {

  let user = global.db.data.users[m.sender]
  if (!user) return

  user.rigori = user.rigori || { goal: 0 }

  if (command === "rigore") {

    global.rigori[m.sender] = true

    return conn.sendMessage(m.chat, {
      text:
`┌┄⚽ ʀɪɢᴏʀᴇ ┄┐
┆ Scegli dove tirare
┆
┆ 🟢 Sinistra
┆ ⚪ Centro
┆ 🔴 Destra
└⋆˚｡⋆୨🌸୧⋆｡˚⋆┘`,
      buttons: [
        { buttonId: ".tira sinistra", buttonText: { displayText: "🟢 Sinistra" }, type: 1 },
        { buttonId: ".tira centro", buttonText: { displayText: "⚪ Centro" }, type: 1 },
        { buttonId: ".tira destra", buttonText: { displayText: "🔴 Destra" }, type: 1 }
      ],
      headerType: 1
    }, { quoted: m })
  }

  if (command === "tira") {

    if (!global.rigori[m.sender])
      return m.reply("✖️ Usa prima .rigore")

    let scelta = m.text.split(" ")[1]

    let portiere = ["sinistra", "centro", "destra"][
      Math.floor(Math.random() * 3)
    ]

    let gol = scelta !== portiere

    let text = ""

    if (gol) {
      user.rigori.goal += 1

      text =
`┌┄⚽ ɢᴏʟ ┄┐
┆ 🥅 Il portiere va ${portiere}
┆ Tu tiri ${scelta}
┆
┆ ⚽ SEGNI!
┆ Totale gol: *${user.rigori.goal}*
└⋆˚｡⋆୨🌸୧⋆｡˚⋆┘`
    } else {
      text =
`┌┄🧤 ᴘᴀʀᴀᴛᴀ ┄┐
┆ 🧤 Il portiere legge tutto
┆ Vai ${scelta} pure tu
┆
┆ 💀 Che figura
└⋆˚｡⋆୨🌸୧⋆｡˚⋆┘`
    }

    delete global.rigori[m.sender]

    return conn.sendMessage(m.chat, {
      text,
      buttons: [
        { buttonId: ".rigore", buttonText: { displayText: "⚽ Riprova" }, type: 1 },
        { buttonId: ".toprigori", buttonText: { displayText: "🏆 Classifica" }, type: 1 }
      ],
      headerType: 1
    }, { quoted: m })
  }

  if (command === "toprigori") {

    let users = Object.entries(global.db.data.users)
      .map(([jid, data]) => ({
        jid,
        goal: data.rigori?.goal || 0
      }))
      .filter(u => u.goal > 0)
      .sort((a, b) => b.goal - a.goal)
      .slice(0, 10)

    if (!users.length)
      return m.reply("✖️ Nessun gol registrato")

    let text = "🏆 ᴛᴏᴘ ʀɪɢᴏʀɪ\n\n"

    users.forEach((u, i) => {
      text += `${i + 1}. @${u.jid.split("@")[0]} — *${u.goal} gol*\n`
    })

    return conn.sendMessage(m.chat, {
      text,
      mentions: users.map(u => u.jid),
      buttons: [
        { buttonId: ".rigore", buttonText: { displayText: "⚽ Gioca" }, type: 1 }
      ],
      headerType: 1
    }, { quoted: m })
  }
}

handler.command = /^(rigore|tira|toprigori)$/i
export default handler