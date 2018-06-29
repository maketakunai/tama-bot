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
  var answers = ["https://i.imgur.com/sSIu82q.png",
  "https://i.imgur.com/MTJasGq.png",
  "https://i.imgur.com/MkA9Dyc.png",
  "https://i.imgur.com/YOxclxo.png",
  "https://i.imgur.com/cON5YKs.png",
  "https://i.imgur.com/3veDRAu.jpg",
  "https://i.imgur.com/ibZN1hN.png",
  "https://cdn.discordapp.com/attachments/453297116526411787/453743299543564288/Dabbin_Gawain.png"]
  return answers[Math.floor(Math.random()*answers.length)];
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};
