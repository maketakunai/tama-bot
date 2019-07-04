const request = require('request');
const cheerio = require('cheerio');
const url = 'https://webview.fate-go.us/iframe/';
const moment = require('moment-timezone');
exports.run = (client, message, args) => {

  const array = [];
  request(url, function(err, resp, body){
    $ = cheerio.load(body);
    links = $('a');
    $(links).each(function(i, link){
      let href = $(link).attr('href');
      array.push(href);
    });
    let eventActive = 0;
    for (let x = 0; x < array.length; x++){
      let newurl = 'https://webview.fate-go.us' + array[x];
      request(newurl, function(err, resp, body){
        $ = cheerio.load(body);
        if ($('p:contains("Event Period")').text().match(/\S*\d+\S*/g)){
          let times = $('p:contains("Event Period")').text().match(/\S*\d+\S*/g).map(function (v) {return v;});
          let eventInfo = { time : times, img : 'https://webview.fate-go.us'+$('img').attr('src')}
          //eventActive += 1;
          eventCalc(eventInfo, message, eventActive);
        }
      });
    }
    /*if (!eventActive) {
      message.channel.send("There is no event going on at this time.").catch(console.error);
    }*/
  });
};

function eventCalc(eventInfo, message, eventActive) {
  let inEvent, beforeEvent, endEvent = 0;
  let getUTC = Number(moment().unix()*1000);
  let sTime = `${eventInfo.time[0]} ${eventInfo.time[1]}`;
  let eTime = `2019-${eventInfo.time[2]} ${eventInfo.time[3]}`;
  let startTime = moment.tz(sTime, "America/Los_Angeles").format('x');
  let endTime = moment.tz(eTime, "America/Los_Angeles").format('x');
  console.log(startTime, endTime, getUTC);

  if (getUTC < endTime && getUTC < startTime)
  {
    beforeEvent = 1;
  }
  else if (getUTC < endTime && getUTC > startTime)
  {
    inEvent = 1;
    eventActive += 1;
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
        "color": 8817876,
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
        "color": 8817876,
        "image": {
        "url": eventInfo.img,
        }
      }
    }).catch(console.error);
  }
  else if (endEvent){
    return;
  }
  /*else {
    message.channel.send("There is no event going on at this time.").catch(console.error);
  }*/
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
  aliases: []
};


exports.help = {
  name: 'event',
  description: `Lets you know what events are going on in NA. Shows remaining time on event, as well as available AP until it's over.`,
  usage: '!event'
};
