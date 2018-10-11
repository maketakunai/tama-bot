exports.run = (client, message, args) => {
  var getUTC = new Date().getTime();
  var calcJST = getUTC + (3600000*9); //9 hour offset for jp
  var calcPDT = getUTC - (3600000*7);
  let newdateJP = new Date(calcJST);
  let newdatePDT = new Date(calcPDT);
  message.channel.send(":flag_us: (PDT) " + newdatePDT.toLocaleString('en-US', { hour12: false }) + "\nLogin rewards @ 21:00 PDT. FP roll @ 17:00 PDT.\n:flag_jp: (JST) " + newdateJP.toLocaleString('en-US', { hour12: false }) + "\nLogin rewards @ 04:00 JST. FP roll @ 00:00 JST. News posts @ 18:00 JST.");
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
