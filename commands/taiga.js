const snek = require('snekfetch');
const Canvas = require('canvas-prebuilt');
const wrap = require('word-wrapper');

exports.run = (client, message, args) => {
  snek.get('https://i.imgur.com/ktwmswg.png').then(r => {
    const canvas = new Canvas(750, 750);
    const ctx = canvas.getContext('2d');
    const img_bg = new Canvas.Image();
    ctx.font = '100px "Armalite Rifle"';

    var fsize = 100;
    if (args[0] == '-fs' || args[0] == 'fs') {
      args.shift();
      ctx.font = args[0]+'px "Armalite Rifle"';
      //console.log(ctx.font);
      fsize = args.shift();
      if (!Number(fsize)){
        ctx.font = '100px "Armalite Rifle"';
        fsize = 100;
      }
    }
    //console.log('2nd time '+ctx.font);
    args = args.join(' ');
    args = `${args}`.trim();

    var text = wrap(args, {width: 12});
    if (Number(fsize) >= 200){
      text = wrap(args, {width: 7});
    }
    else if (Number(fsize) < 60){
      text = wrap(args, {width: 25});
    }
    var lines = text.split(/\r|\r\n|\n/);
    var count = lines.length;
    //console.log(count);
    img_bg.onload = function () {
      ctx.drawImage(img_bg, (750-408), (750-321), 408, 321);
      var y = 300;
      if (Number(fsize) >= 300) {
        y = 400 - count*30;
      }
      else if (Number(fsize) <= 50) {
        y = 150;
      }
      else {y = 300 - count*35;}
      const x = 350 - ctx.measureText(text).width / 2;
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
  name: 'taiga',
  description: 'taiga',
  usage: 'taiga [insert text here]'
};
