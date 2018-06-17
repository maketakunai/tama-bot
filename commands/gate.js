const gatedb = require("../db/gatedb.json");

exports.run = (client, message, args) => {
  var utcTime = new Date();
  var utcDay = utcTime.getDay();
  var utcNext = utcDay + 1;
  if (utcNext == 7){
    utcNext = 0;
  }
  console.log(utcDay);
  message.channel.send({
    "embed": {
      "title":"",
      "description": "",
      "color": 2552420,
      "thumbnail": {
      "url": `${gatedb[utcDay].link}`,
      },
      "image": {
      "url": "",
      },
      "author": {
        "name": `Chaldea Gate: ${gatedb[utcDay].day} Quests`,
      },

      "fields": [
        {
          "name": "Ember Gathering",
          "value": `${gatedb[utcDay].classexp[0]}, ${gatedb[utcDay].classexp[1]}, ${gatedb[utcDay].classexp[2]}`,
        },
        {
          "name": "Class Training Ground",
          "value": `${gatedb[utcDay].items}`,
        }
      ]
    }
  }).catch(console.error);
  message.channel.send({
    "embed": {
      "title":"",
      "description": "",
      "color": 8817876,
      "thumbnail": {
      "url": `${gatedb[utcNext].link}`,
      },
      "image": {
      "url": "",
      },
      "author": {
        "name": `Chaldea Gate: ${gatedb[utcNext].day} Quests`,
      },

      "fields": [
        {
          "name": "Ember Gathering",
          "value": `${gatedb[utcNext].classexp[0]}, ${gatedb[utcNext].classexp[1]}, ${gatedb[utcNext].classexp[2]}`,
        },
        {
          "name": "Class Training Ground",
          "value": `${gatedb[utcNext].items}`,
        }
      ]
    }
  }).catch(console.error);
}
