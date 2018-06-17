exports.run = (client, message, args) => {
  message.channel.send({
    "embed": {
      //"title": "List of Commands",
      //"description": "asdf",
      //"url": "http://www.ncpgambling.org/help-treatment/national-helpline-1-800-522-4700/",
      "color": 16777215,
      //"thumbnail": {
        //"url": "https://i.imgur.com/aMihBVQ.png"
      //},
      //"image": {
      //"url": "https://media.discordapp.net/attachments/328227014639091712/427398362502004746/image.jpg"
      //},
      //"author": {
        //"name": "You KNOW nothing good ever comes from that! No way! No thank you!",
      //},
      "fields": [
        {
          "name": "FGO Servers & Events",
          "value": ":flag_jp: 13M DL Celebration (5/30-6/13)\n"+
                   ":flag_us: Journey to the West (5/31-6/13)\n"+
                   ":flag_cn: Fate/Extra CCC Collaboration Pre-Event (6/4-6/18)\n"+
                   ":flag_tw: Halloween I Rerun (6/8-6/22)\n"+
                   ":flag_kr: Fate: Accel Zero Order (6/5-6/26)"
        }
      ]
    }
  }).catch(console.error);
}


//":flag_jp: GudaGuda Meiji Ishin Rerun (5/18-5/30)\n:flag_us: Rashomon (5/16-5/30)\n:flag_tw: NeroFest Once More (5/24-6/8)\n:flag_kr: Da Vinci (5/23-6/2)"
