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

console.clear();
require('../settings/config');

// Baileys import
const { 
    default: makeWASocket, 
    prepareWAMessageMedia, 
    useMultiFileAuthState, 
    DisconnectReason, 
    fetchLatestBaileysVersion, 
    makeInMemoryStore, 
    generateWAMessageFromContent, 
    generateWAMessageContent, 
    jidDecode, 
    proto, 
    relayWAMessage, 
    getContentType, 
    getAggregateVotesInPollMessage, 
    downloadContentFromMessage, 
    fetchLatestWaWebVersion, 
    InteractiveMessage, 
    makeCacheableSignalKeyStore, 
    Browsers, 
    generateForwardMessageContent, 
    MessageRetryMap 
} = require("@whiskeysockets/baileys");

const pino = require('pino');
const readline = require("readline");
const fs = require('fs');
const axios = require('axios');
const { Boom } = require('@hapi/boom');
const { color } = require('./library/color');
const { smsg, sendGmail, formatSize, isUrl, generateMessageTag, getBuffer, getSizeMedia, runtime, fetchJson, sleep } = require('./library/myfunction');
const randomAscii = require('./library/randomAscii.js')
const groupEvents = require("./events/groups");
const moment = require('moment-timezone')
const now = moment().tz('Asia/Jakarta')
const chalk = require('chalk')
const wita = now.clone().tz("Asia/Jakarta").locale("id").format("HH:mm:ss z")
const listcolor = ['red.bold', 'cyan', 'blue', 'magenta'];
const randomcolor = listcolor[Math.floor(Math.random() * listcolor.length)];

const usePairingCode = true;
const question = (text) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => { rl.question(text, resolve) });
}

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });

const imageAscii = randomAscii[Math.floor(Math.random() * randomAscii.length)];

console.log(chalk.red.bold('Starting...'));

const sendTelegramNotification = async (message) => {
    try {
        await axios.post(`https://api.telegram.org/bot${global.telegram.token}/sendMessage`, {
            chat_id: global.telegram.ownerid,
            text: message
        });
    } catch (error) {
    }
};

async function clientstart() {
    const { state, saveCreds } = await useMultiFileAuthState('./session');
    const client = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: !usePairingCode,
        auth: state,
        browser: ["Ubuntu", "Chrome", "20.0.04"]
    });

    if (usePairingCode && !client.authState.creds.registered) {
        const phoneNumber = await question(chalk.green.bold(`${imageAscii}\n\n[ ! ] If you want to activate the discord & telegram bot, please enter your number first\n\n[ # ] please enter your WhatsApp number, starting with 62:\n`));
const code = await client.requestPairingCode(phoneNumber.trim());
console.log(chalk.green.bold(`[ # ] enter that code into WhatsApp, motherfucker : ${code}`));
    }

    store.bind(client.ev);
    client.ev.on('messages.upsert', async chatUpdate => {
        try {
            if (!chatUpdate.messages || chatUpdate.messages.length === 0) return;
            const mek = chatUpdate.messages[0];

            if (!mek.message) return;
            mek.message =
                Object.keys(mek.message)[0] === 'ephemeralMessage'
                    ? mek.message.ephemeralMessage.message
                    : mek.message;

            if (mek.key && mek.key.remoteJid === 'status@broadcast') {
                let emoji = [
                    '😘', '😭', '😂', '😹', '😍', '😋', '🙏', '😜', '😢', '😠', '🤫', '😎','💫','🧢','🎉','😮','🎧','💭','🙏🏻','🌟','💤','✨',
                ];
                let sigma = emoji[Math.floor(Math.random() * emoji.length)];
                await client.readMessages([mek.key]);
                client.sendMessage(
                    'status@broadcast',
                    { react: { text: sigma, key: mek.key } },
                    { statusJidList: [mek.key.participant] },
                );
            }                                    

            if (mek.key && mek.key.remoteJid.includes('@newsletter')) return;
            if (!client.public && !mek.key.fromMe && chatUpdate.type === 'notify') return;
            if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return;

            const m = smsg(client, mek, store);
            require("./helpers/whatsapp")(client, m, chatUpdate, store);
        } catch (err) {
            console.error(err);
        }
    });

    client.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {};
            return decode.user && decode.server && decode.user + '@' + decode.server || jid;
        } else return jid;
    };

    client.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = client.decodeJid(contact.id);
            if (store && store.contacts) store.contacts[id] = { id, name: contact.notify };
        }
    });
     
    client.serializeM = (m) => smsg(client, m, store);
    
    client.copyNForward = async (jid, message, forceForward = false, options = {}) => {
        let vtype
        if (options.readViewOnce) {
            message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
            vtype = Object.keys(message.message.viewOnceMessage.message)[0]
            delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
            delete message.message.viewOnceMessage.message[vtype].viewOnce
            message.message = {
                ...message.message.viewOnceMessage.message
            }
        }

        let mtype = Object.keys(message.message)[0]
        let content = await generateForwardMessageContent(message, forceForward)
        let ctype = Object.keys(content)[0]
        let context = {}
        if (mtype != "conversation") context = message.message[mtype].contextInfo
        content[ctype].contextInfo = {
            ...context,
            ...content[ctype].contextInfo
        }
        const waMessage = await generateWAMessageFromContent(jid, content, options ? {
            ...content[ctype],
            ...options,
            ...(options.contextInfo ? {
                contextInfo: {
                    ...content[ctype].contextInfo,
                    ...options.contextInfo
                }
            } : {})
        } : {})
        await client.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
        return waMessage
    }

    client.public = global.status;

    client.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
        const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
        console.log(chalk.green.bold(lastDisconnect.error));
        if (lastDisconnect.error == 'Error: Stream Errored (unknown)') {
            process.exit();
        } else if (reason === DisconnectReason.badSession) {
            console.log(chalk.green.bold(`Bad Session File, Please Delete Session and Scan Again`));
            process.exit();
        } else if (reason === DisconnectReason.connectionClosed) {
            console.log(color('[SYSTEM]', 'red.bold'), chalk.green.bold('Connection closed, reconnecting. . .'));
            process.exit();
        } else if (reason === DisconnectReason.connectionLost) {
            console.log(color('[SYSTEM]', 'red.bold'), chalk.green.bold('Connection lost, trying to reconnect'));
            process.exit();
        } else if (reason === DisconnectReason.connectionReplaced) {
            console.log(chalk.green.bold('Connection Replaced, Another New Session Opened, Please Close Current Session First'));
            client.logout();
        } else if (reason === DisconnectReason.loggedOut) {
            console.log(chalk.green.bold(`Device Logged Out, Please Scan Again And Run.`));
            client.logout();
        } else if (reason === DisconnectReason.restartRequired) {
            console.log(chalk.green.bold('Restart Required, Restarting. . .'));
            await clientstart();
        } else if (reason === DisconnectReason.timedOut) {
            console.log(chalk.green.bold('Connection TimedOut, Reconnecting. . .'));
            clientstart();
        }
    } else if (connection === "connecting") {
        console.log(chalk.green.bold('Connecting, Please Be Patient. . .'));
    } else if (connection === "open") {
        console.log(chalk.green.bold('Bot Successfully Connected. . . .'));
        sendTelegramNotification(`connected information report ${wita}\n\nthe device has been connected, here is the information\n> User ID : ${client.user.id}\n> Name : ${client.user.name}\n\nLorenzxz ZcoderX`);
    }
});

    client.sendText = (jid, text, quoted = '', options) => client.sendMessage(jid, { text: text, ...options }, { quoted });
    
    client.downloadMediaMessage = async (message) => {
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
return buffer
    } 
    
    groupEvents(client, store);
    
    client.ev.on('creds.update', saveCreds);
    return client;
}

clientstart();
require('./helpers/telegram');
require('./helpers/discord');


const ignoredErrors = [
  'Socket connection timeout',
  'EKEYTYPE',
  'item-not-found',
  'rate-overlimit',
  'Connection Closed',
  'Timed Out',
  'Value not found',
];

process.on('unhandledRejection', (reason) => {
  if (ignoredErrors.some((e) => String(reason).includes(e))) return;
  console.log('Unhandled Rejection: ', reason);
});

const originalConsoleError = console.error;
console.error = function (message, ...optionalParams) {
  if (
    typeof message === 'string' &&
    ignoredErrors.some((e) => message.includes(e))
  )
    return;
  originalConsoleError.apply(console, [message, ...optionalParams]);
};

const originalStderrWrite = process.stderr.write;
process.stderr.write = function (message, encoding, fd) {
  if (
    typeof message === 'string' &&
    ignoredErrors.some((e) => message.includes(e))
  )
    return;
  originalStderrWrite.apply(process.stderr, arguments);
};
  
