const snek = require('snekfetch');
const Canvas = require('canvas-prebuilt');

exports.run = async (client, message, args) => {
  let usermention = message.mentions.members.first();
  let userurl = `https://cdn.discordapp.com/avatars/${usermention.user.id}/${usermention.user.avatar}.png?size=2048`
  snek.get(userurl).then(r => {
    snek.get('https://i.imgur.com/5OVBjzT.png').then(s => {
      const canvas = new Canvas(600, 500);
      const ctx = canvas.getContext('2d');
      const img_bg = new Canvas.Image();
      const img_fg = new Canvas.Image();
      img_bg.onload = function () {
        ctx.rotate(-12 * (Math.PI / 180));
        ctx.drawImage(img_bg, -75, 325, 150, 150);
        img_fg.onload = function() {
          ctx.rotate(12 * (Math.PI / 180));
          ctx.drawImage(img_fg, 100, 0, 400, 400);
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
  name: 'kick',
  description: 'Tamakick! You need to @ someone to make it work.',
  usage: '!kick @user'
};
