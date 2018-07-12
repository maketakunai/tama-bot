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
          "value": "'!davinci (question)' to ask Da Vinci a yes or no question.\n" +
          "'!grails' to list current available grails.\n" +
          "'!goon (name)' to check if they are on the spreadsheet.\n" +
          "'!update' to reload my goonlist information.\n" +
          "'!servant (class) (servantname)' to look up servant information.\n" +
          "'!event' to see current event details.\n" +
          "'!gate' to see today's chaldea gate quests.\n" +
          "'!drops' to see the drop spreadsheet.\n" +
          "'!drops (item)' to search for a specific item in NA.\n" +
          "'!jpdrops (item)' to search for a specific item in JP.\n" +
          "'!maint' to see when maintenance will begin or end.\n" +
          "'!affinity' to see the servant affinity diagram.\n" +
          "'!exp' to see an experience chart for leveling your servants.\n" +
          "'!exp startlevel endlevel' to see # of cards required. ex)!exp 1 90\n" +
          "'!roll' to let me decide your gacha destiny.\n" +
          "'!omikuji (number)' to donate SQ to the shrine and receive a fortune.\n" +
          "'!yolo' to do a single gacha pull. '!yolo help' to see different banners.\n" +
          "'!stats' to see info about the bot itself.\n" +
          "'!rin (text)' to make rin say something."
        },
        {
          "name": "Fun Stuff",
          "value": "!apple, !dab, !ded, !gacha, !haha, !hungry, !illya, !look, !padoru, !party, !rateup, !senpai, !shock, !smug, !sumanai, !ticket, !umu, !wait, !warning, !whale, !yorokobe, !5stars",
        }
      ]
    }
  });
  return;
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["help"]
};
