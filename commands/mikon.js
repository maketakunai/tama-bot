exports.run = (client, message, args) => {
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
          "value": "'!grails' to list current available grails.\n" +
          "'!goon (name)' to check if they are on the spreadsheet.\n" +
          "'!update' to reload my goonlist information. Please be patient! It takes a little while.\n" +
          "'!servant (class) (servantname)' to look up servant information.\n" +
          "'!event' to see current event details.\n" +
          //"'!banner' to see current gacha banner details.\n" +// '!banner next' for next.\n" +
          "'!gate' to see today's chaldea gate quests.\n" +
          "'!drops' to see the drop spreadsheet.\n" +
          "'!drops (item)' to search for a specific item in NA.\n" +
          "'!jpdrops (item)' to search for a specific item in JP.\n" +
          "'!fgo' to see what event each version of FGO is running.\n" +
          "'!maint' to see when maintenance will begin or end.\n" +
          "'!affinity' to see the servant affinity diagram.\n" +
          "'!exp' to see an experience chart for leveling your servants.\n" +
          "'!exp startlevel endlevel' to see # of cards required. ex)!exp 1 90\n" +
          "'!roll' to let me decide your gacha destiny.\n" +
          "'!omikuji (number)' to donate SQ to the shrine and receive a fortune."
        },
        {
          "name": "Fun Stuff",
          "value": "!apple, !dab, !ded, !gacha, !haha, !hungry, !illya, !look, !padoru, !party, !rateup, !senpai, !smug, !sumanai, !ticket, !umu, !wait, !warning, !whale, !yorokobe, !5stars",
        }
      ]
    }
  }).catch(console.error);
}
