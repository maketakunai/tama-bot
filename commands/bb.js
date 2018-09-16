const snek = require('snekfetch');
const Canvas = require('canvas-prebuilt');
const wrap = require('word-wrapper');

exports.run = (client, message, args) => {
  snek.get('https://i.imgur.com/vpp6XDx.png').then(r => {
    const canvas = new Canvas(500, 366);
    const ctx = canvas.getContext('2d');
    const img_bg = new Canvas.Image();
    ctx.font = "bold 18px Arial";
    var fsize = 0;
    if (args[0] == '-fs') {
      args.shift();
      ctx.font = `bold ${args[0]}px Arial`;
      fsize = args.shift();
      if (!Number(args[0])){
        ctx.font = "bold 18px Arial";
        //continue;
      }
    }

    args = args.join(' ');
    args = `${args}`.trim();

    var text = wrap(args, {width: 20});
    var lines = text.split(/\r|\r\n|\n/);
    var count = lines.length;

    img_bg.onload = function () {
      ctx.drawImage(img_bg, 0, 0, 500, 366);
      const y = 240 + fsize/1.5;// - count*16;
      const x = 355 - ctx.measureText(text).width / 2;
      ctx.lineWidth = 3;
      ctx.rotate(-5 * (Math.PI / 180));
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
  name: 'bb',
  description: 'superimposes text onto bb holding a sign. experimental: -fs number option to choose fontsize.',
  usage: 'bb [insert text here] or bb -fs 50 [insert text here]'
};
