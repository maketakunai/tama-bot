exports.run = (client, message, args) => {
  message.channel.send({files: ["https://cdn.discordapp.com/emojis/707956514937241601.gif"]}).catch(console.error);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'partybear',
  description: `a rare bear`,
  usage: '!partybear'
};
