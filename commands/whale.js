exports.run = (client, message, args) => {
  message.channel.send({
    "embed": {
      "image": {
      "url": randomImage(),
      }
    }
  }).catch(console.error);
}

var answers = ["https://cdn.discordapp.com/attachments/421357102229880842/422284083947765770/Gil_Whale.jpg",
"https://78.media.tumblr.com/ccebc557b6704a1fd7d6c013ec2c4912/tumblr_ov4qyvIXb91ua9jbeo1_500.png",
"https://cdn.discordapp.com/attachments/421357102229880842/422288350511104002/AExupvX.jpg",
"https://cdn.discordapp.com/attachments/421357102229880842/422288058096943114/Jalter_Comes.jpg",
"https://cdn.discordapp.com/attachments/421357102229880842/422287674997735435/Merlin_Whaling.jpg",
"https://cdn.discordapp.com/attachments/421357102229880842/422287586174828554/failed_whale.jpg",
"https://cdn.discordapp.com/attachments/421357102229880842/422286205397237762/u6baD7gl.jpg",
"https://cdn.discordapp.com/attachments/421357102229880842/422284386747285504/Whale_Gudao.jpg",
"https://i.imgur.com/UEEIEm3.jpg",
"https://i.imgur.com/BHlbijc.jpg",
"https://i.imgur.com/FV1xiA9.jpg",
"https://cdn.discordapp.com/attachments/421357102229880842/422284258938454016/Whale_Gudako.jpg",
"https://i.imgur.com/ZnAlruh.jpg",
"https://i.imgur.com/ghrLAGng.jpg",
"https://i.imgur.com/iqGZ7tR.jpg",
"https://i.imgur.com/GJe88e5.jpg",
"https://i.imgur.com/2PSDB1W.jpg"]

function randomImage() {
  return answers[Math.floor(Math.random()*answers.length)];
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'whale',
  description: `Randomly selects from ${answers.length} available images.`,
  usage: '!whale'
};
