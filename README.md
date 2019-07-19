# tama-bot
A node.js Discord bot for Fate/Goon Order. Serves up game info, memes, and friend info. It uses [discord.js](https://github.com/discordjs/discord.js).

Command handler adapted from the [Idiot's Guide](https://anidiots.guide/).

Currently uses `master.js` from [kazemai](https://github.com/KazeMai/fgo-vz/blob/gh-pages/common/js/master.js) dumped into a json for mats lookup.

Data for CEs and servants are mostly from [Cirnopedia](https://fate-go.cirnopedia.org/).

Images from the gacha pool are from [wikia](https://fategrandorder.fandom.com/wiki/Fate/Grand_Order_Wikia) and Cirnopedia. A python script to resize images and overlay star borders onto CE images can be found in the `tools` folder.

## Getting Started
`npm install` to get necessary packages.
You'll need to make your own config.json in the root directory that contains the following keys:
```
{
  "token" : your bot token goes here
  "prefix" : prefix for bot commands goes here
  "spreadsheet" : google spreadsheet ID goes here
  "creds" : json filename of google spreadsheet api key
  "plotlyuser" : username of plotly account
  "plotlyapikey" : plotly api key goes here
  "nadrops" : google spreadsheet ID of NA drops
  "jpdrops" : google spreadsheet ID of JP drops
}
```
To simplify things in the beginning, omit everything aside from `token` and `prefix` and the commands that use the other keys. You'll need to go to the Discord developer portal and generate your own unique bot token.

`spreadsheet` and `creds` are only necessary if you want to use the goonsearch command.

The `plotly` stuff is only necessary if you want to show 10roll stats. The lucky bag gacha pool kind of screws up the stats when added in, so maybe this isn't so useful a lot of the time.

For `nadrops` and `jpdrops`, I created my own version of the drop sheet that is easier to dump into a json. You'll need `creds` if you want to use something like this as well.

## Command template
To make a new command, create a `command_name.js` file in the `commands` folder.
A simple command template is shown below:
```
exports.run = (client, message, args) => {
  message.channel.send("this is a template").catch(console.error);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["mycmd"]
};

exports.help = {
  name: 'mycommand',
  description: 'description goes here',
  usage: '!mycommand'
};
```
If a user types `!help mycommand` the bot should then spit out what you have under `exports.help`.

## Running the Bot
`node tama-bot.js`

I use [`pm2`](https://www.npmjs.com/package/pm2) to manage the bot process on my server.

## To-do, to-fix
A more comprehensive list of issues can be found [here](https://trello.com/b/FNtraPv8/tamabot)
* Fix use of `canvas-prebuilt`
* Ugly spikes in canvas font rendering for the image memes
* Need to rewrite some of the more janky earlier commands
