import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
const ENDPOINT = "localhost:4000";
let socket = undefined;

function App() {
  const [name, setName] = useState("");  
  const [answer, setAnswer] = useState("");  
  const [question, setQuestion] = useState("");
  const [start, setStart] = useState(false);  
  const [leaderboard, setLeaderboard] = useState();  

  useEffect(() => {
    if(start){
      socket.on('send_question', (data) => {
        setQuestion(data)
      });
      socket.on('leaderboard', (data) => {
        setLeaderboard(data);
        data.map(leaderPlayer => console.log(leaderPlayer))
      });
    }
  });
  const handleSubmit = (e) => {
    //e.preventDefault();
    console.log('My name is ' + name);
    if(name){
      socket = socketIOClient.connect(ENDPOINT);
      socket.emit('user_joined',name);
      setStart(true);
    }
  };
  const handleResponse = (e) => {
    e.preventDefault();
    console.log('My response ' + answer);
    if(answer){
      socket.emit('response',answer)
      e.target['response'].value='';
    }
  };

  return (
    <div className="container flex flex-col justify-center items-center m-auto h-screen">
         {!start ? 
          (<div className="container flex flex-col justify-center items-center m-auto h-screen">
          <h1 className="text-3xl font-bold text-white text-center">Welcome to the <span className="text-indigo-800">Socket.io</span> Math Game</h1>
          <form className="bg-white w-2/5 p-6 shadow mt-6 text-center rounded-lg" onSubmit={handleSubmit} autoComplete="off">
            <h2 className="text-xl mb-4 font-bold text-indigo-500">Enter your name</h2>
            <input className="d-block w-full border border-indigo-500 shadow p-4 text-2xl font-bold text-indigo-800 text-center" type="text" name="name" onChange={e => setName(e.target.value)}/>
          </form>
        </div>):
        (<div className="container flex flex-col justify-center items-center m-auto h-screen">
          <div className="fixed top-0 right-0 bg-white p-6 shadow m-5 text-center rounded-lg">
            <h3 className="text-xl mb-1 pb-1 font-bold text-indigo-800 border-b border-indigo-100">Leaderboard</h3>
            <ul>
              {leaderboard && (leaderboard.map(player => {
                    return (<li className="flex justify-between text-xl font-bold text-indigo-700">
                    <a>{player.name}</a>{player.points}
                  </li>)
                }))}
            </ul>
          </div>
          <h1 className="text-3xl font-bold text-white text-center">{name} <span className="text-indigo-800">must be a little bit fast</span></h1>
          <form className="bg-white w-2/5 p-6 shadow mt-6 text-center rounded-lg" onSubmit={handleResponse} autoComplete="off">
            <h2 className="text-4xl mb-4 font-bold text-indigo-900">{question}</h2>
            <input className="d-block w-full border border-indigo-500 shadow p-4 text-2xl font-bold text-indigo-800 text-center placeholder-indigo-300" type="text" placeholder="Maybe seven?" name="response" onChange={e => setAnswer(e.target.value)}/>
          </form>
        </div>)
        }
    </div>
  );
}
export default App;
