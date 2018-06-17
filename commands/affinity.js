exports.run = (client, message, args) => {
  message.channel.send({
    file: "https://i.imgur.com/Sucng1Q.png"
  }).catch(console.error);
}
