var counter = 0;
exports.run = (client, message, args) => {
  if (counter % 2 == 0){
    message.channel.send({
      file: "https://i.imgur.com/yOF8Zob.gif"
    }).catch(console.error);
    counter++;
    return;
  }
  else {
    message.channel.send({
      file: "https://i.imgur.com/0RSPp9Y.jpg"
    }).catch(console.error);
    counter++;
    return;
  }
}
