const talkedRecently = new Set();
const config = require("../config.json");
const plotly = require('plotly')(config.plotlyuser, config.plotlyapikey);
const fs = require('fs');
const startTime = new Date().getTime();
const snek = require("snekfetch")
const Canvas = require('canvas-prebuilt');
const util = require('util');

var rollstats = [0,0,0,0,0,0]; // in order from SSR, SR, R servs to ces

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
//tbh this probably should be rewritten a bit, but oh well
function gacharoll (rates, r_intervals, rateup, normgacha, guaranteed) {
  let roll = Math.random()*100;
  if (roll > 0 && roll <= rates.servrateup[0]) { //rateup SSR servant
    rollstats[0] += 1;
    if (rates.servrateup[0] == 0){
      return 'S/'+normgacha['servants']['5'][Math.floor(Math.random()*normgacha['servants']['5'].length)];
    }
    return 'S/'+rateup['servants']['5'][Math.floor(Math.random()*rateup['servants']['5'].length)];
  } else if (roll > rates.servrateup[0] && roll <= rates.servstandard[0]) { //rateup SSR + normal SSR servant
    rollstats[0] += 1;
    return 'S/'+normgacha['servants']['5'][Math.floor(Math.random()*normgacha['servants']['5'].length)];
  } else if (roll > rates.servstandard[0] && roll <= r_intervals[0]) { //SSR + rateup SR servant
    rollstats[1] += 1;
    if (rates.servrateup[1] == 0){
      return 'S/'+normgacha['servants']['4'][Math.floor(Math.random()*normgacha['servants']['4'].length)];
    }
    return 'S/'+rateup['servants']['4'][Math.floor(Math.random()*rateup['servants']['4'].length)];
  } else if (roll > r_intervals[0] && roll <= r_intervals[1]) { // SSR + SR all
    rollstats[1] += 1;
    return 'S/'+normgacha['servants']['4'][Math.floor(Math.random()*normgacha['servants']['4'].length)];
  } else if (roll > r_intervals[1] && roll <= r_intervals[2]) { // ssr + sr + rateup r servants
    rollstats[2] += 1;
    guaranteed.push(3);
    if (rates.servrateup[2] == 0){
      return 'S/'+normgacha['servants']['3'][Math.floor(Math.random()*normgacha['servants']['3'].length)];
    }
    return 'S/'+rateup['servants']['3'][Math.floor(Math.random()*rateup['servants']['3'].length)];
  } else if (roll > r_intervals[2] && roll <= r_intervals[3]) { // ssr + sr + r servants total
    rollstats[2] += 1;
    guaranteed.push(3);
    return 'S/'+normgacha['servants']['3'][Math.floor(Math.random()*normgacha['servants']['3'].length)];
  } else if (roll > r_intervals[3] && roll <= r_intervals[4]) { // servs + rateup 5* ce
    rollstats[3] += 1;
    guaranteed.push(5);
    if (rates.cerateup[0] == 0){
      return 'CE/'+normgacha['ce']['5'][Math.floor(Math.random()*normgacha['ce']['5'].length)];
    }
    return 'CE/'+rateup['ce']['5'][Math.floor(Math.random()*rateup['ce']['5'].length)];
  } else if (roll > r_intervals[4] && roll <= r_intervals[5]) { // servs + all 5* ce
    rollstats[3] += 1;
    guaranteed.push(5);
    return 'CE/'+normgacha['ce']['5'][Math.floor(Math.random()*normgacha['ce']['5'].length)];
  } else if (roll > r_intervals[5] && roll <= r_intervals[6]) { // servs + 5* and rateup 4* ce
    rollstats[4] += 1;
    guaranteed.push(4);
    if (rates.cerateup[1] == 0){
      return 'CE/'+normgacha['ce']['4'][Math.floor(Math.random()*normgacha['ce']['4'].length)];
    }
    return 'CE/'+rateup['ce']['4'][Math.floor(Math.random()*rateup['ce']['4'].length)];
  } else if (roll > r_intervals[6] && roll <= r_intervals[7]) { // servs + 5* and 4* ce
    rollstats[4] += 1;
    guaranteed.push(4);
    return 'CE/'+normgacha['ce']['4'][Math.floor(Math.random()*normgacha['ce']['4'].length)];
  } else if (roll > r_intervals[7] && roll <= r_intervals[8]) { // servs + 5* 4* 3* rateup ce
    rollstats[5] += 1;
    if (rates.cerateup[2] == 0){
      return 'CE/'+normgacha['ce']['3'][Math.floor(Math.random()*normgacha['ce']['3'].length)];
    }
    return 'CE/'+rateup['ce']['3'][Math.floor(Math.random()*rateup['ce']['3'].length)];
  } else {
    rollstats[5] += 1;
    return 'CE/'+normgacha['ce']['3'][Math.floor(Math.random()*normgacha['ce']['3'].length)];
  }
};

function singleroll (rates,intervals,rateup,normgacha,ctx,rollz,i,j) {
  return myPromise = new Promise(function (resolve, reject){
    if (true) {
      snek.get(rollz[j][i]).then(r => {
        var card = new Canvas.Image();
        card.onload = function () {
          ctx.drawImage(card, i*129, j*219);
        }
        card.src = r.body;
        resolve ('ok');
      })
    } else {
      reject('failed');
    }
  })
}

exports.run = (client, message, args) => {
  if (message.guild.id == 328226892798754819 && message.channel.id != 421357102229880842) {
    let msg = "Please do your 10rolls in <#421357102229880842>.";
    message.channel.send(msg);
    return;
  }
  if (args[0]) {args[0] = args[0].toLowerCase();}
  if (talkedRecently.has(message.author.id)){
    message.channel.send(message.author.username + ", you can only use !10roll once every 10 seconds.")
    return;
  }

  else if (args[0] == "stats") {
    let currTime = (new Date().getTime()) - startTime;
    let hours = (currTime / (1000*60*60)).toFixed(1);
    message.channel.send(rollstats.reduce((a, b) => a + b, 0) + ` total rolls across all servers since last restart ${hours} hours ago.`);

    var data = [{
      x:["5* Servant","4* Servant","3* Servant","5* CE","4* CE","3* CE"],
      y:rollstats, type: 'bar',
      text:rollstats,
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
  else if (args[0] == "cam2" || args[0] == "camelot2"){
    let rates = {
        servstandard: [ 1, 3, 40 ],
        cestandard: [ 4, 12, 40 ],
        servrateup: [ 0.7, 2.4, 0 ], // only 1 servant on rateup
        cerateup: [ 0, 0, 0 ]
        };
    let intervals = setIntervals(rates);
    let normgacha = require("../db/gacha-standardpool.json"),
        rateup = require("../db/rateup-camelot2.json");
        //yoloroll = gacharoll(rates,intervals,rateup,normgacha);
    //let url = `https://raw.githubusercontent.com/aister/nobuDB/master/images/${yoloroll}.png`;
    const canvas = new Canvas(645, 438);
    const ctx = canvas.getContext('2d');
    const embed = {
      "title":`${message.author.username}'s 10roll:`,
      "color": 8817876,
      "image": {
      "url": "attachment://image.png"
      },
      "author": {
        "name": `${rateup.name}`,
      }
    }
    var rollz = [];
    var rolla = [],
        rollb = [];
    var guaranteed = []; //3 star or above servant, 4 star CE met?
    for (let a = 0; a < 5; a++){
      let yoloroll1 = gacharoll(rates,intervals,rateup,normgacha,guaranteed);
      let yoloroll2 = gacharoll(rates,intervals,rateup,normgacha,guaranteed);
      rolla.push(`https://raw.githubusercontent.com/aister/nobuDB/master/images/${yoloroll1}.png`);
      rollb.push(`https://raw.githubusercontent.com/aister/nobuDB/master/images/${yoloroll2}.png`);
    }
    if (guaranteed.includes(4) || guaranteed.includes(5) && guaranteed.includes(3)) {
      rollz.push(rolla);
      rollz.push(rollb);
    } else {
      rollb[3] = `https://raw.githubusercontent.com/aister/nobuDB/master/images/${roll3starserv(rateup, normgacha)}.png`
      rollb[4] = `https://raw.githubusercontent.com/aister/nobuDB/master/images/${roll4starCE(rateup, normgacha)}.png`
      rollz.push(rolla);
      rollz.push(rollb);
    }

    let promises = [];
    for (let i = 0; i < 5; i++){
      for (let j = 0; j < 2; j++) {
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
    }, 10000);
  }
  else if (args[0] == "summer1" || args[0] == "sum1"){
    let rates = {
        servstandard: [ 1, 3, 40 ],
        cestandard: [ 4, 12, 40 ],
        servrateup: [ 0.7, 2.1, 0 ], // 8, for 4+4 of two 3* servants; 2.4 for (1.2*2) of two 4* servants
        cerateup: [ 2.8, 4, 8 ]
        };
    let intervals = setIntervals(rates);
    let normgacha = require("../db/gacha-standardpool.json"),
        rateup = require("../db/rateup-summer.json");
        //yoloroll = gacharoll(rates,intervals,rateup,normgacha);
    //let url = `https://raw.githubusercontent.com/aister/nobuDB/master/images/${yoloroll}.png`;
    const canvas = new Canvas(645, 438);
    const ctx = canvas.getContext('2d');
    const embed = {
      "title":`${message.author.username}'s 10roll:`,
      "color": 8817876,
      "image": {
      "url": "attachment://image.png"
      },
      "author": {
        "name": `${rateup.name}`,
      }
    }
    var rollz = [];
    var rolla = [],
        rollb = [];
    var guaranteed = []; //3 star or above servant, 4 star CE met?
    for (let a = 0; a < 5; a++){
      let yoloroll1 = gacharoll(rates,intervals,rateup,normgacha,guaranteed);
      let yoloroll2 = gacharoll(rates,intervals,rateup,normgacha,guaranteed);
      rolla.push(`https://raw.githubusercontent.com/aister/nobuDB/master/images/${yoloroll1}.png`);
      rollb.push(`https://raw.githubusercontent.com/aister/nobuDB/master/images/${yoloroll2}.png`);
    }
    if (guaranteed.includes(4) || guaranteed.includes(5) && guaranteed.includes(3)) {
      rollz.push(rolla);
      rollz.push(rollb);
    } else {
      rollb[3] = `https://raw.githubusercontent.com/aister/nobuDB/master/images/${roll3starserv(rateup, normgacha)}.png`
      rollb[4] = `https://raw.githubusercontent.com/aister/nobuDB/master/images/${roll4starCE(rateup, normgacha)}.png`
      rollz.push(rolla);
      rollz.push(rollb);
    }

    let promises = [];
    for (let i = 0; i < 5; i++){
      for (let j = 0; j < 2; j++) {
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
    }, 10000);
  }
  else if (args[0] == "summer2" || args[0] == "sum2") {
    let rates = {
        servstandard: [ 1, 3, 40 ],
        cestandard: [ 4, 12, 40 ],
        servrateup: [ 0.7, 2.4, 0 ], // 8, for 4+4 of two 3* servants; 2.4 for (1.2*2) of two 4* servants
        cerateup: [ 2.8, 4, 8 ]
        };
    let intervals = setIntervals(rates);
    let normgacha = require("../db/gacha-standardpool.json"),
        rateup = require("../db/rateup-summer2.json");
        //yoloroll = gacharoll(rates,intervals,rateup,normgacha);
    //let url = `https://raw.githubusercontent.com/aister/nobuDB/master/images/${yoloroll}.png`;
    const canvas = new Canvas(645, 438);
    const ctx = canvas.getContext('2d');
    const embed = {
      "title":`${message.author.username}'s 10roll:`,
      "color": 8817876,
      "image": {
      "url": "attachment://image.png"
      },
      "author": {
        "name": `${rateup.name}`,
      }
    }
    var rollz = [];
    var rolla = [],
        rollb = [];
    var guaranteed = []; //3 star or above servant, 4 star CE met?
    for (let a = 0; a < 5; a++){
      let yoloroll1 = gacharoll(rates,intervals,rateup,normgacha,guaranteed);
      let yoloroll2 = gacharoll(rates,intervals,rateup,normgacha,guaranteed);
      rolla.push(`https://raw.githubusercontent.com/aister/nobuDB/master/images/${yoloroll1}.png`);
      rollb.push(`https://raw.githubusercontent.com/aister/nobuDB/master/images/${yoloroll2}.png`);
    }
    if (guaranteed.includes(4) || guaranteed.includes(5) && guaranteed.includes(3)) {
      rollz.push(rolla);
      rollz.push(rollb);
    } else {
      rollb[3] = `https://raw.githubusercontent.com/aister/nobuDB/master/images/${roll3starserv(rateup, normgacha)}.png`
      rollb[4] = `https://raw.githubusercontent.com/aister/nobuDB/master/images/${roll4starCE(rateup, normgacha)}.png`
      rollz.push(rolla);
      rollz.push(rollb);
    }

    let promises = [];
    for (let i = 0; i < 5; i++){
      for (let j = 0; j < 2; j++) {
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
    }, 10000);
  }
  else if (args[0] == "prisma" || args[0] == "illya") {
    let rates = {
        servstandard: [ 1, 3, 40 ],
        cestandard: [ 4, 12, 40 ],
        servrateup: [ 0.7, 2.1, 0 ], // 1 5*, 3 4*
        cerateup: [ 2.8, 4, 8 ]
        };
    let intervals = setIntervals(rates);
    let normgacha = require("../db/gacha-standardpool.json"),
        rateup = require("../db/rateup-prisma.json");
        //yoloroll = gacharoll(rates,intervals,rateup,normgacha);
    //let url = `https://raw.githubusercontent.com/aister/nobuDB/master/images/${yoloroll}.png`;
    const canvas = new Canvas(645, 438);
    const ctx = canvas.getContext('2d');
    const embed = {
      "title":`${message.author.username}'s 10roll:`,
      "color": 8817876,
      "image": {
      "url": "attachment://image.png"
      },
      "author": {
        "name": `${rateup.name}`,
      }
    }
    var rollz = [];
    var rolla = [],
        rollb = [];
    var guaranteed = []; //3 star or above servant, 4 star CE met?
    for (let a = 0; a < 5; a++){
      let yoloroll1 = gacharoll(rates,intervals,rateup,normgacha,guaranteed);
      let yoloroll2 = gacharoll(rates,intervals,rateup,normgacha,guaranteed);
      rolla.push(`https://raw.githubusercontent.com/aister/nobuDB/master/images/${yoloroll1}.png`);
      rollb.push(`https://raw.githubusercontent.com/aister/nobuDB/master/images/${yoloroll2}.png`);
    }
    if (guaranteed.includes(4) || guaranteed.includes(5) && guaranteed.includes(3)) {
      rollz.push(rolla);
      rollz.push(rollb);
    } else {
      rollb[3] = `https://raw.githubusercontent.com/aister/nobuDB/master/images/${roll3starserv(rateup, normgacha)}.png`
      rollb[4] = `https://raw.githubusercontent.com/aister/nobuDB/master/images/${roll4starCE(rateup, normgacha)}.png`
      rollz.push(rolla);
      rollz.push(rollb);
    }

    let promises = [];
    for (let i = 0; i < 5; i++){
      for (let j = 0; j < 2; j++) {
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
    }, 10000);
  }
  else if (args[0] == "nero" || args[0] == "nerofest") {
    let rates = {
        servstandard: [ 1, 3, 40 ],
        cestandard: [ 4, 12, 40 ],
        servrateup: [ 0.7, 1.5, 12 ], // 1 5*, 1 4*, 3 3*
        cerateup: [ 2.8, 4, 8 ]
        };
    let intervals = setIntervals(rates);
    let normgacha = require("../db/gacha-standardpool.json"),
        rateup = require("../db/rateup-nero.json");
        //yoloroll = gacharoll(rates,intervals,rateup,normgacha);
    //let url = `https://raw.githubusercontent.com/aister/nobuDB/master/images/${yoloroll}.png`;
    const canvas = new Canvas(645, 438);
    const ctx = canvas.getContext('2d');
    const embed = {
      "title":`${message.author.username}'s 10roll:`,
      "color": 8817876,
      "image": {
      "url": "attachment://image.png"
      },
      "author": {
        "name": `${rateup.name}`,
      }
    }
    var rollz = [];
    var rolla = [],
        rollb = [];
    var guaranteed = []; //3 star or above servant, 4 star CE met?
    for (let a = 0; a < 5; a++){
      let yoloroll1 = gacharoll(rates,intervals,rateup,normgacha,guaranteed);
      let yoloroll2 = gacharoll(rates,intervals,rateup,normgacha,guaranteed);
      rolla.push(`https://raw.githubusercontent.com/aister/nobuDB/master/images/${yoloroll1}.png`);
      rollb.push(`https://raw.githubusercontent.com/aister/nobuDB/master/images/${yoloroll2}.png`);
    }
    if (guaranteed.includes(4) || guaranteed.includes(5) && guaranteed.includes(3)) {
      rollz.push(rolla);
      rollz.push(rollb);
    } else {
      rollb[3] = `https://raw.githubusercontent.com/aister/nobuDB/master/images/${roll3starserv(rateup, normgacha)}.png`
      rollb[4] = `https://raw.githubusercontent.com/aister/nobuDB/master/images/${roll4starCE(rateup, normgacha)}.png`
      rollz.push(rolla);
      rollz.push(rollb);
    }

    let promises = [];
    for (let i = 0; i < 5; i++){
      for (let j = 0; j < 2; j++) {
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
    }, 10000);
  }
  else {
    message.channel.send("'!10roll (banner)' to 10roll the gacha.\nAvailable banners: cam2, sum1, sum2, prisma, nero\n");
    return;
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: '10roll',
  description: 'Does a 10roll of the gacha.\nAvailable banners: cam2, sum1, sum2, prisma, nero\n!10roll stats to see stats.',
  usage: '!10roll [bannername]'
};
