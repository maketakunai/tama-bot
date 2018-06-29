exports.run = (client, message, args) => {
  message.channel.send("```Jun 30 misc. updates:\nUpdated NP damage to include latest servants from GudaGuda3.\nUpdated NA drops to add Camelot stages.\nAdded aliases for commands.\nHosting changed to AWS.```");
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["changes"]
};
