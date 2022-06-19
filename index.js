const axios = require("axios");
require("dotenv").config();
const { Client, Intents } = require("discord.js");
const prefix = "!";
const token = process.env.TOKEN;
const mcServer = process.env.mcServer;
const mcPort = process.env.mcPort;
var request = require("request");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

client.on("ready", () => console.log(`Logged in as ${client.user.tag}.`));
client.on("messageCreate", (message) => antiSpam.message(message));

const AntiSpam = require("discord-anti-spam");
const antiSpam = new AntiSpam({
  warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
  kickThreshold: 7, // Amount of messages sent in a row that will cause a ban.
  banThreshold: 7, // Amount of messages sent in a row that will cause a ban.
  maxInterval: 2000, // Amount of time (in milliseconds) in which messages are considered spam.
  warnMessage: "{@user}, the spamming your doing, knock it off.", // Message that will be sent in chat upon warning a user.
  kickMessage: "**{user_tag}** has been kicked for spamming.", // Message that will be sent in chat upon kicking a user.
  banMessage: "**{user_tag}** has been banned for spamming.", // Message that will be sent in chat upon banning a user.
  maxDuplicatesWarning: 7, // Amount of duplicate messages that trigger a warning.
  maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
  maxDuplicatesBan: 12, // Amount of duplicate messages that trigger a warning.
  exemptPermissions: ["ADMINISTRATOR"], // Bypass users with any of these permissions.
  ignoreBots: true, // Ignore bot messages.
  verbose: true, // Extended Logs from module.
  ignoredUsers: [], // Array of User IDs that get ignored.
  ignoredRoles: ["Moderator", "Terry", "Sheriff"],
});

client.on("messageCreate", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "say") {
    if (message.member.roles.cache.some((role) => role.name === "Moderator")) {
      const sayMessage = args.join(" ");
      message.delete().catch((O_o) => { });
      message.channel.send(sayMessage);
    } else {
      message.reply("you are not a high enough level to wield me yet.");
    }
  }

  if (command === "livegame") {
    if (message.member.roles.cache.some((role) => role.name === "Moderator")) {
      const theGame = args.join(" ");
      message.delete().catch((O_o) => { });
      message.channel.send(
        "Hey @everyone, Terry's going live on Twitch with " +
        theGame +
        " <https://twitch.tv/terrymynott>"
      );
    } else {
      message.reply("you are not a high enough level to wield me yet.");
    }
  } else if (command === "live") {
    if (message.member.roles.cache.some((role) => role.name === "Moderator")) {
      message.delete().catch((O_o) => { });
      message.channel.send(
        "Hey @everyone, Terry's going live on Twitch! <https://twitch.tv/terrymynott>"
      );
    } else {
      message.reply("you are not a high enough level to wield me yet, fucker.");
    }
  } else if (command === "youtube") {
    if (message.member.roles.cache.some((role) => role.name === "Moderator")) {
      message.delete().catch((O_o) => { });
      message.channel.send(
        "Hey @everyone, Terry is now live on YouTube! <https://www.youtube.com/c/TerryMynottShow> Come join us!"
      );
    } else {
      message.reply("you are not a high enough level to wield me yet, fucker.");
    }
  } else if (command === "minecraft") {
    var url =
      "http://mcapi.us/server/status?ip=" + mcServer + "&port=" + mcPort;
    // fetch(url)
    //   .then(response => response.json())
    //   .then(result => {
    //     console.log('Success:', result);
    //     var status = "*Minecraft server is currently offline*";
    //     if (result.online) {
    //       status = "Minecraft server is **online**  -  ";
    //       if (result.players.now) {
    //         status += result.players.now + " people are playing!";
    //       } else {
    //         status += "*Nobody is playing!*";
    //       }
    //     }
    //     message.reply(status);
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //     return message.reply("Error getting Minecraft server status...");
    //   });
     request(url, function (err, response, body) {
       if (err) {
         console.log(err);
         return message.reply("Error getting Minecraft server status...");
       }
       body = JSON.parse(body);
       var status = "*Minecraft server is currently offline*";
       if (body.online) {
         status = "Minecraft server is **online**  -  ";
         if (body.players.now) {
           status += body.players.now + " people are playing!";
         } else {
           status += "*Nobody is playing!*";
         }
       }
       message.reply(status);
    });
  } else if (command === "instagram") {
    console.log("Received Instagram Command!");
    message.reply(
      "Instagram? Is that a thing? <https://www.instagram.com/tmynott/>"
    );
    console.log("Message Sent!");
  } else if (command === "twitter") {
    console.log("Received Twitter Command!");
    message.reply(
      "Find Terry on twitter here wagwan! <https://twitter.com/terrymynott>"
    );
    console.log("Message Sent!");
  } else if (command === "ping") {
    console.log("Received Ping Command!");
    message.reply("ping? What the fuck are you pinging at cockface");
    console.log("Message Sent!");
  } else if (command === "twitch") {
    console.log("Received Twitch Command!");
    message.reply(
      "look look, Terrys here on twitch <https://twitch.tv/terrymynott>"
    );
    console.log("Message Sent!");
  } else if (command === "discord") {
    console.log("Received Discord Command!");
    message.reply(
      "if you really wanna prank someone, invite them to Terrys discord with this link https://discord.gg/Ze4cDqj"
    );
    console.log("Message Sent!");
  } else if (command === "server") {
    console.log("Received Server Command!");
    message.reply(
      `Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}, holy shit thats good.`
    );
    console.log("Message Sent!");
  } else if (command === "me") {
    console.log("Received Me Command!");
    message.reply(`your username is ${message.author.username}, fucker.`);
    console.log("Message Sent!");
  } else if (command === "links") {
    console.log("Received Links Command!");
    message.channel.send(
      `:regional_indicator_l: :regional_indicator_i: :regional_indicator_n: :regional_indicator_k: :regional_indicator_s:\n\n:one: <https://twitch.tv/terrymynott>\n:two: <https://twitter.com/terrymynott>\n:three: <https://www.instagram.com/tmynott>\n:four: <https://discord.gg/Ze4cDqj>\n:five: <https://patreon.com/terrymynott>`
    );
    console.log("Message Sent!");
  } else if (command === "rules") {
    console.log("Received Rules Command!");
    message.channel.send(
      `:regional_indicator_r: :regional_indicator_u: :regional_indicator_l: :regional_indicator_e: :regional_indicator_s:\n\n:one: Be Nice`
    );
    console.log("Message Sent!");
  } else if (command === "quote") {
    console.log("Received Quote Command!");
    function randomNumber(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let expression = randomNumber(1, 5);
    switch (expression) {
      case 1:
        message.reply(`Is that a thing?`);
        break;
      case 2:
        message.reply(
          `I think if this country gets any kinder or gentler, it's literally going to cease to exist.`
        );
        break;
      case 3:
        message.reply(
          `I will build a great, great wall on our southern border, and I will have Mexico pay for that wall. Mark my words.`
        );
        break;
      case 4:
        message.reply(
          `I will be phenomenal to the women. I mean, I want to help women.`
        );
        break;
      case 5:
        message.reply(
          `It's really cold outside, they are calling it a major freeze, weeks ahead of normal. Man, we could use a big fat dose of global warming!`
        );
        break;
      default:
    }
  } else if (command === "dick") {
    function randomNumber(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let expression = randomNumber(1, 6);
    switch (expression) {
      case 1:
        message.reply(`1`);
        break;
      case 2:
        message.reply(`2`);
        break;
      case 3:
        message.reply(`3`);
        break;
      case 4:
        message.reply(`4`);
        break;
      case 5:
        message.reply(`5`);
        break;
      case 5:
        message.reply(`6`);
        break;
      default:
      // code block
    }
  }
});

// client.login(token);

(async () => {
  try {
    sendHeartbeat();
  } catch (error) {
    console.error(error);
  }

  setInterval(sendHeartbeat, 60 * 5000);
  await client.login(token);
})();

function sendHeartbeat() {
  try {
    console.info("Sending Heartbeat");
    return axios.post(process.env.HEARTBEAT_URL);
  } catch (error) {
    return console.error(error);
  }
}
