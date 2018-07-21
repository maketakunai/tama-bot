exports.run = (client, message, args) => {
  message.channel.send({
    "embed": {
      "author": {
        "name": "Attendre et Espérer.",
      },
      "image": {
      "url": "https://i.imgur.com/CWaQTNk.png",
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
  name: 'wait',
  description: `Sometimes you really do have to just wait and hope.`,
  usage: '!wait'
};
