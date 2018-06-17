var storyGrails = 6;
var eventGrails = 3;
var jpStoryGrails1 = 10;
var jpStoryGrails2 = 4;
var jpStoryGrails3 = 1;
var jpEventGrails = 12;
//exports.run = (client, message, args) => {
  //  message.channel.send(`If you've been playing since launch in NA, there are ${storyGrails+eventGrails} grails available (${storyGrails} story, ${eventGrails} event).`).catch(console.error);
//}

exports.run = (client, message, args) => {
  message.channel.send({
    "embed": {
      //"title": "mm/dd/yyyy to mm/dd/yyyy",
      //"description": "time remaining: x days, y hours, z minutes",
      //"url": "https://discordapp.com",
      "color": 2552420,
      "thumbnail": {
        "url": "https://cirnopedia.org/fate-go/icons/item/item_006.png"
      },
      //"image": {
      //"url": "https://webview.fate-go.us/wp-content/uploads/2018/03/0307_singularity_pu/banner_00006.png"
      //},
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
          "name": "Grails obtained from clearing Story in NA",
          "value": `${storyGrails}`,
        },
        {
          "name": "Grails obtained from clearing Events in NA",
          "value": `${eventGrails}`,
        },
        /*
        {
          "name": "Events that give grails",
          "value": "Halloween 2015\nDa Vinci\nFate/Zero Collaboration\nOnigashima\nSummer 2016\nHalloween 2016\nGudaGuda Meiji Ishin\n"+
                   "CCC Collaboration\nSummer 2017\nHalloween 2017\nValentine's 2017"
        },*/
        {
          "name": "Events that give grails",
          "value": "Halloween 2015\nDa Vinci\nFate/Zero Collaboration\nOnigashima\nSummer 2016\nHalloween 2016",
          "inline": true
        },
        {
          "name": "delicious grails",
          "value": "GudaGuda Meiji Ishin\nCCC Collaboration\nSummer 2017\nHalloween 2017\nValentine's 2018\nApocrypha Collaboration",
          "inline": true
        }
      ]
    }
  }).catch(console.error);
}
