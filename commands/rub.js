exports.run = (client, message, args) => {
  message.channel.send({files: ["https://cdn.discordapp.com/emojis/589535102107910145.gif"]}).catch(console.error);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'rub',
  description: `rub...`,
  usage: '!rub'
};
