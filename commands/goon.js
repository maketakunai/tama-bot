exports.run = (client, message, args) => {

  let nagoons = require('../data/goonDB.json');
  let jpgoons = require('../data/jpgoonDB.json');

  if (args.length > 10 || args.length == 0){
    message.channel.send("Stop, stop please! To search the goon spreadsheet, please type '!goon (name)'.")
    return;
  }
  let searchString = args.join('');
  searchString = searchString.toLowerCase();
  searchString = searchString.replace(/[\W_]+/g, '');
  console.log(`Searching for ${searchString}...`);
  let searchResult = findGoon(searchString, nagoons, jpgoons);
  delete require.cache[require.resolve('../data/goonDB.json')];
  delete require.cache[require.resolve('../data/jpgoonDB.json')];
  if (searchResult.length > 0) {
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
  }
  else
    message.channel.send(`Sorry, I couldn't find that person. Please try again, or use a search term longer than two characters.\nIf you've just added yourself to the !spreadsheet, don't forget to !update.`);
};

function validURL(str) {
  var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  if(!regex .test(str)) {
    return false;
  } else {
    return true;
  }
};

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
    if (!result[i].saName){
      result[i].saName = "Silly goon failed to fill out this field"
    }
    var gName = result[i].saName;
    gName = gName.replace(/[\W_]+/g, '');
    gName = gName.toLowerCase();
    if (!result[i].fgoName){
      result[i].fgoName = "Silly goon failed to fill out this field"
    }
    var fgoName = result[i].fgoName;
    fgoName = fgoName.replace(/[\W_]+/g, '');
    fgoName = fgoName.toLowerCase();
    if (gName.search(input) != -1 || fgoName.search(input) != -1 || result[i].friendId == input){
      goonsFound.push(result[i]);
    }
  }

  return goonsFound;
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'goon',
  description: `Searches the spreadsheet for a person. You will need to !update first before searching if you've just added yourself.`,
  usage: '!goon [name]'
};



//to be added later: search by discord name?
