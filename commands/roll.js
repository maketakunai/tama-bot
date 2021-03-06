exports.run = (client, message, args) => {
  message.channel.send(message.author.toString() + ", my verdict is... " + roll()).catch(console.error);
}

function roll() {
  var answers = ['Yes. 1x or 10x summon, it\'s your choice.',
  'No.',
  'Absolutely not!',
  'Of course! It\'s time for a 10x roll!',
  'Yes. Do a single summon.',
  'Yes. Do a 10x summon.',
  'Yes. Do a 1x or 10x story banner summon.',
  'Definitely not. Save for the New Year gachapocalpyse!',
  'No way! Save for your waifu or husbando!',
  'Leave those quartz alone! Now\'s not the time for that!',
  '!Roll again.']
  return answers[ Math.floor ( Math.random() * answers.length ) ];
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'roll',
  description: `Ask tamabot if you should roll the gacha.`,
  usage: '!roll'
};
