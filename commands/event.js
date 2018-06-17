exports.run = (client, message, args) => {
  var eventExists;
  var getUTC = new Date().getTime();
  var endTime = 1530158340*1000;

  if (getUTC < endTime)
  {
    eventExists = 1;
  }
  else {eventExists = 0;}


  var elapsed_time = timeconverter(endTime);
  //var estdamage3bp = Math.round(Math.floor(elapsed_time[4] / 3) * Number(args[1])/1000000*10)/10;
  //var estdamage2bp = Math.floor(elapsed_time[4] / 2);// * 1000000;
  //var bp3runs = Math.floor(elapsed_time[4] / 3);
  /*
  if (eventExists && args.length == 2 && args[0] == 3 && Number(args[1]) >= 0 && Number(args[1]) <= 6000000){
    message.channel.send({
      "embed": {
        "title":"The current event ends in " + elapsed_time[0] + " days, " + elapsed_time[1] + " hours, " + elapsed_time[2] + " minutes.",
        "description": "You will regenerate " + elapsed_time[3] + " more AP during this time."
        "color": 8817876,
        "image": {
        "url": "https://webview.fate-go.us/wp-content/uploads/2018/05/0514_rashomon/banner_20180530.png",
        },
        "author": {
          "name": "Challenge Event! The Demonic Capital: Rashomon",
        },
      }
    }).catch(console.error);
  }*/
  //else message.channel.send("There is no currently ongoing event.").catch(console.error);
  if (eventExists){
    message.channel.send({
      "embed": {
        "title":"The current event ends in " + elapsed_time[0] + " days, " + elapsed_time[1] + " hours, " + elapsed_time[2] + " minutes.",
        "description": "You will regenerate " + elapsed_time[3] + " more AP and " + elapsed_time[4] + " more BP during this time.",
        "color": 8817876,
        "image": {
        "url": "https://webview.fate-go.us/wp-content/uploads/2018/06/0613_onigashima/banner_20180627.png",
        },
        "author": {
          "name": "The Great Tale of Demons: Onigashima",
        },
      }
    }).catch(console.error);
  }
  else message.channel.send("There is no currently ongoing event.").catch(console.error);
}
/*
exports.run = (client, message, args) => {
  var elapsed_time = timeconverter();
  message.channel.send({file:"https://webview.fate-go.us/wp-content/uploads/2018/03/0307_training_ap_half/banner_101141854.png"});
  message.channel.send("The current event is **Training Grounds AP Cost 1/2**, and it ends in " + elapsed_time[0] + " days, " + elapsed_time[1] + " hours, " + elapsed_time[2] + " minutes.").catch(console.error);
  message.channel.send("You will regenerate " + elapsed_time[3] + " more AP during this time.").catch(console.error);
}
*/


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
