exports.run = (client, message, args) => {
  message.channel.send({files: ["https://cdn.discordapp.com/attachments/328226892798754819/529464503004430337/tamapop.gif"]}).catch(console.error);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'tamapop',
  description: `tamapop`,
  usage: '!tamapop'
};
