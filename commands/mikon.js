/*exports.run = (client, message, args) => {
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
          "name": "List of Commands",
          "value": "'!davinci (question)' to ask Da Vinci a yes or no question.\n" +
          "'!grails' to list current available grails.\n" +
          "'!goon (name)' to search for a goon.\n" +
          "'!update' to reload goonlist info.\n" +
          "'!servant (class) (servantname)' to look up servant information.\n" +
          "'!event' to see current event details.\n" +
          "'!gate' to see today's chaldea gate quests.\n" +
          "'!drops' to see the drop spreadsheet.\n" +
          "'!drops (item)' to search for a specific item in NA.\n" +
          "'!jpdrops (item)' to search for a specific item in JP.\n" +
          "'!maint' to see when maintenance will begin or end.\n" +
          "'!exp startlevel endlevel' to see # of cards required. ex)!exp 1 90\n" +
          "'!roll' to let me decide your gacha destiny.\n" +
          "'!omikuji (number)' to donate SQ to the shrine and receive a fortune.\n" +
          "'!yolo' '!10roll' to roll the gacha. '!yolo help','!10roll help' for a list of banners.\n" +
          "'!stats' to see info about the bot itself.\n" +
          "'!rin (text)' to make rin say something.\n" +
          "'!invite' for an invite link."
        },
        {
          "name": "Fun Stuff",
          "value": "!apple, !dab, !ded, !gacha, !haha, !hungry, !illya, !look, !padoru, !party, !rateup, !senpai, !shock, !smug, !sumanai, !ticket, !umu, !wait, !warning, !whale, !yorokobe, !5stars",
        }
      ]
    }
  });
}*/

exports.run = (client, message, args) => {
  if (!args[0]) {
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
            "value": "affinity, event, gate, grails, drops, jpdrops, maint, exp, npdmg",
          },
          {
            "name": "SomethingAwful Community Stuff",
            "value": "goon, update",
          },
          {
            "name": "Gacha / Letting tamabot decide",
            "value": "10roll, yolo, roll, omikuji, davinci",
          },
          {
            "name": "Image reactions, memes, fun stuff",
            "value": "apple, bb, dab, ded, fes, gacha, haha, hungry, illya, look, mash, padoru, party, police, rateup, rin, senpai, shock, smug, sumanai, ticket, umu, wait, warning, whale, yorokobe, 5stars",
          },
          {
            "name": "Bot related stuff",
            "value": "invite, stats, ping"
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
