exports.run = (client, message, args) => {
  message.channel.send({
    "embed": {
      "author": {
        "name": "Yorokobe, shounen.",
      },
      "image": {
      "url": "https://i.imgur.com/XX4F2d5.jpg",
      }
    }
  }).catch(console.error);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};
