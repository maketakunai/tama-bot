module.exports = (client, message) => {

  if (message.author.bot) return;
  if (message.content.indexOf(client.config.prefix) !== 0) return;

  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if (command.match(/^[A-Za-z0-9]+$/g) == null){
    return;
  }

  if (!client.commands.get(command) && !client.commands.get(client.aliases.get(command))){
    message.channel.send(`Command ${command} does not exist. \`!help\` for a list of commands.`).then(m => m.delete(5000));
    return;
  }
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

  if (!cmd) return;
  cmd.run(client, message, args);

};
