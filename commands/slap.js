const snek = require('snekfetch');
const Canvas = require('canvas-prebuilt');
const wrap = require('word-wrapper');

exports.run = async (client, message, args) => {
    var usermention = message.mentions.members.first();
    var userurl = `https://cdn.discordapp.com/avatars/${usermention.user.id}/${usermention.user.avatar}.png?size=2048`
    snek.get(userurl).then(r => {
      snek.get('https://i.imgur.com/ltaWoX7.png').then(s => {
        const canvas = new Canvas(500, 500);
        const ctx = canvas.getContext('2d');
        const img_bg = new Canvas.Image();
        const img_fg = new Canvas.Image();
             img_bg.onload = function () {
                ctx.rotate(-12 * (Math.PI / 180));
                ctx.drawImage(img_bg, -75, 250, 250, 250);
                 img_fg.onload = function() {
                    ctx.rotate(12 * (Math.PI / 180));
                    ctx.drawImage(img_fg, 0, 0, 500, 500);
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
  name: 'slap',
  description: 'Berserker Atalante slaps someone. Testing 123',
  usage: '!slap @user'
};
