exports.run = async (client, message, args) => {
  const roleList = ['360099044405805071', '405761276636299284', '405761322404413461', '360099022226063360', '405761367992303628', '405761345359708170', '405761407397658643', '406487523188277269', '406487548714811392', '406487575717740546', '430934135494934549','381920577528660001' ,'381920605102014469','381920540648013835','358328005317230603','358328044328321024'];
  let myRoles = ['360099044405805071', '405761276636299284', '405761322404413461', '360099022226063360', '405761367992303628', '405761345359708170', '405761407397658643', '406487523188277269', '406487548714811392', '406487575717740546', '430934135494934549','381920577528660001', '381920605102014469','381920540648013835','358328005317230603','358328044328321024'];
  const a = message.guild.roles.get('360099044405805071'); //Saber
  const b = message.guild.roles.get('405761276636299284'); //Archer
  const c = message.guild.roles.get('405761322404413461'); //Lancer
  const d = message.guild.roles.get('360099022226063360'); //Rider
  const e = message.guild.roles.get('405761367992303628'); //Assassin
  const f = message.guild.roles.get('405761345359708170'); //Caster
  const g = message.guild.roles.get('405761407397658643'); //Berserker
  const h = message.guild.roles.get('406487523188277269'); //Ruler
  const i = message.guild.roles.get('406487548714811392'); //Avenger
  const j = message.guild.roles.get('406487575717740546'); //AlterEgo
  const k = message.guild.roles.get('430934135494934549'); //Foreigner
  const l = message.guild.roles.get('381920577528660001'); //MoonCancer
  const m = message.guild.roles.get('381920605102014469'); //Beast
  const n = message.guild.roles.get('381920540648013835'); //Fou-ker
  const o = message.guild.roles.get('358328005317230603'); //mapo tofu
  const p = message.guild.roles.get('358328044328321024'); //black keys
  //console.log(message.guild.roles.map(role => [role.name, role.id]));
  const filter = (reaction, user) => roleList && user.id === message.author.id;
  const toRemove = message.member.roles.map(role => role.id);
  //console.log(message.member.roles.map(role => role.id));

  myRoles = myRoles.filter( function ( el ){
    return toRemove.indexOf( el ) > 0;
  });

  message.channel.send({embed: {
    "title":`Click on a reaction emoji to choose a role!`,
    "color": 000000,
    "footer": {
      "text": `For user: ${message.author.username}`
    },
    "fields": [
      {
        "name": "Roles",
        "value": `${a.toString()} <:saber:520356774012780554>\n${b.toString()} <:archer:520356773891145757>\n${c.toString()} <:lancer:520356774218563594>\n${d.toString()} <:rider:520356773958254610>\n${e.toString()} <:assassin:520356773463588874>\n${f.toString()} <:caster:520356773845270528>\n${g.toString()} <:berserker:520356773950128145>\n${h.toString()} <:ruler:520356773916442624>`,
        "inline": true
      },
      {
        "name": "Roles",
        "value": `${i.toString()} <:avenger:520356773949865994>\n${j.toString()} <:alterego:520356773870305283>\n${k.toString()} <:foreigner:520356774096928788>\n${l.toString()} <:mooncancer:520356773912248329>\n${m.toString()} <:beast:520356773836619806>\n${n.toString()} <:fou:529346412924633089>\n${o.toString()} <:tofu:570882214687145984>\n${p.toString()} <:yorokobe:529346426887471114>`,
        "inline": true
      }
    ]
    //"description": `${a.toString()} <:saber:520356774012780554>\n${b.toString()} <:archer:520356773891145757>\n${c.toString()} <:lancer:520356774218563594>\n${d.toString()} <:rider:520356773958254610>\n${e.toString()} <:assassin:520356773463588874>\n${f.toString()} <:caster:520356773845270528>\n${g.toString()} <:berserker:520356773950128145>\n${h.toString()} <:ruler:520356773916442624>\n${i.toString()} <:avenger:520356773949865994>\n${j.toString()} <:alterego:520356773870305283>\n${k.toString()} <:foreigner:520356774096928788>\n${l.toString()} <:mooncancer:520356773912248329>\n${m.toString()} <:beast:520356773836619806>\n${n.toString()} <:fou:529346412924633089>`
  }}).then(async msg => {
    message.member.removeRoles(myRoles);
    await msg.react('520356774012780554'); //a
    await msg.react('520356773891145757');
    await msg.react('520356774218563594');
    await msg.react('520356773958254610'); //rid
    await msg.react('520356773463588874'); //ass
    await msg.react('520356773845270528');
    await msg.react('520356773950128145');
    await msg.react('520356773916442624');
    await msg.react('520356773949865994');
    await msg.react('520356773870305283');
    await msg.react('520356774096928788');
    await msg.react('520356773912248329');//mc
    await msg.react('520356773836619806');//beast
    await msg.react('529346412924633089');//fouker
    await msg.react('570882214687145984');//mapo
    await msg.react('529346426887471114');//yorok


    msg.awaitReactions(filter, {
      max: 1,
      time: 30000,
      errors: ['time']
    }).then(collected => {

      const reaction = collected.first();
      console.log(reaction.emoji.name);
      switch (reaction.emoji.id) {

        case '520356774012780554':
          message.member.addRole(a).catch(err => {
            console.log(err);
            return message.channel.send(`Error adding you to this role: **${err.message}**.`);
          });
          message.channel.send(`${message.author.username}, you have been added to the **${a.name}** role!`);
          msg.delete();
          break;
        case '520356773891145757':
          message.member.addRole(b).catch(err => {
            console.log(err);
            return message.channel.send(`Error adding you to this role: **${err.message}**.`);
          });
          message.channel.send(`${message.author.username}, you have been added to the **${b.name}** role!`);
          msg.delete();
          break;
        case '520356774218563594':
          message.member.addRole(c).catch(err => {
            console.log(err);
            return message.channel.send(`Error adding you to this role: **${err.message}**.`);
          });
          message.channel.send(`${message.author.username}, you have been added to the **${c.name}** role!`);
          msg.delete();
          break;
        case '520356773958254610':
          message.member.addRole(d).catch(err => {
            console.log(err);
            return message.channel.send(`Error adding you to this role: **${err.message}**.`);
          });
          message.channel.send(`${message.author.username}, you have been added to the **${d.name}** role!`);
          msg.delete();
          break;
        case '520356773463588874':
          message.member.addRole(e).catch(err => {
            console.log(err);
            return message.channel.send(`Error adding you to this role: **${err.message}**.`);
          });
          message.channel.send(`${message.author.username}, you have been added to the **${e.name}** role!`);
          msg.delete();
          break;
        case '520356773845270528':
          message.member.addRole(f).catch(err => {
            console.log(err);
            return message.channel.send(`Error adding you to this role: **${err.message}**.`);
          });
          message.channel.send(`${message.author.username}, you have been added to the **${f.name}** role!`);
          msg.delete();
          break;
        case '520356773950128145':
          message.member.addRole(g).catch(err => {
            console.log(err);
            return message.channel.send(`Error adding you to this role: **${err.message}**.`);
          });
          message.channel.send(`${message.author.username}, you have been added to the **${g.name}** role!`);
          msg.delete();
          break;
        case '520356773916442624':
          message.member.addRole(h).catch(err => {
            console.log(err);
            return message.channel.send(`Error adding you to this role: **${err.message}**.`);
          });
          message.channel.send(`${message.author.username}, you have been added to the **${h.name}** role!`);
          msg.delete();
          break;
        case '520356773949865994':
          message.member.addRole(i).catch(err => {
            console.log(err);
            return message.channel.send(`Error adding you to this role: **${err.message}**.`);
          });
          message.channel.send(`${message.author.username}, you have been added to the **${i.name}** role!`);
          msg.delete();
          break;
        case '520356773870305283':
          message.member.addRole(j).catch(err => {
            console.log(err);
            return message.channel.send(`Error adding you to this role: **${err.message}**.`);
          });
          message.channel.send(`${message.author.username}, you have been added to the **${j.name}** role!`);
          msg.delete();
          break;
        case '520356774096928788':
          message.member.addRole(k).catch(err => {
            console.log(err);
            return message.channel.send(`Error adding you to this role: **${err.message}**.`);
          });
          message.channel.send(`${message.author.username}, you have been added to the **${k.name}** role!`);
          msg.delete();
          break;
        case '520356773912248329':
          message.member.addRole(l).catch(err => {
            console.log(err);
            return message.channel.send(`Error adding you to this role: **${err.message}**.`);
          });
          message.channel.send(`${message.author.username}, you have been added to the **${l.name}** role!`);
          msg.delete();
          break;
        case '520356773836619806':
          message.member.addRole(m).catch(err => {
            console.log(err);
            return message.channel.send(`Error adding you to this role: **${err.message}**.`);
          });
          message.channel.send(`${message.author.username}, you have been added to the **${m.name}** role!`);
          msg.delete();
          break;
        case '529346412924633089':
          message.member.addRole(n).catch(err => {
            console.log(err);
            return message.channel.send(`Error adding you to this role: **${err.message}**.`);
          });
          message.channel.send(`${message.author.username}, you have been added to the **${n.name}** role!`);
          msg.delete();
          break;
        case '570882214687145984':
          message.member.addRole(o).catch(err => {
            console.log(err);
            return message.channel.send(`Error adding you to this role: **${err.message}**.`);
          });
          message.channel.send(`${message.author.username}, you have been added to the **${o.name}** role!`);
          msg.delete();
          break;
        case '529346426887471114':
          message.member.addRole(p).catch(err => {
            console.log(err);
            return message.channel.send(`Error adding you to this role: **${err.message}**.`);
          });
          message.channel.send(`${message.author.username}, you have been added to the **${p.name}** role!`);
          msg.delete();
          break;

      }
    }).catch(collected => {
      msg.delete();
      return message.channel.send(`${message.author.username}, I couldn't add you to a role!`);
    });

  });

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['role']
};

exports.help = {
  name: 'roles',
  description: `change yer role by clickin a button`,
  usage: '!roles'
};
