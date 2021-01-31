const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, { cors: { origin: "http://localhost:3000", credentials: true } });
const { createQuestion, getRandomNumber } = require('./helper')

let players = [];
let question = createQuestion();

io.on('connection', (socket) => {
    socket.on('user_joined', (name) => {
        const player = { id: socket.id, name, points: 0 }
        players.push(player);
        console.log(name, 'connected');
        console.log("Online Player : ", players.length);
        updateGame();
    });
    socket.on('response', (response) => {
        console.log(players.find(player => player.id === socket.id).name, "response :", response);
        if (+response === question.answer) {
            question = createQuestion();
            increasePoints(socket.id);
            updateGame();
        }
    });
    socket.on('disconnect', function () {
        //players = [...players.filter(player => player.id !== socket.id)]
        console.log(socket.id, 'disconnected')
    })
});
function increasePoints(id) {
    players = players.map(player => {
        if (player.id === id) {
            return {
                ...player,
                points: player.points + 1
            }
        } else {
            return player;
        }
    })
}
function updateGame() {
    const leaderboard = players
        .sort((a, b) => b.points - a.points)
        .slice(0, 10);
    io.emit('send_question', question.expression)
    io.emit('leaderboard', leaderboard);
}
http.listen(4000, () => {
    console.log('listening on *:4000');
});
