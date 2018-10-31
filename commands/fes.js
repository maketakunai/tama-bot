exports.run = (client, message, args) => {
  message.channel.send({
    "embed": {
      "image": {
      "url": randomImage(),
      }
    }
  }).catch(console.error);
}

var answers = ["https://i.imgur.com/2FtJPP3.png",
"https://i.imgur.com/waGx3hX.png",
"https://i.imgur.com/KeIXdDh.png",
"https://i.imgur.com/gZ702Ti.png",
"https://i.imgur.com/aQt3Ptm.png",
"https://i.imgur.com/dZ15mGM.png",
"https://i.imgur.com/9v9J32x.png",
"https://i.imgur.com/3BBgJ0B.png",
"https://i.imgur.com/ZFo7a4v.png",
"https://i.imgur.com/eOYtrlF.png",
"https://i.imgur.com/528MBmP.png",
"https://i.imgur.com/bJs4ifg.png",
"https://i.imgur.com/WKXwmvd.png",
"https://i.imgur.com/cCudYjI.png",
"https://i.imgur.com/HKWF80P.png",
"https://i.imgur.com/vEuMXCM.png",
"https://i.imgur.com/JHdQUfo.png",
"https://i.imgur.com/93cWnD7.png",
"https://i.imgur.com/EHG2wun.png",
"https://i.imgur.com/IeokVeg.png"]

function randomImage() {
  return answers[Math.floor(Math.random()*answers.length)];
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'fes',
  description: `Randomly selects from ${answers.length} available images.`,
  usage: '!fes'
};
