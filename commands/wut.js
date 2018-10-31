exports.run = (client, message, args) => {
  message.channel.send({
    "embed": {
      "image": {
      "url": "https://i.imgur.com/N2L6KAy.png",
      }
    }
  }).catch(console.error);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["medb"]
};

exports.help = {
  name: 'wut',
  description: `It's an image.`,
  usage: '!wut'
};
