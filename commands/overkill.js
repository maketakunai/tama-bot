exports.run = (client, message, args) => {
  message.channel.send({
    "embed": {
      "image": {
      "url": randomImage(),
      }
    }
  }).catch(console.error);
}

var answers = ["https://media.discordapp.net/attachments/328227014639091712/590768480878329866/overkill.gif",
"https://media.discordapp.net/attachments/328226993361649674/594972654348533791/overkill2.gif"]

function randomImage() {
  return answers[Math.floor(Math.random()*answers.length)];
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'overkill',
  description: `Randomly selects from ${answers.length} available images.`,
  usage: '!overkill'
};
