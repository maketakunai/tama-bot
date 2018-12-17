const exp_normal = 27000;
const exp_bonus = 32400;
const expChart = require("../db/exp.json");

exports.run = (client, message, args) => {
  if (args.length == 0){
    message.channel.send("Please enter in two levels between 1 and 100. Example: !exp 1 90").catch(console.error);
  }
  else if (expChart[args[0]-1] && expChart[args[1]-1] && args.length == 2 && Number(args[0]) < Number(args[1])){
    var results = calcExp(args[0], args[1]);
    message.channel.send(`To go from level ${args[0]} to ${args[1]}, you will need ${results[1]} class 4* exp cards or ${results[0]} non-class 4* exp cards.\nYou can also use ${results[3]} class 5* exp cards or ${results[2]} non-class 5* exp cards.`).catch(console.error);
  }
  else {
    message.channel.send("Please enter in two levels between 1 and 100. Example: !exp 1 90").catch(console.error);
  }
}

function calcExp(x, y){
  var totalExp = expChart[y-1].Exp_Total - expChart[x-1].Exp_Total;
  var normExp = Math.ceil(totalExp/exp_normal);
  var bonusExp = Math.ceil(totalExp/exp_bonus);
  var normExp5 = Math.ceil(totalExp/(exp_normal*3));
  var bonusExp5 = Math.ceil(totalExp/(exp_bonus*3));
  return [normExp, bonusExp, normExp5, bonusExp5]
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["xp"]
};

exports.help = {
  name: 'exp',
  description: `Shows you the number of exp cards necessary to level a servant from specified levels.`,
  usage: '!exp [startlevel] [endlevel]'
};
