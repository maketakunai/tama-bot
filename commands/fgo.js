exports.run = (client, message, args) => {
  message.channel.send({
    "embed": {
      "color": 16777215,
      "fields": [
        {
          "name": "FGO Servers & Events",
          "value": ":flag_jp: 13M DL Celebration (5/30-6/13)\n"+
                   ":flag_us: Journey to the West (5/31-6/13)\n"+
                   ":flag_cn: Fate/Extra CCC Collaboration Pre-Event (6/4-6/18)\n"+
                   ":flag_tw: Halloween I Rerun (6/8-6/22)\n"+
                   ":flag_kr: Fate: Accel Zero Order (6/5-6/26)"
        }
      ]
    }
  }).catch(console.error);
}
