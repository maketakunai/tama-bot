const request = require('request');
const cheerio = require('cheerio');
const url = 'https://webview.fate-go.us/iframe/maintenance/';
const moment = require('moment-timezone');
exports.run = (client, message, args) => {

  var array = [];
  request(url, function(err, resp, body){
    $ = cheerio.load(body);
    links = $('a');
    $(links).each(function(i, link){
      var href = $(link).attr('href');
      array.push(href);
    });
    console.log(array);
    var newurl = 'https://webview.fate-go.us' + array[0];
    request(newurl, function(err, resp, body){
      $ = cheerio.load(body);
      var times = $('p:contains("Date & Time")').text().match(/\S*\d+\S*/g).map(function (v) {return v;});
      maintCalc(times, message);
    });
  });
};

function maintCalc(times, message) {
  var inMaint, beforeMaint, endMaint;
  var getUTC = Number(moment().unix()*1000);
  var sTime = `${times[0]} ${times[1]}`;
  var eTime = `${times[2]} ${times[3]}`;
  var startTime = moment.tz(sTime, "America/Los_Angeles").format('x');
  var endTime = moment.tz(eTime, "America/Los_Angeles").format('x');
  console.log(startTime, endTime, getUTC);

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

  var elapsed_time = timeconverter(startTime, endTime);
  if (beforeMaint){
    message.channel.send({
      "embed": {
        "title":`Scheduled FGO Maintenance\n${sTime} to ${eTime} (PST)`,
        "description": "Maintenance begins in " + elapsed_time[0] + " days, " + elapsed_time[1] + " hours, " + elapsed_time[2] + " minutes.\n" +
                       "Maintenance ends in " + elapsed_time[3] + " days, " + elapsed_time[4] + " hours, " + elapsed_time[5] + " minutes.\n",
        "color": 8817876,
        "image": {
        "url": randomImage(),
        },
      }
    }).catch(console.error);
  }

  else if (inMaint){
    message.channel.send({
      "embed": {
        "title":`Scheduled FGO Maintenance\n${sTime} to ${eTime} (PST)`,
        "description": "Maintenance has begun.\n" +
                       "Maintenance ends in " + elapsed_time[3] + " days, " + elapsed_time[4] + " hours, " + elapsed_time[5] + " minutes.\n",
        "color": 8817876,
        "image": {
        "url": randomImage(),
        },
      }
    }).catch(console.error);
  }
  else {
    message.channel.send({
      "embed": {
        "color": 8817876,
        "title":`The last maintenance was:\n${sTime} to ${eTime} (PST)`,
        "image": {
        "url": randomImage(),
        }
      }
    });
  }
}

function timeconverter(sTime, eTime){
  var utc = new Date().getTime();

  var time_diff_start = (sTime - utc);
  var time_diff_end = (eTime - utc);
  var s_secs = time_diff_start / 1000;
  var s_mins = Math.floor(s_secs / 60);
  var s_hours = Math.floor(s_mins / 60);
  var s_days = Math.floor(s_hours / 24);
  var e_secs = time_diff_end / 1000;
  var e_mins = Math.floor(e_secs / 60);
  var e_hours = Math.floor(e_mins / 60);
  var e_days = Math.floor(e_hours / 24);

  var time_until = [s_days, s_hours%24, s_mins%60, e_days, e_hours%24, e_mins%60];
  return time_until;
}

var answers = ["https://i.imgur.com/guwcFbn.jpg",
"https://i.imgur.com/rqeRG1m.jpg",
"https://i.imgur.com/jSriYCP.jpg",
"https://i.imgur.com/RXeKUL7.jpg",
"https://i.imgur.com/nMrE5J9.jpg",
"https://i.imgur.com/zCWPkTx.jpg",
"https://i.imgur.com/IVS0B6Z.jpg",
"https://i.imgur.com/N0yP6JQ.jpg"]

function randomImage() {
  return answers[Math.floor(Math.random()*answers.length)];
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};


exports.help = {
  name: 'maint',
  description: `Lets you know when maintenance is going to start/finish.`,
  usage: '!maint'
};
