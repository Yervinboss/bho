//Plugin by Zeno, Lucifero & zenobot staff

const bandieraCooldownTime = 60000;

const setBandieraCooldown = (chat) => {
    global.cooldowns = global.cooldowns || {};
    global.cooldowns[`bandiera_${chat}`] = Date.now();
};

let handler = async (m, { conn, args, participants, isAdmin, isBotAdmin, usedPrefix, command }) => {
    let frasi = [
        `ɪɴᴅᴏᴠɪɴᴀ ʟᴀ ʙᴀɴᴅɪᴇʀᴀ!`,
        `ɪɴᴅᴏᴠɪɴᴀ ʟᴀ ɴᴀᴢɪᴏɴᴇ ʀᴀᴘᴘʀᴇꜱᴇɴᴛᴀᴛᴀ ᴅᴀ ǫᴜᴇꜱᴛᴀ ʙᴀɴᴅɪᴇʀᴀ!`,
        `ᴠᴇᴅɪᴀᴍᴏ ǫᴜᴀɴᴛᴏ ꜱᴇɪ ʙʀᴀᴠᴏ/ᴀ ɪɴ ɢᴇᴏɢʀᴀꜰɪᴀ!`,
        `ꜱɪɪ ɪʟ ᴘʀɪᴍᴏ/ᴀ ᴀᴅ ɪɴᴅᴏᴠɪɴᴀʀᴇ ʟᴀ ʙᴀɴᴅɪᴇʀᴀ!`,
        `ǫᴜɪᴢ ꜱᴜʟʟᴇ ʙᴀɴᴅɪᴇʀᴇ, ꜱᴀɪ ᴅɪʀᴍɪ ᴄʜᴇ ᴘᴀᴇꜱᴇ ʀᴀᴘᴘʀᴇꜱᴇɴᴛᴀ?`,
        `ꜱᴄᴏᴘʀɪᴀᴍᴏ ᴄʜᴇ ᴠᴏᴛᴏ ᴀᴠᴇᴠɪ ɪɴ ɢᴇᴏɢʀᴀꜰɪᴀ, ɪɴᴅᴏᴠɪɴᴀ ʟᴀ ʙᴀɴᴅɪᴇʀᴀ!`,
        `ᴘᴇɴꜱᴀ ᴀᴛᴛᴇɴᴛᴀᴍᴇɴᴛᴇ ᴇ ɪɴᴅᴏᴠɪɴᴀ ʟᴀ ʙᴀɴᴅɪᴇʀᴀ!`,
    ];

    if (m.text?.toLowerCase() === '.skipbandiera') {
        if (!m.isGroup) return m.reply('ǫᴜᴇꜱᴛᴏ ᴄᴏᴍᴀɴᴅᴏ ᴇ̀ ᴜᴛɪʟɪᴢᴢᴀʙɪʟᴇ ꜱᴏʟᴏ ɴᴇɪ ɢʀᴜᴘᴘɪ.⚠️');
        if (!global.bandieraGame?.[m.chat]) return m.reply('ɴᴇꜱꜱᴜɴᴀ ᴘᴀʀᴛɪᴛᴀ ᴀᴛᴛɪᴠᴀ ᴀʟ ᴍᴏᴍᴇɴᴛᴏ.');

        if (!isAdmin && !m.fromMe) {
            return m.reply('ᴄᴏᴍᴀɴᴅᴏ ᴅɪꜱᴘᴏɴɪʙɪʟᴇ ꜱᴏʟᴏ ᴘᴇʀ ᴀᴅᴍɪɴ!');
        }

        clearTimeout(global.bandieraGame[m.chat].timeout);
        setBandieraCooldown(m.chat);
        
        let skipText = `ᴘᴀʀᴛɪᴛᴀ ɪɴᴛᴇʀʀᴏᴛᴛᴀ ᴅᴀ ᴜɴ ᴀᴅᴍɪɴ!\n\n`;
        skipText += `┌┄┄┄┄┄┄┄┄┄┐\n`
        skipText += `┆ 🏳️ ʟᴀ ʙᴀɴᴅɪᴇʀᴀ ᴇʀᴀ: \n┆ ‼️  *\`${global.bandieraGame[m.chat].rispostaOriginale}\`*\n`;
        skipText += `└┄┄┄┄┄┄┄┄┄┘`;

        await conn.sendMessage(m.chat, {
            text: skipText,
            footer: 'ᴢᴇɴᴏʙᴏᴛ'
        }, { quoted: m });
        delete global.bandieraGame[m.chat];
        return;
    }
    
    if (global.bandieraGame?.[m.chat]) {
        return m.reply('ᴄ’ᴇ̀ ɢɪᴀ̀ ᴜɴᴀ ᴘᴀʀᴛɪᴛᴀ ɪɴ ᴄᴏʀꜱᴏ, ꜱʙʀɪɢᴀᴛɪ ᴘʀɪᴍᴀ ᴄʜᴇ ꜱᴄᴀᴅᴀ ɪʟ ᴛᴇᴍᴘᴏ!');
    }

    const cooldownKey = `bandiera_${m.chat}`;
    const lastGame = global.cooldowns?.[cooldownKey] || 0;
    const now = Date.now();
    const cooldownTime = bandieraCooldownTime;

    if (now - lastGame < cooldownTime) {
        const remainingTime = Math.ceil((cooldownTime - (now - lastGame)) / 1000);
        return m.reply(`ᴅᴇᴠɪ ᴀꜱᴘᴇᴛᴛᴀʀᴇ ᴀɴᴄᴏʀᴀ ${remainingTime} ꜱᴇᴄᴏɴᴅɪ ᴘʀɪᴍᴀ ᴅɪ ɪɴɪᴢɪᴀʀᴇ ᴜɴᴀ ɴᴜᴏᴠᴀ ᴘᴀʀᴛɪᴛᴀ. ⏳`);
    }

    let bandiere = [
        { url: 'https://flagcdn.com/w320/it.png', nome: 'Italia' },
        { url: 'https://flagcdn.com/w320/fr.png', nome: 'Francia' },
        { url: 'https://flagcdn.com/w320/de.png', nome: 'Germania' },
        { url: 'https://flagcdn.com/w320/gb.png', nome: 'Regno Unito' },
        { url: 'https://flagcdn.com/w320/es.png', nome: 'Spagna' },
        { url: 'https://flagcdn.com/w320/se.png', nome: 'Svezia' },
        { url: 'https://flagcdn.com/w320/no.png', nome: 'Norvegia' },
        { url: 'https://flagcdn.com/w320/fi.png', nome: 'Finlandia' },
        { url: 'https://flagcdn.com/w320/dk.png', nome: 'Danimarca' },
        { url: 'https://flagcdn.com/w320/pl.png', nome: 'Polonia' },
        { url: 'https://flagcdn.com/w320/pt.png', nome: 'Portogallo' },
        { url: 'https://flagcdn.com/w320/gr.png', nome: 'Grecia' },
        { url: 'https://flagcdn.com/w320/ch.png', nome: 'Svizzera' },
        { url: 'https://flagcdn.com/w320/at.png', nome: 'Austria' },
        { url: 'https://flagcdn.com/w320/be.png', nome: 'Belgio' },
        { url: 'https://flagcdn.com/w320/nl.png', nome: 'Paesi Bassi' },
        { url: 'https://flagcdn.com/w320/ua.png', nome: 'Ucraina' },
        { url: 'https://flagcdn.com/w320/ro.png', nome: 'Romania' },
        { url: 'https://flagcdn.com/w320/hu.png', nome: 'Ungheria' },
        { url: 'https://flagcdn.com/w320/cz.png', nome: 'Repubblica Ceca' },
        { url: 'https://flagcdn.com/w320/ie.png', nome: 'Irlanda' },
        { url: 'https://flagcdn.com/w320/bg.png', nome: 'Bulgaria' },
        { url: 'https://flagcdn.com/w320/md.png', nome: 'Moldavia' },
        { url: 'https://flagcdn.com/w320/us.png', nome: 'Stati Uniti' },
        { url: 'https://flagcdn.com/w320/ca.png', nome: 'Canada' },
        { url: 'https://flagcdn.com/w320/mx.png', nome: 'Messico' },
        { url: 'https://flagcdn.com/w320/br.png', nome: 'Brasile' },
        { url: 'https://flagcdn.com/w320/ar.png', nome: 'Argentina' },
        { url: 'https://flagcdn.com/w320/cl.png', nome: 'Cile' },
        { url: 'https://flagcdn.com/w320/co.png', nome: 'Colombia' },
        { url: 'https://flagcdn.com/w320/pe.png', nome: 'Perù' },
        { url: 'https://flagcdn.com/w320/ve.png', nome: 'Venezuela' },
        { url: 'https://flagcdn.com/w320/cu.png', nome: 'Cuba' },
        { url: 'https://flagcdn.com/w320/au.png', nome: 'Australia' },
        { url: 'https://flagcdn.com/w320/nz.png', nome: 'Nuova Zelanda' },
        { url: 'https://flagcdn.com/w320/cn.png', nome: 'Cina' },
        { url: 'https://flagcdn.com/w320/jp.png', nome: 'Giappone' },
        { url: 'https://flagcdn.com/w320/in.png', nome: 'India' },
        { url: 'https://flagcdn.com/w320/kr.png', nome: 'Corea del Sud' },
        { url: 'https://flagcdn.com/w320/th.png', nome: 'Thailandia' },
        { url: 'https://flagcdn.com/w320/vn.png', nome: 'Vietnam' },
        { url: 'https://flagcdn.com/w320/id.png', nome: 'Indonesia' },
        { url: 'https://flagcdn.com/w320/ph.png', nome: 'Filippine' },
        { url: 'https://flagcdn.com/w320/my.png', nome: 'Malesia' },
        { url: 'https://flagcdn.com/w320/sg.png', nome: 'Singapore' },
        { url: 'https://flagcdn.com/w320/pk.png', nome: 'Pakistan' },
        { url: 'https://flagcdn.com/w320/af.png', nome: 'Afghanistan' },
        { url: 'https://flagcdn.com/w320/ir.png', nome: 'Iran' },
        { url: 'https://flagcdn.com/w320/iq.png', nome: 'Iraq' },
        { url: 'https://flagcdn.com/w320/tr.png', nome: 'Turchia' },
        { url: 'https://flagcdn.com/w320/il.png', nome: 'Israele' },
        { url: 'https://flagcdn.com/w320/sa.png', nome: 'Arabia Saudita' },
        { url: 'https://flagcdn.com/w320/ae.png', nome: 'Emirati Arabi Uniti' },
        { url: 'https://flagcdn.com/w320/qa.png', nome: 'Qatar' },
        { url: 'https://flagcdn.com/w320/eg.png', nome: 'Egitto' },
        { url: 'https://flagcdn.com/w320/ng.png', nome: 'Nigeria' },
        { url: 'https://flagcdn.com/w320/ma.png', nome: 'Marocco' },
        { url: 'https://flagcdn.com/w320/tn.png', nome: 'Tunisia' },
        { url: 'https://flagcdn.com/w320/ke.png', nome: 'Kenya' },
        { url: 'https://flagcdn.com/w320/et.png', nome: 'Etiopia' },
        { url: 'https://flagcdn.com/w320/gh.png', nome: 'Ghana' },
        { url: 'https://flagcdn.com/w320/cm.png', nome: 'Camerun' },
        { url: 'https://flagcdn.com/w320/ci.png', nome: "Costa d'Avorio" },
        { url: 'https://flagcdn.com/w320/sn.png', nome: 'Senegal' },
        { url: 'https://flagcdn.com/w320/za.png', nome: 'Sudafrica' },
        { url: 'https://flagcdn.com/w320/dz.png', nome: 'Algeria' },
        { url: 'https://flagcdn.com/w320/sd.png', nome: 'Sudan' },
        { url: 'https://flagcdn.com/w320/cd.png', nome: 'Repubblica Democratica del Congo' },
        { url: 'https://flagcdn.com/w320/ao.png', nome: 'Angola' },
        { url: 'https://flagcdn.com/w320/mg.png', nome: 'Madagascar' },
        { url: 'https://flagcdn.com/w320/tz.png', nome: 'Tanzania' },
        { url: 'https://flagcdn.com/w320/ug.png', nome: 'Uganda' },
    ];
    
    let scelta = bandiere[Math.floor(Math.random() * bandiere.length)];
    let frase = frasi[Math.floor(Math.random() * frasi.length)];

    try {
        let startCaption =`\`${frase}\`\n\n`;
        startCaption += `🏳️ ʀɪꜱᴘᴏɴᴅɪ ᴄᴏɴ ɪʟ ɴᴏᴍᴇ ᴅᴇʟʟᴀ ɴᴀᴢɪᴏɴᴇ!\n`;
        startCaption += `⏱️ ᴛᴇᴍᴘᴏ ᴅɪꜱᴘᴏɴɪʙɪʟᴇ: 𝟹𝟶 ꜱᴇᴄᴏɴᴅɪ\n\n`;
        startCaption += `> ᴀᴛᴛᴇɴᴢɪᴏɴᴇ! ᴘᴇʀ ꜰᴀʀ ʟᴇɢɢᴇʀᴇ ʟᴀ ʀɪꜱᴘᴏꜱᴛᴀ ᴀʟ ʙᴏᴛ ʀɪꜱᴘᴏɴᴅɪ ᴀ ǫᴜᴇꜱᴛᴏ ᴍᴇꜱꜱᴀɢɢɪᴏ, ᴀʟᴛʀɪᴍᴇɴᴛɪ ɴᴏɴ ʟᴀ ʟᴇɢɢᴇʀᴀ̀!`;

        let msg = await conn.sendMessage(m.chat, {
            image: { url: scelta.url },
            caption: startCaption,
            footer: 'ᴢᴇɴᴏʙᴏᴛ'
        }, { quoted: m });
        
        global.bandieraGame = global.bandieraGame || {};
        global.bandieraGame[m.chat] = {
            id: msg.key.id,
            risposta: scelta.nome.toLowerCase(),
            rispostaOriginale: scelta.nome,
            tentativi: {},
            suggerito: false,
            startTime: Date.now(),
            timeout: setTimeout(async () => {
                if (global.bandieraGame?.[m.chat]) {
                    let timeoutText = `                 ᴛᴇᴍᴘᴏ ꜱᴄᴀᴅᴜᴛᴏ!\n`;
                    timeoutText += `┌┄┄┄┄┄┄┄┄┄┐\n`
                    timeoutText += `┆ ✔️ ʀɪꜱᴘᴏꜱᴛᴀ ᴇꜱᴀᴛᴛᴀ:\n┆ ‼️  *\`${scelta.nome}\`*\n`;
                    timeoutText += `┆ 💡 ɴᴏɴ ᴀʙʙᴀᴛᴛᴇʀᴛɪ, ʀɪᴛᴇɴᴛᴀ!\n`;
                    timeoutText += `└┄┄┄┄┄┄┄┄┄┘`;
                    
                    await conn.sendMessage(m.chat, {
                        text: timeoutText,
                        footer: 'ᴢᴇɴᴏʙᴏᴛ'
                    }, { quoted: msg });
                    setBandieraCooldown(m.chat);
                    delete global.bandieraGame[m.chat];
                }
            }, 30000)
        };
    } catch (error) {
        console.error('Errore nel gioco bandiere:', error);
        m.reply('✖️ ᴇʀʀᴏʀᴇ ɪɴᴀᴛᴛᴇꜱᴏ ᴅᴜʀᴀɴᴛᴇ ʟ’ᴀᴠᴠɪᴏ ᴅᴇʟʟᴀ ᴘᴀʀᴛɪᴛᴀ, ʀɪᴘʀᴏᴠᴀ ᴛʀᴀ ᴘᴏᴄᴏ.');
    }
};

function normalizeString(str) {
    if (!str) return '';
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s]/g, '')
        .trim();
}

function calculateSimilarity(str1, str2) {
    const words1 = str1.split(' ').filter(word => word.length > 1);
    const words2 = str2.split(' ').filter(word => word.length > 1);

    if (words1.length === 0 || words2.length === 0) return 0;

    const matches = words1.filter(word =>
        words2.some(w2 => w2.includes(word) || word.includes(w2))
    );

    return matches.length / Math.max(words1.length, words2.length);
}

function isAnswerCorrect(userAnswer, correctAnswer) {
    if (userAnswer.length < 2) return false;

    const similarityScore = calculateSimilarity(userAnswer, correctAnswer);

    return (
        userAnswer === correctAnswer ||
        (correctAnswer.includes(userAnswer) && userAnswer.length > correctAnswer.length * 0.5) ||
        (userAnswer.includes(correctAnswer) && userAnswer.length < correctAnswer.length * 1.5) ||
        similarityScore >= 0.8
    );
}

handler.before = async (m, { conn }) => {
    const chat = m.chat;
    const game = global.bandieraGame?.[chat];
    
    if (!game || !m.quoted || m.quoted.id !== game.id || m.key.fromMe) return;

    const userAnswer = normalizeString(m.text || '');
    const correctAnswer = normalizeString(game.risposta);

    if (!userAnswer || userAnswer.length < 2) return;

    const similarityScore = calculateSimilarity(userAnswer, correctAnswer);

    if (isAnswerCorrect(userAnswer, correctAnswer)) {
        clearTimeout(game.timeout);

        const timeTaken = Math.round((Date.now() - game.startTime) / 1000);
        let reward = Math.floor(Math.random() * 31) + 20;
        let exp = 150;

        const timeBonus = timeTaken <= 10 ? 20 : timeTaken <= 20 ? 10 : 0;
        reward += timeBonus;

        if (!global.db.data.users[m.sender]) global.db.data.users[m.sender] = {};

        let congratsMessage =    `ᴄᴏᴍᴘʟɪᴍᴇɴᴛɪ, ʀɪꜱᴘᴏꜱᴛᴀ ᴇꜱᴀᴛᴛᴀ!\n\n`;
        congratsMessage += `┌┄┄┄┄┄┄┄┄┄┐\n`
        congratsMessage += `┆ ✔️  ɴᴀᴢɪᴏɴᴇ: *\`${game.rispostaOriginale}\`*\n`;
        congratsMessage += `┆ ⏳  ᴛᴇᴍᴘᴏ ɪᴍᴘɪᴇɢᴀᴛᴏ: *${timeTaken}s*\n`;
        congratsMessage += `└┄┄┄┄┄┄┄┄┄┘`;
        
        await conn.sendMessage(chat, {
            text: congratsMessage,
            footer: 'ᴢᴇɴᴏʙᴏᴛ'
        }, { quoted: m });
        setBandieraCooldown(chat);
        delete global.bandieraGame[chat];
        
    } else if (similarityScore >= 0.6 && !game.suggerito) {
        game.suggerito = true;
        await conn.reply(chat, '👀 *Ci sei quasi!*', m);
        
    } else if ((game.tentativi[m.sender] || 0) >= 2) {
        let failText = `      ʜᴀɪ ᴇꜱᴀᴜʀɪᴛᴏ ɪ ᴛᴇɴᴛᴀᴛɪᴠɪ!\n\n`;
        failText += `┌┄┄┄┄┄┄┄┄┄┐\n`
        failText += `┆ ✖️  ʜᴀɪ ᴅᴀᴛᴏ 𝟹 ʀɪꜱᴘᴏꜱᴛᴇ ᴇʀʀᴀᴛᴇ\n`;
        failText += `┆  ⏳ ᴀᴛᴛᴇɴᴅɪ ʟᴀ ꜰɪɴᴇ ᴅᴇʟ ʀᴏᴜɴᴅ!\n`;
        failText += `└┄┄┄┄┄┄┄┄┄┘`;
        
        await conn.sendMessage(chat, {
            text: failText,
            footer: 'ᴢᴇɴᴏʙᴏᴛ'
        }, { quoted: m });
        setBandieraCooldown(chat);
        delete global.bandieraGame[chat];
        
    } else {
        game.tentativi[m.sender] = (game.tentativi[m.sender] || 0) + 1;
        const tentativiRimasti = 3 - game.tentativi[m.sender];

        if (tentativiRimasti === 1) {
            const primaLettera = game.rispostaOriginale[0].toUpperCase();
            const numeroLettere = game.rispostaOriginale.length;
            await conn.reply(chat, `✖️ ʀɪꜱᴘᴏꜱᴛᴀ ꜱʙᴀɢʟɪᴀᴛᴀ!

💡 ᴘɪᴄᴄᴏʟᴏ ꜱᴜɢɢᴇʀɪᴍᴇɴᴛᴏ:
  • ɪɴɪᴢɪᴀ ᴄᴏɴ ʟᴀ ʟᴇᴛᴛᴇʀᴀ *"${primaLettera}"*
  • ᴇᴅ ᴇ̀ ᴄᴏᴍᴘᴏꜱᴛᴀ ᴅᴀ *${numeroLettere}* ʟᴇᴛᴛᴇʀᴇ`, m);
        } else if (tentativiRimasti === 2) {
            await conn.reply(chat, `✖️ ʀɪꜱᴘᴏꜱᴛᴀ ꜱʙᴀɢʟɪᴀᴛᴀ!

📝 ʜᴀɪ ᴀɴᴄᴏʀᴀ ${tentativiRimasti} ᴛᴇɴᴛᴀᴛɪᴠɪ
🤔 ɴᴏɴ ᴅᴇᴍᴏʀᴀʟɪᴢᴢᴀʀᴛɪ, ᴘᴇɴꜱᴀ ʙᴇɴᴇ!`, m);
        } else {
            await conn.reply(chat, `✖️ ʀɪꜱᴘᴏꜱᴛᴀ ꜱʙᴀɢʟɪᴀᴛᴀ!

📝 ᴛɪ ʀɪᴍᴀɴᴇ ᴜɴ ᴜ  ᴛɪᴍᴏ ᴛᴇɴᴛᴀᴛɪᴠᴏ, ꜱꜰʀᴜᴛᴛᴀʟᴏ ᴀʟ ᴍᴇɢʟɪᴏ!`, m);
        }
    }
};

handler.help = ['ʙᴀɴᴅɪᴇʀᴀ'];
handler.tags = ['fun'];
handler.command = /^(bandiera|skipbandiera)$/i;
handler.group = true;

export default handler;