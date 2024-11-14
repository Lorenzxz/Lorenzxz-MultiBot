## The second project
Hi guys, this is my first project, please forgive me if there are any mistakes, guys✨, this script was created since Thursday, November 14, 2024. Don't forget to give stars and follow me😄🐈‍⬛

## How to connect with telegram bot
## [ 🇮🇩 ] Berikut langkah-langkah untuk mendapatkan token bot Telegram & Discord:

## Telegram
1. **Buka aplikasi Telegram**, lalu di kolom pencarian, ketik username **BotFather**:  
   `@BotFather`
2. Klik **BotFather** dari hasil pencarian, lalu pilih **Start** untuk memulai percakapan.
3. Ketik atau pilih perintah `/newbot` untuk membuat bot baru.
4. **BotFather** akan meminta kamu untuk memberikan nama bot baru.  
   Contoh: `MyAwesomeBot`
5. Setelah kamu memberikan nama, **BotFather** akan meminta kamu untuk memberikan username untuk bot tersebut. Username harus diakhiri dengan **"bot"** atau **"_bot"**.  
   Contoh: `myawesome_bot` atau `MyAwesomeBot`
6. Jika username valid dan belum digunakan, **BotFather** akan mengonfirmasi dan mengirimkan **token API** untuk bot baru tersebut.  
   Contoh token: `123456789:ABCDefghIJKLmnOPQRSTUvwxYZ1234567890`
7. Simpan token ini, karena token ini yang akan kamu gunakan untuk mengontrol bot melalui API Telegram.

## Discord
1. Buka Discord Developer Portal.
2. Setelah itu, buat aplikasi baru dengan mengklik New Application.
3. Beri nama aplikasi kamu dan konfirmasi dengan mengklik Create.
4. Setelah aplikasi dibuat, buka menu dengan mengklik tiga garis horizontal di kiri atas.
5. Dari menu, pilih Bot dan klik Add Bot untuk membuat bot untuk aplikasi kamu.
6. Konfirmasi pembuatan bot dengan memilih Yes, do it!.
7. Setelah bot dibuat, kamu akan melihat opsi Reset Token. Klik untuk menghasilkan token baru untuk bot kamu.
8. Salin token bot ini dan simpan dengan aman, karena token ini akan memberikan akses ke bot kamu.
9. Buka file konfigurasi bot kamu (config.js).
10. Tempelkan token yang telah disalin ke dalam field yang sesuai di config.js untuk menghubungkan bot kamu dengan aplikasi.

## [ 🇺🇸 ] Here are the steps to get a Telegram & Discord bot token:

## Telegram
1. **Open the Telegram app** and search for **BotFather** by typing the username:  
   `@BotFather`
2. Click on **BotFather** from the search results, and select **Start** to begin the conversation.
3. Type or select the command `/newbot` to create a new bot.
4. **BotFather** will ask you to provide a name for your new bot.  
   Example: `MyAwesomeBot`
5. After you provide a name, **BotFather** will ask you to provide a username for the bot. The username must end with **"bot"** or **"_bot"**.  
   Example: `myawesome_bot` or `MyAwesomeBot`
6. If the username is valid and not already in use, **BotFather** will confirm and send you the **API token** for your new bot.  
   Example token: `123456789:ABCDefghIJKLmnOPQRSTUvwxYZ1234567890`
7. Save this token, as you will use it to control the bot through the Telegram API.

## Discord
1. Go to the Discord Developer Portal.
2. Once you're there, create a new application by clicking New Application.
3. Give your application a name and confirm by clicking Create.
4. After creating the application, open the menu by clicking the three horizontal lines at the top left.
5. From the menu, select Bot and then click Add Bot to create a bot user for your application.
6. Confirm the creation of the bot by selecting Yes, do it!.
7. Once the bot is created, you'll see a Reset Token option. Click it to generate a new token for your bot.
8. Copy this bot token and keep it secure, as it will give access to your bot.
9. Open your bot’s configuration file (config.js).
10. Paste the copied token into the appropriate field within config.js to connect your bot to your application.

## Thank you to those who have helped me ✨

- [`Lorenzxz`](https://github.com/lorenzxz) Lorenzxz ( Creator )
- [`kiuur`](https://github.com/kiuur) KyuuRzy ( Base Source )

without them this script is nothing, thank you to them 💫

## A Few Tips for Using Buttons
- to display the "Button List" view
```javascript
let buttons = new Buttons();
buttons.setBody("what? what are you doing?");
buttons.addSelection("List Menu");
buttons.makeSections("#! - Show All Menu List!!", "");
buttons.makeRow(
    "#! - Show All Menu",
    "display all menu in the bot !!!",
    "you can see all the features in this bot",
    `${prefix}menuall`
);
await buttons.run(m.chat, client, m);
```
- to display the "Button Copy" view
```javascript
let buttons = new Buttons();   
buttons.setBody("what? what are you doing?");
buttons.addCopy("Copy", `puqi`);
await buttons.run(m.chat, client, m);
```
## To change/modify the bot's display section, you can go to:
```javascript
("./start/lib/buttondoc.js")
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.






 
* © Lorenzxz ZcoderX
* © N-Kiuur ZcoderX
