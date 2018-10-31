exports.run = (client, message, args) => {
  let link = "https://docs.google.com/spreadsheets/d/1SL8s8nFWAji0MEOX3UspLVrCChyLGtO-CRhMezzAKmg";
  message.channel.send(link).catch(console.error);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'spreadsheet',
  description: `A spreadsheet link.`,
  usage: '!spreadsheet'
};
