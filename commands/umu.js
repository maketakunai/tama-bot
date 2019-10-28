exports.run = (client, message, args) => {
  message.channel.send({
    "embed": {
      "image": {
      "url": randomImage(),
      }
    }
  }).catch(console.error);
}

var answers = ["https://i.imgur.com/bgbPF0n.gif",
"https://i.imgur.com/hVyeLi4.gif",
"https://i.imgur.com/zgUp8Er.gif",
"https://cdn.discordapp.com/attachments/328226993361649674/489896387241181184/image0.png",
"https://i.redd.it/5hwi1okm7zl11.jpg",
"https://cdn.discordapp.com/attachments/328226993361649674/547662026462199819/Dz09qS1X0AARYRb.png",
"https://i.imgur.com/M9WsbvE.gif",
"https://i.imgur.com/IGkhxnh.jpg",
"https://i.imgur.com/B0TenoT.gif",
"https://cdn.discordapp.com/attachments/328226993361649674/624121442115780639/umupop.gif"]

function randomImage() {
  return answers[Math.floor(Math.random()*answers.length)];
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'umu',
  description: `Randomly selects from ${answers.length} available images.`,
  usage: '!umu'
};
