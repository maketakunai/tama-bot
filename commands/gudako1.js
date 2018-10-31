exports.run = (client, message, args) => {
  //message.delete().catch(O_o=>{});
  message.channel.send(`<a:Gudako1:399744968639381504>`).catch(console.error);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'gudako1',
  description: `Look at me, I can use nitro emotes.`,
  usage: '!gudako1'
};
