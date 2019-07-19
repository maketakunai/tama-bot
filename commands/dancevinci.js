exports.run = (client, message, args) => {
  message.channel.send({files: ["https://i.imgur.com/Vcmyncy.gif"]}).catch(console.error);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'dancevinci',
  description: `It's a dancing vinci.`,
  usage: '!dancevinci'
};
