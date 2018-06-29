const Discord = require("discord.js");
const config = require("./config.json");
const fs = require("fs");
const Enmap = require("enmap");

const client = new Discord.Client();

client.config = config;

fs.readdir("./events", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.commands = new Enmap();
client.aliases = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, commandName);
    })
  });
});

client.login(config.token);
