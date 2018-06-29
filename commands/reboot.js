exports.run = async (client, message, args) => {
  const commandUnloads = client.commands.filter(c=>!!c.db).array();
  for(const c of commandUnloads) {
    await c.db.close();
  }
  process.exit(1);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};
