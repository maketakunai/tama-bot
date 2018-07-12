# tama-bot
A Discord bot for Fate/Goon Order, using discord.js

## Getting Started
`npm install` to get necessary packages.
You'll need to make your own config.json that contains the following keys:
```
{
  "token" : your bot token goes here
  "prefix" : prefix for bot commands goes here
  "spreadsheet" : google spreadsheet ID goes here
  "creds" : json filename of google spreadsheet api key
  "plotlyuser" : username of plotly account
  "plotlyapikey" : plotly api key goes here
}
```
`spreadsheet` and `creds` are only necessary if you want to use the goonsearch command.

The `plotly` stuff is only necessary if you want to show yolo gacha stats.

## Commands
To make a new command, create a commandname.js file in the commands folder.
