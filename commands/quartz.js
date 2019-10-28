exports.run = (client, message, args) => {
  message.channel.send({
    "embed": {
      "image": {
      "url": "https://i.imgur.com/cZG0ovO.gif",
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
  name: 'quartz',
  description: `delicious`,
  usage: '!quartz'
};
