const talkedRecently = new Set();

exports.run = (client, message, args) => {
  if (talkedRecently.has(message.author.id)){
    message.channel.send(message.author.username + ", you can only ask a question once every 10 seconds.");
    return;
  }
  else {
    let answer = randomAnswer();
    let question = args.join(" ");
    message.channel.send({
      "embed": {
        "color": 16777215,
        "thumbnail": {
          "url": "https://i.imgur.com/IjRae6R.png"
        },
        "fields": [
          {
            "name": `${message.author.username}'s question: ${question}`,
            "value": `${answer}`
          }
        ]
      }
    });
    talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 10000);
    return;
  }
};

function randomAnswer() {
  const answers = ["It is certain.",
                 "It is decidely so.",
                 "Without a doubt.",
                 "Yes - definitely.",
                 "You may rely on it.",
                 "As I see it, yes.",
                 "Most likely.",
                 "Outlook good.",
                 "Yes.",
                 "Signs point to yes.",
                 "Reply hazy, try again.",
                 "Ask again later.",
                 "Better not tell you now.",
                 "Cannot predict now.",
                 "Concentrate and ask again.",
                 "Don't count on it.",
                 "My reply is no.",
                 "My sources say no.",
                 "Outlook not so good.",
                 "Very doubtful."]
  return answers[Math.floor(Math.random()*answers.length)];
};