exports.run = (client, message, args) => {
  message.channel.send("Attendre et Espérer.", {
    file: "https://i.imgur.com/CWaQTNk.png"
  }).catch(console.error);
}
