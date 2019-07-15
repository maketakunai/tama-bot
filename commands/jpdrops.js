
const Fuse = require('fuse.js')

exports.run = (client, message, args) => {
  if (args.length < 1){
    message.channel.send("This is way too easy♪ Here's your drop rate spreadsheet!").catch(console.error);
    message.channel.send("https://docs.google.com/spreadsheets/d/1_SlTjrVRTgHgfS7sRqx4CeJMqlz687HdSlYqiW-JvQA/edit#gid=525320539").catch(console.error);
  }
  else {
    let searchString = args.join(' ');
    let searchResult = findDrop(searchString);
    delete require.cache[require.resolve('../data/jpdropdb.json')];
    if (searchResult.length > 0 && searchResult.length <= 5) {
          for (let x = 0; x < 5; x++){
            if (!searchResult[x].number){
              searchResult[x].number = "";
            }
            if (!searchResult[x].area){
              searchResult[x].area = "";
            }
            if (!searchResult[x].quest){
              searchResult[x].quest = "";
            }
            if (!searchResult[x].ap_per_run){
              searchResult[x].ap_per_run = 0;
            }
            if (!searchResult[x].bp_ap){
              searchResult[x].bp_ap = 0;
            }
            if (!searchResult[x].ap_per_drop){
              searchResult[x].ap_per_drop = 0;
            }
            if (!searchResult[x].drop_chance){
              searchResult[x].drop_chance = 0;
            }
          }
          message.channel.send({
            "embed": {
              "color": 3102891,
              "thumbnail": {
                "url": `${searchResult[0].image}`
              },
              "author": {
                "name": `${searchResult[0].item}`,
              },
              "fields": [
                {
                  "name": `Drop area ${searchResult[0].number}: ${searchResult[0].area}, ${searchResult[0].quest}`,
                  "value": `AP: ${searchResult[0].ap_per_run}, BP/AP: ${searchResult[0].bp_ap.toFixed(1)}, AP/drop: ${searchResult[0].ap_per_drop.toFixed(1)}, Drop%: ${searchResult[0].drop_chance.toFixed(1)}`
                },
                {
                  "name": `Drop area ${searchResult[1].number}: ${searchResult[1].area}, ${searchResult[1].quest}`,
                  "value": `AP: ${searchResult[1].ap_per_run}, BP/AP: ${searchResult[1].bp_ap.toFixed(1)}, AP/drop: ${searchResult[1].ap_per_drop.toFixed(1)}, Drop%: ${searchResult[1].drop_chance.toFixed(1)}`
                },
                {
                  "name": `Drop area ${searchResult[2].number}: ${searchResult[2].area}, ${searchResult[2].quest}`,
                  "value": `AP: ${searchResult[2].ap_per_run}, BP/AP: ${searchResult[2].bp_ap.toFixed(1)}, AP/drop: ${searchResult[2].ap_per_drop.toFixed(1)}, Drop%: ${searchResult[2].drop_chance.toFixed(1)}`
                },
                {
                  "name": `Drop area ${searchResult[3].number}: ${searchResult[3].area}, ${searchResult[3].quest}`,
                  "value": `AP: ${searchResult[3].ap_per_run}, BP/AP: ${searchResult[3].bp_ap.toFixed(1)}, AP/drop: ${searchResult[3].ap_per_drop.toFixed(1)}, Drop%: ${searchResult[3].drop_chance.toFixed(1)}`
                },
                {
                  "name": `Drop area ${searchResult[4].number}: ${searchResult[4].area}, ${searchResult[4].quest}`,
                  "value": `AP: ${searchResult[4].ap_per_run}, BP/AP: ${searchResult[4].bp_ap.toFixed(1)}, AP/drop: ${searchResult[4].ap_per_drop.toFixed(1)}, Drop%: ${searchResult[4].drop_chance.toFixed(1)}`
                }
              ]
            }
          }
        )
      }
  }
}

function findDrop(input){
  let dropList = require("../data/jpdropdb.json");
  let itemsFound = [];
  if (input == "" || input.length < 3){
    return itemsFound;
  }
  for (item in dropList){
    if (dropList[item].aliases){
      dropList[item].aliases = dropList[item].aliases.split(",");
    }
  }
  let options = {
    id: "item",
    shouldSort: true,
    findAllMatches: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 3,
    keys: [
      "item",
      "aliases"
    ]
  };
  let fuse1 = new Fuse(dropList, options);
  let result = fuse1.search(input);

  for (let i = 0; i < dropList.length; i++){
    let itemName = dropList[i].item;
    if (itemName.search(result[0]) != -1 && itemName.length == result[0].length){
      itemsFound.push(dropList[i]);
    }
  }
  return itemsFound;
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["jpdrop", "dropsjp"]
};

exports.help = {
  name: 'jpdrops',
  description: `Will show you the 5 best spots (if available) to grind for a particular item on JP. '!update drops' to update the drop info.`,
  usage: '!jpdrops [itemname]'
};
