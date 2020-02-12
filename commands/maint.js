const request = require('request');
const cheerio = require('cheerio');
const url = 'https://webview.fate-go.us/iframe/maintenance/';
const moment = require('moment-timezone');
exports.run = (client, message, args) => {

  let array = [];
  request(url, function(err, resp, body){
    $ = cheerio.load(body);
    links = $('a');
    $(links).each(function(i, link){
      let href = $(link).attr('href');
      array.push(href);
    });
    //console.log(array);
    let newurl = 'https://webview.fate-go.us' + array[0];
    request(newurl, function(err, resp, body){
      $ = cheerio.load(body);
      let times = $('p:contains("Date & Time")').text().match(/\S*\d+\S*/g).map(function (v) {return v;});
      maintCalc(times, message, newurl);
    });
  });
};

function maintCalc(times, message, newurl) {
  let inMaint, beforeMaint, endMaint;
  let getUTC = Number(moment().unix()*1000);
  //if dumb NA maintenance changes their end time to TBD do this instead of crashing
  if (!times[2]) {
    message.channel.send({
      "embed": {
        "color": 8817876,
        "title":`The maintenance on ${times[0]} ${times[1]} has probably been extended.`,
        "description": `${newurl}`,
        "image": {
        "url": randomImage(),
        }
      }
    });
    return;
  }
  //silly NA team and their silly non-ISO time formatting making me do more work
  if (times[2].search('2020-') == -1){
    times[2] = '2020-' + times[2];
  }
  if (times[3].length != 5){
    times[3] = '0'+times[3];
  }
  let sTime = `${times[0]} ${times[1]}`;
  let eTime = `${times[2]} ${times[3]}`;
  //console.log(sTime, eTime);
  let startTime = moment.tz(sTime, "America/Los_Angeles").format('x');
  let endTime = moment.tz(eTime, "America/Los_Angeles").format('x');
  //console.log(startTime, endTime, getUTC);

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

  let elapsed_time = timeconverter(startTime, endTime);
  if (beforeMaint){
    message.channel.send({
      "embed": {
        "title":`Scheduled FGO Maintenance\n${sTime} to ${eTime} (PDT)`,
        "description": `${newurl}\n` +
                       "Maintenance begins in " + elapsed_time[0] + " days, " + elapsed_time[1] + " hours, " + elapsed_time[2] + " minutes.\n" +
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
        "title":`Scheduled FGO Maintenance\n${sTime} to ${eTime} (PDT)`,
        "description": `${newurl}\n` +
                       "Maintenance has begun.\n" +
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
        "title":`The last maintenance was:\n${sTime} to ${eTime} (PDT)`,
        "description": `${newurl}`,
        "image": {
        "url": randomImage(),
        }
      }
    });
  }
}

function timeconverter(sTime, eTime){
  let utc = new Date().getTime();

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
  aliases: []
};


exports.help = {
  name: 'maint',
  description: `Lets you know when maintenance is going to start/finish.`,
  usage: '!maint'
};
