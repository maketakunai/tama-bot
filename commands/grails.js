var storyGrails = 10;
var storyGrails2 = 0;
var eventGrails = 6;
var jpStoryGrails1 = 10;
var jpStoryGrails2 = 4;
var jpStoryGrails3 = 3;
var jpEventGrails = 19;


exports.run = (client, message, args) => {
  message.channel.send({
    "embed": {
      "color": 2552420,
      "thumbnail": {
        "url": "https://cirnopedia.org/fate-go/icons/item/item_006.png"
      },
      "author": {
        "name": "Grail Information",
      },
      "fields": [
        {
          "name": "Grails obtained from clearing Story in JP (part 1)",
          "value": `${jpStoryGrails1}`,
        },
        {
          "name": "Grails obtained from clearing Story in JP (part 1.5)",
          "value": `${jpStoryGrails2}`,
        },
        {
          "name": "Grails obtained from clearing Story in JP (part 2)",
          "value": `${jpStoryGrails3}`,
        },
        {
          "name": "Grails obtained from clearing Events in JP",
          "value": `${jpEventGrails}`,
        },
        {
          "name": "Grails obtained from clearing Story in NA (part 1)",
          "value": `${storyGrails}`,
        },
        {
          "name": "Grails obtained from clearing Story in NA (part 1.5)",
          "value": `${storyGrails2}`,
        },
        {
          "name": "Grails obtained from clearing Events in NA",
          "value": `${eventGrails}`,
        },
        {
          "name": "Events that give grails",
          "value": "Halloween 2015\nDa Vinci\nFate/Zero Collaboration\nOnigashima\nSummer 2016\nHalloween 2016\nGudaGuda Meiji Ishin\nCCC Collaboration\nSummer 2017",
          "inline": true
        },
        {
          "name": "delicious grails",
          "value": "Halloween 2017\nValentine's 2018\nApocrypha Collaboration\nGudaGuda Teito Seihai Kitan\nSummer 2018 (x2)\nBattle in NY 2018\nHalloween 2018 ONILAND\nChristmas 2018\nNew Years 2019",
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
  usage: '!grail'
};
