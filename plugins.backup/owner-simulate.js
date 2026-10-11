//Plugin by Zeno

import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, args: [evento], text }) => {
    if (!evento) return await m.reply(
`ⓘ ᴜꜱᴏ ᴅᴇʟ ᴄᴏᴍᴀɴᴅᴏ:

> ${usedPrefix + command} benvenuto @user
> ${usedPrefix + command} addio @user
> ${usedPrefix + command} promozione/p @user
> ${usedPrefix + command} retrocessione/r @user`) 
    
    let mentions = text.replace(evento, '').trimStart()
    let who = mentions ? conn.parseMention(mentions) : []
    let part = who.length ? who : [m.sender]
    let act = false
    let testoEvento = ''
    
    switch (evento.toLowerCase()) {
        case 'add':
        case 'invite':
        case 'welcome':
        case 'bienvenida':
        case 'benvenuto':       
            act = 'add'
            testoEvento = "ʙᴇɴᴠᴇɴᴜᴛᴏ"
            
            let groupMetadata = await conn.groupMetadata(m.chat);
            let chat = global.db.data.chats[m.chat];
            
            for (let user of part) {
                let profilePic;
                try {
                    profilePic = await conn.profilePictureUrl(user, 'image');
                } catch (e) {
                    profilePic = 'https://telegra.ph/file/8ca14ef9fa43e99d1d196.jpg';
                }
                
                let ppBuffer;
                try {
                    ppBuffer = await (await fetch(profilePic)).buffer();
                } catch (e) {
                    ppBuffer = await (await fetch('https://telegra.ph/file/8ca14ef9fa43e99d1d196.jpg')).buffer();
                }
                
                let welcomeText = chat.sWelcome || `┌⋆˚｡⋆୨🌸୧⋆｡˚⋆
┆ 👋 ʙᴇɴᴠᴇɴᴜᴛᴏ/ᴀ!
┆
┆ @user
┆
┆ 📱 ɢʀᴜᴘᴘᴏ: @group
┆ 👥 ᴍᴇᴍʙʀɪ: @count
┆
┆ 📜 ʟᴇɢɢɪ ʟᴀ ᴅᴇꜱᴄʀɪᴢɪᴏɴᴇ:
┆ @desc
└⋆˚｡⋆୨🌸୧⋆｡˚⋆`;
                
                let welcome = welcomeText
                    .replace('@user', `@${user.split('@')[0]}`)
                    .replace('@group', groupMetadata.subject)
                    .replace('@count', groupMetadata.participants.length)
                    .replace('@desc', groupMetadata.desc?.toString() || 'Nessuna descrizione');
                
                await conn.sendMessage(m.chat, {
                    text: welcome,
                    contextInfo: {
                        mentionedJid: [user],
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363341274693350@newsletter',
                            serverMessageId: '',
                            newsletterName: global.db.data.nomedelbot || 'ZENOBOT'
                        },
                        externalAdReply: {
                            title: '👋 ɴᴜᴏᴠᴏ ᴍᴇᴍʙʀᴏ',
                            body: `Benvenuto/a nel gruppo!`,
                            mediaType: 1,
                            renderLargerThumbnail: true,
                            thumbnail: ppBuffer,
                            sourceUrl: 'https://whatsapp.com/channel/0029VaeW5Tw4yltWm1NBJV3g'
                        }
                    }
                });
            }
            return;
            
        case 'bye':
        case 'kick':
        case 'leave':
        case 'remove':
        case 'sacar':
        case 'addio':
            act = 'remove'
            testoEvento = "ᴀᴅᴅɪᴏ"
            
            let groupMeta = await conn.groupMetadata(m.chat);
            let chatData = global.db.data.chats[m.chat];
            
            for (let user of part) {
                let profilePic;
                try {
                    profilePic = await conn.profilePictureUrl(user, 'image');
                } catch (e) {
                    profilePic = 'https://telegra.ph/file/8ca14ef9fa43e99d1d196.jpg';
                }
                
                let ppBuffer;
                try {
                    ppBuffer = await (await fetch(profilePic)).buffer();
                } catch (e) {
                    ppBuffer = await (await fetch('https://telegra.ph/file/8ca14ef9fa43e99d1d196.jpg')).buffer();
                }
                
                let byeText = chatData.sBye || `┌⋆˚｡⋆୨🌸୧⋆｡˚⋆
┆ 👋 ᴀᴅᴅɪᴏ!
┆
┆ @user
┆
┆ 📱 ɢʀᴜᴘᴘᴏ: @group
┆ 👥 ᴍᴇᴍʙʀɪ: @count
┆
┆ 💭 ᴄɪ ᴍᴀɴᴄʜᴇʀᴀɪ...
└⋆˚｡⋆୨🌸୧⋆｡˚⋆`;
                
                let bye = byeText
                    .replace('@user', `@${user.split('@')[0]}`)
                    .replace('@group', groupMeta.subject)
                    .replace('@count', groupMeta.participants.length);
                
                await conn.sendMessage(m.chat, {
                    text: bye,
                    contextInfo: {
                        mentionedJid: [user],
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363341274693350@newsletter',
                            serverMessageId: '',
                            newsletterName: global.db.data.nomedelbot || 'ZENOBOT'
                        },
                        externalAdReply: {
                            title: '👋 ᴀᴅᴅɪᴏ',
                            body: `Un membro ha lasciato il gruppo`,
                            mediaType: 1,
                            renderLargerThumbnail: true,
                            thumbnail: ppBuffer,
                            sourceUrl: 'https://whatsapp.com/channel/0029VaeW5Tw4yltWm1NBJV3g'
                        }
                    }
                });
            }
            return;
            
        case 'promote':
        case 'daradmin':
        case 'darpoder':
        case 'promozione':
        case 'p':       
            act = 'promote'
            testoEvento = "ᴘʀᴏᴍᴏᴢɪᴏɴᴇ"
            break
            
        case 'demote':
        case 'quitaradmin':
        case 'quitarpoder':
        case 'retrocessione':
        case 'r':       
            act = 'demote'
            testoEvento = "ʀᴇᴛʀᴏᴄᴇꜱꜱɪᴏɴᴇ"
            break
            
        default:
            throw `ⓘ ɪɴꜱᴇʀɪꜱᴄɪ ᴜɴᴀ ᴏᴘᴢɪᴏɴᴇ ᴠᴀʟɪᴅᴀ:

> ${usedPrefix + command} benvenuto @user
> ${usedPrefix + command} addio @user
> ${usedPrefix + command} promozione/p @user
> ${usedPrefix + command} retrocessione/r @user`
    }
    
    m.reply(`> ⚠️ ꜱɪᴍᴜʟᴀᴢɪᴏɴᴇ ${testoEvento}...
> ⓘ ɪʟ ʙᴏᴛ ꜱᴛᴀ ꜱɪᴍᴜʟᴀɴᴅᴏ ᴜɴ ᴇᴠᴇɴᴛᴏ, ꜱᴇɴᴢᴀ ᴇꜰꜰᴇᴛᴛɪ ᴄᴏɴᴄʀᴇᴛɪ ɴᴇʟ ɢʀᴜᴘᴘᴏ.`)
    
    if (act) return conn.participantsUpdate({
        id: m.chat,
        participants: part,
        action: act
    })
}

handler.help = ['ꜱɪᴍᴜʟᴀ'] 
handler.tags = ['owner']
handler.command = /^sim|simula$/i
handler.group = true

export default handler;
