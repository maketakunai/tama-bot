exports.run = (client, message, args) => {
  message.channel.send({files: ["https://cdn.discordapp.com/emojis/418002516127776768.gif"]}).catch(console.error);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'zoomsader',
  description: `wat`,
  usage: '!zoomsader'
};
