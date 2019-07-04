const minimist = require('minimist');

exports.run = (client, message, args) => {
  let input = minimist(args, {
    string: ['atk', 'np', 'type', 'class', 'atkup', 'defdown', 'cardup',
    'carddown', 'npup', 'spatk', 'npsp', 'flatatk', 'adv', 'esadv']
  });

  if (input["atk"] === undefined || input["np"] === undefined ||
  input["type"] === undefined || input["class"] === undefined) {
    message.channel.send(`\`!help npcalc\` Try the np calc at https://maketakunai.github.io/`);
    return;
  }
  //Check for and initialize all variables.
  let atk = isFixedValue(input["atk"]);
  let np = isValue(input["np"]);
  let type = cardDmg(input["type"]);
  let classdmg = classDmg(input["class"]);
  let atkup = isValue(input["atkup"]);
  let defdown = isValue(input["defdown"]);
  let cardup = isValue(input["cardup"]);
  let carddown = isValue(input["carddown"]);
  let npup = isValue(input["npup"]);
  let spatk = isValue(input["spatk"]);
  let npsp = isValue(input["npsp"] - 100) || 0;
  let flatatk = isFixedValue(input["flatatk"]);
  let adv = advantageCalc(input["adv"]);
  let esadv = attributeCalc(input["esadv"]);

  let total = Number(atk) * np * type * adv * classdmg * 0.23 *
      (1 + atkup + defdown) *
      (1 + cardup + carddown) *
      (1 + npup + spatk) *
      (1 + npsp) * esadv + Number(flatatk);



  //console.log(input);
  //console.log(total);

  let userinput = '';
  for (let key in input) {
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
            "value": `Low: ${Math.round(0.9*total)}, Avg: ${Math.round(total)}, High: ${Math.round(1.1*total)}`
          }
        ]
      }
    });

};

function isValue(input){
  let value;
  if (input === undefined){
    value = 0;
  }
  else { value = input / 100 }
  //console.log(value);
  return value;
}

function isFixedValue(input){
  let value;
  if (input === undefined){
    value = 0;
  }
  else { value = input }
  //console.log(value);
  return value;
}

function classDmg(input){
  let classVal = 1;
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
  let cardVal = 0;
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
  let adv = 1;
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
  let attVal = 1;
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
  '--npsp     Bonus special attack % mods on the NP. ex) --npbonus 150\n'+
  '--spatk    Special attack % mods, like vs. Divine. ex) --spatk 100\n'+
  '--flatatk  Any flat attack mods, like Divinity. ex) --flatatk 100\n'+
  '--esadv    Earth or Sky advantage. Yes or no. Defaults to neutral.',
  usage: '!npcalc --atk 9876 --np 600 --type quick ...'
};
