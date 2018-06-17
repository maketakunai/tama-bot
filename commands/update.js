const gsjson = require('google-spreadsheet-to-json');
const fs = require('fs');
const config = require("../config.json");
//var usedrecently = new Set();

exports.run = (client, message, args) => {

  message.channel.send("Updating Tamabot with the latest spreadsheet info... Please wait.");

  gsjson({
    spreadsheetId: config.spreadsheet,
    credentials: config.creds
  })
  .then(function(result) {
    console.log(result.length);
    fs.writeFile('./db/goonDB.json', JSON.stringify(result));
    message.channel.send("Tamabot NA list has been updated.");
  })
  .catch(function(err) {
    console.log(err.message);
    console.log(err.stack);
  });
  gsjson({
    spreadsheetId: config.spreadsheet,
    credentials: config.creds,
    worksheet: 1
  })
  .then(function(result) {
    console.log(result.length);
    fs.writeFile('./db/jpgoonDB.json', JSON.stringify(result));
    message.channel.send("Tamabot JP list has been updated.");
  })
  .catch(function(err) {
    console.log(err.message);
    console.log(err.stack);
  });
}


//message.channel.send(message.author.username).catch(console.error);
//console.log(message.author.username);
/*
if (usedrecently.size > 0) {
  message.channel.send("!update can only be used once per minute. Please try again in a moment.").catch(console.error);
  return;
}*/


//usedrecently.add(message.author.id);
//setTimeout(() => {
  //usedrecently.delete(message.author.id);
//}, 60000);

//console.log(result);
//fs.writeFile('testJSON.json', result);
/*
async function writeOut(){
  try{
    await fs.writeFile('../db/goonDB.json', JSON.stringify(result))
    console.log('success!')
    message.channel.send("Tamabot NA list has been updated.").catch(console.error);
  } catch (err) {
    console.error(err)
  }
}
writeOut()*/

/*
async function writeOut(){
  try{
    await fs.writeFile('../db/jpgoonDB.json', JSON.stringify(result))
    console.log('success!')
    message.channel.send("Tamabot JP list has been updated.").catch(console.error);
  } catch (err) {
    console.error(err)
  }
}
writeOut()*/
