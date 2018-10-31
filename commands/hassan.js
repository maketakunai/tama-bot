exports.run = (client, message, args) => {
    message.channel.send({
      "embed": {
        "image": {
        "url": "https://cdn.discordapp.com/attachments/423879471448195072/501279327124455424/1539580706037.gif",
        }
      }
    }).catch(console.error);
  }
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["gramps"]
  };
  
  exports.help = {
    name: 'hassan',
    description: `spooky king hassan`,
    usage: '!hassan'
  };
