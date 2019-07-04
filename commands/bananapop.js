exports.run = (client, message, args) => {
  message.channel.send({files: ["https://media.discordapp.net/attachments/328226993361649674/536655421495050241/bananapop3.gif"]}).catch(console.error);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'bananapop',
  description: `bananapop`,
  usage: '!bananapop'
};
