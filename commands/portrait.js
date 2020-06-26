const servantList = require("../data/servant_db.json");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const emoji = require("../data/emoji.json");
const master = require("../data/master.json")
const Jimp = require('jimp');
const sizeOf = require('image-size');
const url = require('url');
const https = require('https');

exports.run = (client, message, args) => {
  if (args.length == 0) {
    message.channel.send("Stop, stop please! Please type '!portrait (number) (class) (servantname)' to search for a particular servant.\nThe available servant classes are: Saber, Archer, Lancer, Rider, Caster, Assassin, Berserker, Shielder, Ruler, Avenger, MoonCancer, AlterEgo, Foreigner")
    return;
  }
  if ( typeof Number(args[1]) == 'number' ){
    for (let i = 0; i < servantList.length; i++) {
      if (servantList[i].id == Number(args[1])) {
        showPortrait(servantList, i, args[0], message)
        return;
      }
    }
  }
  let classSearch = checkServantClass(args[1]);
  let ascensionNumber = args.shift();
  let searchString = args.shift()
  searchString = args.join('');
  searchString = searchString.toLowerCase();
  searchString = searchString.replace(/\W/g, '');
  console.log(`Searching for ${searchString}...`);
  if (classSearch.length == 0 || isNaN(ascensionNumber)){
    message.channel.send("Stop, stop please! Please type '!portrait (number) (class) (servantname)' to search for a particular servant.\nThe available servant classes are: Saber, Archer, Lancer, Rider, Caster, Assassin, Berserker, Shielder, Ruler, Avenger, MoonCancer, AlterEgo, Foreigner")
    return;
  }
  let servantSearch = findServant(classSearch, searchString);
  let responseList = [];
  let numList = [];

  if (servantSearch.length == 1){
    for (let j = 0; j < servantSearch.length; j++){
      showPortrait(servantSearch, j, ascensionNumber, message);
    }
    return;
  }
  else if (servantSearch.length > 1) {
    for (let i = 0; i < servantSearch.length; i++){
      let servnum = pad(servantSearch[i].id, 3);
      numList.push(servnum);
      let serv = `${servnum}: ${servantSearch[i].name}, ${servantSearch[i].rarity} ★ ${emoji[servantSearch[i].class]} ${servantSearch[i].class}`
      responseList.push(serv);
    }

    message.channel.send(`Reply with the ID number of the servant you want (example:\`001\`), or type \`showall\` to show all:\n${responseList.join('\r\n')}`)
      .then( m => {
        m.delete(25000);
        numList.push('showall');
        message.channel.awaitMessages(response => numList.indexOf(response.content) != -1, {
        max: 1,
        time: 25000,
        errors: ['time'],
      })
      .then((collected) => {
        if (collected.first().content == 'showall') {
          for (let j = 0; j < servantSearch.length; j++){
            showPortrait(servantSearch, j, ascensionNumber, message);
          }
        }
        else {
          for (let j = 0; j < servantSearch.length; j++){
            if (Number(collected.first().content) == Number(servantSearch[j].id)){
              showPortrait(servantSearch, j, ascensionNumber, message);
            }
          }
        }
      })
      .catch(() => {
        message.channel.send(message.author.username +', you did not respond within the time limit. Please try searching again.');
      });
    });
  }
  else
    message.channel.send("Sorry, I couldn't find that servant. Please try again, or use a search term longer than two characters.");
}


function checkServantClass(input){
  console.log(`Searching ${Object.keys(servantList).length} entries...`);
  let classResults = [];
  let cleanedInput = input.toLowerCase();
  for (let i = 0; i < servantList.length; i++){
    if (servantList[i].class.toLowerCase().replace(/\s/g, '').search(cleanedInput) != -1){
      classResults.push(servantList[i]);
    }
  }
  return classResults;
}

function findServant(classSearchResults, input){
  let servantsFound = [];
  if (input == "" || input.length < 2){
    return servantsFound;
  }
  for (let i = 0; i < classSearchResults.length; i++){
    let sName = classSearchResults[i].name;
    let sAlias = classSearchResults[i].alias.split(',');
    sName = sName.replace(/\W/g, '').toLowerCase();
    for (let j = 0; j < sAlias.length; j++){
      sAlias[j] = sAlias[j].replace(/\W/g, '').toLowerCase();
      if ((sName.search(input) != -1) || (sAlias[j].search(input) != -1)){
        servantsFound.push(classSearchResults[i]);
        break;
      }
    }
  }
  return servantsFound;
}

function showPortrait(servantSearch, j, ascensionNumber, message) {


  let name = `${servantSearch[j].name}`;
  let desc = '';
  if (servantSearch[j].hiddenname) {
    //name = `${servantSearch[j].name}/||${servantSearch[j].alias}||`
    desc = `||${servantSearch[j].alias}||`;
  }

  let imgurl = "";
  let imgLetter = "";
  let cropDims = []; //x, y, w, h
  let idAdd = 0;


  //determine which half of kazemai image to use and crop
  if (ascensionNumber == 1) {
    imgLetter = 'a';
    //cropDims = [0, 0, 512, 724]
  }
  else if (ascensionNumber == 2) {
    imgLetter = 'a';
    //cropDims = [512, 0, 512, 724]
  }
  else if (ascensionNumber == 3) {
    imgLetter = 'b';
    //cropDims = [0, 0, 512, 724]
  }
  else if (ascensionNumber == 4) {
    imgLetter = 'b';
    //cropDims = [512, 0, 512, 724]
  }
  else if (ascensionNumber == 5) {
    imgLetter = 'a';
    //cropDims = [0, 0, 512, 724]
    idAdd = 30;
  }
  else if (ascensionNumber == 6) {
    imgLetter = 'a';
    //cropDims = [0, 0, 512, 724]
    idAdd = 40;
  }
  else if (ascensionNumber == 7) {
    imgLetter = 'a';
    //cropDims = [0, 0, 512, 724]
    idAdd = 50;
  }

  for (let i = 0; i < master.mstSvt.length; i++){ //lets iterate through mstSvt and find the game ID for a servant
    if ( master.mstSvt[i].cvId ){ //so if that cv ID first exists (servant, so we dont get confused with CEs),
      if ( Number(master.mstSvt[i].collectionNo) == Number(servantSearch[j].id) ) { //then check for a match with servant number
        imgurl = 'https://kazemai.github.io/fgo-vz/common/images/CharaGraph/'+Number(master.mstSvt[i].id+idAdd)+imgLetter+'.png';
      }
    }
  }

  if (!imageExists(imgurl)){
    message.channel.send(`Oops! Sorry, I couldn't find portrait ${ascensionNumber} for ${name}.`)
    return;
  }

  let options = url.parse(imgurl);

  https.get(options, function (response) {
    let chunks = [];
    response.on('data', function (chunk) {
      chunks.push(chunk);
    }).on('end', function() {
      let buffer = Buffer.concat(chunks);
      imgSize = sizeOf(buffer);
      //console.log(imgSize)
      if (ascensionNumber == 1) {
        cropDims = [0, 0, imgSize.width/2, imgSize.height]
        if (imgSize.width == 1014) {
          cropDims[2] = imgSize.width/2 - 10
        }
      }
      else if (ascensionNumber == 2) {
        cropDims = [imgSize.width/2, 0, imgSize.width/2, imgSize.height]
      }
      else if (ascensionNumber == 3) {
        cropDims = [0, 0, imgSize.width/2, imgSize.height]
        if (imgSize.width == 1014) {
          cropDims[2] = imgSize.width/2 - 10
        }
      }
      else if (ascensionNumber == 4) {
        cropDims = [imgSize.width/2, 0, imgSize.width/2, imgSize.height]
      }
      else if (ascensionNumber == 5) {
        cropDims = [0, 0, imgSize.width, imgSize.height]
      }
      else if (ascensionNumber == 6) {
        cropDims = [0, 0, imgSize.width, imgSize.height]
      }
      else if (ascensionNumber == 7) {
        cropDims = [0, 0, imgSize.width, imgSize.height]
      }

      //console.log(cropDims)
      const embed = {
        "title": name,
        "description": desc,
        "color": 000000,
        "image": {
        "url": "attachment://image.png"
        }
      }

      Jimp.read(imgurl)
        .then(image => {
          image.crop(cropDims[0], cropDims[1], cropDims[2], cropDims[3]);
          image.getBuffer(Jimp.MIME_PNG, (err, buffer) =>{
            message.channel.send({
              embed, files: [{attachment: buffer, name: 'image.png'}]
              })
          })
        })
        .catch(err => {
          console.log(err)
          message.channel.send(`Oops! Sorry, I couldn't find portrait ${ascensionNumber} for ${name}.`)
        })
    });
  });
}



function getDims (imgurl, ascensionNumber) {
  cropDims = []
  let options = url.parse(imgurl);
  https.get(options, function (response) {
    let chunks = [];
    response.on('data', function (chunk) {
      chunks.push(chunk);
    }).on('end', function() {
      let buffer = Buffer.concat(chunks);
      imgSize = sizeOf(buffer);

      if (ascensionNumber == 1) {
        //cropDims = [0, 0, 512, 724]
        cropDims = [0, 0, imgSize.width/2, imgSize.height]
      }
      else if (ascensionNumber == 2) {
        //cropDims = [512, 0, 512, 724]
        cropDims = [imgSize.width/2, 0, imgSize.width/2, imgSize.height]
      }
      else if (ascensionNumber == 3) {
        //cropDims = [0, 0, 512, 724]
        cropDims = [0, 0, imgSize.width/2, imgSize.height]
      }
      else if (ascensionNumber == 4) {
        //cropDims = [512, 0, 512, 724]
        cropDims = [imgSize.width/2, 0, imgSize.width/2, imgSize.height]
      }
      else if (ascensionNumber == 5) {
        //cropDims = [0, 0, 512, 724]
        cropDims = [0, 0, imgSize.width/2, imgSize.height]
      }
      else if (ascensionNumber == 6) {
        //cropDims = [0, 0, 512, 724]
        cropDims = [0, 0, imgSize.width/2, imgSize.height]
      }
      else if (ascensionNumber == 7) {
        //cropDims = [0, 0, 512, 724]
        cropDims = [0, 0, imgSize.width/2, imgSize.height]
      }
      return cropDims
    });
  });

}

function imageExists(image_url){

  var http = new XMLHttpRequest();

  http.open('HEAD', image_url, false);
  http.send();

  return http.status != 404;
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ascension"]
};


exports.help = {
  name: 'portrait',
  description: `Find a particular servant's ascension artwork. Choose from 1-4, or if the servant has extra costumes, 5+.`,
  usage: '!portrait [number] [class] [servantname]'
};
