exports.run = (client, message, args) => {
  var inMaint, beforeMaint, endMaint;
  var getUTC = Number(new Date().getTime());
  var startTime = 1531006200*1000;
  var endTime = 1531009800*1000;
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
        "title":"Scheduled FGO Maintenance",
        "description": "Maintenance begins in " + elapsed_time[0] + " days, " + elapsed_time[1] + " hours, " + elapsed_time[2] + " minutes.\n" +
                       "Maintenance ends in " + elapsed_time[3] + " days, " + elapsed_time[4] + " hours, " + elapsed_time[5] + " minutes.\n",
        "color": 8817876,
        "image": {
        "url": "https://i.imgur.com/guwcFbn.jpg",
        },
      }
    }).catch(console.error);
  }

  else if (inMaint){
    message.channel.send({
      "embed": {
        "title":"Scheduled FGO Maintenance",
        "description": "Maintenance has begun.\n" +
                       "Maintenance ends in " + elapsed_time[3] + " days, " + elapsed_time[4] + " hours, " + elapsed_time[5] + " minutes.\n",
        "color": 8817876,
        "image": {
        "url": "https://i.imgur.com/guwcFbn.jpg",
        },
      }
    }).catch(console.error);
  }
  else {

    message.channel.send({
      "embed": {
        "image": {
        "url": "https://i.imgur.com/guwcFbn.jpg",
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

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};
