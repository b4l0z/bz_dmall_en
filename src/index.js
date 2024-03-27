const { magenta, yellowBright, green, red, log } = require("console-log-colors");
const config = require("../config.json");
if (!config.token) {
  logError();
  return console.log(red(`                  Bot token missing in`), magenta(`config.json`), red(`!\n\n`));
}
if (!config.id.ping_test || !config.id.server || !config.id.your_id) {
  logError();
  return console.log(red(`                  Missing IDs in`), magenta(`config.json`), red(`!\n\n`));
}

const Discord = require("discord.js");
const client = new Discord.Client({
  intents: Object.keys(Discord.GatewayIntentBits).map((a) => {
    if (isNaN(a)) console.log(yellowBright(`SETUP | Intent`), magenta(a), yellowBright` en cours d'activation...`);
    return Discord.GatewayIntentBits[a];
  }),
  partials: Object.keys(Discord.Partials).map((b) => {
    if (isNaN(b)) console.log(yellowBright(`SETUP | Partial`), magenta(b), yellowBright` en cours d'activation...`);
    return Discord.Partials[b];
  }),
});

client.on("ready", () => {
  bzdmall();
  console.log(green(`CLIENT | Bot opérationnel`));
  client.channels.cache
    .get(config.id.ping_test)
    .send("Message pour tester le ping du bot.")
    .then((msg) => {
      let botPing = Date.now() - msg.createdTimestamp;
      msg.delete();
      if (botPing > 7000) {
        console.log(green(`CLIENT | Ping :`), red(`${botPing}ms. (!!)`));
      } else {
        console.log(green(`CLIENT | Ping :`), magenta(`${botPing}`), green(`ms.`));
      }
    });
  console.log(green(`CLIENT | DM Potentiels :`), magenta(client.users.cache.size), magenta(`.`));
  if (config.statut.online == true) {
    client.user.setStatus(Discord.PresenceUpdateStatus.Online);
    console.log(green(`CLIENT | Statut :`), magenta(`Online`), green("."));
  } else if (config.statut.idle == true) {
    client.user.setStatus(Discord.PresenceUpdateStatus.Idle);
    console.log(green(`CLIENT | Statut :`), magenta(`Idle`), green("."));
  } else if (config.statut.do_not_disturb == true) {
    client.user.setStatus(Discord.PresenceUpdateStatus.DoNotDisturb);
    console.log(green(`CLIENT | Statut :`), magenta(`Do not disturb`), green("."));
  } else {
    client.user.setStatus(Discord.PresenceUpdateStatus.Online);
    console.log(green(`CLIENT | Statut :`), magenta(`Online`), green("."));
  }
  client.user.setActivity({ name: `${config.activity}`, type: Discord.ActivityType.Playing });
  if (config.activity) {
    console.log(green(`CLIENT | Activity :`), magenta(`${config.activity}`), green("."));
  } else {
    console.log(green(`CLIENT | Activity :`), yellowBright(`/`), green("."));
  }
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot) return;
  if (msg.channel.type !== 1) return;
  if (!msg.author.id === config.id.your_id) return;

  let msg_to_send = msg.content;
  client.guilds.cache.get(config.id.server).members.cache.forEach((mbmr) => {
    if (mbmr.user.bot) return;
    mbmr.send(msg_to_send).then((sended) => {
      console.log(green(`DM | DM`), magenta(msg_to_send), green(`Sent to`), magenta(`${mbmr.user.username} (${mbmr.user.id})`), green("!"));
    });
  });

  /*client.users.cache.forEach((member) => {
    member.send(msg_to_send);
  });*/
});

client.login(config.token);
function bzdmall() {
  console.log(
    red(`
                                                    v1.0

    ░▒▓███████▓▒░░▒▓████████▓▒░      ░▒▓███████▓▒░░▒▓██████████████▓▒░        ░▒▓██████▓▒░░▒▓█▓▒░      ░▒▓█▓▒░        
    ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░        
    ░▒▓█▓▒░░▒▓█▓▒░    ░▒▓██▓▒░       ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░        
    ░▒▓███████▓▒░   ░▒▓██▓▒░         ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░      ░▒▓████████▓▒░▒▓█▓▒░      ░▒▓█▓▒░        
    ░▒▓█▓▒░░▒▓█▓▒░░▒▓██▓▒░           ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░        
    ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░             ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░        
    ░▒▓███████▓▒░░▒▓████████▓▒░      ░▒▓███████▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░▒▓████████▓▒░ 
                                      https://github.com/b4l0z/bz_dmall                       
                                        https://discord.gg/FbVBR4AFng                      
                                      ALL CREDITS TO BZ_ANODEV / BALOZ                
                                                                                                                  
`)
  );
}
function logError() {
  console.log(
    red(`


  ░▒▓████████▓▒░▒▓███████▓▒░░▒▓███████▓▒░ ░▒▓██████▓▒░░▒▓███████▓▒░  
  ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
  ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
  ░▒▓██████▓▒░ ░▒▓███████▓▒░░▒▓███████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓███████▓▒░  
  ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
  ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
  ░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░ 
                                                                     
                                                                     `)
  );
}
