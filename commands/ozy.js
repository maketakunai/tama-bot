exports.run = (client, message, args) => {
  message.channel.send({
    "embed": {
      "image": {
      "url": "https://cdn.discordapp.com/attachments/421357102229880842/494252191096242199/Ozy.png",
      }
    }
  }).catch(console.error);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'ozy',
  description: 'uncle man diaz.',
  usage: '!ozy'
};
