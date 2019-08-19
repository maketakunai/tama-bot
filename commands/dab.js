exports.run = (client, message, args) => {
  message.channel.send({
    "embed": {
      "image": {
      "url": randomImage(),
      }
    }
  }).catch(console.error);
}

const answers = ["https://i.imgur.com/sSIu82q.png",
"https://i.imgur.com/MTJasGq.png",
"https://i.imgur.com/MkA9Dyc.png",
"https://i.imgur.com/YOxclxo.png",
"https://i.imgur.com/cON5YKs.png",
"https://i.imgur.com/3veDRAu.jpg",
"https://i.imgur.com/ibZN1hN.png",
"https://cdn.discordapp.com/attachments/453297116526411787/453743299543564288/Dabbin_Gawain.png",
"https://i.imgur.com/YWIxobq.png",
"https://i.imgur.com/oS3NxC0.png",
"https://i.imgur.com/hJK8mQH.png",
"https://i.imgur.com/OhXKHbq.png",
"https://i.imgur.com/TlMZlFo.jpg",
"https://cdn.discordapp.com/attachments/328226993361649674/519581883223375874/cursedarmdab.png",
"https://i.imgur.com/ivX2P7f.gif",
"https://cdn.discordapp.com/attachments/522576189349691395/535718136356274176/c5fpn5219qu11_1.png",
"https://cdn.discordapp.com/attachments/125022883109011457/554039107781787648/tumblr_po35wcwOBf1uvi4xwo2_1280.png",
"https://i.imgur.com/tfrgCsM.png",
"https://i.imgur.com/3USmy3C.png",
"https://i.imgur.com/5DKuvv9.jpg",
"https://i.imgur.com/elAuoM5.jpg",
"https://i.imgur.com/mM9fdav.jpg",
"https://i.imgur.com/gKOlg6D.png",
"https://i.imgur.com/56LXpWY.jpg",
"https://i.imgur.com/9Xs2Tl7.png"]

function randomImage() {
  return answers[Math.floor(Math.random()*answers.length)];
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'dab',
  description: `Randomly selects from ${answers.length} available images.`,
  usage: '!dab'
};
