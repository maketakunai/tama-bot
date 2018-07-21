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
  var answers = ["https://i.imgur.com/yOF8Zob.gif",
  "https://i.imgur.com/0RSPp9Y.jpg",
  "https://cdn.discordapp.com/attachments/328259707833810945/465944700524691476/DhixZaNWAAAUl0_.png"]
  return answers[Math.floor(Math.random()*answers.length)];
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'ded',
  description: `Randomly selects from 3 available images.`,
  usage: '!ded'
};
