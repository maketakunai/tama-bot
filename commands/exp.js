const exp_normal = 27000;
const exp_bonus = 32400;
const expChart = require("../db/exp.json");

exports.run = (client, message, args) => {
  if (args.length == 0){
    message.channel.send({
    file: "https://media.discordapp.net/attachments/328226993361649674/377617545697689620/unknown.png"
    }).catch(console.error);
  }
  else if (expChart[args[0]-1] && expChart[args[1]-1] && args.length == 2 && Number(args[0]) < Number(args[1])){
    //console.log('argchecker loop entered');
    var results = calcExp(args[0], args[1]);
    message.channel.send(`To go from level ${args[0]} to ${args[1]}, you will need ${results[1]} class 4* exp cards or ${results[0]} non-class 4* exp cards.`).catch(console.error);
  }
  else {
    message.channel.send("Please enter in two levels between 1 and 100. Example: !exp 1 90").catch(console.error);
  }
}

function calcExp(x, y){
  var totalExp = expChart[y-1].Exp_Total - expChart[x-1].Exp_Total;
  var normExp = Math.ceil(totalExp/exp_normal);
  var bonusExp = Math.ceil(totalExp/exp_bonus);
  //for (var i = x-1; i < y-1; i++){
  //}
  return [normExp, bonusExp]

}

/*
function argsChecker(x, y){
  var a = 0;
  var b = 0;
  a += (x < y)? 1 : 0; b += 1;
  a += (x < 100)? 1 : 0; b += 1;
  a += (x > 0)? 1 : 0; b += 1;
  a += (y <= 100)? 1 : 0; b += 1;
  a += (y > 0)? 1 : 0; b += 1;

  //if (x < y && x <= 100 && x > 0 && y <= 100 && y > 1){
    //console.log('true returned');
    //return true;
  //}
  if (a == b){
    console.log('true returned');
    return true;
  }
  else {
    console.log('returned false');
    return false;
  }
}
*/
