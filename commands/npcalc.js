const minimist = require('minimist');

exports.run = (client, message, args) => {
  var input = minimist(args, {
    string: ['atk', 'np', 'type', 'class', 'atkup', 'defdown', 'cardup',
    'carddown', 'npup', 'spatk', 'flatatk', 'adv', 'esadv']
  });

  if (input["atk"] === undefined || input["np"] === undefined ||
  input["type"] === undefined || input["class"] === undefined) {
    message.channel.send(`Please check that you have the correct options and try again. \`!help npcalc\``);
    return;
  }
  //Check for and initialize all vars.
  var atk = isFixedValue(input["atk"]);
  var np = isValue(input["np"]);
  var type = cardDmg(input["type"]);
  var classdmg = classDmg(input["class"]);
  var atkup = isValue(input["atkup"]);
  var defdown = isValue(input["defdown"]);
  var cardup = isValue(input["cardup"]);
  var carddown = isValue(input["carddown"]);
  var npup = isValue(input["npup"]);
  var spatk = isValue(input["spatk"]);
  var flatatk = isFixedValue(input["flatatk"]);
  var adv = advantageCalc(input["adv"]);
  var esadv = attributeCalc(input["esadv"]);

  var total = Number(atk) * np * type * adv * classdmg * 0.23 *
      (1 + atkup + defdown) *
      (1 + cardup + carddown) *
      (1 + npup + spatk) * esadv + Number(flatatk);



  //console.log(input);
  //console.log(total);

  var userinput = '';
  for (var key in input) {
    if (key === '_'){
      continue;
    }
    userinput += `${key}: ${input[key]}\n`
  }

  //message.channel.send(`you selected these options: \n${userinput}`);
  //message.channel.send(`calculated np damage is: ${Math.round(total)}`);
  message.channel.send({
      "embed": {
        "color": 16777215,
        "thumbnail": {
          "url": "https://i.imgur.com/LoIAs3M.jpg"
        },
        "footer": {
          "text": `To get a list of options please type: !help npcalc`
        },
        "fields": [
          {
            "name": `You selected these options:`,
            "value": `${userinput}`
          },
          {
            "name": `NP Damage:`,
            "value": `${Math.round(total)}`
          }
        ]
      }
    });

};

function isValue(input){
  var value;
  if (input === undefined){
    value = 0;
  }
  else { value = input / 100 }
  //console.log(value);
  return value;
}

function isFixedValue(input){
  var value;
  if (input === undefined){
    value = 0;
  }
  else { value = input }
  //console.log(value);
  return value;
}

function classDmg(input){
  var classVal = 1;
  if (input === undefined){
    return classVal;
  }
  if ("archer".indexOf(input.toLowerCase()) > -1){
    classVal = 0.95;
  }
  else if ("lancer".indexOf(input.toLowerCase()) > -1){
    classVal = 1.05;
  }
  else if ("caster".indexOf(input.toLowerCase()) > -1 || "assassin".indexOf(input.toLowerCase()) > -1){
    classVal = 0.9;
  }
  else if ("berserker".indexOf(input.toLowerCase()) > -1 ||
  "ruler".indexOf(input.toLowerCase()) > -1 || "avenger".indexOf(input.toLowerCase()) > -1 ){
    classVal = 1.1;
  }
  return classVal;
}

function cardDmg(input){
  var cardVal = 0;
  if (input === undefined){
    return cardVal;
  }
  if ("buster".indexOf(input.toLowerCase()) > -1){
    cardVal = 1.5;
  }
  else if ("arts".indexOf(input.toLowerCase()) > -1){
    cardVal = 1.0;
  }
  else if ("quick".indexOf(input.toLowerCase()) > -1){
    cardVal = 0.8;
  }
  return cardVal;
}

function advantageCalc(input){
  var adv = 1;
  if (input === undefined){
    return adv;
  }
  if ("yes".indexOf(input.toLowerCase()) > -1){
    adv = 2;
  }
  else if ("no".indexOf(input.toLowerCase()) > -1){
    adv = 0.5;
  }
  else if ("berserker".indexOf(input.toLowerCase()) > -1){
    adv = 1.5;
  }
  return adv;
}

function attributeCalc(input){
  var attVal = 1;
  if (input === undefined){
    return attVal;
  }
  if ("yes".indexOf(input.toLowerCase()) > -1){
    attVal = 1.1;
  }
  else if ("no".indexOf(input.toLowerCase()) > -1){
    attVal = 0.9;
  }
  return attVal;
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'npcalc',
  description: 'Calculates expected NP damage. List of options:\n'+
  '--atk      REQUIRED. Servant attack value. ex) --atk 12345\n'+
  '--np       REQUIRED. Servant NP damage multiplier percentage. ex) --np 600\n'+
  '--type     REQUIRED. Card type. Buster, Arts, Quick. ex) --type buster\n'+
  '--class    REQUIRED. Servant class. ex) --class berserker\n'+
  '--adv      Advantage vs. your target. Select from Yes, No, Berserker.\n'+
  '           Will default to neutral. ex) --adv yes\n'+
  '--atkup    Attack % up buff(s) on the servant. ex) --atkup 20\n'+
  '--defdown  Defense down debuff(s) % on the target. ex) --defdown 30\n'+
  '--cardup   BAQ card % buff(s) on the servant. ex) --cardup 20\n'+
  '--carddown BAQ card % debuff(s) on the target.\n'+
  '--npup     NP damage buff % on the servant. ex) --npup 10\n'+
  '--spatk    Special attack % mods, like vs. Divine. ex) --spatk 100\n'+
  '--flatatk  Any flat attack mods, like what Waver gives. ex) --flatatk 100\n'+
  '--esadv    Earth or Sky advantage. Yes or no. Defaults to neutral.',
  usage: '!npcalc --atk 9876 --np 600 --type quick ...'
};
