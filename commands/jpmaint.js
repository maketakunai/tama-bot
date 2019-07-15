const request = require('request');
const cheerio = require('cheerio');
const url = 'https://news.fate-go.jp/maintenance/';
const moment = require('moment-timezone');
exports.run = (client, message, args) => {

  let array = [];
  request(url, function(err, resp, body){
    $ = cheerio.load(body);
    links = $('a');
    $(links).each(function(i, link){
      let href = $(link).attr('href');
      if (href.match(/^\/[0-9].*\/$/g) != null){
        array.push(href);
      }
    });
    let newurl = 'https://news.fate-go.jp' + array[0];
    request(newurl, function(err, resp, body){
      $ = cheerio.load(body);
      let times = $('p:contains("日時")').text().match(/\S*\d+\S*/g).map(function (v) {return v;});
      let temp = times.pop().split("～");
      times.push.apply(times, temp);
      console.log(times);
      maintCalc(times, message, newurl);
    });
  });
};

function maintCalc(times, message, newurl) {
  let inMaint, beforeMaint, endMaint;
  let getUTC = Number(moment().unix()*1000);
  let sTime = `${times[0]} ${times[1]}`;
  let eTime = `${times[0]} ${times[2]}`;
  //console.log(sTime, eTime);
  moment.locale('ja');
  let m = moment(sTime, 'YYYY-MM-DD(ddd) hh:mm');
  let n = moment(eTime, 'YYYY-MM-DD(ddd) hh:mm');
  let offset = 32400000;
  let startTime = moment.tz(m, "Asia/Tokyo").format('x') - offset;
  let endTime = moment.tz(n, "Asia/Tokyo").format('x') - offset;

  //console.log(startTime, endTime);

  if (getUTC < endTime && getUTC < startTime)
  {
    beforeMaint = 1;
  }
  else if (getUTC < endTime && getUTC > startTime)
  {
    inMaint = 1;
  }
  else
  {
    endMaint = 1;
  }

  let elapsed_time = timeconverter(startTime, endTime, getUTC);
  if (beforeMaint){
    message.channel.send({
      "embed": {
        "title":"Scheduled JP FGO Maintenance",
        "description": `${newurl}\n` +
                       "Maintenance begins in " + elapsed_time[0] + " days, " + elapsed_time[1] + " hours, " + elapsed_time[2] + " minutes.\n" +
                       "Maintenance ends in " + elapsed_time[3] + " days, " + elapsed_time[4] + " hours, " + elapsed_time[5] + " minutes.\n",
        "color": 7347577,
        "image": {
        "url": randomImage(),
        },
      }
    }).catch(console.error);
  }

  else if (inMaint){
    message.channel.send({
      "embed": {
        "title":"Scheduled JP FGO Maintenance",
        "description": `${newurl}\n` +
                       "Maintenance has begun.\n" +
                       "Maintenance ends in " + elapsed_time[3] + " days, " + elapsed_time[4] + " hours, " + elapsed_time[5] + " minutes.\n",
        "color": 7347577,
        "image": {
        "url": randomImage(),
        },
      }
    }).catch(console.error);
  }
  else {
    message.channel.send({
      "embed": {
        "title":`The last maintenance was:\n${times[0]} ${times[1]} (JST)`,
        "description":`${newurl}\n`,
        "color": 7347577,
        "image": {
        "url": randomImage(),
        }
      }
    });
  }
}

function timeconverter(sTime, eTime, utc){
  //let utc = new Date().getTime();

  let time_diff_start = (sTime - utc);
  let time_diff_end = (eTime - utc);
  let s_secs = time_diff_start / 1000;
  let s_mins = Math.floor(s_secs / 60);
  let s_hours = Math.floor(s_mins / 60);
  let s_days = Math.floor(s_hours / 24);
  let e_secs = time_diff_end / 1000;
  let e_mins = Math.floor(e_secs / 60);
  let e_hours = Math.floor(e_mins / 60);
  let e_days = Math.floor(e_hours / 24);

  let time_until = [s_days, s_hours%24, s_mins%60, e_days, e_hours%24, e_mins%60];
  return time_until;
}

let answers = ["https://i.imgur.com/guwcFbn.jpg",
"https://i.imgur.com/PxNrk8U.jpg",
"https://i.imgur.com/TjLTF0Y.png",
"https://i.imgur.com/I4KCHvb.png",
"https://i.imgur.com/CGy0Ose.png",
"https://i.imgur.com/zCWPkTx.jpg",
"https://i.imgur.com/xYWzZYh.png",
"https://i.imgur.com/2HFXLdr.png",
"https://i.imgur.com/Zn3ko1c.jpg"]

function randomImage() {
  return answers[Math.floor(Math.random()*answers.length)];
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["maintjp"]
};

exports.help = {
  name: 'jpmaint',
  description: 'scrapes maintenance times from fgo website',
  usage: '!jpmaint'
};
