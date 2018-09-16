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
  var answers = ["https://i.imgur.com/Felg95E.gif"]
  return answers[Math.floor(Math.random()*answers.length)];
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'mash',
  description: `Mash is cute.`,
  usage: '!mash'
};
