const talkedRecently = new Set();
const config = require("../config.json");
const plotly = require('plotly')(config.plotlyuser, config.plotlyapikey);
const fs = require('fs');
const startTime = new Date().getTime();
const snek = require("snekfetch")
const Canvas = require('canvas-prebuilt');
const util = require('util');

var totalrollstats = [0,0,0,0,0,0]; // in order from SSR, SR, R servants to ces
var userstats = {};

exports.run = (client, message, args) => {
  if (message.guild.id == 328226892798754819 && message.channel.id != 421357102229880842) {
    let msg = "Please do your 10rolls in <#421357102229880842>.";
    message.channel.send(msg);
    return;
  } //forces rolls into bot channel for somethingawful discord
  if (args[0]) {args[0] = args[0].toLowerCase();}
  if (talkedRecently.has(message.author.id)){
    message.channel.send(message.author.username + ", you can only use !10roll once every 5 seconds.")
    return;
  }

  switch(args[0]) {
    case "reset":
      reset(message);
      break;
    case "stats":
      showstats(message);
      break;
    case "davinci":
      var normgacha = require("../data/gacha/gacha-standardpool.json"),
          rateup = require("../data/gacha/rateup-davinci.json"),
          rates = rateup.rates;
      rollten(rates, normgacha, rateup, message);
      break;
    case "mhxa":
      var normgacha = require("../data/gacha/gacha-valentinepool.json"),
          rateup = require("../data/gacha/rateup-mhxa.json"),
          rates = rateup.rates;
      rollten(rates, normgacha, rateup, message);
      break;
    case "shinjuku1":
      var normgacha = require("../data/gacha/gacha-standardpool.json"),
          rateup = require("../data/gacha/rateup-shinjuku1.json"),
          rates = rateup.rates;
      rollten(rates, normgacha, rateup, message);
      break;
    case "shinjuku2":
      var normgacha = require("../data/gacha/gacha-standardpool.json"),
          rateup = require("../data/gacha/rateup-shinjuku2.json"),
          rates = rateup.rates;
      rollten(rates, normgacha, rateup, message);
      break;
    case "cbc":
      var normgacha = require("../data/gacha/gacha-cbcpool.json"),
          rateup = require("../data/gacha/rateup-cbc.json"),
          rates = rateup.rates;
      rollten(rates, normgacha, rateup, message);
      break;
    case "gudaguda":
      var normgacha = require("../data/gacha/gacha-standardpool.json"),
          rateup = require("../data/gacha/rateup-gudameiji.json"),
          rates = rateup.rates;
      rollten(rates, normgacha, rateup, message);
      break;
    case "ccc1":
      var normgacha = require("../data/gacha/gacha-standardpool.json"),
          rateup = require("../data/gacha/rateup-ccc1.json"),
          rates = rateup.rates;
      rollten(rates, normgacha, rateup, message);
      break;
    case "ccc2":
      var normgacha = require("../data/gacha/gacha-standardpool.json"),
          rateup = require("../data/gacha/rateup-ccc2.json"),
          rates = rateup.rates;
      rollten(rates, normgacha, rateup, message);
      break;
    case "murasaki":
      var normgacha = require("../data/gacha/gacha-valentinepoolJP.json"),
          rateup = require("../data/gacha/rateup-valentine2019.json"),
          rates = rateup.rates;
      rollten(rates, normgacha, rateup, message);
      break;
    case "story":
      var normgacha = require("../data/gacha/gacha-story.json"),
          rateup = require("../data/gacha/rateup-blank.json"),
          rates = rateup.rates;
      rollten(rates, normgacha, rateup, message);
      break;
    case "storyjp":
      var normgacha = require("../data/gacha/gacha-storyJP.json"),
          rateup = require("../data/gacha/rateup-blankJP.json"),
          rates = rateup.rates;
      rollten(rates, normgacha, rateup, message);
      break;
    default:
      message.channel.send("'!10roll (banner)' to 10roll the gacha. '10roll reset' to reset your stats.\nAvailable banners: cbc, ccc1, ccc2, davinci, gudaguda, mhxa, shinjuku1, shinjuku2, story, storyjp, murasaki\n");
      break;
  }
};

function setIntervals (rates) {
  return r_intervals = [ Number(rates.servstandard[0]+rates.servrateup[1]), //ssr_total + sr rateup
    Number(rates.servstandard[0]+rates.servstandard[1]), //ssr_total + sr_total
    Number(rates.servstandard[0]+rates.servstandard[1]+rates.servrateup[2]), // ssr_total + sr_total + r rateup
    Number(rates.servstandard[0]+rates.servstandard[1]+rates.servstandard[2]), //ssr+sr+r servant total
    Number(rates.servstandard[0]+rates.servstandard[1]+rates.servstandard[2]+rates.cerateup[0]), // prev and 5* ce rateup
    Number(rates.servstandard[0]+rates.servstandard[1]+rates.servstandard[2]+rates.cestandard[0]), // prev and 5* ce total
    Number(rates.servstandard[0]+rates.servstandard[1]+rates.servstandard[2]+rates.cestandard[0]+rates.cerateup[1]), // adding 4* ce rateup
    Number(rates.servstandard[0]+rates.servstandard[1]+rates.servstandard[2]+rates.cestandard[0]+rates.cestandard[1]), // now with total 4* ce
    Number(rates.servstandard[0]+rates.servstandard[1]+rates.servstandard[2]+rates.cestandard[0]+rates.cestandard[1]+rates.cerateup[2]), // adding 3* ce rateup
    Number(rates.servstandard[0]+rates.servstandard[1]+rates.servstandard[2]+rates.cestandard[0]+rates.cestandard[1]+rates.cestandard[2]) // this should be 100 total. unnecessary!
  ];
}

function roll4starCE (rateup, normgacha) {
  let roll = Math.random()*100;
  let total = normgacha['ce']['4'].length + rateup['ce']['4'].length;
  if (roll > 0 && roll <= normgacha['ce']['4'].length/total * 100) {
    return 'CE/'+normgacha['ce']['4'][Math.floor(Math.random()*normgacha['ce']['4'].length)];
  } else return 'CE/'+rateup['ce']['4'][Math.floor(Math.random()*rateup['ce']['4'].length)];
}

function roll3starserv (rateup, normgacha) {
  let roll = Math.random()*100;
  let total = normgacha['servants']['3'].length + rateup['servants']['4'].length;
  if (roll > 0 && roll <= normgacha['servants']['3'].length/total * 100) {
    return 'S/'+normgacha['servants']['3'][Math.floor(Math.random()*normgacha['servants']['3'].length)];
  } else return 'S/'+rateup['servants']['3'][Math.floor(Math.random()*rateup['servants']['3'].length)];
}

//make a roulette wheel out of all the gacha probabilities, then return servant chosen at random from the pool that was selected
function gacharoll (rates, r_intervals, rateup, normgacha, guaranteed, rollstats) {
  let roll = Math.random()*100;
  if (roll > 0 && roll <= rates.servrateup[0]) { //rateup SSR servant
    rollstats[0] += 1;
    guaranteed.push("s5");
    if (rates.servrateup[0] == 0){
      return 'S/'+normgacha['servants']['5'][Math.floor(Math.random()*normgacha['servants']['5'].length)];
    }
    return 'S/'+rateup['servants']['5'][Math.floor(Math.random()*rateup['servants']['5'].length)];
  } else if (roll > rates.servrateup[0] && roll <= rates.servstandard[0]) { //rateup SSR + normal SSR servant
    rollstats[0] += 1;
    guaranteed.push("s5");
    return 'S/'+normgacha['servants']['5'][Math.floor(Math.random()*normgacha['servants']['5'].length)];
  } else if (roll > rates.servstandard[0] && roll <= r_intervals[0]) { //SSR + rateup SR servant
    rollstats[1] += 1;
    guaranteed.push("s4");
    if (rates.servrateup[1] == 0){
      return 'S/'+normgacha['servants']['4'][Math.floor(Math.random()*normgacha['servants']['4'].length)];
    }
    return 'S/'+rateup['servants']['4'][Math.floor(Math.random()*rateup['servants']['4'].length)];
  } else if (roll > r_intervals[0] && roll <= r_intervals[1]) { // SSR + SR all
    rollstats[1] += 1;
        guaranteed.push("s4");
    return 'S/'+normgacha['servants']['4'][Math.floor(Math.random()*normgacha['servants']['4'].length)];
  } else if (roll > r_intervals[1] && roll <= r_intervals[2]) { // ssr + sr + rateup r servants
    rollstats[2] += 1;
    guaranteed.push("s3");
    if (rates.servrateup[2] == 0){
      return 'S/'+normgacha['servants']['3'][Math.floor(Math.random()*normgacha['servants']['3'].length)];
    }
    return 'S/'+rateup['servants']['3'][Math.floor(Math.random()*rateup['servants']['3'].length)];
  } else if (roll > r_intervals[2] && roll <= r_intervals[3]) { // ssr + sr + r servants total
    rollstats[2] += 1;
    guaranteed.push("s3");
    return 'S/'+normgacha['servants']['3'][Math.floor(Math.random()*normgacha['servants']['3'].length)];
  } else if (roll > r_intervals[3] && roll <= r_intervals[4]) { // servs + rateup 5* ce
    rollstats[3] += 1;
    guaranteed.push("c5");
    if (rates.cerateup[0] == 0){
      return 'CE/'+normgacha['ce']['5'][Math.floor(Math.random()*normgacha['ce']['5'].length)];
    }
    return 'CE/'+rateup['ce']['5'][Math.floor(Math.random()*rateup['ce']['5'].length)];
  } else if (roll > r_intervals[4] && roll <= r_intervals[5]) { // servs + all 5* ce
    rollstats[3] += 1;
    guaranteed.push("c5");
    return 'CE/'+normgacha['ce']['5'][Math.floor(Math.random()*normgacha['ce']['5'].length)];
  } else if (roll > r_intervals[5] && roll <= r_intervals[6]) { // servs + 5* and rateup 4* ce
    rollstats[4] += 1;
    guaranteed.push("c4");
    if (rates.cerateup[1] == 0){
      return 'CE/'+normgacha['ce']['4'][Math.floor(Math.random()*normgacha['ce']['4'].length)];
    }
    return 'CE/'+rateup['ce']['4'][Math.floor(Math.random()*rateup['ce']['4'].length)];
  } else if (roll > r_intervals[6] && roll <= r_intervals[7]) { // servs + 5* and 4* ce
    rollstats[4] += 1;
    guaranteed.push("c4");
    return 'CE/'+normgacha['ce']['4'][Math.floor(Math.random()*normgacha['ce']['4'].length)];
  } else if (roll > r_intervals[7] && roll <= r_intervals[8]) { // servs + 5* 4* 3* rateup ce
    rollstats[5] += 1;
    guaranteed.push("c3");
    if (rates.cerateup[2] == 0){
      return 'CE/'+normgacha['ce']['3'][Math.floor(Math.random()*normgacha['ce']['3'].length)];
    }
    return 'CE/'+rateup['ce']['3'][Math.floor(Math.random()*rateup['ce']['3'].length)];
  } else {
    rollstats[5] += 1;
    guaranteed.push("c3");
    return 'CE/'+normgacha['ce']['3'][Math.floor(Math.random()*normgacha['ce']['3'].length)];
  }
};

function singleroll (rates,intervals,rateup,normgacha,ctx,rollz,i,j) {
  return myPromise = new Promise(function (resolve, reject){
    if (true) {
      snek.get(rollz[j][i]).then(r => {
        var card = new Canvas.Image();
        card.onload = function () {
          ctx.drawImage(card, i*129, j*220);
        }
        card.src = r.body;
        resolve ('ok');
      })
    } else {
      reject('failed');
    }
  })
}

function rollten (rates, normgacha, rateup, message){
  var rollstats = [0,0,0,0,0,0];
  var intervals = setIntervals(rates);
  const canvas = new Canvas(645, 440);
  const ctx = canvas.getContext('2d');
  var userid = message.author.id;
  var rollz = [];
  var rolla = [],
      rollb = [];
  var guaranteeda = [],//3 star or above servant, 4 star CE met?
      guaranteedb = [];
  for (var a = 0; a < 5; a++){
    var yoloroll1 = gacharoll(rates,intervals,rateup,normgacha,guaranteeda,rollstats);
    var yoloroll2 = gacharoll(rates,intervals,rateup,normgacha,guaranteedb,rollstats);
    rolla.push(`https://raw.githubusercontent.com/maketakunai/fgo-test/master/images/${yoloroll1}.png`);
    rollb.push(`https://raw.githubusercontent.com/maketakunai/fgo-test/master/images/${yoloroll2}.png`);
  }
  var guaranteed = [];
  guaranteed = guaranteeda.concat(guaranteedb);
  if ( (guaranteed.includes("c4") && (guaranteed.includes("s3")||guaranteed.includes("s4")||guaranteed.includes("s5"))) ||
       (guaranteed.includes("c5") && (guaranteed.includes("s3")||guaranteed.includes("s4")||guaranteed.includes("s5"))) ) {
    console.log("succ", guaranteed);
    rollz.push(rolla);
    rollz.push(rollb);
  } else {
    console.log("failed", guaranteed);
    rollb[3] = `https://raw.githubusercontent.com/maketakunai/fgo-test/master/images/${roll3starserv(rateup, normgacha)}.png`
    rollb[4] = `https://raw.githubusercontent.com/maketakunai/fgo-test/master/images/${roll4starCE(rateup, normgacha)}.png`
    rollz.push(rolla);
    rollz.push(rollb);
    if (guaranteed[8] == "c3") {
      rollstats[5] -= 1;
      rollstats[2] += 1;
    }
    else if (guaranteed[8] == "c4") {
      rollstats[4] -= 1;
      rollstats[2] += 1;
    }
    else if (guaranteed[8] == "c4") {
      rollstats[3] -= 1;
      rollstats[2] += 1;
    }
    else if (guaranteed[8] == "s4") {
      rollstats[1] -= 1;
      rollstats[2] += 1;
    }
    else if (guaranteed[8] == "s5") {
      rollstats[0] -= 1;
      rollstats[2] += 1;
    }
    if (guaranteed[9] == "s3") {
      rollstats[2] -= 1;
      rollstats[4] += 1;
    }
    else if (guaranteed[9] == "s4") {
      rollstats[1] -= 1;
      rollstats[4] += 1;
    }
    else if (guaranteed[9] == "s5") {
      rollstats[0] -= 1;
      rollstats[4] += 1;
    }
    else if (guaranteed[9] == "c5") {
      rollstats[3] -= 1;
      rollstats[4] += 1;
    }
    else if (guaranteed[9] == "c3") {
      rollstats[5] -= 1;
      rollstats[4] += 1;
    }
  }

  var sumtotal = rollstats.map(function (num, idx) { return num + totalrollstats[idx]; });
  totalrollstats = sumtotal;

  if (!userstats[userid]) {
    userstats[userid] = {userid};
    userstats[userid].stats = [0,0,0,0,0,0];
    userstats[userid].stats = rollstats;
    console.log("mystats", userstats[userid].stats)
    console.log(rollstats);
  }
  else if (userstats[userid]) {
    var sumtotal = rollstats.map(function (num, idx) { return num + userstats[userid].stats[idx]; });
    userstats[userid].stats = sumtotal;
    console.log("mystats", userstats[userid].stats)
  }
  var rolltotal = userstats[userid].stats.reduce((a, b) => a + b, 0);
  var quartz = 30 * Number(rolltotal)/10;
  var dollars = 0.4789 * quartz;
  var myservants = `5★: ${userstats[userid].stats[0]}, ${(userstats[userid].stats[0]*100/rolltotal).toFixed(1)}%\n4★: ${userstats[userid].stats[1]}, ${(userstats[userid].stats[1]*100/rolltotal).toFixed(1)}%\n3★: ${userstats[userid].stats[2]}, ${(userstats[userid].stats[2]*100/rolltotal).toFixed(1)}%`;
  var myces = `5★: ${userstats[userid].stats[3]}, ${(userstats[userid].stats[3]*100/rolltotal).toFixed(1)}%\n4★: ${userstats[userid].stats[4]}, ${(userstats[userid].stats[4]*100/rolltotal).toFixed(1)}%\n3★: ${userstats[userid].stats[5]}, ${(userstats[userid].stats[5]*100/rolltotal).toFixed(1)}%`;
  const embed = {
    "title":`${message.author.username}'s total stats: ${rolltotal/10}x 10rolls, ${quartz} <:quartz:526188417743323139>`,// $${dollars.toFixed(2)} spent`,
    "color": 8817876,
    "image": {
    "url": "attachment://image.png"
    },
    "author": {
      "name": `${rateup.name}`,
    },
    "footer": {
      "text": `'!10roll reset' to reset your individual roll stats.`
    },
    "fields": [
      {
        "name": "Servants",
        "value": `${myservants}`,
        "inline": true
      },
      {
        "name": "CE",
        "value": `${myces}`,
        "inline": true
      }
    ]
  }
  var promises = [];
  for (var i = 0; i < 5; i++){
    for (var j = 0; j < 2; j++) {
      promises.push(singleroll (rates,intervals,rateup,normgacha,ctx,rollz,i,j));
    }
  }
  Promise.all(promises)
    .then((results) => {
      message.channel.send({
      embed, files: [{attachment: canvas.toBuffer(), name: 'image.png'}]
      }).catch(console.error);
    })
    .catch((e) => {
      console.log(e);
      message.channel.send(`Yikes! Something happened. Try rolling again.`);
    })
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 5000);
}

function reset (message) {
  var userid = message.author.id;
  if (!userstats[userid]) {
    message.channel.send(message.author.username + ", you don't have any roll stats to reset.");
    return;
  }
  else {
    userstats[userid].stats = [0,0,0,0,0,0];
    message.channel.send(message.author.username + ", your roll session stats have been reset.");
    return;
  }
}

function showstats(message){
  let currTime = (new Date().getTime()) - startTime;
  let hours = (currTime / (1000*60*60)).toFixed(1);
  message.channel.send(totalrollstats.reduce((a, b) => a + b, 0) + ` total rolls across all servers since last restart ${hours} hours ago.`);

  var data = [{
    x:["5* Servant","4* Servant","3* Servant","5* CE","4* CE","3* CE"],
    y:totalrollstats, type: 'bar',
    text:totalrollstats,
    textposition: 'auto',
    marker: {
      color: 'rgb(158,202,225)',
      opacity: 0.6,
      line: {
        color: 'rbg(8,48,107)',
        width: 1.5
      }
    }
  }];
  var layout = {fileopt : "overwrite", filename : "simple-node-example"};

  plotly.plot(data, layout, function (err, msg) {
    if (err) return console.log(err);
    let graph = msg.url+'.png';
    message.channel.send({
      files: [graph]
    }).catch(console.error);
  });

  talkedRecently.add(message.author.id);
  setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 2000);
  return;
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: '10roll',
  description: 'Does a 10roll of the gacha.\nAvailable banners: story, storyjp, cbc, ccc1, ccc2, davinci, gudaguda, mhxa, shinjuku1, shinjuku2, murasaki\n!10roll stats to see stats.',
  usage: '!10roll [bannername]'
};
