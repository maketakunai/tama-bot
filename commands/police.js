exports.run = (client, message, args) => {
  message.channel.send({
    "embed": {
      "image": {
      "url": "https://cdn.discordapp.com/attachments/328226993361649674/465311661524385792/SeibaCop.png",
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
  name: 'police',
  description: `An image of seibacop.`,
  usage: '!police'
};
