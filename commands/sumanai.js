exports.run = (client, message, args) => {
  message.channel.send({
    file: "https://s3-ap-northeast-1.amazonaws.com/static.gameinn.jp/imgs/sites/18/2017/03/wCF9biY.gif"
  }).catch(console.error);
}
