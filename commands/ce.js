const ceList = require("../db/ce_imgs.json");

exports.run = (client, message, args) => {
  var tempargs = args;
  console.log(tempargs);
  var searchString = args.join('');
  searchString = searchString.toLowerCase();
  searchString = searchString.replace(/\W/g, '');
  console.log(`Searching for ${searchString}...`);

  var ceSearch = findCE(searchString, tempargs);
  console.log(tempargs, args);
  if (ceSearch.length == 0){
    message.channel.send(`No results found.\nPlease type '!ce (CE name)' or '!ce (CE number) or '!ce bond (servant name) to search for a particular craft essence.\nNumbers need leading zeroes up to 100. ex)'!ce 007'`)
    return;
  }
  if (ceSearch.length > 0 && ceSearch.length < 6) {
    for (var j = 0; j < ceSearch.length; j++){
      message.channel.send({
        "embed": {
          "color": 16756224,
          "thumbnail": {
            "url": `${ceSearch[j]["Image"]}`
          },
          "image": {
          "url": ""
          },
          "author": {
            "name": `${ceSearch[j]["Name"]}`
          },
          "fields": [
            {
              "name": "Number",
              "value": `${ceSearch[j]["Number"]}`,
              "inline": true
            },
            {
              "name": "Rarity",
              "value": `${ceSearch[j]["Rarity"]}`,
              "inline": true
            },
            {
              "name": "Min HP",
              "value": `${ceSearch[j]["Min HP"]}`,
              "inline": true
            },
            {
              "name": "Max HP",
              "value": `${ceSearch[j]["Max HP"]}`,
              "inline": true
            },
            {
              "name": "Min ATK",
              "value": `${ceSearch[j]["Min Atk"]}`,
              "inline": true
            },
            {
              "name": "Max ATK",
              "value": `${ceSearch[j]["Max Atk"]}`,
              "inline": true
            },
            {
              "name": `Effects`,
              "value": `${ceSearch[j]["Effect(s)"]}`,
              "inline": false
            },
            {
              "name": `Obtained`,
              "value": `${ceSearch[j]["Obtained"]}`,
              "inline": false
            }
          ]
        }
      }).catch(console.error);
    }
  }
  else if (ceSearch.length > 5) {
    message.channel.send("Too many results found. Showing first 5 results; please try to be more specific.")
    for (var j = 0; j < 5; j++){
      message.channel.send({
        "embed": {
          "color": 16756224,
          "thumbnail": {
            "url": `${ceSearch[j]["Image"]}`
          },
          "image": {
          "url": ""
          },
          "author": {
            "name": `${ceSearch[j]["Name"]}`
          },
          "fields": [
            {
              "name": "Number",
              "value": `${ceSearch[j]["Number"]}`,
              "inline": true
            },
            {
              "name": "Rarity",
              "value": `${ceSearch[j]["Rarity"]}`,
              "inline": true
            },
            {
              "name": "Min HP",
              "value": `${ceSearch[j]["Min HP"]}`,
              "inline": true
            },
            {
              "name": "Max HP",
              "value": `${ceSearch[j]["Max HP"]}`,
              "inline": true
            },
            {
              "name": "Min ATK",
              "value": `${ceSearch[j]["Min Atk"]}`,
              "inline": true
            },
            {
              "name": "Max ATK",
              "value": `${ceSearch[j]["Max Atk"]}`,
              "inline": true
            },
            {
              "name": `Effects`,
              "value": `${ceSearch[j]["Effect(s)"]}`,
              "inline": false
            },
            {
              "name": `Obtained`,
              "value": `${ceSearch[j]["Obtained"]}`,
              "inline": false
            }
          ]
        }
      }).catch(console.error);
    }
  }
  else
    message.channel.send("Sorry, I couldn't find that CE. Please try again, or use a search term longer than three characters.");
}


function findCE(input, args){
  var ceFound = [];
  if (input == "" || input.length < 3){
    return ceFound;
  }
  var tempargs = args;
  var bond = args.shift()
  bond = bond.toLowerCase();
  tempargs = tempargs.join('');
  tempargs = tempargs.toLowerCase();
  tempargs = tempargs.replace(/\W/g, '');
  for (var key in ceList){
    if (Number(input) == Number(key)){
      ceFound.push(ceList[key]);
    }
    for (var parameter in ceList[key]){
      if (parameter == "Name"){
        var ceName = ceList[key]["Name"];
        ceName = ceName.replace(/\W/g, '');
        ceName = ceName.toLowerCase();
        if (ceName.search(input) != -1){
          ceFound.push(ceList[key]);
        }
      }
      if (parameter == "Effect(s)" && bond == "bond" && ceList[key]["Obtained"].toLowerCase().indexOf(bond) != -1 && tempargs.length > 2){
        var ceDesc = ceList[key]["Effect(s)"];
        ceDesc = ceDesc.replace(/\W/g, '');
        ceDesc = ceDesc.toLowerCase();
        if (ceDesc.search(tempargs) != -1){
          ceFound.push(ceList[key]);
        }
      }
    }
  }
  return ceFound;
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'ce',
  description: `Shows CE information.`,
  usage: '!ce [ce name] or !ce [ce number] or !ce bond [servant name]. You need leading zeroes for numbers under 100. ex) !ce 007. You can also search for bond CEs, ex) !ce bond emiya'
};
