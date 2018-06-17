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
      "image": {
      "url": "https://media.discordapp.net/attachments/328227014639091712/427398362502004746/image.jpg"
      },
      //"author": {
        //"name": "You KNOW nothing good ever comes from that! No way! No thank you!",
      //},
      "fields": [
        {
          "name": "You KNOW nothing good ever comes from that! No thank you!",
          "value": "http://www.ncpgambling.org/help-treatment/national-helpline-1-800-522-4700/"
        }
      ]
    }
  }).catch(console.error);
}
//message.channel.send("You KNOW nothing good ever comes from that! No way! No thank you!").catch(console.error);
//message.channel.send("http://www.ncpgambling.org/help-treatment/national-helpline-1-800-522-4700/").catch(console.error);

//https://media.discordapp.net/attachments/328227014639091712/427398362502004746/image.jpg
