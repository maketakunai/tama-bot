exports.run = (client, message, args) => {
    message.channel.send({
      "embed": {
        "image": {
        "url": "https://cdn.discordapp.com/attachments/328226993361649674/500364501397405697/quick_meme.png",
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
    name: 'quick',
    description: `quick memes`,
    usage: '!quick'
  };
