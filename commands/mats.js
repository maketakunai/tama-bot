const servantList = require("../data/servant_db.json")
const emoji = require("../data/emoji.json")
const itememoji = require("../data/item-emoji.json")
const master = require("../data/master.json")

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
  let ascensionMats = [];
  let skillMats = [];
  let gameID = 0;
  let imgurl = '';
  for (let i = 0; i < master.mstSvt.length; i++){ //lets iterate through mstSvt and find the game ID for a servant
    if ( master.mstSvt[i].combineLimitId ){ //so if that ID first exists,
      if ( Number(master.mstSvt[i].collectionNo) == Number(servantSearch[j].id) ) { //then check for a match with servant number
        gameID = master.mstSvt[i].combineLimitId; //assign the game ID
        imgurl = 'https://kazemai.github.io/fgo-vz/common/images/icon/faces/'+master.mstSvt[i].id+'0.png';
      }
    }
  }
  //get all the ascension mats, then put into key/value pairs depending on ascension level (0 thru 3)
  for (let k = 0; k < master.mstCombineLimit.length; k++){
    if (master.mstCombineLimit[k] && gameID == master.mstCombineLimit[k].id) {
      for (let j = 0; j < master.mstCombineLimit[k].itemIds.length; j++){
        ascensionMats.push({
          key: `${master.mstCombineLimit[k].svtLimit}`,
          value: ` ${master.mstCombineLimit[k].itemIds[j]} x${master.mstCombineLimit[k].itemNums[j]}`
        })

      }
    }
  }
  //merge same ascension levels
  let ascMatList = mergeStuff(ascensionMats);
  //replace mat numbers with emojis to display in discord
  for (let key in ascMatList) {
    for (let item in itememoji) {
      ascMatList[key].value = ascMatList[key].value.toString().replace(new RegExp("\\b"+item+"\\b"), itememoji[item]);
    }
  }
  //repeat the above process for skills
  for (let k = 0; k < master.mstCombineSkill.length; k++){
    if (master.mstCombineSkill[k] && gameID == master.mstCombineSkill[k].id) {
      for (let j = 0; j < master.mstCombineSkill[k].itemIds.length; j++){
        skillMats.push({
          key:`${master.mstCombineSkill[k].skillLv}`,
          value:` ${master.mstCombineSkill[k].itemIds[j]} x${master.mstCombineSkill[k].itemNums[j]}`
        })
      }
    }
  }
  let skillMatList = mergeStuff(skillMats);
  //console.log(skillMatList)
  for (let key in skillMatList) {
    for (let item in itememoji) {
      skillMatList[key].value = skillMatList[key].value.toString().replace(new RegExp("\\b"+item+"\\b"), itememoji[item]);
    }
  }
  //for beast and other servants that dont have mats
  if (!skillMatList['0']){
    message.channel.send(`${servantSearch[j].name}, ${servantSearch[j].rarity} ★ ${emoji[servantSearch[j].class]} ${servantSearch[j].class} doesn't have any ascension/skill materials available.`);
    return;
  }

  //console.log(ascensionMats)
  /*
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
  }*/
  //generate url for embed image
  let servnum = pad(servantSearch[j].id, 3);
  //let imgurl = `http://fate-go.cirnopedia.org/icons/servant/servant_`+ servnum +`1.png`;
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
            "value": `1st:${ascMatList['0'].value}\n2nd:${ascMatList['1'].value}\n3rd:${ascMatList['2'].value}\n4th:${ascMatList['3'].value}`,
          },
          {
            "name": "Skills",
            "value": `1→2:${skillMatList['0'].value}\n2→3:${skillMatList['1'].value}\n3→4:${skillMatList['2'].value}\n4→5:${skillMatList['3'].value}\n5→6:${skillMatList['4'].value}\n6→7:${skillMatList['5'].value}\n7→8:${skillMatList['6'].value}\n8→9:${skillMatList['7'].value}\n9→10:${skillMatList['8'].value}`,
          }/*,
          {
            "name": "Costume",
            "value": `${costumemats}`,
          }*/
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
            "value": `1st:${ascMatList['0'].value}\n2nd:${ascMatList['1'].value}\n3rd:${ascMatList['2'].value}\n4th:${ascMatList['3'].value}`,
          },
          {
            "name": "Skills",
            "value": `1→2:${skillMatList['0'].value}\n2→3:${skillMatList['1'].value}\n3→4:${skillMatList['2'].value}\n4→5:${skillMatList['3'].value}\n5→6:${skillMatList['4'].value}\n6→7:${skillMatList['5'].value}\n7→8:${skillMatList['6'].value}\n8→9:${skillMatList['7'].value}\n9→10:${skillMatList['8'].value}`,
          }
        ]
      }
    }).catch(console.error);
  }
}

function mergeStuff(array) {
  var output = [];

  array.forEach(function(item) {
    var existing = output.filter(function(v, i) {
      return v.key == item.key;
    });
    if (existing.length) {
      var existingIndex = output.indexOf(existing[0]);
      output[existingIndex].value = output[existingIndex].value.concat(item.value);
    } else {
      if (typeof item.value == 'string')
        item.value = [item.value];
      output.push(item);
    }
  });

  return output;

}



function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
