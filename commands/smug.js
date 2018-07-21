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
  var answers = ["https://i.imgur.com/6eKbYoH.png",
  "https://i.imgur.com/0nP3GU5.png",
  "https://i.imgur.com/YTDFMTn.png",
  "https://i.imgur.com/8tGIboF.png",
  "https://pbs.twimg.com/media/DVTF3PYX0AA43WP.jpg",
  "https://pbs.twimg.com/media/DSSebyiWsAAeI6m.jpg",
  "https://img.fireden.net/vg/image/1502/74/1502743497679.png"]
  return answers[Math.floor(Math.random()*answers.length)];
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'smug',
  description: `Randomly selects from 7 available images.`,
  usage: '!smug'
};
