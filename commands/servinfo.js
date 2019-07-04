const servantList = require("../data/servant_db.json")
const emoji = require("../data/emoji.json")

exports.run = (client, message, args) => {
  if ( Number(args[0]) && (args.length == 1)){
    for (let i = 0; i < servantList.length; i++){
      if (Number(servantList[i].id) == Number(args[0])){
        printServantInfo(servantList, i, message);
        return;
      }
    }
  }
  if (args.length == 0) {
    message.channel.send("Stop, stop please! Please type '!servinfo (class) (servantname)' to search for a particular servant.\nThe available servant classes are: Saber, Archer, Lancer, Rider, Caster, Assassin, Berserker, Shielder, Ruler, Avenger, MoonCancer, AlterEgo, Foreigner")
    return;
  }

  let classSearch = checkServantClass(args[0]);

  let searchString = args.shift()
  searchString = args.join('');
  searchString = searchString.replace(/\W/g, '').toLowerCase();
  //console.log(`Searching for ${searchString}...`);
  if (classSearch.length == 0){
    message.channel.send("Stop, stop please! Please type '!servinfo (class) (servantname)' to search for a particular servant.\nThe available servant classes are: Saber, Archer, Lancer, Rider, Caster, Assassin, Berserker, Shielder, Ruler, Avenger, MoonCancer, AlterEgo, Foreigner")
    return;
  }
  let servantSearch = findServant(classSearch, searchString);
  let responseList = [];
  let numList = [];

  if (servantSearch.length == 1){
    for (let j = 0; j < servantSearch.length; j++){
      printServantInfo(servantSearch, j, message);
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
    message.channel.send(`Reply with the ID number of the servant you want(example:\`001\`), or type \`showall\` to show all:\n${responseList.join('\r\n')}\nYou can also search via servant ID (example: \`!servinfo 123\`)`)
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
            printServantInfo(servantSearch, j, message);
          }
        }
        else {
          for (let j = 0; j < servantSearch.length; j++){
            if (Number(collected.first().content) == Number(servantSearch[j].id)){
              printServantInfo(servantSearch, j, message);
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

function printServantInfo(servantSearch, j, message) {
  let servnum = pad(servantSearch[j].id, 3);
  let imgurl = `http://fate-go.cirnopedia.org/icons/servant/servant_`+ servnum +`1.png`;
  let deck = ``;
  for (let y = 0; y < 5; y++){
    switch (servantSearch[j].deck[y]){
      case "Q":
        deck += emoji["Quick"];
        break;
      case "A":
        deck += emoji["Arts"];
        break;
      case "B":
        deck += emoji["Buster"];
        break;
    }
  }
  let npcard = ``;
  switch(servantSearch[j].deck[6]){
    case "Q":
      npcard = emoji["Quick"];
      break;
    case "A":
      npcard = emoji["Arts"];
      break;
    case "B":
      npcard = emoji["Buster"];
      break;
  }

  let hitcount = servantSearch[j].hitcount.split(',');
  let hits = `${emoji["Quickhit"]} ${hitcount[0]}  ${emoji["Artshit"]} ${hitcount[1]}  ${emoji["Busterhit"]} ${hitcount[2]}  ${emoji["Extrahit"]} ${hitcount[3]}  ${emoji["NP"]} ${hitcount[4]}`;
  let npgen = servantSearch[j].npcharge.split(',');
  let stars = servantSearch[j].starabsorb.split(',');
  let hp = servantSearch[j].hp.split(',');
  let attack = servantSearch[j].attack.split(',');
  let description = ``;
  if (servantSearch[j].hiddenname) {
    description = `True name: ||${servantSearch[j].alias}||`
  }
  message.channel.send({
    "embed": {
      "color": 000000,
      "thumbnail": {
        "url": imgurl
      },
      "title": `${servantSearch[j].name}, ${servantSearch[j].rarity} ★ ${emoji[servantSearch[j].class]} ${servantSearch[j].class}`,
      "description": description,
      "fields": [
        {
          "name": "Min/Max/Grailed HP",
          "value": `${hp[0]} /${hp[1]} /${hp[2]}`,
          "inline": true
        },
        {
          "name": "Min/Max/Grailed ATK",
          "value": `${attack[0]} /${attack[1]} /${attack[2]}`,
          "inline": true
        },
        {
          "name": "Growth",
          "value": `${servantSearch[j].growth}`,
          "inline": true
        },
        {
          "name": "Alignment",
          "value": `${servantSearch[j].alignment}`,
          "inline": true
        },
        {
          "name": "Illustrator",
          "value": `${servantSearch[j].illustrator}`,
          "inline": true
        },
        {
          "name": "Voice",
          "value": `${servantSearch[j].voice}`,
          "inline": true
        },
        {
          "name": "NP Gain",
          "value": `On attack: ${npgen[0]}%\nOn defense: ${npgen[1]}%`,
          "inline": true
        },
        {
          "name": "Crit Stars",
          "value": `Generation: ${stars[1]}%\nAbsorption: ${stars[0]}`,
          "inline": true
        },
        {
          "name": "Traits",
          "value": `${servantSearch[j].trait}`,
        },
        {
          "name": "Deck",
          "value": `${deck} NP: ${npcard}`,
        },
        {
          "name": "Hitcount",
          "value": `${hits}`,
        }
      ]
    }
  }).catch(console.error);
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
  aliases: ["servantinfo", "sinfo"]
};

exports.help = {
  name: 'servinfo',
  description: `Shows basic information about a particular servant.`,
  usage: '!servinfo [class] [servantname]  or  !servinfo [ID number]'
};
