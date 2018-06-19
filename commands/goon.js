exports.run = (client, message, args) => {

  let nagoons = require('../db/goonDB.json');
  let jpgoons = require('../db/jpgoonDB.json');

  if (args.length > 6 || args.length == 0){
    message.channel.send("Stop, stop please! To search the goon spreadsheet, please type '!goon (name)'.")
    return;
  }
  var searchString = args.join('');
  searchString = searchString.toLowerCase();
  searchString = searchString.replace(/[\W_]+/g, '');
  console.log(`Searching for ${searchString}...`);
  var searchResult = findGoon(searchString, nagoons, jpgoons);
  delete require.cache[require.resolve('../db/goonDB.json')];
  delete require.cache[require.resolve('../db/jpgoonDB.json')];
  if (searchResult.length > 0) {
    //message.channel.send("Mmhmm, nothing gets by these ears.");
    for (var j = 0; j < searchResult.length; j++){
      var embedColor = 6513663;
      var region = ":flag_us: NA";
      if (searchResult[j].server == "jp") {
        embedColor = 16711680;
        region = ":flag_jp: JP";
      }
      if (!validURL(searchResult[j].servantSupportList)){
        if (!searchResult[j].servantSupportList) {searchResult[j].servantSupportList = "";}
        if (!searchResult[j].note) {searchResult[j].note = "";}
        message.channel.send({
          "embed": {
            "title":`FGO Name: ${searchResult[j].fgoName}`,
            "description": `Friend ID: ${searchResult[j].friendId}\nRegion: ${region}\nNote: ${searchResult[j].note}\nServant Support List: ${searchResult[j].servantSupportList}`,
            "color": embedColor,
            "author": {
              "name": `SA Name: ${searchResult[j].saName}`,
            },
          }
        })
      }
      else if (validURL(searchResult[j].servantSupportList)){
        if (!searchResult[j].servantSupportList) {searchResult[j].servantSupportList = "";}
        if (!searchResult[j].note) {searchResult[j].note = "";}
        message.channel.send({
          "embed": {
            "title":`FGO Name: ${searchResult[j].fgoName}`,
            "description": `Friend ID: ${searchResult[j].friendId}\nRegion: ${region}\nNote: ${searchResult[j].note}`,
            "color": embedColor,
            "image": {
            "url": `${searchResult[j].servantSupportList}`,
            },
            "author": {
              "name": `SA Name: ${searchResult[j].saName}`,
            },
          }
        })
      }
    }
    return;
  }
  else
    message.channel.send("Sorry, I couldn't find that person. Please try again, or use a search term longer than two characters.");
}

function validURL(str) {
  var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  if(!regex .test(str)) {
    return false;
  } else {
    return true;
  }
}

function findGoon(input, nagoons, jpgoons){

  for (var j = 0; j < jpgoons.length; j++)
  {
    jpgoons[j].server = "jp";
  }

  var result = nagoons.concat(jpgoons);
  console.log(`Searching ${result.length} entries...`);
  var goonsFound = [];
  if (input == "" || input.length < 3){
    return goonsFound;
  }
  for (var i = 0; i < result.length; i++){
    var gName = result[i].saName;
    gName = gName.replace(/[\W_]+/g, '');
    gName = gName.toLowerCase();
    var fgoName = result[i].fgoName;
    fgo_Name = fgoName.replace(/[\W_]+/g, '');
    fgo_Name = fgoName.toLowerCase();
    if (gName.search(input) != -1 || fgo_Name.search(input) != -1 || result[i].friendId == input){
      goonsFound.push(result[i]);
    }
  }

  return goonsFound;
}

//to be added later: search by discord name?
