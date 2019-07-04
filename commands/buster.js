exports.run = (client, message, args) => {
    message.channel.send({
      "embed": {
        "image": {
        "url": "https://cdn.discordapp.com/attachments/328226993361649674/566081422675279874/busterbusterbuster.png",
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
    name: 'buster',
    description: `buster memes`,
    usage: '!buster'
  };
