exports.run = (client, message, args) => {
  message.channel.send({
    "embed": {
      "image": {
      "url": "https://cdn.discordapp.com/attachments/328226993361649674/740724458918117396/BBWantToSkipA3.gif",
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
  name: 'skip',
  description: `Want to skip?`,
  usage: '!skip'
};
