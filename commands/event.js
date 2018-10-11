exports.run = (client, message, args) => {
  var eventExists;
  var getUTC = new Date().getTime();
  var startTime = 1538636400*1000;
  var endTime = 1539835140*1000;

  if (getUTC < endTime && getUTC > startTime)
  {
    eventExists = 1;
  }
  else {eventExists = 0;}

  var elapsed_time = timeconverter(endTime);

  if (eventExists){
    message.channel.send({
      "embed": {
        "title":"The current event ends in " + elapsed_time[0] + " days, " + elapsed_time[1] + " hours, " + elapsed_time[2] + " minutes.",
        //"description": "You will regenerate " + elapsed_time[3] + " more AP and " + elapsed_time[4] + " more BP during this time.",
        "description": "You will regenerate " + elapsed_time[3] + " more AP during this time.",
        "color": 8817876,
        "image": {
        "url": "https://fate-go.us/images/event_20181017.png",
        },
        "author": {
          "name": "Revival: The Adventure of Singing Pumpkin Castle - Mad Party 2017 - Lite",
        },
      }
    }).catch(console.error);
  }
  else message.channel.send("There is no currently ongoing event.").catch(console.error);
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
  aliases: []
};

exports.help = {
  name: 'event',
  description: `Shows remaining time on event, as well as available AP until it's over.`,
  usage: '!event'
};
