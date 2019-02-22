const servantList = require("../data/servant_db.json")
const emoji = require("../data/emoji.json")

exports.run = (client, message, args) => {
  let classSearch = checkServantClass(args[0]);
  let searchString = args.shift()
  searchString = args.join('');
  searchString = searchString.toLowerCase();
  searchString = searchString.replace(/\W/g, '');
  console.log(`Searching for ${searchString}...`);
  if (classSearch.length == 0){
    message.channel.send("Stop, stop please! Please type '!servinfo (class) (servantname)' to search for a particular servant.\nThe available servant classes are: Saber, Archer, Lancer, Rider, Caster, Assassin, Berserker, Shielder, Ruler, Avenger, MoonCancer, AlterEgo, Foreigner")
    return;
  }
  let servantSearch = findServant(classSearch, searchString);

  if (servantSearch.length > 0) {
    for (let j = 0; j < servantSearch.length; j++){
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
          "color": 8817876,
          "thumbnail": {
            "url": imgurl
          },
          //"footer": {
            //"text": `'!skills ${servantSearch[j].id}' for skills, '!mats ${servantSearch[j].id}' to see ascension and skill materials`,
          //},
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
  aliases: ["servantinfo"]
};

exports.help = {
  name: 'servinfo',
  description: `Shows basic information about a particular servant.`,
  usage: '!servinfo [class] [servantname]'
};
