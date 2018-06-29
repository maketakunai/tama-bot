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
  var answers = ["https://i.imgur.com/kkeehKz.jpg",
  "https://cdn.discordapp.com/attachments/328226892798754819/454833070156283904/atalanta_fate_apocrypha_fate_series_and_sazae_san_drawn_by_mushiro_nijie728995__e8ceb06c1fdd39d9d04b.gif",
  "https://cdn.discordapp.com/attachments/328226892798754819/454831098913095680/b21301204b9d07b9f49113a029f3b325.png",
  "https://cdn.discordapp.com/attachments/328226993361649674/456057133692092419/apples.gif",
  "https://cdn.discordapp.com/attachments/328226993361649674/456057163043962881/CUr5wq_UEAAngyY.png",
  "https://cdn.discordapp.com/attachments/328226993361649674/456057252579901440/CfhkDlkUIAAQcrc.jpg"]
  return answers[Math.floor(Math.random()*answers.length)];
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};
