const moment = require('moment-timezone');

exports.run = (client, message, args) => {
  var NAserver = moment.tz("America/Los_Angeles");
  var JPserver = NAserver.clone().tz("Asia/Tokyo");
  message.channel.send(":flag_us: (PST) " + NAserver.format('MMMM Do, HH:mm:ss') + "\nDaily reset @ 16:00 PST. Login rewards @ 20:00 PST.\n:flag_jp: (JST) " + JPserver.format('MMMM Do, HH:mm:ss') + "\nDaily reset @ 00:00 JST. Login rewards @ 04:00 JST. News posts @ 18:00 JST.");
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'time',
  description: 'Displays the server times for NA and JP.',
  usage: '!time'
};
