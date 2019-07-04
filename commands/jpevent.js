const request = require('request');
const cheerio = require('cheerio');
const url = 'https://news.fate-go.jp/';
const moment = require('moment-timezone');
exports.run = (client, message, args) => {

  const array = [];
  request(url, function(err, resp, body){
    $ = cheerio.load(body);
    links = $('a');
    $(links).each(function(i, link){
      let href = $(link).attr('href');
      if (href.match(/^\/[0-9].*\/$/g) != null){
        array.push(href);
      }
    });
    for (let x = 0; x < array.length; x++){
      let newurl = 'https://news.fate-go.jp' + array[x];
      request(newurl, function(err, resp, body){
        $ = cheerio.load(body);
        if ($("title").text().indexOf("開催") != -1 && $('p:contains("イベント開催期間")').text().match(/\S*\d+\S*/g)){
          let times = $('p:contains("イベント開催期間")').text().match(/\S*\d+\S*/g).map(function (v) {return v;});
          let temp = times[1].split("～");
          let newTimes = [times[0], temp[0], temp[1], times[2].substring(0,5)];
          //need to change this later to search for alt="TOPバナー" and get img link from that instead
          let eventInfo = { time : newTimes, img : 'https://news.fate-go.jp'+$('img').eq(4).attr('src')}
          eventCalc(eventInfo, message);
        }
      });
    }
  });
};

function eventCalc(eventInfo, message) {
  let inEvent, beforeEvent, endEvent;
  let getUTC = Number(moment().unix()*1000);
  let sTime = `${eventInfo.time[0]} ${eventInfo.time[1]}`;
  let eTime = `2019年${eventInfo.time[2]} ${eventInfo.time[3]}`;
  moment.locale('ja');
  let m = moment(sTime, 'YYYY-MM-DD(ddd) hh:mm');
  let n = moment(eTime, 'YYYY-MM-DD(ddd) hh:mm');
  let offset = 32400000;
  let startTime = moment.tz(m, "Asia/Tokyo").format('x') - offset;
  let endTime = moment.tz(n, "Asia/Tokyo").format('x') - offset;
  console.log(startTime, endTime, getUTC);

  if (getUTC < endTime && getUTC < startTime)
  {
    beforeEvent = 1;
  }
  else if (getUTC < endTime && getUTC > startTime)
  {
    inEvent = 1;
  }
  else
  {
    endEvent = 1;
  }

  if (inEvent){
    let elapsed_time = timeconverter(endTime, getUTC);
    message.channel.send({
      "embed": {
        "title":"This event ends in " + elapsed_time[0] + " days, " + elapsed_time[1] + " hours, " + elapsed_time[2] + " minutes.",
        //"description": "You will regenerate " + elapsed_time[3] + " more AP and " + elapsed_time[4] + " more BP during this time.",
        "description": "You will regenerate " + elapsed_time[3] + " more AP during this time.",
        "color": 0000000,
        "image": {
        "url": eventInfo.img,
        }
      }
    }).catch(console.error);
  }
  else if (beforeEvent) {
    let to_begin = timeconverter(startTime, getUTC);
    message.channel.send({
      "embed": {
        "title":"This event begins in " + to_begin[0] + " days, " + to_begin[1] + " hours, " + to_begin[2] + " minutes.",
        "color": 0000000,
        "image": {
        "url": eventInfo.img,
        }
      }
    }).catch(console.error);
  }
  else if (endEvent){
    return;
  }
  else {
    message.channel.send("There is no event going on at this time.").catch(console.error);
  }
}

function timeconverter(endTime, utc){

  let eventEndTime = endTime;
  let time_diff = (eventEndTime - utc);
  let secs = time_diff / 1000;
  let mins = Math.floor(secs / 60);
  let hours = Math.floor(mins / 60);
  let days = Math.floor(hours / 24);
  let APRegen = Math.floor(mins / 5);
  let BPRegen = hours;
  let time_until = [days, hours%24, mins%60, APRegen, BPRegen];
  return time_until;

}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["eventjp"]
};


exports.help = {
  name: 'jpevent',
  description: `Lets you know what events are going on in JP. Shows remaining time on event, as well as available AP until it's over.`,
  usage: '!jpevent'
};
