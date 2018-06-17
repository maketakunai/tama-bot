const talkedRecently = new Set();
const normgacha = require("../db/gacha.json");
const rateup = require("../db/rateup.json")
const snek = require("snekfetch")
const rates = {
  servstandard: [ 1, 3, 40 ],
  cestandard: [ 4, 12, 40 ],
  servrateup: [ 0.7, 1.5, 4 ],
  cerateup: [ 2.8, 4, 8 ]
} // all in order from SSR, SR, R

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


//make a roulette wheel out of all the gacha probabilities, then return servant chosen at random from the pool that was selected
function gacharoll () {
  let roll = Math.random()*100;
  if (roll > 0 && roll <= rates.servrateup[0]) { //rateup SSR servant
    return 'S/'+rateup['servants']['5'][Math.floor(Math.random()*rateup['servants']['5'].length)]
  } else if (roll > rates.servrateup[0] && roll <= rates.servstandard[0]) { //rateup SSR + normal SSR servant
    return 'S/'+normgacha['servants']['5'][Math.floor(Math.random()*normgacha['servants']['5'].length)]
  } else if (roll > rates.servstandard[0] && roll <= r_intervals[0]) { //SSR + rateup SR servant
    return 'S/'+rateup['servants']['4'][Math.floor(Math.random()*rateup['servants']['4'].length)]
  } else if (roll > r_intervals[0] && roll <= r_intervals[1]) { // SSR + SR all
    return 'S/'+normgacha['servants']['4'][Math.floor(Math.random()*normgacha['servants']['4'].length)]
  } else if (roll > r_intervals[1] && roll <= r_intervals[2]) { // ssr + sr + rateup r servants
    return 'S/'+rateup['servants']['3'][Math.floor(Math.random()*rateup['servants']['3'].length)]
  } else if (roll > r_intervals[2] && roll <= r_intervals[3]) { // ssr + sr + r servants total
    return 'S/'+normgacha['servants']['3'][Math.floor(Math.random()*normgacha['servants']['3'].length)]
  } else if (roll > r_intervals[3] && roll <= r_intervals[4]) { // servs + rateup 5* ce
    return 'CE/'+rateup['ce']['5'][Math.floor(Math.random()*rateup['ce']['5'].length)]
  } else if (roll > r_intervals[4] && roll <= r_intervals[5]) { // servs + all 5* ce
    return 'CE/'+normgacha['ce']['5'][Math.floor(Math.random()*normgacha['ce']['5'].length)]
  } else if (roll > r_intervals[5] && roll <= r_intervals[6]) { // servs + 5* and rateup 4* ce
    return 'CE/'+rateup['ce']['4'][Math.floor(Math.random()*rateup['ce']['4'].length)]
  } else if (roll > r_intervals[6] && roll <= r_intervals[7]) { // servs + 5* and 4* ce
    return 'CE/'+normgacha['ce']['4'][Math.floor(Math.random()*normgacha['ce']['4'].length)]
  } else if (roll > r_intervals[7] && roll <= r_intervals[8]) { // servs + 5* 4* 3* rateup ce
    return 'CE/'+rateup['ce']['3'][Math.floor(Math.random()*rateup['ce']['3'].length)]
  } else {
    return 'CE/'+normgacha['ce']['3'][Math.floor(Math.random()*normgacha['ce']['3'].length)]
  }
}

exports.run = (client, message, args) => {
  var testroll = gacharoll();
  var url = `https://raw.githubusercontent.com/aister/nobuDB/master/images/${testroll}.png`;
  //message.channel.send(`${testroll} was rolled.`).catch(console.error);
  if (talkedRecently.has(message.author.id)){
    message.channel.send(message.author.username + ", you can only gacha once every 5 seconds.")
  }
  //snek.get(url).then( r =>
  else {
    message.channel.send({
      "embed": {
        //"title": "mm/dd/yyyy to mm/dd/yyyy",
        //"description": "time remaining: x days, y hours, z minutes",
        //"url": "https://discordapp.com",
        "color": 8817876,
        //"thumbnail": {
          //"url": "https://cirnopedia.org/fate-go/icons/item/item_007.png"
        //},
        "image": {
        "url": url
        },
        "author": {
          "name": `${message.author.username}'s single roll:`,
        }
      }
    });//.catch(console.error)
  //);
    talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 5000);
  }

  /*
  message.channel.send(`${message.author.username}'s single roll:`).catch(console.error);
  snek.get(url).then( r =>

    message.channel.send({
      file: r.body
    }).catch(console.error)
  );
  */

}
