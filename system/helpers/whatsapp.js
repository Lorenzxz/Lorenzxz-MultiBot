/*******************************************************
 * @author  : Lorenzxz
 * @contact : 
 *      - YouTube: @Lorenzxz
 *      - Instagram: Lorenzxz
 *      - Telegram: t.me/Atzmus
 *      - GitHub: @Lorenzxz
 *      - WhatsApp: +6283879020370
 *      - WhatsApp Channel: https://whatsapp.com/channel/0029VamXcap4Crfjc2tSod1a
 * 
 * @description:
 *      Re-upload? Recode? Copy code? Give credit ya :)
 * 
 * @note:
 *      Want more free bot scripts? Subscribe to my YouTube channel:
 *      https://youtube.com/@LLorenzxz
 ******************************************************/

require('../../settings/config');

const fs = require('fs');
const axios = require('axios');
const chalk = require("chalk");
const util = require("util");
const path = require('path')
const moment = require("moment-timezone");
const { spawn, exec, execSync } = require('child_process');

const { default: baileys, proto, generateWAMessage, generateWAMessageFromContent, getContentType, prepareWAMessageMedia } = require("@whiskeysockets/baileys");

module.exports = client = async (client, m, chatUpdate, store) => {
try {
// Message type handling
const body = (
m.mtype === "conversation" ? m.message.conversation :
m.mtype === "imageMessage" ? m.message.imageMessage.caption :
m.mtype === "videoMessage" ? m.message.videoMessage.caption :
m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :
m.mtype === "templateButtonReplyMessage" ? m.msg.selectedId :
m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text : ""
);

const sender = m.key.fromMe
? client.user.id.split(":")[0] + "@s.whatsapp.net" || client.user.id
: m.key.participant || m.key.remoteJid;

const senderNumber = sender.split('@')[0];
const budy = (typeof m.text === 'string' ? m.text : '');
const prefa = ["", "!", ".", ",", "🐤", "🗿"];
const prefix = /^[°zZ#$@+,.?=''():√%!¢£¥€π¤ΠΦ&><™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@+,.?=''():√%¢£¥€π¤ΠΦ&><!™©®Δ^βα¦|/\\©^]/gi) : '.';
const from = m.key.remoteJid;
const isGroup = from.endsWith("@g.us");

// Database
const botNumber = await client.decodeJid(client.user.id);
const Access = [botNumber, ...global.owner];
const isCmd = body.startsWith(prefix);
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase();
const args = body.trim().split(/ +/).slice(1);
const pushname = m.pushName || "No Name";
const text = q = args.join(" ");
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
const qmsg = (quoted.msg || quoted);
const isMedia = /image|video|sticker|audio/.test(mime);

// Group function
const groupMetadata = isGroup ? await client.groupMetadata(m.chat).catch((e) => {}) : "";
const groupOwner = isGroup ? groupMetadata.owner : "";
const groupName = m.isGroup ? groupMetadata.subject : "";
const participants = isGroup ? await groupMetadata.participants : "";
const groupAdmins = isGroup ? await participants.filter((v) => v.admin !== null).map((v) => v.id) : "";
const groupMembers = isGroup ? groupMetadata.participants : "";
const isGroupAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isAdmins = isGroup ? groupAdmins.includes(m.sender) : false;

// Function
const { smsg, sendGmail, formatSize, isUrl, generateMessageTag, getBuffer, getSizeMedia, runtime, fetchJson, sleep } = require('../library/myfunction');
const { ytdl } = require('../library/scrape/scrape-ytdl')
// Time
const time = moment.tz("Asia/Makassar").format("HH:mm:ss");

const sendTelegramNotification = async (message) => {
    try {
        await axios.post(`https://api.telegram.org/bot${global.telegram.token}/sendMessage`, {
            chat_id: global.telegram.ownerid,
            text: message
        });
    } catch (error) {
    }
};

// Console log
if (m.message) {
  console.log('\x1b[30m--------------------\x1b[0m');
  console.log(chalk.bgHex("#e74c3c").bold(`▢ New Message`));
  console.log(
    chalk.bgHex("#00FF00").black(
      `   ⌬ Tanggal: ${new Date().toLocaleString()}\n` +
      `   ⌬ Pesan: ${m.body || m.mtype} \n` +
      `   ⌬ Pengirim: ${m.pushName} \n` +
      `   ⌬ JID: ${senderNumber}`
    )
  );

  if (m.isGroup) {
    console.log(
      chalk.bgHex("#00FF00").black(
        `   ⌬ Grup: ${groupName} \n` +
        `   ⌬ GroupJid: ${m.chat}`
      )
    );
  }
  console.log();

  let notification = `▢ New Message\n\n` +
    `   ⌬ Tanggal:  ${new Date().toLocaleString()}\n` +
    `   ⌬ Pesan: ${m.body || m.mtype}\n` +
    `   ⌬ Pengirim: ${m.pushName}\n` +
    `   ⌬ JID: ${senderNumber}\n`;

  if (m.isGroup) {
    notification += `   ⌬ Grup: ${groupName}\n` +
      `   ⌬ GroupJid: ${m.chat}\n`;
  }
  sendTelegramNotification(notification);
}

// Helper functions
const kiuu = (anu) => {
const {message, key} = generateWAMessageFromContent(m.chat, {
interactiveMessage: {
body: {text: anu},
footer: {text: `${global.footer}`},
nativeFlowMessage: {
buttons: [{text: "Lorenzxz ZcoderX"}
],
}
},
}, {quoted: { key: { participant: '0@s.whatsapp.net', remoteJid: "0@s.whatsapp.net" }, message: { conversation: `${body}`}}})
client.relayMessage(m.chat, {viewOnceMessage:{message}}, {messageId:key.id})
}

const reply = (teks) => {
let Button = require("../library/button");
let btn = new Button();
const baten = new Button()
let ads = baten.setBody(teks);
ads += baten.setImage('https://files.catbox.moe/0oo8mo.jpg')
ads += baten.addUrl("Lorenzxz ZcoderX", `shinoa.us.kg`);
ads += baten.run(m.chat, client, m);
}

const reaction = async (jidss, emoji) => {
client.sendMessage(jidss, { react: { text: emoji, key: m.key }})}
    
const loadCommands = () => {
    return fs.readdirSync(path.join(__dirname, '../plugins/whatsapp'))
        .filter(file => file.endsWith('.js'))
        .map(file => require(path.join(__dirname, '../plugins/whatsapp', file)));
};

let commands = loadCommands();

// Command handler
switch (command) {

case'menu':{
await reaction(m.chat, "🔒");
reply(`hi ${pushname} 🪸, i am an automated system (WhatsApp bot) that can help to do something search and get data / information only through WhatsApp.

 ▢ Creator : Lorenzxz ZcoderX
 ▢ Library : WS-Baileys
 ▢ Mode : ${client.public ? 'Public' : 'Self'}

*Lorenzxz* is a WhatsApp bot developed using NodeJS and Baileys library. This bot was created to provide a better user experience in interacting on the platform.`)
await reaction(m.chat, "🔓");
}
break

case 'q': 
case 'quoted': {
    if (!m.quoted) return kiuu('Reply Message!!');
    let wokwol = await client.serializeM(await m.getQuotedObj());
    if (!wokwol.quoted) return kiuu('The message you replied to does not contain a reply.');
    await wokwol.quoted.copyNForward(m.chat, true);
}
break;
        
case "play": {
if (!text) return kiuu(`*Example:* ${prefix + command} photograph`)
const yts = require('yt-search');
await reaction(m.chat, "🔒");
let search = await yts(text);
let telaso = search.all[0].url;
var response = await ytdl(telaso)
var puki = response.data.mp3
client.sendMessage(m.chat, { audio: { url: puki },
mimetype: "audio/mpeg",
fileName: "kiuu.mp3",
contextInfo: {
forwardingScore: 99999999999,
isForwarded: true,
externalAdReply: {
showAdAttribution: false,
containsAutoReply: true,
mediaType: 1,
renderLargerThumbnail: true,
title: search.all[0].title,
body: `Song duration: ${search.all[0].timestamp}`,
previewType: "PHOTO",
thumbnailUrl: search.all[0].thumbnail,
}}},{quoted:m})
await reaction(m.chat, "🔓");
}
break
        
case 'tovn': {
if (!/video/.test(mime) && !/audio/.test(mime)) return kiuu(`reply video/vn with caption ${prefix + command}`)
if (!quoted) return kiuu(`reply video/vn with caption ${prefix + command}`)
await reaction(m.chat, "🔒");
await sleep(5000)
let media = await quoted.download()
let { toAudio } = require('../library/converter')
let audio = await toAudio(media, 'mp4')
await reaction(m.chat, "🔓");
client.sendMessage(m.chat, {audio, mimetype:'audio/mpeg', ptt: true}, { quoted : m })
}
break

default:
if (budy.startsWith('>')) {
if (!Access) return;
try {
let evaled = await eval(budy.slice(2));
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
await kiuu(evaled);
} catch (err) {
m.reply(String(err));
}
}
        
if (budy.startsWith('<')) {
if (!Access) return
let kode = budy.trim().split(/ +/)[0]
let teks
try {
teks = await eval(`(async () => { ${kode == ">>" ? "return" : ""} ${q}})()`)
} catch (e) {
teks = e
} finally {
await m.reply(require('util').format(teks))
}
}
        
if (budy.startsWith('$')) {
    if (!Access) return
    exec(budy.slice(2), (err, stdout) => {
        if (err) return kiuu(`${err}`)
        if (stdout) return kiuu(stdout)
    })
}
        
}


        const cmd = commands.find(cmd => cmd.command === command);
        if (cmd) {
            await cmd.execute(client, m, args, reply);
        }
    } catch (err) {
        console.error(chalk.red('Error occurred:'), err);
    }
}

const commandPath = path.join(__dirname, '../plugins/whatsapp');
fs.readdirSync(commandPath).forEach(file => {
    const fullPath = path.join(commandPath, file);
    fs.watchFile(fullPath, () => {
        delete require.cache[require.resolve(fullPath)];
        commands = loadCommands();
        console.log(chalk.green.bold(`File command '${file}' telah di-update dan reload otomatis berhasil!`));
    });
});

let file = require.resolve(__filename);
require('fs').watchFile(file, () => {
require('fs').unwatchFile(file);
console.log('\x1b[0;32m' + __filename + ' \x1b[1;32mupdated!\x1b[0m');
delete require.cache[file];
require(file);
});
