const ceList = require("../data/ce_cirno.json");

exports.run = (client, message, args) => {

  let ceSearch = findCE(args);
  let responseList = [];
  let numList = [];

  if (ceSearch.length == 0){
    message.channel.send(`No results found.\nPlease try '!ce (CE name)' or '!ce (CE number) or '!ce --bond (servant name)' or '!ce --effect (effect1, effect2, ...)' \nNumbers need leading zeroes up to 100. ex)'!ce 007'`).then(m => m.delete(15000));
    return;
  }

  if (ceSearch.length == 1){
    for (let j = 0; j < ceSearch.length; j++){
      printCE(ceSearch, j, message);
    }
    return;
  }
  else if (ceSearch.length > 1 && ceSearch.length < 25) {
    for (let i = 0; i < ceSearch.length; i++){
      let ceNum = pad(ceSearch[i].number, 4);
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
        time: 20000,
        errors: ['time'],
      })
      .then((collected) => {
        if (collected.first().content.toLowerCase() == 'showall') {
          for (let j = 0; j < ceSearch.length; j++){
            printCE(ceSearch, j, message);
          }
        }
        else {
          for (let j = 0; j < ceSearch.length; j++){
            if (Number(collected.first().content) == Number(ceSearch[j].number)){
              printCE(ceSearch, j, message);
            }
          }
        }
      })
      .catch(() => {
        message.channel.send(message.author.username +', you did not respond within the time limit. Please try searching again.');
      });
    });
  }
  else if (ceSearch.length >= 25) {
    message.channel.send(`${ceSearch.length} results found. Please try to be more specific. You can also search by CE number.`).catch(console.error);
  }
  else
    message.channel.send("Sorry, I couldn't find that CE. Please try again, or use a search term longer than two characters.");
}


function printCE(ceSearch, j, message){
  let paddedNum = pad(ceSearch[j].number, 3);
  let imgSmall = 'https://cirnopedia.org/fate-go/icons/essence_sample/craft_essence_'+paddedNum+'.png';
  let imgBig = 'https://cirnopedia.org/fate-go/icons/essence/craft_essence_'+paddedNum+'.jpg';
  let obtained = 'Information not available';
  if (ceSearch[j].obtained){
    obtained = ceSearch[j].obtained;
  }
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
          "value": `${ceSearch[j].base_hp} / ${ceSearch[j].max_hp}`,
          "inline": true
        },
        {
          "name": "Base / Max ATK",
          "value": `${ceSearch[j].base_atk} / ${ceSearch[j].max_atk}`,
          "inline": true
        },
        {
          "name": `Effects`,
          "value": `${ceSearch[j].effects}`,
          "inline": false
        },
        {
          "name": `Obtained`,
          "value": `${obtained}`,
          "inline": false
        }
      ]
    }
  }).catch(console.error);
}



function findCE(input){
  console.log(input);
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
  //console.log(input);

  for (let x = 0; x < ceList.length; x++){
    if (Number(input) == ceList[x].number){
      ceFound.push(ceList[x]);
    }
    if (bond) {
      if (ceList[x].obtained.toLowerCase().replace(/\W/g, '').indexOf("bond") != -1 &&
      ceList[x].effects.toLowerCase().replace(/\W/g, '').indexOf( input.join('').toLowerCase().replace(/\W/g, '') ) != -1) {
        ceFound.push(ceList[x]);
      }
    }
  }

  if (effect) {
    input = input.join('').toLowerCase();
    for (let y = 0; y < ceList.length; y++){
      if (filter(ceList[y].effects.toLowerCase().replace(/\W/g, ''),input) == true) {
        ceFound.push(ceList[y]);
      }
    }
  }
  else if (!bond && !effect){
    for (let z = 0; z < ceList.length; z++){
      if (ceList[z].name_eng.toLowerCase().replace(/\W/g, '').indexOf( input.join('').toLowerCase().replace(/\W/g, '') ) != -1) {
        ceFound.push(ceList[z]);
      }
      //else if (ceList[z].name_jp.toString().indexOf( input.toString() ) != -1) {
        //ceFound.push(ceList[z]);
      //}
    }
  }

  //console.log(ceFound);
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
  usage: '!ce [ce name] or !ce [ce number] or !ce --bond [servant name] or !ce --effect [effect1, effect2, effect3...]\nYou need leading zeroes for numbers under 100. ex) !ce 007'
};
