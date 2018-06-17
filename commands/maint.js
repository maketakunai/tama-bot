exports.run = (client, message, args) => {
  var inMaint, beforeMaint, endMaint;
  var getUTC = Number(new Date().getTime());
  var startTime = 1528948800*1000;
  var endTime = 1528959600*1000;
  if (getUTC < endTime && getUTC < startTime)
  {
    beforeMaint = 1;
    //console.log("before");
  }
  else if (getUTC < endTime && getUTC > startTime)
  {
    inMaint = 1;
    //console.log("during");
  }
  else
  {
    endMaint = 1;
    //console.log("after");
  }


  var elapsed_time = timeconverter(startTime, endTime);
  //console.log(elapsed_time, beforeMaint, inMaint, endMaint);
  //var estdamage3bp = Math.round(Math.floor(elapsed_time[4] / 3) * Number(args[1])/1000000*10)/10;
  //var estdamage2bp = Math.floor(elapsed_time[4] / 2);// * 1000000;
  //var bp3runs = Math.floor(elapsed_time[4] / 3);
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
        //"author": {
          //"name": "Maintenance",
        //},
      }
    }).catch(console.error);
  }
  //else message.channel.send("There is no currently ongoing event.").catch(console.error);
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
        //"author": {
          //"name": "Maintenance",
        //},
      }
    }).catch(console.error);
  }
  else {
    message.channel.send("Maintenance has ended.").catch(console.error);
  }
}
/*
exports.run = (client, message, args) => {
  var elapsed_time = timeconverter();
  message.channel.send({file:"https://webview.fate-go.us/wp-content/uploads/2018/03/0307_training_ap_half/banner_101141854.png"});
  message.channel.send("The current event is **Training Grounds AP Cost 1/2**, and it ends in " + elapsed_time[0] + " days, " + elapsed_time[1] + " hours, " + elapsed_time[2] + " minutes.").catch(console.error);
  message.channel.send("You will regenerate " + elapsed_time[3] + " more AP during this time.").catch(console.error);
}
*/


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
