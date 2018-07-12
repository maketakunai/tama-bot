const talkedRecently = new Set();
//const normgacha = require("../db/gacha.json");
//const rateup = require("../db/rateup.json");
const config = require("../config.json");
const plotly = require('plotly')(config.plotlyuser, config.plotlyapikey);
const fs = require('fs');
const startTime = new Date().getTime();
//const snek = require("snekfetch")
/*
const rates = {
  servstandard: [ 1, 3, 40 ],
  cestandard: [ 4, 12, 40 ],
  servrateup: [ 0.7, 2.4, 8 ], // 8, for 4+4 of two 3* servants; 2.4 for (1.2*2) of two 4* servants
  cerateup: [ 2.8, 4, 8 ]
}; // all in order from SSR, SR, R (rateup is combined totals)
*/

/*
const r_intervals = [ Number(rates.servstandard[0]+rates.servrateup[1]), //ssr_total + sr rateup
  Number(rates.servstandard[0]+rates.servstandard[1]), //ssr_total + sr_total
  Number(rates.servstandard[0]+rates.servstandard[1]+rates.servrateup[2]), // ssr_total + sr_total + r rateup
  Number(rates.servstandard[0]+rates.servstandard[1]+rates.servstandard[2]), //ssr+sr+r servant total
  Number(rates.servstandard[0]+rates.servstandard[1]+rates.servstandard[2]+rates.cerateup[0]), // prev and 5* ce rateup
  Number(rates.servstandard[0]+rates.servstandard[1]+rates.servstandard[2]+rates.cestandard[0]), // prev and 5* ce total
  Number(rates.servstandard[0]+rates.servstandard[1]+rates.servstandard[2]+rates.cestandard[0]+rates.cerateup[1]), // adding 4* ce rateup
  Number(rates.servstandard[0]+rates.servstandard[1]+rates.servstandard[2]+rates.cestandard[0]+rates.cestandard[1]), // now with total 4* ce
  Number(rates.servstandard[0]+rates.servstandard[1]+rates.servstandard[2]+rates.cestandard[0]+rates.cestandard[1]+rates.cerateup[2]), // adding 3* ce rateup
  Number(rates.servstandard[0]+rates.servstandard[1]+rates.servstandard[2]+rates.cestandard[0]+rates.cestandard[1]+rates.cestandard[2]) // this should be 100 total. unnecessary!
];*/

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

//make a roulette wheel out of all the gacha probabilities, then return servant chosen at random from the pool that was selected
function gacharoll (rates, r_intervals, rateup, normgacha) {
  let roll = Math.random()*100;
  if (roll > 0 && roll <= rates.servrateup[0]) { //rateup SSR servant
    rollstats[0] += 1;
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
    if (rates.servrateup[2] == 0){
      return 'S/'+normgacha['servants']['3'][Math.floor(Math.random()*normgacha['servants']['3'].length)];
    }
    return 'S/'+rateup['servants']['3'][Math.floor(Math.random()*rateup['servants']['3'].length)];
  } else if (roll > r_intervals[2] && roll <= r_intervals[3]) { // ssr + sr + r servants total
    rollstats[2] += 1;
    return 'S/'+normgacha['servants']['3'][Math.floor(Math.random()*normgacha['servants']['3'].length)];
  } else if (roll > r_intervals[3] && roll <= r_intervals[4]) { // servs + rateup 5* ce
    rollstats[3] += 1;
    if (rates.cerateup[0] == 0){
      return 'CE/'+normgacha['ce']['5'][Math.floor(Math.random()*normgacha['ce']['5'].length)];
    }
    return 'CE/'+rateup['ce']['5'][Math.floor(Math.random()*rateup['ce']['5'].length)];
  } else if (roll > r_intervals[4] && roll <= r_intervals[5]) { // servs + all 5* ce
    rollstats[3] += 1;
    return 'CE/'+normgacha['ce']['5'][Math.floor(Math.random()*normgacha['ce']['5'].length)];
  } else if (roll > r_intervals[5] && roll <= r_intervals[6]) { // servs + 5* and rateup 4* ce
    rollstats[4] += 1;
    if (rates.cerateup[1] == 0){
      return 'CE/'+normgacha['ce']['4'][Math.floor(Math.random()*normgacha['ce']['4'].length)];
    }
    return 'CE/'+rateup['ce']['4'][Math.floor(Math.random()*rateup['ce']['4'].length)];
  } else if (roll > r_intervals[6] && roll <= r_intervals[7]) { // servs + 5* and 4* ce
    rollstats[4] += 1;
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

exports.run = (client, message, args) => {
  //check the gach rates
  //console.log(r_intervals);
  //message.channel.send(`${testroll} was rolled.`).catch(console.error);
  if (talkedRecently.has(message.author.id)){
    message.channel.send(message.author.username + ", you can only use !yolo once every second.")
    return;
  }
  else if (args[0] == "help") {
    message.channel.send("Type in '!yolo (banner)' to do a single pull.\nAvailable banners: cam2, sum1, sum2, prisma\n'!yolo stats' to see stats.\n");
    return;
  }
  else if (args[0] == "stats") {
    let currTime = (new Date().getTime()) - startTime;
    let hours = (currTime / (1000*60*60)).toFixed(1);
    message.channel.send(rollstats.reduce((a, b) => a + b, 0) + ` total yolo rolls across all servers since last restart ${hours} hours ago.`);

    var data = [{x:["5* Servant","4* Servant","3* Servant","5* CE","4* CE","3* CE"], y:rollstats, type: 'bar'}];
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
    }, 1000);
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
        rateup = require("../db/rateup-camelot2.json"),
        yoloroll = gacharoll(rates,intervals,rateup, normgacha);
    let url = `https://raw.githubusercontent.com/aister/nobuDB/master/images/${yoloroll}.png`;
    //console.log(intervals);
    //console.log(yoloroll);
    message.channel.send({
      "embed": {
        "title":`${message.author.username}'s single roll:`,
        "color": 8817876,
        "image": {
        "url": url
        },
        "author": {
          "name": `${rateup.name}`,
        }
      }
    });
    talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 1000);
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
        rateup = require("../db/rateup-summer.json"),
        yoloroll = gacharoll(rates,intervals,rateup,normgacha);
    let url = `https://raw.githubusercontent.com/aister/nobuDB/master/images/${yoloroll}.png`;
    message.channel.send({
      "embed": {
        "title":`${message.author.username}'s single roll:`,
        "color": 8817876,
        "image": {
        "url": url
        },
        "author": {
          "name": `${rateup.name}`,
        }
      }
    });
    talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 1000);
  }
  else if (args[0] == "summer2" || args[0] == "sum2"){
    let rates = {
        servstandard: [ 1, 3, 40 ],
        cestandard: [ 4, 12, 40 ],
        servrateup: [ 0.7, 2.4, 0 ], // 8, for 4+4 of two 3* servants; 2.4 for (1.2*2) of two 4* servants
        cerateup: [ 2.8, 4, 8 ]
        };
    let intervals = setIntervals(rates);
    let normgacha = require("../db/gacha-standardpool.json"),
        rateup = require("../db/rateup-summer2.json"),
        yoloroll = gacharoll(rates,intervals,rateup,normgacha);
    let url = `https://raw.githubusercontent.com/aister/nobuDB/master/images/${yoloroll}.png`;
    message.channel.send({
      "embed": {
        "title":`${message.author.username}'s single roll:`,
        "color": 8817876,
        "image": {
        "url": url
        },
        "author": {
          "name": `${rateup.name}`,
        }
      }
    });
    talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 1000);
  }
  else if (args[0] == "prisma" || args[0] == "illya"){
    let rates = {
        servstandard: [ 1, 3, 40 ],
        cestandard: [ 4, 12, 40 ],
        servrateup: [ 0.8, 2.1, 0 ], // 2 5*, 3 4*
        cerateup: [ 2.8, 4, 8 ]
        };
    let intervals = setIntervals(rates);
    let normgacha = require("../db/gacha-standardpool.json"),
        rateup = require("../db/rateup-prisma.json"),
        yoloroll = gacharoll(rates,intervals,rateup,normgacha);
    let url = `https://raw.githubusercontent.com/aister/nobuDB/master/images/${yoloroll}.png`;
    message.channel.send({
      "embed": {
        "title":`${message.author.username}'s single roll:`,
        "color": 8817876,
        "image": {
        "url": url
        },
        "author": {
          "name": `${rateup.name}`,
        }
      }
    });
    talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 1000);
  }
  else { // DAVINCI anniversary
    let rates = {
        servstandard: [ 1, 3, 40 ],
        cestandard: [ 4, 12, 40 ],
        servrateup: [ 0.7, 0, 0 ], // only 1 servant on rateup
        cerateup: [ 2.8, 4, 8 ]
        };
    let intervals = setIntervals(rates);
    let normgacha = require("../db/gacha-standardpool.json"),
        rateup = require("../db/rateup-anniversary.json"),
        yoloroll = gacharoll(rates,intervals,rateup, normgacha);
    let url = `https://raw.githubusercontent.com/aister/nobuDB/master/images/${yoloroll}.png`;
    message.channel.send({
      "embed": {
        "title":`${message.author.username}'s single roll:`,
        "color": 8817876,
        "image": {
        "url": url
        },
        "author": {
          "name": `${rateup.name}`,
        }
      }
    });
    talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 1000);
  }

  return;
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};
