exports.run = (client, message, args) => {
  console.log(message.guild.roles.map(role => [role.name, role.id]));
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'test',
  description: 'do not test it',
  usage: '!test'
};
