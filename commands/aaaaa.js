exports.run = (client, message, args) => {
  message.channel.send({
    "embed": {
      "image": {
      "url": "https://i.imgur.com/Cojmb76.gif",
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
  name: 'aaaaa',
  description: `AAAAAAAAAAAARTHUR`,
  usage: '!aaaaa'
};
