const moment = require('moment-timezone');

module.exports = client => {
  console.log(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`);
  client.user.setActivity('you play FGO. !mikon', {type: 'WATCHING'});
  let minutes = 5, interval = minutes * 60 * 1000;
  setInterval(function(){
    let today = new Date();
    let na_time = moment.tz(today, "America/Los_Angeles").format('MM/DD, HH:mm (z)');
    let jp_time = moment.tz(today, "Asia/Tokyo").format('MM/DD, HH:mm (z)');
    let na_serv_time = `🇺🇸 ${na_time}`;
    let jp_serv_time = `🇯🇵 ${jp_time}`;
    let guild = client.guilds.get('328226892798754819');
    let channel1 = guild.channels.get('716715814786564187');
    let channel2 = guild.channels.get('716715893341683784');
    channel1.setName(na_serv_time);
    channel2.setName(jp_serv_time);
  }, interval)
};
