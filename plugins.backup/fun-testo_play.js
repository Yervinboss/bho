//Plugin by Zeno

import fetch from 'node-fetch'
import { parse } from 'node-html-parser'

let handler = async (m, { conn }) => {
  const sender = m.sender
  const titoloOriginale = global.lyricsRequest?.[sender]

  if (!titoloOriginale)
    return m.reply("⏱️ ꜱᴏɴᴏ ᴘᴀꜱꜱᴀᴛɪ 𝟷𝟻 ꜱᴇᴄᴏɴᴅɪ ᴅᴀʟʟᴀ ɢᴇɴᴇʀᴀᴢɪᴏɴᴇ ᴅᴇʟʟᴀ ᴄᴀɴᴢᴏɴᴇ! ᴘᴇʀ ᴀᴠᴇʀᴇ ɪʟ ᴛᴇꜱᴛᴏ ꜰᴀʀᴇ ’’.ᴘʟᴀʏ (ᴄᴀɴᴢᴏɴᴇ)’’ ᴇ ꜱᴄʜɪᴀᴄᴄɪᴀʀᴇ ’’ꜱɪ’’ ᴇɴᴛʀᴏ 𝟷𝟻 ꜱᴇᴄᴏɴᴅɪ.")

  if (global.pendingLyrics?.[sender]) {
    clearTimeout(global.pendingLyrics[sender])
    delete global.pendingLyrics[sender]
  }

  try {
    const lyrics = await trovaTesto(titoloOriginale)

    if (!lyrics)
      throw "Non trovato"

    await conn.sendMessage(
      m.chat,
      {
        text:
`📜 ᴛᴇꜱᴛᴏ ᴅɪ *${titoloOriginale}*
⋆˚｡⋆୨🌸୧⋆｡˚⋆
${lyrics}
⋆˚｡⋆୨🌸୧⋆｡˚⋆
> ᴢᴇɴᴏʙᴏᴛ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ ʟʏʀɪᴄꜱ`
      },
      { quoted: m }
    )

  } catch (e) {
    m.reply(`✖️ ɴᴏɴ ʜᴏ ᴛʀᴏᴠᴀᴛᴏ ɪʟ ᴛᴇꜱᴛᴏ ᴅɪ "${titoloOriginale}".`)
  }

  delete global.lyricsRequest[sender]
}

handler.command = /^lyrics_yes$/i
handler.tags = ['fun']
handler.help = ['lyrics_yes']

export default handler


async function trovaTesto(titolo) {

  let cleanTitle = titolo

  if (cleanTitle.includes('–')) cleanTitle = cleanTitle.split('–')[1]
  else if (cleanTitle.includes('-')) cleanTitle = cleanTitle.split('-')[1]

  cleanTitle = cleanTitle
    .replace(/\(.*?\)/g, '')
    .replace(/\[.*?\]/g, '')
    .replace(/official video|video ufficiale|lyrics|testo|audio/gi, '')
    .replace(/feat\.?|ft\.?/gi, '')
    .replace(/,/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  let testo = await cercaGenius(cleanTitle)
  if (testo) return testo

  const parole = cleanTitle.split(' ').slice(0, 4).join(' ')
  testo = await cercaGenius(parole)
  if (testo) return testo

  return null
}

async function cercaGenius(query) {
  try {
    const searchUrl = `https://genius.com/api/search/multi?q=${encodeURIComponent(query)}`
    const searchRes = await fetch(searchUrl)
    const searchData = await searchRes.json()

    const sections = searchData?.response?.sections || []
    const songSection = sections.find(s => s.type === "song")
    const hit = songSection?.hits?.[0]

    if (!hit) return null

    const url = hit.result.url
    const pageRes = await fetch(url)
    const html = await pageRes.text()
    const root = parse(html)

    const lyrics = root
      .querySelectorAll("[data-lyrics-container='true']")
      .map(x => x.text.trim())
      .filter(Boolean)
      .join("\n\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim()

    return lyrics || null

  } catch {
    return null
  }
}