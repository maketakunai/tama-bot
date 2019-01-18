const ceList = require("../db/ce_cirno.json");

exports.run = (client, message, args) => {
  var tempargs = args;
  console.log(tempargs, args);
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
            "url": `${ceSearch[j]["image"]}`
          },
          "author": {
            "name": `${ceSearch[j]["name_eng"]}\n${ceSearch[j]["name_jp"]}`,
            "url": `${ceSearch[j]["full_img"]}`
          },
          "footer": {
            "text": `Click on the CE name above for a link to the full image!`
          },
          "fields": [
            {
              "name": "Number",
              "value": `${ceSearch[j]["number"]}`,
              "inline": true
            },
            {
              "name": "Rarity",
              "value": `${ceSearch[j]["rarity"]}`,
              "inline": true
            },
            {
              "name": "Base HP",
              "value": `${ceSearch[j]["base_hp"]}`,
              "inline": true
            },
            {
              "name": "Max HP",
              "value": `${ceSearch[j]["max_hp"]}`,
              "inline": true
            },
            {
              "name": "Base ATK",
              "value": `${ceSearch[j]["base_atk"]}`,
              "inline": true
            },
            {
              "name": "Max ATK",
              "value": `${ceSearch[j]["max_atk"]}`,
              "inline": true
            },
            {
              "name": `Effects`,
              "value": `${ceSearch[j]["effects"]}`,
              "inline": false
            },
            {
              "name": `Obtained`,
              "value": `${ceSearch[j]["obtained"]}`,
              "inline": false
            }
          ]
        }
      }).catch(console.error);
    }
  }
  else if (ceSearch.length > 5 && ceSearch.length < 21) {
    var results = "";
    for (var j = 0; j < ceSearch.length; j++){
      results += `${ceSearch[j]["number"]}: ${ceSearch[j]["name_eng"]}\n`
    }
    message.channel.send(`${ceSearch.length} results found. Please try to be more specific. You can also search by CE number.\n${results}`).catch(console.error);
  }
  else if (ceSearch.length >= 21){
    message.channel.send(`${ceSearch.length} results found. Please try to be more specific. You can also search by CE number.`).catch(console.error);
  }
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
      if (parameter == "name_eng"){
        var ceName = ceList[key]["name_eng"];
        ceName = ceName.replace(/\W/g, '');
        ceName = ceName.toLowerCase();
        if (ceName.search(input) != -1){
          ceFound.push(ceList[key]);
        }
      }
      if (parameter == "effects" && bond == "bond" && ceList[key]["obtained"].toLowerCase().indexOf(bond) != -1 && tempargs.length > 2){
        var ceDesc = ceList[key]["effects"];
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

/*
function findCE(input, args){
  var ceFound = [];
  if (input == ""){
    return ceFound;
  }
  var tempargs = args;
  tempargs = tempargs.join('');
  tempargs = tempargs.toLowerCase();
  tempargs = tempargs.replace(/\W/g, '');
  for (var key in ceList){
    if (Number(input) == Number(key)) {ceFound.push(ceList[key]);}
    for (var parameter in ceList[key]){
      if (parameter == "name_eng"){
        var ceName = ceList[key]["name_eng"];
        ceName = ceName.replace(/\W/g, '');
        ceName = ceName.toLowerCase();
        if (ceName.search(input) != -1){
          ceFound.push(ceList[key]);
        }
      }
    }
  }
  return ceFound;
}*/

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [""]
};

exports.help = {
  name: 'ce',
  description: `Shows CE information.`,
  usage: '!ce [ce name] or !ce [ce number] or !ce bond [servant name]. You need leading zeroes for numbers under 100. ex) !ce 007. You can also search for bond CEs, ex) !ce bond emiya'
};
