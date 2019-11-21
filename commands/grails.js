let storyGrails = 10;
let storyGrails2 = 3;
let storyGrails3 = 0;
let eventGrails = 10;
let jpStoryGrails1 = 10;
let jpStoryGrails2 = 4;
let jpStoryGrails3 = 4;
let jpEventGrails = 29;


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
          "name": "Events that give grails",
          "value": `Halloween 2015\nDa Vinci\nFate/Zero Collaboration\nOnigashima\nSummer 2016\nHalloween 2016\nGudaGuda Meiji Restoration\nCCC Collaboration\nSummer 2017\n→ Halloween 2017 ←\nValentine's 2018\nApocrypha Collaboration\nGudaGuda Teito Seihai Kitan\nSummer 2018 (x2)\nBattle in NY 2018\nHalloween 2018 ONILAND\nChristmas 2018\nNew Years 2019\nValentine's 2019\nCCC Rerun (+1)\nCBC 2019\nTokugawa Labyrinth\nCase Files Collaboration\nA Study at Meiho Manor\nGudaGuda Final Honnoji\nSummer 2019\nBattle in NY 2019\nSaber Wars II`,
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
