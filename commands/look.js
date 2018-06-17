exports.run = (client, message, args) => {
  message.channel.send({
  file: "https://i.imgur.com/PqAdjC6.png"
  }).catch(console.error);
}
