exports.run = (client, message, args) => {
  if (args.length < 1){

    message.channel.send("https://docs.google.com/spreadsheets/d/1_SlTjrVRTgHgfS7sRqx4CeJMqlz687HdSlYqiW-JvQA/edit#gid=525320539").catch(console.error);
  }
  else {
    let searchString = args.join('');
    searchString = searchString.replace(/\W/g, '').toLowerCase();
    delete require.cache[require.resolve('../data/dropdb.json')];
    findDrop(searchString, message);

  }
}

function findDrop(input, message){
  let dropList = require("../data/dropdb.json");
  let itemsSearch = new Set();
  let numList = []
  let responseList = []
  if (input == "" || input.length < 3){
    message.channel.send(`Try using a search term longer than 2 characters.`).then(m => m.delete(15000));
    return;
  }

  for (let i = 0; i < dropList.length; i++){
    let itemName = dropList[i].item.replace(/\W/g, '').toLowerCase();
    let alias = ''
    if (dropList[i].aliases) {
      alias = dropList[i].aliases.replace(/\W/g, '').toLowerCase();
    }
    if (itemName.search(input) != -1 || alias.search(input) != -1){
      itemsSearch.add(dropList[i].item);
    }
  }

  let itemsFound = Array.from(itemsSearch)

  if (itemsFound.length == 0) {
    message.channel.send(`Sorry, no results found.`).then(m => m.delete(15000));
    return;
  }
  else if (itemsFound.length == 1) {
    printDrops( itemsFound, message , dropList)
  }
  else if (itemsFound.length > 1) {
    for (let i = 0; i < itemsFound.length; i++){
      numList.push(i);
      responseList.push({
        key: i,
        value: itemsFound[i]
      })
    }
    console.log(responseList)
    let choices = []
    for (let i = 0; i < responseList.length; i++) {
      choices.push(responseList[i].key+': '+responseList[i].value)
    }
    console.log(numList)
    message.channel.send(`Reply with the number of the drop you want (example:\`1\`)\n${choices.join('\r\n')}`)
      .then(m => {
        m.delete(25000)
        message.channel.awaitMessages(response => numList.includes(Number(response.content)), {
        max: 1,
        time: 25000,
        errors: ['time'],
      })
      .then((collected) => {
        console.log(collected.first().content)
        for (let i = 0; i < responseList.length; i++) {
          if (Number(collected.first().content) == Number(responseList[i].key)){

            printDrops(responseList[i].value, message, dropList)
          }
        }
        return
      })
      .catch(() => {
        message.channel.send(message.author.username +', you did not respond within the time limit. Please try searching again.');
      });
    });
  }
}

function printDrops(input, message, dropList) {
  let r = new RegExp("^\\b"+input+"\\b$");
  toPrint = []
  for (let i = 0; i < dropList.length; i++) {
    let name = dropList[i].item
    if (name.search(r) != -1) {
      toPrint.push(dropList[i])
    }
  }
  toPrint.sort(function(a,b){
    return a.number - b.number
  })

  for (let x = 0; x < 5; x++){
    if (!toPrint[x].number){
      toPrint[x].number = "";
    }
    if (!toPrint[x].area){
      toPrint[x].area = "";
    }
    if (!toPrint[x].quest){
      toPrint[x].quest = "";
    }
    if (!toPrint[x].ap_per_run){
      toPrint[x].ap_per_run = 0;
    }
    if (!toPrint[x].bp_ap){
      toPrint[x].bp_ap = 0;
    }
    if (!toPrint[x].ap_per_drop){
      toPrint[x].ap_per_drop = 0;
    }
    if (!toPrint[x].drop_chance){
      toPrint[x].drop_chance = 0;
    }
  }
  message.channel.send({
    "embed": {
      "color": 2613131,
      "thumbnail": {
        "url": `${toPrint[0].image}`
      },
      "author": {
        "name": `${toPrint[0].item}`,
      },
      "footer": {
        "text": `'!update drops' to update drop sheet.`
      },
      "fields": [
        {
          "name": `Drop area ${toPrint[0].number}: ${toPrint[0].area}, ${toPrint[0].quest}`,
          "value": `AP: ${toPrint[0].ap_per_run}, BP/AP: ${toPrint[0].bp_ap.toFixed(1)}, AP/drop: ${toPrint[0].ap_per_drop.toFixed(1)}, Drop%: ${toPrint[0].drop_chance.toFixed(1)}`
        },
        {
          "name": `Drop area ${toPrint[1].number}: ${toPrint[1].area}, ${toPrint[1].quest}`,
          "value": `AP: ${toPrint[1].ap_per_run}, BP/AP: ${toPrint[1].bp_ap.toFixed(1)}, AP/drop: ${toPrint[1].ap_per_drop.toFixed(1)}, Drop%: ${toPrint[1].drop_chance.toFixed(1)}`
        },
        {
          "name": `Drop area ${toPrint[2].number}: ${toPrint[2].area}, ${toPrint[2].quest}`,
          "value": `AP: ${toPrint[2].ap_per_run}, BP/AP: ${toPrint[2].bp_ap.toFixed(1)}, AP/drop: ${toPrint[2].ap_per_drop.toFixed(1)}, Drop%: ${toPrint[2].drop_chance.toFixed(1)}`
        },
        {
          "name": `Drop area ${toPrint[3].number}: ${toPrint[3].area}, ${toPrint[3].quest}`,
          "value": `AP: ${toPrint[3].ap_per_run}, BP/AP: ${toPrint[3].bp_ap.toFixed(1)}, AP/drop: ${toPrint[3].ap_per_drop.toFixed(1)}, Drop%: ${toPrint[3].drop_chance.toFixed(1)}`
        },
        {
          "name": `Drop area ${toPrint[4].number}: ${toPrint[4].area}, ${toPrint[4].quest}`,
          "value": `AP: ${toPrint[4].ap_per_run}, BP/AP: ${toPrint[4].bp_ap.toFixed(1)}, AP/drop: ${toPrint[4].ap_per_drop.toFixed(1)}, Drop%: ${toPrint[4].drop_chance.toFixed(1)}`
        }
      ]
    }
  })
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["drop"]
};

exports.help = {
  name: 'drops',
  description: `Will show you the 5 best spots (if available) to grind for a particular item. '!update drops' to update the drop data.`,
  usage: '!drops [itemname]'
};
