const {PythonShell} = require('python-shell');
const pyshell = new PythonShell('generator.py');
let options = {
  mode: 'text',
};

exports.run = (client, message, args) => {
  message.channel.send("Please wait, generating text...").catch(console.error).then(m => m.delete(10000));
  PythonShell.run('generator.py', options, function(err, results){
    if (err) throw err;
    results.pop();
    message.channel.send(`= RNN generated excerpt from Fate/stay night = \n${results.join('\r\n')}`, {code:'asciidoc'}).catch(console.error);
  })

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'robonasu',
  description: `Uses a neural network (textgenrnn) trained on the script of Fate Stay Night to generate random text.`,
  usage: '!robonasu'
};
