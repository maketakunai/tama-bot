const emoji = require("../data/emoji.json")
const servantList = require("../data/servant_db.json");
exports.run = (client, message, args) => {
  let classSearch = checkServantClass(args[0]);
  let searchString = args.shift()
  searchString = args.join('');
  searchString = searchString.replace(/\W/g, '').toLowerCase();
  console.log(`Searching for ${searchString}...`);
  if (classSearch.length == 0){
    message.channel.send("Stop, stop please! Please type '!npdmg (class) (servantname)' to search for a particular servant.\nThe available servant classes are: Saber, Archer, Lancer, Rider, Caster, Assassin, Berserker, Shielder, Ruler, Avenger, MoonCancer, AlterEgo, Foreigner")
    return;
  }
  let servantSearch = findServant(classSearch, searchString);

  if (servantSearch.length > 0) {
    for (let j = 0; j < servantSearch.length; j++){
      //generate url for embed image
      let servnum = pad(servantSearch[j].id, 3);
      let imgurl = `http://fate-go.cirnopedia.org/icons/servant/servant_`+ servnum +`1.png`;

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
      /*if (servantSearch[j].hiddenname) {
        title = `${servantSearch[j].name}/||${servantSearch[j].alias}||, ${servantSearch[j].rarity} ★ ${emoji[servantSearch[j].class]} ${servantSearch[j].class}`
      }*/

      message.channel.send({
        "embed": {
          "description": `${emoji[type]} ${type}, ${servantSearch[j].nptarget}, Upgrade: ${upgrade}`,
          "title": title,
          "color": 16756224,
          "thumbnail": {
            "url": `${imgurl}`
          },
          "footer": {
          "text": `'!help npdmg' to see notes about damage values.`
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
  }
  else
    message.channel.send("Sorry, I couldn't find that servant. Please try again, or use a search term longer than two characters.");
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
  if (input == "" || input.length < 2){
    return servantsFound;
  }
  for (let i = 0; i < classSearchResults.length; i++){
    let sName = classSearchResults[i].name;
    let sAlias = classSearchResults[i].alias;
    sAlias = sAlias.replace(/\W/g, '').toLowerCase();
    sName = sName.replace(/\W/g, '').toLowerCase();
    if ((sName.search(input) != -1) || (sAlias.search(input) != -1)){
      servantsFound.push(classSearchResults[i]);
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
