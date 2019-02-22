exports.run = (client, message, args) => {
  message.channel.send({
    "embed": {
      "image": {
      "url": randomImage(),
      }
    }
  }).catch(console.error);
}

var answers = ["https://i.imgur.com/Or6zAuk.gif",
"https://i.imgur.com/npn1UIm.gif",
"https://i.imgur.com/hFW9N4R.gif"]

function randomImage() {
  return answers[Math.floor(Math.random()*answers.length)];
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'save',
  description: `Randomly selects from ${answers.length} available images.`,
  usage: '!save'
};
