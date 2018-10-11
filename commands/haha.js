var counter = 0;
exports.run = (client, message, args) => {
  if (counter == 0){
    message.channel.send({
      "embed": {
        "image": {
        "url": "https://i.imgur.com/NixFsZK.gif",
        }
      }
    }).catch(console.error);
    counter++;
    return;
  }
  else if (counter == 1){
    message.channel.send({
      "embed": {
        "image": {
        "url": "https://i.imgur.com/5N2bzQy.gif",
        }
      }
    }).catch(console.error);
    counter++;
    return;
  }
  else if (counter == 2){
    message.channel.send({
      "embed": {
        "image": {
        "url": "https://i.imgur.com/xYjLL3B.gif",
        }
      }
    }).catch(console.error);
    counter++;
    return;
  }
  else {
    message.channel.send({
      "embed": {
        "image": {
        "url": "https://i.imgur.com/RxP7EVY.gif",
        }
      }
    }).catch(console.error);
    counter = 0;
    return;
  }
}



exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["save"]
};

exports.help = {
  name: 'haha',
  description: `Cycles between 3 images of laughing Rin/Luvia.`,
  usage: '!haha'
};
