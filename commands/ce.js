const ceList = require("../data/wikia_ce.json")
const master = require("../data/master.json")
const skill_icons = require("../data/emoji_skill.json")

exports.run = (client, message, args) => {
  if ( args.length == 0 ) {
    message.channel.send(`Please try '!ce (CE name)' or '!ce (CE number) or '!ce --bond (servant name)' or '!ce --effect (effect1, effect2, ...)' or '!ce --art (search terms)'\nNumbers need leading zeroes up to 100. ex)'!ce 007'`).then(m => m.delete(15000));
    return;
  }
  let art = 0;
  if (args[0].toLowerCase() == "-art" || args[0].toLowerCase() == "--art") {
    args.shift();
    art = 1;
  }
  let ceSearch = findCE(args);
  let responseList = [];
  let numList = [];
  if (ceSearch.length == 0){
    message.channel.send(`No results found.\nPlease try '!ce (CE name)' or '!ce (CE number) or '!ce --bond (servant name)' or '!ce --effect (effect1, effect2, ...)' or '!ce --art (search terms)'\nNumbers need leading zeroes up to 100. ex)'!ce 007'`).then(m => m.delete(15000));
    return;
  }

  if (ceSearch.length == 1){
    for (let j = 0; j < ceSearch.length; j++){
      printCE(ceSearch, j, message, art);
    }
    return;
  }
  else if (ceSearch.length > 1 && ceSearch.length < 50) {
    for (let i = 0; i < ceSearch.length; i++){
      let ceNum = pad(ceSearch[i].id, 4);
      numList.push(ceNum);
      let serv = `${ceNum}: ${ceSearch[i].rarity}, ${ceSearch[i].name_eng}`
      responseList.push(serv);
    }
    message.channel.send(`Reply with the ID number of the CE you want(example:\`0001\`), or type \`showall\` to show all:\n${responseList.join('\r\n')}`)
      .then(m => {
        m.delete(25000)
        numList.push('showall');
        message.channel.awaitMessages(response => numList.indexOf(response.content) != -1, {
        max: 1,
        time: 25000,
        errors: ['time'],
      })
      .then((collected) => {
        if (collected.first().content.toLowerCase() == 'showall') {
          for (let j = 0; j < ceSearch.length; j++){
            printCE(ceSearch, j, message, art);
          }
        }
        else {
          for (let j = 0; j < ceSearch.length; j++){
            if (Number(collected.first().content) == Number(ceSearch[j].id)){
              printCE(ceSearch, j, message, art);
            }
          }
        }
      })
      .catch(() => {
        message.channel.send(message.author.username +', you did not respond within the time limit. Please try searching again.').then(m => m.delete(15000));
      });
    });
  }
  else if (ceSearch.length >= 50) {
    message.channel.send(`${ceSearch.length} results found. Please try to be more specific. You can also search by CE number.`).then(m => m.delete(15000));
  }
  else
    message.channel.send("Sorry, I couldn't find that CE. Please try again, or use a search term longer than two characters.").then(m => m.delete(15000));
}


function printCE(ceSearch, j, message, art){
  let paddedNum = pad(ceSearch[j].id, 4);

  //let imgurl = `http://fate-go.cirnopedia.org/icons/servant/servant_`+ servnum +`1.png`;
  let idSearch = '';
  let imgSmall = '';
  let imgBig = '';
  let skillId = '';
  let emojiId = '';
  let ej = '';
  for (let i = 0; i < master.mstSvt.length; i++){ //lets iterate through mstSvt and find the game ID for a servant
    //if ( master.mstSvt[i].cvId ){ //so if that cv ID first exists (servant, so we dont get confused with CEs),
      if ( Number(master.mstSvt[i].collectionNo) == Number(ceSearch[j].id) && !master.mstSvt[i].cvId ) { //then check for a match with servant number
        imgSmall = 'https://kazemai.github.io/fgo-vz/common/images/icon/faces/'+master.mstSvt[i].id+'.png';
        imgBig = 'https://kazemai.github.io/fgo-vz/common/images/CharaGraph/'+master.mstSvt[i].id+'a.png';
        idSearch = master.mstSvt[i].id
      }
  }
  //console.log(idSearch)
  sk_results = []
  for (let j = 0; j < master.mstSvtSkill.length; j++) {
    if (idSearch == master.mstSvtSkill[j].svtId) {
      let temp = master.mstSvtSkill[j].skillId
      sk_results.push(Number(temp))
    }
  }
  //console.log(sk_results)
  skillId = Math.min(...sk_results)
  //console.log(skillId)
  for (let k = 0; k < master.mstSkill.length; k++) {
    if (skillId == master.mstSkill[k].id) {
      emojiId = master.mstSkill[k].iconId
    }
  }
  //console.log(emojiId)
  for (let key in skill_icons) {
    if (key.indexOf(emojiId) != -1 ) {
      ej = skill_icons[key]
    }
  }

  let mlbfx = ''

  if (ceSearch[j].mlb) {
    mlbfx = `${ej} ${ceSearch[j].mlb}`
  }
  else {
    mlbfx = `${ej} N/A`
  }

  if (art) {
    message.channel.send({
      "embed": {
        "color": 00000000,
        "author": {
          "name": `${ceSearch[j].name_eng}  |  ${ceSearch[j].rarity} [#${paddedNum}]\n${ceSearch[j].name_jp}`
        },
        "image": {
        "url": imgBig
        }
      }
    });
    return;
  }
  else {
    message.channel.send({
      "embed": {
        "color": 00000000,
        "thumbnail": {
          "url": `${imgSmall}`
        },
        "author": {
          "name": `${ceSearch[j].name_eng}  |  ${ceSearch[j].rarity} [#${paddedNum}]\n${ceSearch[j].name_jp}`,
          "url": `${imgBig}`
        },
        "footer": {
          "text": `Click on the CE name above for a link to the full image!`
        },
        "fields": [
          {
            "name": "Base / Max HP",
            "value": `${ceSearch[j].hp[0]} / ${ceSearch[j].hp[1]}`,
            "inline": true
          },
          {
            "name": "Base / Max ATK",
            "value": `${ceSearch[j].atk[0]} / ${ceSearch[j].atk[1]}`,
            "inline": true
          },
          {
            "name": `Normal Effect(s)`,
            "value": `${ej} ${ceSearch[j].effect}`,
            "inline": false
          },
          {
            "name": `Max Limit Break Effect(s)`,
            "value": `${mlbfx}`,
            "inline": false
          },
          {
            "name": `Artist`,
            "value": `${ceSearch[j].illustrator}`,
            "inline": false
          }
        ]
      }
    }).catch(console.error);
  }
}



function findCE(input){
  //console.log(input);
  let ceFound = [];
  if (input == ""){
    return ceFound;
  }
  let bond, effect = 0;

  if (input[0].toLowerCase() == "-bond" || input[0].toLowerCase() == "--bond") {
    input.shift();
    bond = 1;
  }
  if (input[0].toLowerCase() == "-effect" || input[0].toLowerCase() == "--effect") {
    input.shift();
    effect = 1;
  }

  for (let x = 0; x < ceList.length; x++){
    if (Number(input) == ceList[x].id){
      ceFound.push(ceList[x]);
    }
    if (bond) {
      if (ceList[x].effect) {
        if (ceList[x].effect.toLowerCase().replace(/\W/g, '').indexOf( input.join('').toLowerCase().replace(/\W/g, '') ) != -1) {
          ceFound.push(ceList[x]);
        }

      }
    }
  }

  if (effect) {
    input = input.join('').toLowerCase();
    for (let y = 0; y < ceList.length; y++){
      if (ceList[y].effect){
        if (filter(ceList[y].effect.toLowerCase().replace(/\W/g, ''),input) == true) {
          ceFound.push(ceList[y]);
        }
      }
    }
  }
  else if (!bond && !effect){
    for (let z = 0; z < ceList.length; z++){
      if (ceList[z].name_eng.toLowerCase().replace(/\W/g, '').indexOf( input.join('').toLowerCase().replace(/\W/g, '') ) != -1) {
        ceFound.push(ceList[z]);
      }
    }
  }
  return ceFound;
}


function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function filter(text, searchString) {
    const regexStr = '(?=.*' + searchString.split(/\,|\s/).join(')(?=.*') + ')';
    const searchRegEx = new RegExp(regexStr, 'gi');
    return text.match(searchRegEx) !== null;
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [""]
};

exports.help = {
  name: 'ce',
  description: `Shows CE information.`,
  usage: '!ce [ce name] or !ce [ce number] or !ce --bond [servant name] or !ce --effect [effect1, effect2, effect3...] or !ce --art [search term]\nCE data taken from the FGO wikia.'
};
