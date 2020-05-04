exports.run = (client, message, args) => {
  message.channel.send({files: ["https://cdn.discordapp.com/attachments/328226993361649674/704599359794184192/lizpop2.gif"]}).catch(console.error);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'lizpop',
  description: `lizpop`,
  usage: '!lizpop'
};
