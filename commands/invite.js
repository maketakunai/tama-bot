exports.run = (client, message, args) => {
  let link = "https://discordapp.com/oauth2/authorize?&client_id=421174898644221952&scope=bot&permissions=0";
  message.channel.send(link).catch(console.error);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'invite',
  description: `Displays a discord invite link for tamabot.`,
  usage: '!invite'
};
