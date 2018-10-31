exports.run = (client, message, args) => {
  message.channel.send({
    "embed": {
      "image": {
      "url": randomImage(),
      }
    }
  }).catch(console.error);
}

var answers = ["https://cdn.discordapp.com/attachments/328226993361649674/465311661524385792/SeibaCop.png",
"https://cdn.discordapp.com/attachments/328226993361649674/495614770599428096/Tamamo_cop_2.jpg",
"https://cdn.discordapp.com/attachments/328226993361649674/495614881391706122/Tamamo_Cop_1.jpg",
"https://i.imgur.com/4J9uhjr.png",
"https://www.koi-nya.net/img/subidos_posts/2018/08/Fate-EXTELLA-Link-presenta-su-DLC-Holiday-Set-en-video-14.png",
"https://vignette.wikia.nocookie.net/fategrandorder/images/d/d9/Lobo_Police.png"]

function randomImage() {
  return answers[Math.floor(Math.random()*answers.length)];
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'police',
  description: `Randomly selects from ${answers.length} available images.`,
  usage: '!police'
};


