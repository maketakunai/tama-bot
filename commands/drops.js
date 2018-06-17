const dropList = require("../db/dropdb.json");
const Fuse = require('fuse.js')

exports.run = (client, message, args) => {
  console.log('Drops called.');
  if (args.length < 1){
    message.channel.send("This is way too easy♪ Here's your drop rate spreadsheet!").catch(console.error);
    message.channel.send("https://docs.google.com/spreadsheets/d/1_SlTjrVRTgHgfS7sRqx4CeJMqlz687HdSlYqiW-JvQA/edit#gid=525320539").catch(console.error);
  }
  else {
    var searchString = args.join(' ');
    //searchString = searchString.toLowerCase();
    //searchString = searchString.replace(/\W/g, '');
    console.log(`Searching dropdb for ${searchString}...`);
    var searchResult = findDrop(searchString);
    console.log(`${searchResult.length} items found`);
    if (searchResult.length > 0 && searchResult.length <= 5) {
      //for (var j = 0; j < searchResult.length; j++){
        //if (searchResult[j].AP_per_Run != null){
          message.channel.send({
            "embed": {
              "color": 2613131,
              "thumbnail": {
                "url": `${searchResult[0].Image}`
              },
              "author": {
                "name": `${searchResult[0].Item}`,
              },
              "fields": [
                {
                  "name": `Drop area ${searchResult[0].Number}: ${searchResult[0].Area}, ${searchResult[0].Quest}`,
                  "value": `AP: ${searchResult[0].AP_per_Run}, BP/AP: ${searchResult[0].BP_AP}, AP/drop: ${searchResult[0].AP_per_Drop}, Drop%: ${searchResult[0].Drop_Chance}`
                },
                {
                  "name": `Drop area ${searchResult[1].Number}: ${searchResult[1].Area}, ${searchResult[1].Quest}`,
                  "value": `AP: ${searchResult[1].AP_per_Run}, BP/AP: ${searchResult[1].BP_AP}, AP/drop: ${searchResult[1].AP_per_Drop}, Drop%: ${searchResult[1].Drop_Chance}`
                },
                {
                  "name": `Drop area ${searchResult[2].Number}: ${searchResult[2].Area}, ${searchResult[2].Quest}`,
                  "value": `AP: ${searchResult[2].AP_per_Run}, BP/AP: ${searchResult[2].BP_AP}, AP/drop: ${searchResult[2].AP_per_Drop}, Drop%: ${searchResult[2].Drop_Chance}`
                },
                {
                  "name": `Drop area ${searchResult[3].Number}: ${searchResult[3].Area}, ${searchResult[3].Quest}`,
                  "value": `AP: ${searchResult[3].AP_per_Run}, BP/AP: ${searchResult[3].BP_AP}, AP/drop: ${searchResult[3].AP_per_Drop}, Drop%: ${searchResult[3].Drop_Chance}`
                },
                {
                  "name": `Drop area ${searchResult[4].Number}: ${searchResult[4].Area}, ${searchResult[4].Quest}`,
                  "value": `AP: ${searchResult[4].AP_per_Run}, BP/AP: ${searchResult[4].BP_AP}, AP/drop: ${searchResult[4].AP_per_Drop}, Drop%: ${searchResult[4].Drop_Chance}`
                },
              ]
            }
          }
        )//}
      //}
    }
    else if (searchResult.length > 5){
      message.channel.send("Too many matches found. Please try to be more specific.");
    }
    else if (searchResult.length == 0){
      message.channel.send("Sorry, I couldn't find that item. Please try again, be more specific, or use a search term longer than two characters.");
    }
  }
}
/*
function findDrop(input){
  console.log(`Searching ${dropList.length} entries...`);
  var itemsFound = [];
  if (input == "" || input.length < 3){
    return itemsFound;
  }
  for (var i = 0; i < dropList.length; i++){
    var itemName = dropList[i].Item;
    itemName = itemName.replace(/\W/g, '');
    itemName = itemName.toLowerCase();
    if (itemName.search(input) != -1){
      console.log(`${dropList[i].Item}...`)
      itemsFound.push(dropList[i]);
    }
  }
  return itemsFound;
}
*/

function findDrop(input){
  console.log(`Searching ${dropList.length} entries...`);
  var itemsFound = [];
  if (input == "" || input.length < 3){
    return itemsFound;
  }
  var options = {
    id: "Item",
    shouldSort: true,
    findAllMatches: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 3,
    keys: ["Item"]
  };
  var fuse1 = new Fuse(dropList, options);
  var result = fuse1.search(input);

  for (var i = 0; i < dropList.length; i++){
    var itemName = dropList[i].Item;
    //itemName = itemName.replace(/\W/g, '');
    //itemName = itemName.toLowerCase();
    if (itemName.search(result[0]) != -1 && itemName.length == result[0].length){
      console.log(`${dropList[i].Item}...`)
      itemsFound.push(dropList[i]);
    }
  }
  return itemsFound;
}

//use.indexOf('string')









//`Item name: ${searchResult[j].Item} | Area: ${searchResult[j].Area} | Quest: ${searchResult[j].Quest}`).catch(console.error);
