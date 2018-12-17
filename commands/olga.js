const snek = require('snekfetch');
const Canvas = require('canvas-prebuilt');
const wrap = require('word-wrapper');

exports.run = (client, message, args) => {
  snek.get('https://i.imgur.com/Rca9Uhj.jpg').then(r => {
    const canvas = new Canvas(500, 280);
    const ctx = canvas.getContext('2d');
    const img_bg = new Canvas.Image();
    ctx.font = "bold 18px Arial";

    for (let i = 0; i < args.length; i++){
      if (args[i] == message.mentions.members.first()) args[i] = message.mentions.members.first().displayName;
      console.log(args[i]);
    }
    args = args.join(' ');
    args = `${args}`.trim();

    var text = wrap(args, {width: 50});
    var lines = text.split(/\r|\r\n|\n/);
    var count = lines.length;

    img_bg.onload = function () {
      ctx.drawImage(img_bg, 0, 0, 500, 280);
      const y = 260 - count*16;
      const x = 250 - ctx.measureText(text).width / 2;
      ctx.lineWidth = 3;
      ctx.strokeText(text, x, y);
      ctx.fillStyle = "white";
      ctx.fillText(text, x, y);
      message.channel.send({
      files: [{attachment: canvas.toBuffer()}]
      }).catch(console.error);
    };
    img_bg.src = r.body;
  });
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'olga',
  description: 'will superimpose your text onto a picture of olga.',
  usage: 'olga [insert text here]'
};



