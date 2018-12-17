const servantList = require("../db/servantdb.json")
const newList = require("../db/new_servdb.json")
const dmgList = require("../db/npdamage.json")
const emoji = require("../db/emoji.json")
const skills = require("../db/skills.json")

exports.run = (client, message, args) => {
      message.channel.send({
        "embed": {
          "color": 8817876,
          "thumbnail": {
            "url": `${servantList[231]["image"]}`
          },
          "image": {
          "url": ""
          },
          "author": {
            "name": `${servantList[231]["name"]}`
          },
          "fields": [
            {
              "name": `${skills[631].image} ${skills[631].engname}`,
              "value": `Cooldown: ${skills[631].cooldown} turns  |  Target: ${skills[631].target}\n${skills[631].effects}`,
            },
            /*
            {
                "name":"Lvl 1",
                "value":`${skills[631].lv1}`,
                inline: true,
            },
            {
                "name":"Lvl 6",
                "value":`${skills[631].lv6}`,
                inline: true,
            },
            {
                "name":"Lvl 10",
                "value":`${skills[631].lv10}`,
                inline: true,
            },*/
            {
                "name": `${skills[632].image} ${skills[632].engname}`,
                "value": `Cooldown: ${skills[632].cooldown} turns  |  Target: ${skills[632].target}\n${skills[632].effects}`,
            },
            {
                "name": `${skills[633].image} ${skills[633].engname}`,
                "value": `Cooldown: ${skills[633].cooldown} turns  |  Target: ${skills[633].target}\n${skills[633].effects}`,
            }
          ]
        }
      }).catch(console.error);
    }



exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'npdmg',
  description: `Shows NP damage for a particular servant.`,
  usage: '!npdmg [class] [servantname]'
};
