//Plugin by Zeno

let handler = async(m, { conn }) => {

  global.prefix = new RegExp('^[' + (opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')
    await m.reply(`ⓘ ɪʟ ᴘʀᴇꜰɪꜱꜱᴏ ᴇ' ꜱᴛᴀᴛᴏ ʀᴇꜱᴇᴛᴛᴀᴛᴏ`)

}
handler.help = ['ʀᴇꜱᴇᴛᴛᴀᴘʀᴇꜰɪꜱꜱᴏ']
handler.tags = ['owner']
handler.command = /^(resetprefix|resettaprefisso)$/i
handler.rowner = true


export default handler
