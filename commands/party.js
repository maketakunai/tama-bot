
exports.run = (client, message, args) => {
  message.channel.send({
    file: randomImage()
  }).catch(console.error);
}

function randomImage() {
  var answers = ["http://i.imgur.com/wM5u6qP.gif",
  "https://i.imgur.com/wQuF3u2.jpg",
  "https://i.imgur.com/A5AWOxt.gif",
  "https://i.imgur.com/6j4SsWp.gif"]
  return answers[Math.floor(Math.random()*answers.length)];
}

/*
var counter = 0;
exports.run = (client, message, args) => {
  if (counter % 2 == 0){
    message.channel.send({
      file: "http://i.imgur.com/wM5u6qP.gif"
    }).catch(console.error);
    counter++;
    return;
  }
  else {
    message.channel.send({
      file: "https://i.imgur.com/wQuF3u2.jpg"
    }).catch(console.error);
    counter++;
    return;
  }
}
*/
