// Require the discord module, and make a client

const { Client, MessageEmbed } = require('discord.js');
const react = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
// Partials is the way to get uncached stuff from events.

let PREFIX = ".";

react.on('ready', () => {
  console.log("I am ready! :)")
});

react.login("YOUR_TOKEN");

//Message Event, activates everytime a new message come.
react.on('message', (message) => {
  // Check so the bot dosen't respond on bots and other prefixes.
  if (message.author.bot || !message.content.startsWith(PREFIX)) return;
  
  let args = message.content.slice(PREFIX.length).trim().split(/ +/g);
  let cmd = args.shift().toLowerCase();
  
  if (cmd === "create-embed") {
    if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send("You need the **MANAGE_GUILD** permission to do this!")
    // Get your #self-roles channel id here.
    let chx = react.channels.cache.get('SELF_ROLE_CHANNEL');
    
    // Make the embed, and send it.
    const embed = new MessageEmbed()
      .setColor("GREEN")
      .setAuthor("Pick your roles!")
      .setDescription("🐶 Dog\n🐱 Cat")
    chx.send(embed).then(async msg => {
      await msg.react("🐶");
      await msg.react("🐱");
    })
  }
});

react.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  
  if (user.bot) return; //Check if current user reacting is bot.
  if (!reaction.message.guild) return;
  // Put your guild ID here.
  if (reaction.message.guild.id !== 'GUILD_ID') return;
  
  //Self-role channel ID here.
  if (reaction.message.channel.id === 'SELF_ROLE_CHANNEL') {
    if (reaction.emoji.name === "🐶") {
      //Add role 1 (dog)
      await reaction.message.guild.members.cache.get(user.id).roles.add("ROLE_1_ID")
    }
      //Add role 2 (cat)
    if (reaction.emoji.name === "🐱") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("ROLE_1_ID")
    }
  } else {
    return;
  }
});

react.on('messageReactionRemove', async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  
  if (user.bot) return; //Check if current user reacting is bot.
  if (!reaction.message.guild) return;
  // Put your guild ID here.
  if (reaction.message.guild.id !== 'GUILD_ID') return;
  
  if (reaction.message.channel.id === 'SELF_ROLE_CHANNEL') {
    if (reaction.emoji.name === "🐶") {
      //Remove role 1 (dog)
      await reaction.message.guild.members.cache.get(user.id).roles.remove("ROLE_1_ID")
    }
    
    if (reaction.emoji.name === "🐱") {
      //Remove role 1 (dog)
      await reaction.message.guild.members.cache.get(user.id).roles.remove("ROLE_2_ID")
    }
  } else {
    return;
  }
});
