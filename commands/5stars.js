exports.run = (client, message, args) => {
  message.channel.send({
    "embed": {
      "image": {
      "url": "https://i.imgur.com/L6RFObP.png",
      }
    }
  }).catch(console.error);
}
