exports.run = (client, message, args) => {
  message.channel.send("Ping?").then(m => m.edit(`Mikon! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms.`) );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'ping',
  description: `ping pong mikon`,
  usage: '!ping'
};
