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
  var answers = ["http://i0.kym-cdn.com/photos/images/original/000/897/519/bc0.gif",
                 "https://i.pinimg.com/originals/28/99/e7/2899e7324f3c82682c213a4a3053a23c.jpg",
                 "https://s1.zerochan.net/Saber.%28Fate.stay.night%29.600.1168588.jpg",
                 "https://i.pinimg.com/originals/f5/d2/e2/f5d2e299501b940fa3f8856599eaee56.jpg",
                 "https://cdn.discordapp.com/attachments/421357102229880842/451676199136264243/Saber.png",
                 "https://78.media.tumblr.com/de6c13e12d77f071135eb92323518528/tumblr_nhf8kpNCxz1sbh7cpo3_250.gif",
                 "https://cdn.discordapp.com/attachments/421357102229880842/451676268824363008/Didyouhavelunchyethowwasyourday_94ff9a_6452131.png",
                 "https://cdn.discordapp.com/attachments/421357102229880842/451676284393750529/ubw4eating.png",
                 "https://cdn.discordapp.com/attachments/323916996657807362/451667583423479808/saberlion.gif",
                 "https://cdn.discordapp.com/attachments/421357102229880842/451678944526204928/1435071989_fr.gif",
                 "https://cdn.discordapp.com/attachments/421357102229880842/451679068497248266/SoupyPowerlessKusimanse.gif",
                 "https://cdn.discordapp.com/attachments/421357102229880842/451676791854071818/3ffe844f2bd5caa9df43b736d5802bba.png",
                 "https://cdn.discordapp.com/attachments/421357102229880842/451676732198617089/07d21ee93f86be6bf2607960f130328f.png",
                 "https://i.imgur.com/A5rxDgi.jpg"]
  return answers[Math.floor(Math.random()*answers.length)];
}
