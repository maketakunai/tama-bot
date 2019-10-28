exports.run = (client, message, args) => {
  message.channel.send({
    "embed": {
      "image": {
      "url": randomImage(),
      }
    }
  }).catch(console.error);
}

var answers = ["https://i.imgur.com/cNaYhSI.png",
"https://i.imgur.com/vKu4JPA.png",
"https://i.imgur.com/yN2qqaA.jpg",
"https://i.imgur.com/njNDJGf.jpg",
"https://i.imgur.com/6Y5LriH.gif",
"https://i.imgur.com/ANSi6aL.gif",
"https://cdn.discordapp.com/attachments/378997929500868610/497677994773708820/spin.gif",
"http://i.imgur.com/DynAaeT.jpg",
"https://i.imgur.com/J6kb6Ob.png",
"https://i.imgur.com/3BqLA5h.png"]

function randomImage() {
  return answers[Math.floor(Math.random()*answers.length)];
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'illya',
  description: `Randomly selects from ${answers.length} available images.`,
  usage: '!illya'
};
