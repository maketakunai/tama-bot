const snek = require('snekfetch');
const Canvas = require('canvas-prebuilt');

exports.run = async (client, message, args) => {
  let usermention = message.mentions.members.first();
  let userurl = `https://cdn.discordapp.com/avatars/${usermention.user.id}/${usermention.user.avatar}.png?size=2048`
  snek.get(userurl).then(r => {
    snek.get('https://i.imgur.com/NN6Rr2q.png').then(s => {
    //snek.get('https://i.imgur.com/qOaIF76.png').then(s => {
      const canvas = new Canvas(1024, 576);
      const ctx = canvas.getContext('2d');
      const img_bg = new Canvas.Image();
      const img_fg = new Canvas.Image();
      img_bg.onload = function () {
        ctx.drawImage(img_bg, 500, 0, 576, 576);
        img_fg.onload = function() {
          ctx.drawImage(img_fg, 0, 0, 1024, 576);
          message.channel.send({
            files: [{attachment: canvas.toBuffer()}]
          }).catch(console.error);
        }
      }
    img_bg.src = r.body;
    img_fg.src = s.body;
    });
  })
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'tokiomi',
  description: 'Makes someone loom behind tokiomi. You gotta @ them to do it.',
  usage: '!tokiomi @user'
};
