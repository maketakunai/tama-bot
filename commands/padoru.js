exports.run = (client, message, args) => {
  message.channel.send({
    "embed": {
      "image": {
      "url": "https://i.imgur.com/kevlk4n.gif",
      }
    }
  }).catch(console.error);
}
