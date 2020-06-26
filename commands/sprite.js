const servantList = require("../data/servant_db.json");
const emoji = require('../data/emoji.json');

exports.run = (client, message, args) => {
  if (args.length == 0) {
    message.channel.send("Stop, stop please! Please type '!sprite (number) (class) (servantname)' to search for a particular servant.\nThe available servant classes are: Saber, Archer, Lancer, Rider, Caster, Assassin, Berserker, Shielder, Ruler, Avenger, MoonCancer, AlterEgo, Foreigner").then(m => m.delete(10000));
    return;
  }

  if ( typeof Number(args[1]) == 'number' ){
    for (let i = 0; i < servantList.length; i++) {
      if (servantList[i].id == Number(args[1])) {
        showSprite(servantList[i], args[0], message)
        return
      }
    }
  }
  let classSearch = checkServantClass(args[1]);
  let ascensionNumber = args.shift();
  let searchString = args.shift()
  searchString = args.join('');
  searchString = searchString.toLowerCase();
  searchString = searchString.replace(/\W/g, '');
  //console.log(`Searching for ${searchString}...`);
  if (classSearch.length == 0){
    message.channel.send("Stop, stop please! Please type '!sprite (number) (class) (servantname)' to search for a particular servant.\nThe available servant classes are: Saber, Archer, Lancer, Rider, Caster, Assassin, Berserker, Shielder, Ruler, Avenger, MoonCancer, AlterEgo, Foreigner").then(m => m.delete(10000));
    return;
  }
  let servantSearch = findServant(classSearch, searchString);
  let responseList = [];
  let numList = [];

  if (servantSearch.length == 1){
    for (let j = 0; j < servantSearch.length; j++){
      showSprite(servantSearch[j], ascensionNumber, message);
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

    message.channel.send(`Reply with the ID number of the servant you want (example:\`001\`), or type \`showall\` to show all:\n${responseList.join('\r\n')}`)
      .then( m => {
        m.delete(25000);
        numList.push('showall');
        message.channel.awaitMessages(response => numList.indexOf(response.content) != -1, {
        max: 1,
        time: 25000,
        errors: ['time'],
      })
      .then((collected) => {
        if (collected.first().content == 'showall') {
          for (let j = 0; j < servantSearch.length; j++){
            showSprite(servantSearch[j], ascensionNumber, message);
          }
        }
        else {
          for (let j = 0; j < servantSearch.length; j++){
            if (Number(collected.first().content) == Number(servantSearch[j].id)){
              showSprite(servantSearch[j], ascensionNumber, message);
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



function showSprite(servantSearch, ascensionNumber, message) {
  let name = `${servantSearch.name}`;
  let desc = '';
  if (servantSearch.hiddenname) {
    //name = `${servantSearch[j].name}/||${servantSearch[j].alias}||`
    desc = `||${servantSearch.alias}||`;
  }
  let imgurl = servantSearch.sprite.split(',')[ascensionNumber-1]
  if (imgurl == undefined) {
    message.channel.send(`Sorry, it doesn't look like that sprite artwork ${ascensionNumber} exists for ${servantSearch.name} (${servantSearch.id}).`);
    return;
  }

  else {
    message.channel.send({
      "embed": {
        "title": `${servantSearch.name}`,
        "description": desc,
        "color": 000000,
        "image": {
        "url": `${imgurl}`
        }
      }
    }).catch(console.error);
    return;
  }

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

function imageExists(image_url){

  var http = new XMLHttpRequest();

  http.open('HEAD', image_url, false);
  http.send();

  return http.status != 404;
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};


exports.help = {
  name: 'sprite',
  description: `Find a particular servant's sprite artwork. Choose from 1-3, or if the servant has extra costumes, 4+.`,
  usage: '!sprite [number] [class] [servantname]'
};
