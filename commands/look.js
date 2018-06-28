exports.run = (client, message, args) => {
  message.channel.send({
    "embed": {
      "image": {
      "url": "https://i.imgur.com/PqAdjC6.png",
      }
    }
  }).catch(console.error);
}
