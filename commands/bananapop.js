exports.run = (client, message, args) => {
  message.channel.send({files: [randomImage()]}).catch(console.error);
}

const answers = ["https://media.discordapp.net/attachments/328226993361649674/536655421495050241/bananapop3.gif",
"https://cdn.discordapp.com/attachments/631560606037835796/635322986928406580/bananaprise.gif",
"https://cdn.discordapp.com/attachments/631560606037835796/635324706995699731/bananaprise2.gif",
"https://cdn.discordapp.com/attachments/328226993361649674/635326100477575198/bananasq.gif"
]

function randomImage() {
  return answers[Math.floor(Math.random()*answers.length)];
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'bananapop',
  description: `bananapop`,
  usage: '!bananapop'
};
