const SlackBot = require ('slackbots');
const axios = require ('axios');

const bot = new SlackBot({
    token: 'xoxb-395574618531-395446964932-2HBlofNnKODPjC6Bln8IXW0J',
    name: 'jokebot'
});

// Start handler

bot.on('start', () => {
    const params = {
        icon_emoji: ':smiley:'
    }

    bot.postMessageToChannel('general', 'Wanna hear a facepalm worthy joke? Yeah you do!', params);
});

// Error handler

bot.on('error', (err) => console.log(err));

// Message handler

bot.on('message', (data) => {
    if(data.type !== 'message') {
        return;
    }

    handleMessage(data.text);
});

// Respond to Data input
function handleMessage(message) {
    if(message.includes(' chucknorris')) {
        chuckJoke();
    } else if(message.includes(' yomomma')) {
        yoMommaJoke();
    }
}

// Tell a Chuck Norris joke

function chuckJoke() {
    axios.get('http://api.icndb.com/jokes/random/')
    .then(res => {
        const joke = res.data.value.joke;

        const params = {
            icon_emoji: ':laughing:'
        };
    
        bot.postMessageToChannel('general', `Chuck Norris: ${joke}`, params);

    });
}

// Tell a Yo Momma Joke!

function yoMommaJoke() {
    axios.get('http://api.yomomma.info')
    .then(res => {
        const joke = res.data.joke;

        const params = {
            icon_emoji: ':laughing:'
        };
    
        bot.postMessageToChannel('general', `Yo Momma: ${joke}`, params);

    });
}