const storyGrails = 10;
const storyGrails2 = 4;
const storyGrails3 = 1;
const eventGrails = 12;
const jpStoryGrails1 = 10;
const jpStoryGrails2 = 4;
const jpStoryGrails3 = 6;
const jpEventGrails = 34;
const naTotalGrails = storyGrails + storyGrails2 + storyGrails3 + eventGrails;
const jpTotalGrails = jpStoryGrails1 + jpStoryGrails2 + jpStoryGrails3 + jpEventGrails;


exports.run = (client, message, args) => {
  message.channel.send({
    "embed": {
      "color": 2552420,
      "thumbnail": {
        "url": "https://cirnopedia.org/fate-go/icons/item/item_006.png"
      },
      "author": {
        "name": "Grail Information for JP/NA",
      },
      "fields": [
        {
          "name": "Story (part 1)",
          "value": `Total: ${jpStoryGrails1}\nNA: ${storyGrails}`,
          "inline": true
        },
        {
          "name": "Story (part 1.5)",
          "value": `Total: ${jpStoryGrails2}\nNA: ${storyGrails2}`,
          "inline": true
        },
        {
          "name": "Story (part 2)",
          "value": `Total: ${jpStoryGrails3}\nNA: ${storyGrails3}`,
          "inline": true
        },
        {
          "name": "Event Grails",
          "value": `Total: ${jpEventGrails}\nNA: ${eventGrails}`,
          "inline": true
        },
        {
          "name": "Total Grails",
          "value": `Total: ${jpTotalGrails}\nNA: ${naTotalGrails}`,
          "inline": true
        },
        {
          "name": "Events that give grails",
          "value": `Halloween 2015\nDa Vinci\nFate/Zero Collaboration\nOnigashima\nSummer 2016\nHalloween 2016\nGudaGuda Meiji Restoration\nCCC Collaboration\nSummer 2017\nHalloween 2017\nValentine's 2018\n→ Apocrypha Collaboration ←\nGudaGuda Teito Seihai Kitan\nSummer 2018 (x2)\nBattle in NY 2018\nHalloween 2018 ONILAND\nChristmas 2018\nNew Years 2019\nValentine's 2019\nCCC Rerun (+1)\nCBC 2019\nTokugawa Labyrinth\nCase Files Collaboration\nA Study at Meiho Manor\nGudaGuda Final Honnoji\nSummer 2019\nBattle in NY 2019\nSaber Wars II\nChristmas 2019\nNY 2020 Login Bonus\namazoness.com CEO Crisis\nValentine's 2020\nAeaean Spring Breeze`,
          "inline": true
        }
      ]
    }
  }).catch(console.error);
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
