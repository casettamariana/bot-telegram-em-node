const TelegramBot = require('node-telegram-bot-api');
const token = '1138844181:AAEzEjPoSks5ScsRgy5uRfLbxrIFQVTFMd0'; 
const bot = new TelegramBot(token, {polling: true});
var request = require('request');

bot.onText(/\/movie (.+)/, function(msg,match){
    var movie = match[1];
    var chatId = msg.chat.id;
    
    request(`http://www.omdbapi.com/?t=${movie}&apikey=85427298`,function(error,response,body){
        if(!error && response.statusCode == 200){
            bot.sendMessage(chatId, '__Looking for __' + movie + '...', {parse_mode:'Markdown'})
            .then(function(msg){
                var res = JSON.parse(body);
                bot.sendMessage(chatId, 'Result:\nTitle: ' + res.Title + '\n')
            })
        }
    });
})