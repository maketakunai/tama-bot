var counter = 0;
exports.run = (client, message, args) => {
  if (counter % 2 == 0){
    message.channel.send({
      "embed": {
        "image": {
        "url": "https://i.imgur.com/ai5i0Sy.png",
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
        "url": "https://i.imgur.com/fFWAa9G.png",
        }
      }
    }).catch(console.error);
    counter++;
    return;
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};
