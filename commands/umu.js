exports.run = (client, message, args) => {
  message.channel.send({
    file: randomImage()
  }).catch(console.error);
}

function randomImage() {
  var answers = ["https://i.imgur.com/bgbPF0n.gif",
  "https://i.imgur.com/hVyeLi4.gif",
  "https://i.imgur.com/zgUp8Er.gif"]
  return answers[Math.floor(Math.random()*answers.length)];
}
