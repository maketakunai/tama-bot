exports.run = (client, message, args) => {
  var eventExists, beforeEvent;
  var getUTC = new Date().getTime();
  var startTime = 1544605200*1000;
  var endTime = 1545710340*1000;
  var eventurl = "https://news.fate-go.jp/wp-content/uploads/2018/christmas2018_full_aqloj/top_banner.png";
  var eventname = "「クリスマス2018 ホーリー･サンバ･ナイト ～雪降る遺跡と少女騎士～」";

  if (getUTC < endTime && getUTC > startTime)
  {
    eventExists = 1;
  }
  else {eventExists = 0;}
  if (getUTC < startTime)
  {
    beforeEvent = 1;
  }
  else {beforeEvent = 0;}

  var to_begin = timeconverter(startTime);
  var elapsed_time = timeconverter(endTime);

  if (eventExists){
    message.channel.send({
      "embed": {
        "title":"The current event ends in " + elapsed_time[0] + " days, " + elapsed_time[1] + " hours, " + elapsed_time[2] + " minutes.",
        //"description": "You will regenerate " + elapsed_time[3] + " more AP and " + elapsed_time[4] + " more BP during this time.",
        "description": "You will regenerate " + elapsed_time[3] + " more AP during this time.",
        "color": 8817876,
        "image": {
        "url": eventurl,
        },
        "author": {
          "name": eventname,
        },
      }
    }).catch(console.error);
  }
  else if (beforeEvent) {
    message.channel.send({
      "embed": {
        "title":"The next event begins in " + to_begin[0] + " days, " + to_begin[1] + " hours, " + to_begin[2] + " minutes.",
        //"description": "You will regenerate " + elapsed_time[3] + " more AP and " + elapsed_time[4] + " more BP during this time.",
        //"description": "You will regenerate " + elapsed_time[3] + " more AP during this time.", `The next event, ${eventname} begins in ${to_begin[0]} days, ${to_begin[1]} hours, ${to_begin[2]} minutes.`
        "color": 8817876,
        "image": {
        "url": eventurl,
        },
        "author": {
          "name": eventname,
        },
      }
    }).catch(console.error);
  }
  else message.channel.send(`There is no currently ongoing event.`).catch(console.error);
}

function timeconverter(endTime){
  var utc = new Date().getTime();
  var eventEndTime = endTime;
  var time_diff = (eventEndTime - utc);
  var secs = time_diff / 1000;
  var mins = Math.floor(secs / 60);
  var hours = Math.floor(mins / 60);
  var days = Math.floor(hours / 24);
  var APRegen = Math.floor(mins / 5);
  var BPRegen = hours;
  var time_until = [days, hours%24, mins%60, APRegen, BPRegen];
  return time_until;
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["eventjp"]
};

exports.help = {
  name: 'jpevent',
  description: `Shows remaining time on event, as well as available AP until it's over.`,
  usage: '!jpevent'
};