//Plugin by Zeno, Lucifero & 333 staff

let handler = async (m, { conn }) => {

    const text = `🥸Zeno non ha peli in culo gli piace averlo liscio per far entrare tanti cazzi🍈🍌🍈
*Elevato alla terza = hide ha il cazzo enorme*
✅`

    await conn.sendMessage(m.chat, {
        text: text.trim()
    })
}

handler.command = ['peli']
handler.group = true

export default handler