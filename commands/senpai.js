exports.run = (client, message, args) => {
  message.channel.send({
    "embed": {
      "image": {
      "url": "https://i.imgur.com/Felg95E.gif",
      }
    }
  }).catch(console.error);
}
