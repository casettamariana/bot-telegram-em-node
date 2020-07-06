const TelegramBot = require('node-telegram-bot-api');
const firebase = require('firebase');

const token = '1138844181:AAEzEjPoSks5ScsRgy5uRfLbxrIFQVTFMd0'; 
const bot = new TelegramBot(token, {polling: true});
bot.on('message', (msg) => {
    bot.sendMessage(msg.chat.id, 'Olá, embaixador da cidadania! Como posso lhe ajudar?', {
        "reply_markup": {
            "inline_keyboard": [
                [
                    {
                        text: "Cronograma",
                        callback_data: "cronograma",
                    },
                    {
                        text: "Tenho uma dúvida!",
                        callback_data: "duvida"
                    },
                ],
                [
                    {
                        text: "Podcast",
                        callback_data: "podcast"
                    },
                    {
                        text: "Quero receber notícias!",
                        callback_data: "noticias"
                    },
                ],
                [
                    {
                        text: "Não me deixe esquecer das datas!",
                        callback_data: "msg_datas"
                    },
                ],
            ],
        },
    });
});

bot.on("callback_query", (callbackQuery) => {
    const msg = callbackQuery.message;
    bot.answerCallbackQuery(callbackQuery.id)
        .then(() => bot.sendMessage(msg.chat.id, "Você clicou!"));
});