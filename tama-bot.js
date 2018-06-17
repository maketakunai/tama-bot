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

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.login(config.token);
/*
time = Date.now();
taken = Date.now() - time;
time += taken;
console.log('Logging in Discord...');

client.on('ready', () => {
  taken = Date.now() - time;
  console.log(`Logging in took me ${taken}ms`);
  console.log(`Ready to serve in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);
  client.user.setActivity('you play FGO. !mikon', {type: 'WATCHING'})
    .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
    .catch(console.error);
  //console.log(client.guilds);
});

client.on('disconnected', () => {
  console.log(`Client disconnected`);
  time = Date.now();
})

client.on("message", message => {

  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
      let commandFile = require(`./commands/${command}.js`);
      commandFile.run(client, message, args);
    } catch (err) {
      reject(err);
    } finally {
      return;
    }

});

*/
