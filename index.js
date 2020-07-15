// Require the discord module, and make a client

const { Client, MessageEmbed } = require('discord.js');
const react = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
// Partials is the way to get uncached stuff from events.

let { TOKEN, PREFIX } = process.env; 

react.on('ready', () => {
  console.log("I am ready! :)")
});

react.login(TOKEN);

//Message Event, activates everytime a new message come.
react.on('message', (message) => {
  // Check so the bot dosen't respond on bots and other prefixes.
  if (message.author.bot || !message.content.startsWith(PREFIX)) return;
  
  let args = message.content.slice(PREFIX.length).trim().split(/ +/g);
  let cmd = args.shift().toLowerCase();
  
  if (cmd === "create-embed") {
    // Get your #self-roles channel id here.
    let chx = react.channels.cache.get('732735432927739924');
    
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
  if (reaction.message.guild.id !== '732733414209355776') return;
  
  //Self-role channel ID here.
  if (reaction.message.channel.id === '732735432927739924') {
    if (reaction.emoji.name === "🐶") {
      //Add role 1 (dog)
      await reaction.message.guild.members.cache.get(user.id).roles.add("732737134284505158")
    }
      //Add role 2 (cat)
    if (reaction.emoji.name === "🐱") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("732737167780216872")
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
  if (reaction.message.guild.id !== '732733414209355776') return;
  
  if (reaction.message.channel.id === '732735432927739924') {
    if (reaction.emoji.name === "🐶") {
      //Remove role 1 (dog)
      await reaction.message.guild.members.cache.get(user.id).roles.remove("732737134284505158")
    }
    
    if (reaction.emoji.name === "🐱") {
      //Remove role 1 (dog)
      await reaction.message.guild.members.cache.get(user.id).roles.remove("732737167780216872")
    }
  } else {
    return;
  }
});
