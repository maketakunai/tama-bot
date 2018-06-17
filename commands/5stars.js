exports.run = (client, message, args) => {
  message.channel.send({
    file: "https://i.imgur.com/L6RFObP.png"
  }).catch(console.error);
}
