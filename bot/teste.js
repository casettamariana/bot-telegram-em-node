const TelegramBot = require('node-telegram-bot-api');
const firebase = require('firebase');

const token = '1182361757:AAFDN-EcOKgXsjHkcl-fMGg3pvQOzlxvuU4'; 
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
    const msgData = callbackQuery.data;

    switch(msgData) {

        case 'cronograma':
            bot.answerCallbackQuery(callbackQuery.id)
            .then(() => bot.sendMessage(msg.chat.id, "Cronograma!"));
            break;
        case 'duvida':
            bot.answerCallbackQuery(callbackQuery.id)
            .then(() => bot.sendMessage(msg.chat.id, "Duvida?!"));
            break;
        case 'podcast':
            bot.answerCallbackQuery(callbackQuery.id)
            .then(() => bot.sendMessage(msg.chat.id, "Podcast!"));
            break;
        case 'noticias':
            bot.answerCallbackQuery(callbackQuery.id)
            .then(() => bot.sendMessage(msg.chat.id, "Noticias!"));
            break;
        case 'msg_datas':
            bot.answerCallbackQuery(callbackQuery.id)
            .then(() => bot.sendMessage(msg.chat.id, "Vamos as datas!"));
            break;
        default:
            bot.answerCallbackQuery(callbackQuery.id)
            .then(() => bot.sendMessage(msg.chat.id, "Nao entendi sua duvida, vamos tentar novamente!"));
    }
});