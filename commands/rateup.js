exports.run = (client, message, args) => {
  message.channel.send({
    file: randomImage()
  }).catch(console.error);
}

function randomImage() {
  var answers = ["https://i.imgur.com/t8buKew.jpg"]
  return answers[Math.floor(Math.random()*answers.length)];
}
