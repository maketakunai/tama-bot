const snek = require('snekfetch');
const Canvas = require('canvas-prebuilt');
const wrap = require('word-wrapper');

exports.run = (client, message, args) => {
  snek.get('https://i.imgur.com/N7SbKif.jpg').then(r => {
    const canvas = new Canvas(667, 375);
    const ctx = canvas.getContext('2d');
    const img_bg = new Canvas.Image();
    ctx.font = '18px "FOT\-Fate_Go Skip"';

    var fsize = 18;
    if (args[0] === '-fs' || args[0] === 'fs' || args[0] === '--fs') {
      args.shift();
      ctx.font = args[0] + 'px "FOT\-Fate_Go Skip"';
      //console.log(ctx.font);
      fsize = args.shift();
      if (!Number(fsize)){
        ctx.font = '18px "FOT\-Fate_Go Skip"';
        fsize = 18;
      }
    }

    args = args.join(' ');
    args = `${args}`.trim();

    var text = wrap(args, {width: 60});
    var lines = text.split(/\r|\r\n|\n/);
    var count = lines.length;

    img_bg.onload = function () {
      ctx.drawImage(img_bg, 0, 0, 667, 375);
      const y = 315;
      const x = 40;
      ctx.lineWidth = 8;
      ctx.strokeStyle = "#1a1b1e";
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
  name: 'jalter',
  description: 'will superimpose your text onto a picture of jeanne alter.',
  usage: 'jalter [insert text here]'
};
