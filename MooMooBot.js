const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
    if (err) console.error(err);

    let jsfiles = files.filter(f => f.split('.').pop() === 'js');
    if (jsfiles.length <= 0) {
        console.log('No commands to load.');
        return;
    }

    console.log(`Loading ${jsfiles.length} commands...`);

    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} loaded.`);
        client.commands.set(props.help.name, props);
    });
});

fs.readdir('./events/', (err, files) => {
    if (err) console.error(err);

    let jsfiles = files.filter(f => f.split('.').pop() === 'js');
    if (jsfiles.length <= 0) {
        console.log('No events to load.');
        return;
    }

    console.log(`Loading ${jsfiles.length} events...`);

    jsfiles.forEach((f, i) => {
        let event = require(`./events/${f}`);
        console.log(`${i + 1}: ${f} loaded.`);
        client.on(event.name, event.execute.bind(null, client));
        client.events.set(event.name, event);
    });
});

client.login('Your Discord Bot Token');
