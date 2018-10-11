exports.run = (client, message, args) => {
  message.channel.send({
    "embed": {
      "image": {
      "url": randomImage(),
      }
    }
  }).catch(console.error);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'police',
  description: `An image of seibacop.`,
  usage: '!police'
};

function randomImage() {
  var answers = ["https://cdn.discordapp.com/attachments/328226993361649674/465311661524385792/SeibaCop.png",
  "https://cdn.discordapp.com/attachments/328226993361649674/495614770599428096/Tamamo_cop_2.jpg",
  "https://cdn.discordapp.com/attachments/328226993361649674/495614881391706122/Tamamo_Cop_1.jpg",
  "https://i.imgur.com/4J9uhjr.png",
  "https://www.koi-nya.net/img/subidos_posts/2018/08/Fate-EXTELLA-Link-presenta-su-DLC-Holiday-Set-en-video-14.png"]
  return answers[Math.floor(Math.random()*answers.length)];
}
