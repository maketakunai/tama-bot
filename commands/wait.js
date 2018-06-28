exports.run = (client, message, args) => {
  message.channel.send({
    "embed": {
      "author": {
        "name": "Attendre et Espérer.",
      },
      "image": {
      "url": "https://i.imgur.com/CWaQTNk.png",
      }
    }
  }).catch(console.error);
}
