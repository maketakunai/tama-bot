const stageList = require("../data/singularityap.json");

exports.run = (client, message, args) => {

  var searchString = args;
  console.log(`${searchString}`);
  searchString = args.join('');
  searchString = searchString.toLowerCase();
  searchString = searchString.replace(/\W/g, '');

  if (searchString === "part"){
    message.channel.send("Please try again and specify which part you want - Part 1, EoR, Part 2.");
    return;
  }

  console.log(`Searching for ${searchString} ...`);
  var stageSearch = findStage(searchString);

  if (stageSearch.length > 0) {
    for (var j = 0; j < stageSearch.length; j++){
      let imgurl = `https://raw.githubusercontent.com/maketakunai/fgo-test/master/images/singularity/${stageSearch[j]["image"]}.png`
      message.channel.send({
        "embed": {
          "color": 16756224,
          "image": {
          "url": imgurl
          },
          "author": {
            "name": `${stageSearch[j]["singularity"]}`,
          },
          "fields": [
            {
              "name": "Total AP Cost",
              "value": `${stageSearch[j]["total_ap"]}`,
              "inline": true
            },
            {
              "name": "Total Nodes",
              "value": `${stageSearch[j]["total_nodes"]}`,
              "inline": true
            },
            {
              "name": "Total Chapters",
              "value": `${stageSearch[j]["total_chaps"]}`,
              "inline": true
            },
            {
              "name": "Days to Complete",
              "value": `${stageSearch[j]["completion_time"]}`,
              "inline": true
            }
          ]
        }
      }).catch(console.error);
    }
  }
  else
    message.channel.send("Sorry, I couldn't find what you were looking for. You can try again using terms like 'part 1', 'observer on timeless temple', 'lostbelt', or the name of the stage.");
}



function findStage(input){
  var stagesFound = [];
  if (input == "" || input.length < 3){
    return stagesFound;
  }
  for (var key in stageList){
    for (var parameter in stageList[key]){
      if (parameter == "singularity"){
        var sName = stageList[key]["singularity"];
        sName = sName.replace(/\W/g, '');
        sName = sName.toLowerCase();
        if (sName.search(input) != -1){
          stagesFound.push(stageList[key]);
          break;
        }
      }
      else if (parameter == "alias"){
        for (var x in stageList[key]["alias"]){
          console.log(stageList[key]["alias"][x]);
          var sAlias = stageList[key]["alias"][x];
          sAlias = sAlias.replace(/\W/g, '');
          sAlias = sAlias.toLowerCase();
          if (sAlias.search(input) != -1){
            stagesFound.push(stageList[key]);
            break;
          }
        }
      }
    }
  }
  return stagesFound;
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'apcost',
  description: `Searches for a particular singularity or stage and displays associated AP cost. Examples of groupings: Part 1, EoR, Part 2, Observer on Timeless Temple, Cosmos in the Lostbelt`,
  usage: '!apcost [name of singularity]'
};
