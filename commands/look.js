exports.run = (client, message, args) => {
  message.channel.send({
    "embed": {
      "image": {
      "url": "https://i.imgur.com/PqAdjC6.png",
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
  name: 'look',
  description: `Don't look away.`,
  usage: '!look'
};
