exports.run = (client, message, args) => {
  message.channel.send({
  file: "https://i.imgur.com/kevlk4n.gif"
  }).catch(console.error);
}
