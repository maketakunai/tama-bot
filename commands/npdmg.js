const emoji = require("../data/emoji.json")
const servantList = require("../data/servant_db.json");
const lastUpdated = "08/14/2019"
const master = require("../data/master.json")

exports.run = (client, message, args) => {
  if ( Number(args[0]) && (args.length == 1)){
    for (let i = 0; i < servantList.length; i++){
      if (Number(servantList[i].id) == Number(args[0])){
        printServantData(servantList, i, message);
        return;
      }
    }
  }
  if (args.length == 0) {
    message.channel.send("Stop, stop please! Please type \`!npdmg (class) (servantname)\` to search for a particular servant.\nThe available servant classes are: Saber, Archer, Lancer, Rider, Caster, Assassin, Berserker, Shielder, Ruler, Avenger, MoonCancer, AlterEgo, Foreigner").then(m => m.delete(20000));
    return;
  }
  let classSearch = checkServantClass(args[0]);
  let searchString = args.shift()
  searchString = args.join('');
  searchString = searchString.replace(/\W/g, '').toLowerCase();
  console.log(`Searching for ${searchString}...`);
  if (classSearch.length == 0){
    message.channel.send("Stop, stop please! Please type \`!npdmg (class) (servantname)\` to search for a particular servant.\nYou can also search using the servant number. Example: \`!npdmg 007\`\nThe available servant classes are: Saber, Archer, Lancer, Rider, Caster, Assassin, Berserker, Shielder, Ruler, Avenger, MoonCancer, AlterEgo, Foreigner").then(m => m.delete(20000));
    return;
  }
  let servantSearch = findServant(classSearch, searchString);

  let responseList = [];
  let numList = [];

  if (servantSearch.length == 1){
    for (let j = 0; j < servantSearch.length; j++){
      printServantData(servantSearch, j, message);
    }
    return;
  }
  else if (servantSearch.length > 1) {
    for (let i = 0; i < servantSearch.length; i++){
      let servnum = pad(servantSearch[i].id, 3);
      numList.push(servnum);
      let serv = `${servnum}: ${servantSearch[i].name}, ${servantSearch[i].rarity} ★ ${emoji[servantSearch[i].class]} ${servantSearch[i].class}`
      responseList.push(serv);
    }

    message.channel.send(`Reply with the ID number of the servant you want (example:\`001\`), or type \`showall\` to show all:\n${responseList.join('\r\n')}\nYou can also search via servant ID (example: \`!npdmg 123\`)`)
      .then(m => {
        m.delete(20000);
        numList.push('showall');
        message.channel.awaitMessages(response => numList.indexOf(response.content) != -1, {
        max: 1,
        time: 15000,
        errors: ['time'],
      })
      .then((collected) => {
        if (collected.first().content.toLowerCase() == 'showall') {
          for (let j = 0; j < servantSearch.length; j++){
            printServantData(servantSearch, j, message);
          }
        }
        else {
          for (let j = 0; j < servantSearch.length; j++){
            if (Number(collected.first().content) == Number(servantSearch[j].id)){
              printServantData(servantSearch, j, message);
            }
          }
        }
      })
      .catch(() => {
        message.channel.send(message.author.username +', you did not respond within the time limit. Please try searching again.');
      });
    });
  }
  else
    message.channel.send("Sorry, I couldn't find that servant. Please try again, or use a search term longer than two characters.");
}


function printServantData(servantSearch, j, message){
  //generate url for embed image
  let servnum = pad(servantSearch[j].id, 3);
  //let imgurl = `http://fate-go.cirnopedia.org/icons/servant/servant_`+ servnum +`1.png`;

  let imgurl = "";
  for (let i = 0; i < master.mstSvt.length; i++){ //lets iterate through mstSvt and find the game ID for a servant
    if ( master.mstSvt[i].combineLimitId ){ //so if that ID first exists,
      if ( Number(master.mstSvt[i].collectionNo) == Number(servantSearch[j].id) ) { //then check for a match with servant number
        imgurl = 'https://kazemai.github.io/fgo-vz/common/images/icon/faces/'+master.mstSvt[i].id+'0.png';
      }
    }
  }

  //check to see if there's an NP upgrade
  let upgrade = "-";
  if (servantSearch[j].npupgrade){
    upgrade = `${emoji["NP"]}`;
  }

  //check for NP type
  let type = '';
  if (servantSearch[j].deck[6] == 'A') {
    type = 'Arts';
  }
  else if (servantSearch[j].deck[6] == 'B') {
    type = 'Buster';
  }
  else {type = 'Quick';}

  //check to see if there are damage values, and print '-' if not
  let npdmg = [];
  if (!servantSearch[j].npdmg) {
    npdmg = ['-','-','-','-','-']
  }
  else {npdmg = servantSearch[j].npdmg.split(',');}
  let specialdmg = [];
  if (!servantSearch[j].specialnpdmg) {
    specialdmg = ['-','-','-','-','-']
  }
  else {specialdmg = servantSearch[j].specialnpdmg.split(',');}

  //check to see if servant has a hidden true name from EoR - broken on android, disable for now!~
  let title = `${servantSearch[j].name}, ${servantSearch[j].rarity} ★ ${emoji[servantSearch[j].class]} ${servantSearch[j].class}`;
  //if (servantSearch[j].hiddenname) {
    //title = `${servantSearch[j].name}/||${servantSearch[j].alias}||, ${servantSearch[j].rarity} ★ ${emoji[servantSearch[j].class]} ${servantSearch[j].class}`
    //}

  message.channel.send({
    "embed": {
      "description": `${emoji[type]} ${type}, ${servantSearch[j].nptarget}, Upgrade: ${upgrade}`,
      "title": title,
      "color": 0000000,
      "thumbnail": {
        "url": `${imgurl}`
      },
      "footer": {
      "text": `Last updated ${lastUpdated}. '!help npdmg'`
      },
      "image": {
      "url": ""
      },
      "fields": [
        {
          "name": "NP Damage",
          "value": `NP1: ${npdmg[0]}\nNP2: ${npdmg[1]}\nNP3: ${npdmg[2]}\nNP4: ${npdmg[3]}\nNP5: ${npdmg[4]}\n`,
          "inline": true
        },
        {
          "name": `Special: ${servantSearch[j].npspecial}` ,
          "value": `NP1: ${specialdmg[0]}\nNP2: ${specialdmg[1]}\nNP3: ${specialdmg[2]}\nNP4: ${specialdmg[3]}\nNP5: ${specialdmg[4]}\n`,
          "inline": true
        }
      ]
    }
  }).catch(console.error);
}



function checkServantClass(input){
  console.log(`Searching ${Object.keys(servantList).length} entries...`);
  let classResults = [];
  let cleanedInput = input.toLowerCase();
  for (let i = 0; i < servantList.length; i++){
    if (servantList[i].class.toLowerCase().replace(/\s/g, '').search(cleanedInput) != -1){
      classResults.push(servantList[i]);
    }
  }
  return classResults;
}



function findServant(classSearchResults, input){
  let servantsFound = [];
  let exactMatchFound = 0;
  let r = new RegExp("\\b"+input+"\\b");
  if (input == "" || input.length < 2){
    return servantsFound;
  }
  for (let i = 0; i < classSearchResults.length; i++){
    let sName = classSearchResults[i].name;
    let sAlias = classSearchResults[i].alias;
    sAlias = sAlias.toLowerCase();
    sName = sName.toLowerCase();
    if ((sName.search(r) != -1) || (sAlias.search(r) != -1)){
      servantsFound.push(classSearchResults[i]);
      exactMatchFound = 1;
    }
  }
  if (!exactMatchFound) {
    for (let i = 0; i < classSearchResults.length; i++){
      let sName = classSearchResults[i].name;
      let sAlias = classSearchResults[i].alias;
      sAlias = sAlias.replace(/\W/g, '').toLowerCase();
      sName = sName.replace(/\W/g, '').toLowerCase();
      if ((sName.search(input) != -1) || (sAlias.search(input) != -1)){
        servantsFound.push(classSearchResults[i]);
      }
    }
  }

  return servantsFound;
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["npdamage","npdamages"]
};

exports.help = {
  name: 'npdmg',
  description: `Shows NP damage for a particular servant.\nMax level, +1000 fous, without grails.\nDamage values shown are vs. neutral targets.\nSelf buffs are added at level 10.\nPassive skills are applied.\n100% overcharge only.\nClass attack multipliers and traits are included.\nClass triangle mods are not included.\nInterludes and strengthening quests are included.`,
  usage: '!npdmg [class] [servantname]'
};
