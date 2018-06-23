const talkedRecently = new Set();
const normgacha = require("../db/gacha.json");
const rateup = require("../db/rateup.json");
const config = require("../config.json");
const plotly = require('plotly')(config.plotlyuser, config.plotlyapikey);
const fs = require('fs');
//const snek = require("snekfetch")
const rates = {
  servstandard: [ 1, 3, 40 ],
  cestandard: [ 4, 12, 40 ],
  servrateup: [ 0.7, 2.4, 8 ], // 8, for 4+4 of two 3* servants; 2.4 for (1.2*2) of two 4* servants
  cerateup: [ 2.8, 4, 8 ]
}; // all in order from SSR, SR, R (rateup is combined totals)

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
];

var rollstats = [0,0,0,0,0,0]; // in order from SSR, SR, R servs to ces

//make a roulette wheel out of all the gacha probabilities, then return servant chosen at random from the pool that was selected
function gacharoll () {
  let roll = Math.random()*100;
  if (roll > 0 && roll <= rates.servrateup[0]) { //rateup SSR servant
    rollstats[0] += 1;
    //console.log("5s");
    return 'S/'+rateup['servants']['5'][Math.floor(Math.random()*rateup['servants']['5'].length)];
  } else if (roll > rates.servrateup[0] && roll <= rates.servstandard[0]) { //rateup SSR + normal SSR servant
    rollstats[0] += 1;
    //console.log("5s");
    return 'S/'+normgacha['servants']['5'][Math.floor(Math.random()*normgacha['servants']['5'].length)];
  } else if (roll > rates.servstandard[0] && roll <= r_intervals[0]) { //SSR + rateup SR servant
    rollstats[1] += 1;
    //console.log("4s");
    return 'S/'+rateup['servants']['4'][Math.floor(Math.random()*rateup['servants']['4'].length)];
  } else if (roll > r_intervals[0] && roll <= r_intervals[1]) { // SSR + SR all
    rollstats[1] += 1;
    //console.log("4s");
    return 'S/'+normgacha['servants']['4'][Math.floor(Math.random()*normgacha['servants']['4'].length)];
  } else if (roll > r_intervals[1] && roll <= r_intervals[2]) { // ssr + sr + rateup r servants
    rollstats[2] += 1;
    //console.log("3s");
    return 'S/'+rateup['servants']['3'][Math.floor(Math.random()*rateup['servants']['3'].length)];
  } else if (roll > r_intervals[2] && roll <= r_intervals[3]) { // ssr + sr + r servants total
    rollstats[2] += 1;
    //console.log("3s");
    return 'S/'+normgacha['servants']['3'][Math.floor(Math.random()*normgacha['servants']['3'].length)];
  } else if (roll > r_intervals[3] && roll <= r_intervals[4]) { // servs + rateup 5* ce
    rollstats[3] += 1;
    //console.log("5ce");
    return 'CE/'+rateup['ce']['5'][Math.floor(Math.random()*rateup['ce']['5'].length)];
  } else if (roll > r_intervals[4] && roll <= r_intervals[5]) { // servs + all 5* ce
    rollstats[3] += 1;
    //console.log("5ce");
    return 'CE/'+normgacha['ce']['5'][Math.floor(Math.random()*normgacha['ce']['5'].length)];
  } else if (roll > r_intervals[5] && roll <= r_intervals[6]) { // servs + 5* and rateup 4* ce
    rollstats[4] += 1;
    //console.log("4ce");
    return 'CE/'+rateup['ce']['4'][Math.floor(Math.random()*rateup['ce']['4'].length)];
  } else if (roll > r_intervals[6] && roll <= r_intervals[7]) { // servs + 5* and 4* ce
    rollstats[4] += 1;
    //console.log("4ce");
    return 'CE/'+normgacha['ce']['4'][Math.floor(Math.random()*normgacha['ce']['4'].length)];
  } else if (roll > r_intervals[7] && roll <= r_intervals[8]) { // servs + 5* 4* 3* rateup ce
    rollstats[5] += 1;
    //console.log("3ce");
    return 'CE/'+rateup['ce']['3'][Math.floor(Math.random()*rateup['ce']['3'].length)];
  } else {
    rollstats[5] += 1;
    //console.log("3ce");
    return 'CE/'+normgacha['ce']['3'][Math.floor(Math.random()*normgacha['ce']['3'].length)];
  }
};

exports.run = (client, message, args) => {
  //check the gach rates
  //console.log(r_intervals);
  //message.channel.send(`${testroll} was rolled.`).catch(console.error);
  if (talkedRecently.has(message.author.id)){
    message.channel.send(message.author.username + ", you can only use !yolo once every 5 seconds.")
    return;
  }
  else if (args[0] == "stats") {
    message.channel.send(rollstats.reduce((a, b) => a + b, 0) + " total yolo rolls across all servers since last restart.");

    var data = [{x:["5* Servant","4* Servant","3* Servant","5* CE","4* CE","3* CE"], y:rollstats, type: 'bar'}];
    var layout = {fileopt : "overwrite", filename : "simple-node-example"};

    plotly.plot(data, layout, function (err, msg) {
    	if (err) return console.log(err);
    	//console.log(msg);
      message.channel.send({
        file: `${msg.url}.png`
      });
    })
    talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 5000);
    return;
  }
  else {
    var yoloroll = gacharoll();
    var url = `https://raw.githubusercontent.com/aister/nobuDB/master/images/${yoloroll}.png`;
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
    }, 5000);
  }
  return;
};
