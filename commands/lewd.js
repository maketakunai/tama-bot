exports.run = (client, message, args) => {
  message.channel.send({
    "embed": {
      "image": {
      "url": randomImage(),
      }
    }
  }).catch(console.error);
}

var answers = ["https://cdn.discordapp.com/attachments/520082066197708810/522864221780836367/brynnosebleed.jpg",
"https://cdn.discordapp.com/attachments/328226993361649674/515880222017585162/dangerous_beast.png"]

function randomImage() {
  return answers[Math.floor(Math.random()*answers.length)];
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'lewd',
  description: `Randomly selects from ${answers.length} available images.`,
  usage: '!lewd'
};
