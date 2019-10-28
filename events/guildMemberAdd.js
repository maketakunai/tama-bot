module.exports = (client, member) => {

  const welcomeMessage = `Welcome to Fate/Goon Order, ${member.toString()}.\nPlease read <#439804809344843776> and use \`!roles\` to select a role.\nDon't forget to add yourself to the \`!spreadsheet\` and \`!update\` when you are finished!`
  if (member.guild.channels.find(c => c.id === '328232345327108097') == null) {
    return;
  }
  else member.guild.channels.find(c => c.id === '328232345327108097').send(welcomeMessage).catch(console.error);

};
