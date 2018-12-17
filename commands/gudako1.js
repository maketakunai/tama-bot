exports.run = (client, message, args) => {
  message.channel.send({files: ["https://cdn.discordapp.com/attachments/328226993361649674/515035235076014080/063.gif"]}).catch(console.error);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'gudako1',
  description: `Look at me, I am Gudako.`,
  usage: '!gudako1'
};