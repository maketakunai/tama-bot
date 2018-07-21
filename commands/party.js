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
  var answers = ["http://i.imgur.com/wM5u6qP.gif",
  "https://i.imgur.com/wQuF3u2.jpg",
  "https://i.imgur.com/A5AWOxt.gif",
  "https://i.imgur.com/6j4SsWp.gif"]
  return answers[Math.floor(Math.random()*answers.length)];
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'party',
  description: `Randomly selects from 4 available images.`,
  usage: '!party'
};
