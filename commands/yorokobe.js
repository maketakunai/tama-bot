exports.run = (client, message, args) => {
  message.channel.send("Yorokobe, shounen.", {
    file: "https://i.imgur.com/XX4F2d5.jpg"
  }).catch(console.error);
}
