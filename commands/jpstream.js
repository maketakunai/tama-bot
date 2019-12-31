const request = require('request');
const cheerio = require('cheerio');
const url = 'https://news.fate-go.jp/';
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
      let times = $('p:contains("配信日時")').text().match(/\S*\d+\S*/g).map(function (v) {return v;});
      let temp = times.pop().split("～");
      times.push.apply(times, temp);
      console.log(times);
      maintCalc(times, message, newurl);
    });
  });
};

function maintCalc(times, message, newurl) {
  let beforeStream = 0
  let getUTC = Number(moment().unix()*1000);
  let sTime = `${times[0]} ${times[1].substring(5,10)}`;
  console.log(getUTC, sTime);
  moment.locale('ja');
  let m = moment(sTime, 'YYYY-MM-DD(ddd) hh:mm');
  let offset = 32400000;
  let startTime = moment.tz(m, "Asia/Tokyo").format('x') - offset;

  console.log(startTime);

  if (getUTC < startTime)
  {
    beforeStream = 1;
  }

  let elapsed_time = timeconverter(startTime, getUTC);
  if (beforeStream){
    message.channel.send({
      "embed": {
        "title":"FGO JP Stream",
        "description": `${newurl}\n` +
                       "Stream begins in " + elapsed_time[0] + " days, " + elapsed_time[1] + " hours, " + elapsed_time[2] + " minutes.\n",
        "color": 16711680
      }
    }).catch(console.error);
  }
  else {
    message.channel.send({
      "embed": {
        "title":`The last stream link was:`,
        "description":`${newurl}\n`,
        "color": 16711680
      }
    });
  }
}

function timeconverter(sTime, utc){
  //let utc = new Date().getTime();

  let time_diff_start = (sTime - utc);
  let s_secs = time_diff_start / 1000;
  let s_mins = Math.floor(s_secs / 60);
  let s_hours = Math.floor(s_mins / 60);
  let s_days = Math.floor(s_hours / 24);

  let time_until = [s_days, s_hours%24, s_mins%60];
  return time_until;
}


function randomImage() {
  return answers[Math.floor(Math.random()*answers.length)];
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["streamjp", "stream"]
};

exports.help = {
  name: 'jpstream',
  description: 'scrapes stream time from fgo news page',
  usage: '!jpstream'
};
