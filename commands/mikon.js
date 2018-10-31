exports.run = (client, message, args) => {
  if (!args[0]) {
    var user = 69315674945617920;
    user = user.toString();
    var myname = client.users.get(user).username;
    var disc = client.users.get(user).discriminator;
    message.channel.send({
      "embed": {
        "color": 12093600,
        "thumbnail": {
          "url": "https://i.imgur.com/aMihBVQ.png"
        },
        "image": {
        "url": ""
        },
        "author": {
          "name": "Mikonー♪ Your reliable Shrine Maiden Fox is here to help!",
        },
        "fields": [
          {
            "name": "Learning how to use tamabot",
            "value": `Type \`!help [command]\` to get more info about a command.`,
          },
          {
            "name": "FGO Information",
            "value": "affinity, ce, event, jpevent, gate, grails, drops, jpdrops, maint, exp, npdmg, time, servant, riyo",
          },
          {
            "name": "SomethingAwful Community Stuff",
            "value": "goon, update, spreadsheet",
          },
          {
            "name": "Gacha / Letting tamabot decide",
            "value": "10roll, roll, omikuji, davinci",
          },
          {
            "name": "Image reactions, memes, fun stuff",
            "value": "apple, bb, dab, ded, fes, gacha, haha, hassan, hungry, illya, look, mash, ozy, padoru, party, police, rateup, rin, shock, smug, sumanai, ticket, umu, wait, warning, whale, wut, yorokobe, 5stars",
          },
          {
            "name": "Bot related stuff",
            "value": "invite, stats, ping"
          },
          {
            "name": "Creator",
            "value": `${myname}#${disc}. Let me know if you have any suggestions.`
          }
        ]
      }
    });
  } else {
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.channel.send(`= ${command.help.name} = \nDescription: ${command.help.description}\nUsage: ${command.help.usage}`, {code:'asciidoc'});
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["help"]
};

exports.help = {
  name: 'help/mikon',
  description: 'Displays all available commands.',
  usage: '!help [command], !mikon [command]'
};
