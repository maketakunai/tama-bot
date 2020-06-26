const ccList = require("../data/wikia_cc.json");
const master = require("../data/master.json");
const skill_icons = require("../data/emoji_skill.json");

exports.run = (client, message, args) => {
  if ( args.length == 0 ) {
    message.channel.send(`Please try '!cc (cc name)' or '!cc (cc number) or '!cc --effect (effect1, effect2, ...)'`).then(m => m.delete(25000));
    return;
  }
  let ccSearch = findcc(args);
  let responseList = [];
  let numList = [];

  if (ccSearch.length == 0){
    message.channel.send(`No results found.\nPlease try '!cc (cc name)' or '!cc (cc number) or '!cc --effect (effect1, effect2, ...)'`).then(m => m.delete(25000));
    return;
  }

  if (ccSearch.length == 1){
    for (let j = 0; j < ccSearch.length; j++){
      printcc(ccSearch, j, message);
    }
    return;
  }
  else if (ccSearch.length > 1 && ccSearch.length < 25) {
    for (let i = 0; i < ccSearch.length; i++){
      let ccNum = pad(ccSearch[i].id, 3);
      numList.push(ccNum);
      let serv = `${ccNum}: ${ccSearch[i].stars}, ${ccSearch[i].name_en}`
      responseList.push(serv);
    }
    message.channel.send(`Reply with the ID number of the CC you want(example:\`001\`), or type \`showall\` to show all:\n${responseList.join('\r\n')}`)
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
          for (let j = 0; j < ccSearch.length; j++){
            printcc(ccSearch, j, message);
          }
        }
        else {
          for (let j = 0; j < ccSearch.length; j++){
            if (Number(collected.first().content) == Number(ccSearch[j].id)){
              printcc(ccSearch, j, message);
            }
          }
        }
      })
      .catch(() => {
        message.channel.send(message.author.username +', you did not respond within the time limit. Please try searching again.');
      });
    });
  }
  else if (ccSearch.length >= 25) {
    message.channel.send(`${ccSearch.length} results found. Please try to be more specific. You can also search by CC number.`).catch(console.error);
  }
  else
    message.channel.send("Sorry, I couldn't find that CC. Please try again, or use a search term longer than two characters.");
}

//mstCommandCode


function printcc(ccSearch, j, message){
  let paddedNum = pad(ccSearch[j].id, 3);
  let imgSmall = '';
  let idSearch = '';
  let skillId = '';
  let emojiId = '';
  let ej = '';
  let desc = ccSearch[j].effect;
  //let image = 'http://fate-go.cirnopedia.org/icons/ccode_icon/ccode_icon_'+paddedNum+'.png';
  //console.log(image)

  for (let i = 0; i < master.mstCommandCode.length; i++){
      if ( Number(master.mstCommandCode[i].collectionNo) == Number(ccSearch[j].id) ) {
        imgSmall = 'https://kazemai.github.io/fgo-vz/common/images/icon/CommandCodes/c_'+master.mstCommandCode[i].id+'.png';
        idSearch = master.mstCommandCode[i].id
      }
  }
  sk_results = []
  for (let j = 0; j < master.mstCommandCodeSkill.length; j++) {
    if (idSearch == master.mstCommandCodeSkill[j].commandCodeId) {
      let temp = master.mstCommandCodeSkill[j].skillId
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
  if (Number(emojiId) == 1) {
    ej = "<:SkillIcon_0:704272085987623023>"
  }


  let availability = 'Information not available';
  if (ccSearch[j].availability){
    availability = ccSearch[j].availability;
  }
  let illustrator = 'Information not available';
  if (ccSearch[j].illustrator){
    illustrator = ccSearch[j].illustrator;
  }

  if (ccSearch[j].effect.indexOf('(Ailment Debuffs: , , )') != -1) {
    desc = desc.replace('(Ailment Debuffs: , , )', '(Ailment Debuffs: <:poison:714634238896373842>, <:burn:714634238812618752>, <:curse:714634238816813167>)')
  }

  message.channel.send({
    "embed": {
      "color": 00000000,
      "thumbnail": {
        "url": imgSmall,
      },
      "image": {
      "url": ""
      },
      "author": {
        "name": `${ccSearch[j].name_en} / ${ccSearch[j].name_jp}`
      },
      "fields": [
        {
          "name": "Number",
          "value": `${paddedNum}`,
          "inline": true
        },
        {
          "name": "Rarity",
          "value": `${ccSearch[j].stars}`,
          "inline": true
        },
        {
          "name": `Effects`,
          "value": `${ej} ${desc}`,
          "inline": false
        },
        {
          "name": `Obtained`,
          "value": `${availability}`,
          "inline": false
        },
        {
          "name": `Artist`,
          "value": `${illustrator}`,
          "inline": false
        }
      ]
    }
  }).catch(console.error);
}



function findcc(input){
  //console.log(input);
  let ccFound = [];
  if (input == ""){
    return ccFound;
  }
  let effect = 0;

  if (input[0].toLowerCase() == "-effect" || input[0].toLowerCase() == "--effect") {
    input.shift();
    effect = 1;
  }
  //console.log(input);

  for (let x = 0; x < ccList.length; x++){
    if (Number(input) == ccList[x].id){
      ccFound.push(ccList[x]);
    }
  }

  if (effect) {
    input = input.join('').toLowerCase();
    for (let y = 0; y < ccList.length; y++){
      if (filter(ccList[y].effect.toLowerCase().replace(/\W/g, ''),input) == true) {
        ccFound.push(ccList[y]);
      }
    }
  }
  else if (!effect){
    for (let z = 0; z < ccList.length; z++){
      if (ccList[z].name_en.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\W/g, '').indexOf( input.join('').toLowerCase().replace(/\W/g, '') ) != -1) {
        ccFound.push(ccList[z]);
      }
      //else if (ccList[z].name_jp.toString().indexOf( input.toString() ) != -1) {
        //ccFound.push(ccList[z]);
      //}
    }
  }

  //console.log(ccFound);
  return ccFound;

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
  name: 'cc',
  description: `Shows cc information.`,
  usage: '!cc [cc name] or !cc [cc number] or !cc --effect [effect1, effect2, effect3...]'
};
