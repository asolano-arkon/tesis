const { Telegraf } = require('telegraf');

const botToken = process.env.TELEGRAM_BOT_TOKEN; // Asegúrate de tener tu token de bot en las variables de entorno

const setupTelegramBot = () => {
  const bot = new Telegraf(botToken);

  bot.start((ctx) => ctx.reply('¡Bienvenido al bot de salud!'));
  // Agrega más comandos según sea necesario

  bot.launch();
  console.log('Bot de Telegram iniciado');
};

module.exports = setupTelegramBot;
