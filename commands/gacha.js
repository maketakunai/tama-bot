exports.run = (client, message, args) => {
  message.channel.send({
    "embed": {
      "color": 16777215,
      "image": {
      "url": "https://media.discordapp.net/attachments/328227014639091712/427398362502004746/image.jpg"
      },
      "fields": [
        {
          "name": "You KNOW nothing good ever comes from that! No thank you!",
          "value": "http://www.ncpgambling.org/help-treatment/national-helpline-1-800-522-4700/"
        }
      ]
    }
  }).catch(console.error);
}
