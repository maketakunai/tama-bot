const servantList = require("../data/servant_db.json")
const emoji = require("../data/emoji.json")
const itememoji = require("../data/item-emoji.json")

exports.run = (client, message, args) => {
  //let searchResult = findServant(searchString);
  if ( Number(args[0]) && (args.length == 1)){
    for (let i = 0; i < servantList.length; i++){
      if (Number(servantList[i].id) == Number(args[0])){
        printServantMats(servantList, i, message);
        return;
      }
    }
  }
  if (args.length == 0) {
    message.channel.send("Stop, stop please! Please type '!mats (class) (servantname)' to search for a particular servant.\nThe available servant classes are: Saber, Archer, Lancer, Rider, Caster, Assassin, Berserker, Shielder, Ruler, Avenger, MoonCancer, AlterEgo, Foreigner")
    return;
  }

  let classSearch = checkServantClass(args[0]);

  let searchString = args.shift()
  searchString = args.join('');
  searchString = searchString.replace(/\W/g, '').toLowerCase();
  //console.log(`Searching for ${searchString}...`);
  if (classSearch.length == 0){
    message.channel.send("Stop, stop please! Please type '!mats (class) (servantname)' to search for a particular servant.\nThe available servant classes are: Saber, Archer, Lancer, Rider, Caster, Assassin, Berserker, Shielder, Ruler, Avenger, MoonCancer, AlterEgo, Foreigner")
    return;
  }
  let servantSearch = findServant(classSearch, searchString);
  let responseList = [];
  let numList = [];

  if (servantSearch.length == 1){
    for (let j = 0; j < servantSearch.length; j++){
      printServantMats(servantSearch, j, message);
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
    message.channel.send(`Reply with the ID number of the servant you want(example:\`001\`), or type \`showall\` to show all:\n${responseList.join('\r\n')}\nYou can also search via servant ID (example: \`!mats 123\`)`)
      .then(() => {
        numList.push('showall');
        message.channel.awaitMessages(response => numList.indexOf(response.content) != -1, {
        max: 1,
        time: 15000,
        errors: ['time'],
      })
      .then((collected) => {
        if (collected.first().content.toLowerCase() == 'showall') {
          for (let j = 0; j < servantSearch.length; j++){
            printServantMats(servantSearch, j, message);
          }
        }
        else {
          for (let j = 0; j < servantSearch.length; j++){
            if (Number(collected.first().content) == Number(servantSearch[j].id)){
              printServantMats(servantSearch, j, message);
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

function printServantMats(servantSearch, j, message) {
  let ascensionmats = servantSearch[j].ascension.split(';');
  for (let k = 0; k < ascensionmats.length; k++){
    for (let key in itememoji) {
      ascensionmats[k] = ascensionmats[k].replace(key, itememoji[key]);
    }
  }
  let skillmats = servantSearch[j].skillmats.split(';');
  for (let m = 0; m < skillmats.length; m++){
    for (let key in itememoji) {
      skillmats[m] = skillmats[m].replace(key, itememoji[key]);
    }
  }
  let costumemats;
  //console.log(servantSearch[j].costume);
  if (servantSearch[j].costume) {
    costumemats = servantSearch[j].costumemats;
      for (let key in itememoji) {
        costumemats = costumemats.replace(key, itememoji[key]);
    }
  }

  //generate url for embed image
  let servnum = pad(servantSearch[j].id, 3);
  let imgurl = `http://fate-go.cirnopedia.org/icons/servant/servant_`+ servnum +`1.png`;
  if (servantSearch[j].costume) {
    message.channel.send({
      "embed": {
        "color": 000000,
        "thumbnail": {
          "url": `${imgurl}`
        },
        "title": `${servantSearch[j].name}, ${servantSearch[j].rarity} ★ ${emoji[servantSearch[j].class]} ${servantSearch[j].class}`,
        "fields": [
          {
            "name": "Ascensions",
            "value": `1st: ${ascensionmats[0]}\n2nd:${ascensionmats[1]}\n3rd:${ascensionmats[2]}\n4th:${ascensionmats[3]}`,
          },
          {
            "name": "Skills",
            "value": `1→2: ${skillmats[0]}\n2→3:${skillmats[1]}\n3→4:${skillmats[2]}\n4→5:${skillmats[3]}\n5→6:${skillmats[4]}\n6→7:${skillmats[5]}\n7→8:${skillmats[6]}\n8→9:${skillmats[7]}\n9→10:${skillmats[8]}`,
          },
          {
            "name": "Costume",
            "value": `${costumemats}`,
          }
        ]
      }
    }).catch(console.error);
    return;
  }
  else {
    message.channel.send({
      "embed": {
        "color": 000000,
        "thumbnail": {
          "url": `${imgurl}`
        },
        "title": `${servantSearch[j].name}, ${servantSearch[j].rarity} ★ ${emoji[servantSearch[j].class]} ${servantSearch[j].class}`,
        "fields": [
          {
            "name": "Ascensions",
            "value": `1st: ${ascensionmats[0]}\n2nd:${ascensionmats[1]}\n3rd:${ascensionmats[2]}\n4th:${ascensionmats[3]}`,
          },
          {
            "name": "Skills",
            "value": `1→2: ${skillmats[0]}\n2→3:${skillmats[1]}\n3→4:${skillmats[2]}\n4→5:${skillmats[3]}\n5→6:${skillmats[4]}\n6→7:${skillmats[5]}\n7→8:${skillmats[6]}\n8→9:${skillmats[7]}\n9→10:${skillmats[8]}`,
          }
        ]
      }
    }).catch(console.error);
  }
}


function checkServantClass(input){
  console.log(`Searching ${Object.keys(servantList).length} entries...`);
  let classResults = [];
  let cleanedInput = input.toLowerCase();
  for (let i = 0; i < servantList.length; i++){
    if (servantList[i].class.replace(/\W/g, '').toLowerCase().search(cleanedInput) != -1){
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
    let sAlias = classSearchResults[i].alias.split(',');
    sName = sName.replace(/\W/g, '').toLowerCase();
    for (let j = 0; j < sAlias.length; j++){
      sAlias[j] = sAlias[j].replace(/\W/g, '').toLowerCase();
      if ((sName.search(input) != -1) || (sAlias[j].search(input) != -1)){
        servantsFound.push(classSearchResults[i]);
        break;
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
  aliases: ["materials"]
};

exports.help = {
  name: 'mats',
  description: `Shows materials necessary for a particular servant.`,
  usage: '!mats [class] [servantname]'
};
