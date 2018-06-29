const gsjson = require('google-spreadsheet-to-json');
const fs = require('fs');
const config = require("../config.json");

exports.run = (client, message, args) => {

  message.channel.send("Updating Tamabot with the latest spreadsheet info... Please wait.");

  gsjson({
    spreadsheetId: config.spreadsheet,
    credentials: config.creds
  }).then(function(result) {
      console.log(result.length);
      return new Promise(function(resolve, reject) {
        fs.writeFile('./db/goonDB.json', JSON.stringify(result), function(err){
          if (err) reject (err);
          else resolve(result);
        });
      });
  }).then(function(result){
      message.channel.send("Tamabot NA list has been updated.");
  }).catch(function(err) {
      console.log(err.message);
      console.log(err.stack);
      return;
  });
  gsjson({
    spreadsheetId: config.spreadsheet,
    credentials: config.creds,
    worksheet: 1
  }).then(function(result) {
      console.log(result.length);
      return new Promise(function(resolve, reject) {
        fs.writeFile('./db/jpgoonDB.json', JSON.stringify(result), function(err){
          if (err) reject (err);
          else resolve(result);
        });
      });
  }).then(function(result){
      message.channel.send("Tamabot JP list has been updated.");
  }).catch(function(err) {
      console.log(err.message);
      console.log(err.stack);
      return;
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};
