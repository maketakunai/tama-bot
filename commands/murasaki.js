const snek = require('snekfetch');
const Canvas = require('canvas-prebuilt');
const wrap = require('word-wrapper');

exports.run = (client, message, args) => {
  snek.get('https://i.imgur.com/okVk0tf.png').then(r => {
    const canvas = new Canvas(1200, 600);
    const ctx = canvas.getContext('2d');
    const img_bg = new Canvas.Image();
    //ctx.font = '100px "Armalite Rifle"';
    ctx.font = '100px "VNIHLThuphap"';

    var fsize = 100;
    if (args[0] === '-fs' || args[0] === 'fs' || args[0] === '--fs') {
      args.shift();
      ctx.font = args[0]+'px "VNIHLThuphap"';
      //console.log(ctx.font);
      fsize = args.shift();
      if (!Number(fsize)){
        ctx.font = '100px "VNIHLThuphap"';
        fsize = 100;
      }
    }
    //console.log('2nd time '+ctx.font);
    args = args.join(' ');
    args = `${args}`.trim();

    var text = wrap(args, {width: 16});
    if (Number(fsize) >= 200 && Number(fsize) < 400){
      text = wrap(args, {width: 10});
    }
    else if (Number(fsize) >= 400){
      text = wrap(args, {width: 8});
    }
    else if (Number(fsize) >= 60 && Number(fsize) < 100) {
      text = wrap(args, {width: 30});
    }
    else if (Number(fsize) < 60){
      text = wrap(args, {width: 35});
    }
    var lines = text.split(/\r|\r\n|\n/);
    var count = lines.length;
    //console.log(count);
    img_bg.onload = function () {
      ctx.drawImage(img_bg, (1200-600), 0, 600, 600);
      var y = 300;
      if (Number(fsize) >= 300) {
        y = 400 - count*30;
      }
      else if (Number(fsize) <= 50) {
        y = 150;
      }
      else {y = 300 - count*35;}
      const x = 100;// - ctx.measureText(text).width / 2;
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
  name: 'murasaki',
  description: 'murasaki',
  usage: 'murasaki [insert text here]'
};
