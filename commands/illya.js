exports.run = (client, message, args) => {
  message.channel.send({
    "embed": {
      "image": {
      "url": randomImage(),
      }
    }
  }).catch(console.error);
}

function randomImage() {
  var answers = ["https://i.imgur.com/cNaYhSI.png",
                 "https://i.imgur.com/vKu4JPA.png",
                 "https://i.imgur.com/yN2qqaA.jpg",
                 "https://i.imgur.com/njNDJGf.jpg",
                 "https://i.imgur.com/6Y5LriH.gif",
                 "https://i.imgur.com/ANSi6aL.gif"]
  return answers[Math.floor(Math.random()*answers.length)];
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};
