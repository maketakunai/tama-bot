exports.run = (client, message, args) => {

  if (message.guild.id != '328226892798754819') {
    return
  }

  if (message.member.roles.find(role => role.id === '431247314649088010')) {
    message.member.removeRole('431247314649088010')
    return message.channel.send(`${message.author.username}, you've been removed from the jp-spoilers role.`).then(m => m.delete(15000));
  }
  else {
    message.member.addRole('431247314649088010')
    return message.channel.send(`${message.author.username}, you've been added to the jp-spoilers role.`).then(m => m.delete(15000));
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['spoilers']
};

exports.help = {
  name: 'spoiler',
  description: `Adds or removes you from the spoilers role.`,
  usage: '!spoiler'
};
