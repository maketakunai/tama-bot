const Discord = require('discord.js');
const storyGrails = 10;
const storyGrails2 = 4;
const storyGrails3 = 2;
const eventGrails = 16;
const jpStoryGrails = 10;
const jpStoryGrails2 = 4;
const jpStoryGrails3 = 6;
const jpEventGrails = 38;
const naTotalGrails = storyGrails + storyGrails2 + storyGrails3 + eventGrails;
const jpTotalGrails = jpStoryGrails + jpStoryGrails2 + jpStoryGrails3 + jpEventGrails;


exports.run = async (client, message, args) => {
  const embed1 = new Discord.RichEmbed()
    .setColor('#FFFFFF')
    .setTitle('Grail Information for JP/NA')
    .setThumbnail('https://cirnopedia.org/fate-go/icons/item/item_006.png')
    .addField('Story (part 1)', `Total: ${jpStoryGrails}\nNA: ${storyGrails}`, true)
    .addField('Story (part 1.5)', `Total: ${jpStoryGrails2}\nNA: ${storyGrails2}`, true)
    .addField('Story (part 2)', `Total: ${jpStoryGrails3}\nNA: ${storyGrails3}`, true)
    .addField('Events', `Total: ${jpEventGrails}\nNA: ${eventGrails}`, true)
    .addField('Total Grails', `Total: ${jpTotalGrails}\nNA: ${naTotalGrails}`, true)

  const embed2 = new Discord.RichEmbed()
    .setColor('#FFFFFF')
    .setTitle('Event Grail List')
    .addField('Event Grails', `Halloween 2015\nDa Vinci\nFate/Zero Collaboration\nOnigashima\nSummer 2016\nHalloween 2016\nGudaGuda Meiji Restoration\nCCC Collaboration\nSummer 2017\nHalloween 2017\nValentine's 2018\nApocrypha Collaboration\nGudaGuda Imperial Capital\nSummer 2018 (x2)\n→ Battle in NY 2018 ←\nHalloween 2018 ONILAND\nChristmas 2018`, true)
    .addField(`(cont'd)`, `New Years 2019\nValentine's 2019\nCCC Rerun (+1)\nCBC 2019\nTokugawa Labyrinth\nCase Files Collaboration\nA Study at Meiho Manor\nGudaGuda Final Honnoji\nSummer 2019\nBattle in NY 2019\nSaber Wars II\nChristmas 2019\nNY 2020 Login Bonus\namazoness.com CEO Crisis\nValentine's 2020\nAeaean Spring Breeze\nRequiem Collaboration\nSummer Camp 2020 (x2)\nScathach GrailFront`, true)

  if (message.guild.me.hasPermission('MANAGE_MESSAGES')) {
    message.channel.send(embed1)
      .then(m => {
        m.react('▶');

        const filter1 = (reaction, user) => reaction.emoji.name === '▶' && user.id === message.author.id;
        const collector1 = m.createReactionCollector(filter1, { max: 10, time: 1 * 60 * 1000 }); // 5 min
        const filter2 = (reaction, user) => reaction.emoji.name === '◀' && user.id === message.author.id;
        const collector2 = m.createReactionCollector(filter2, { max: 10, time: 1 * 60 * 1000 }); // 5 min

        collector1.on('collect', async () => {
          await m.clearReactions()
          m.edit(embed2)
          m.react('◀')
          });
        collector2.on('collect', async () => {
          await m.clearReactions()
          m.edit(embed1)
          m.react('▶')
        });
    })
  }
  else {
    message.channel.send(embed1)
      .then(m => {
        m.react('▶');

        const filter1 = (reaction, user) => reaction.emoji.name === '▶' && user.id === message.author.id;
        const collector1 = m.createReactionCollector(filter1, { max: 10, time: 1 * 60 * 1000 }); // 5 min
        const filter2 = (reaction, user) => reaction.emoji.name === '◀' && user.id === message.author.id;
        const collector2 = m.createReactionCollector(filter2, { max: 10, time: 1 * 60 * 1000 }); // 5 min

        collector1.on('collect', () => {
          m.delete()
          m.channel.send(embed2)
          });

    })
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["grail"]
};

exports.help = {
  name: 'grails',
  description: `Shows currently available grails in NA/JP.`,
  usage: '!grails'
};
