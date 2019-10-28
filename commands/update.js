const gsjson = require('google-spreadsheet-to-json');
const fs = require('fs');
const config = require("../config.json");

exports.run = (client, message, args) => {
  if (args[0] === "drops") {
    message.channel.send("Updating Tamabot's drop info... Please wait.");
    gsjson({
      spreadsheetId: config.nadrops,
      credentials: config.creds
    }).then(function(result) {
        console.log(result.length);
        return new Promise(function(resolve, reject) {
          fs.writeFile('./data/dropdb.json', JSON.stringify(result), function(err){
            if (err) reject (err);
            else resolve(result);
          });
        });
    }).then(function(result){
        message.channel.send("Tamabot's NA drops have been updated.");
    }).catch(function(err) {
        console.log(err.message);
        console.log(err.stack);
        return;
    });
    gsjson({
      spreadsheetId: config.jpdrops,
      credentials: config.creds
    }).then(function(result) {
        console.log(result.length);
        return new Promise(function(resolve, reject) {
          fs.writeFile('./data/jpdropdb.json', JSON.stringify(result), function(err){
            if (err) reject (err);
            else resolve(result);
          });
        });
    }).then(function(result){
        message.channel.send("Tamabot's JP drops have been updated.");
    }).catch(function(err) {
        console.log(err.message);
        console.log(err.stack);
        return;
    });
    return;
  }
  /*else if (args[0] === "servantinfo") {
    message.channel.send("Updating Tamabot's servant info... Please wait.");
    gsjson({
      spreadsheetId: config.servantinfo,
      credentials: config.creds
    }).then(function(result) {
        console.log(result.length);
        return new Promise(function(resolve, reject) {
          fs.writeFile('./data/servant_db.json', JSON.stringify(result,null,'\t'), function(err){
            if (err) reject (err);
            else resolve(result);
          });
        });
    }).then(function(result){
        message.channel.send("Tamabot's servant info has been updated.");
    }).catch(function(err) {
        console.log(err.message);
        console.log(err.stack);
        return;
    });
    return;
  }*/
  message.channel.send("Updating Tamabot with the latest spreadsheet info... Please wait.");
  gsjson({
    spreadsheetId: config.spreadsheet,
    credentials: config.creds
  }).then(function(result) {
      console.log(result.length);
      return new Promise(function(resolve, reject) {
        fs.writeFile('./data/goonDB.json', JSON.stringify(result), function(err){
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
        fs.writeFile('./data/jpgoonDB.json', JSON.stringify(result), function(err){
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

exports.help = {
  name: 'update',
  description: `Updates tamabot with the latest spreadsheet info. Use 'drops' to update drop information.`,
  usage: '!update, !update drops'
};
