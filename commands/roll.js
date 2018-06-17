exports.run = async (client, message, args) => {
  message.channel.send(message.author.toString() + ", my verdict is... " + roll()).catch(console.error);
}

function roll() {
  var answers = ['Yes. 1x or 10x summon, it\'s your choice.',
  'No.',
  'Absolutely not!',
  'Yes. Do a single summon.',
  'Yes. Do a 10x summon.',
  'Yes. Do a single FP summon.',
  'Yes. Do a 10x FP summon.',
  'Yes. Do a 1x or 10x story banner summon.',
  'Definitely not. Save for the Summer servants!',
  'No way! Save for your waifu or husbando!',
  'Leave those quartz alone! Now\'s not the time for that!',
  '!Roll again.']
  return answers[ Math.floor ( Math.random() * answers.length ) ];
}
