const talkedRecently = new Set();


exports.run = (client, message, args) => {
  if (talkedRecently.has(message.author.id)){
    message.channel.send(message.author.toString() + ", you can only pray at the shrine once every hour.")
  }
  else {
    if ( Number(args[0]) < 0 ){
      message.channel.send("Stop, stop please! " + message.author.toString() + ", why would you steal SQ from the donation box!?");
      return;
    }
    else if ( args.length != 1 || isNaN(args[0]) || Number(args[0]) == 0 ){
      message.channel.send("Stop, stop please! To receive a fortune, you first need to make a donation. !omikuji (number).");
      return;
    }

    message.channel.send(message.author.toString() + ", your fortune is... " + rollFortune(args[0])).catch(console.error);
    talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 3600000);
  }
}

//using david bau's seedrandom https://github.com/davidbau/seedrandom
function rollFortune(arg) {
  var answers = ['大吉 - A great blessing.',
  '中吉 - A medium blessing.',
  '小吉 - A small blessing.',
  '吉 - A normal blessing.',
  '半吉 - A half blessing.',
  '末吉 - Good luck will come to you in the future.',
  '末小吉 - A tiny bit of luck will come to you in the future.',
  '凶 - A curse.',
  '小凶 - A small curse.',
  '半凶 - A half curse.',
  '末凶 - You shall be visited by a curse in the future.',
  '大凶 - A terrible curse.']
  var seedrandom = require('seedrandom');
  var rng = seedrandom( Number(arg[0]), { entropy: true } );
  return answers[Math.floor(rng()*answers.length)];
}
