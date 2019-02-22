exports.run = (client, message, args) => {
  let eventExists, beforeEvent;
  let getUTC = new Date().getTime();
  let startTime = 1549443600*1000;
  let endTime = 1550635140*1000;
  let eventurl = "https://news.fate-go.jp/wp-content/uploads/2019/valentine2019_ifdlq/top_banner.png";
  let eventname = "「バレンタイン2019 ボイス＆レター･これくしょん！～紫式部と7つの呪本～」";

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

  let to_begin = timeconverter(startTime);
  let elapsed_time = timeconverter(endTime);

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
  let utc = new Date().getTime();
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
  description: `Shows remaining time on event, as well as available AP until it's over.`,
  usage: '!jpevent'
};
