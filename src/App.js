import './App.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import gptImglogo from './assets/chatgptLogo.svg';
import { sendMsgToOpenAi } from './openai';
import { useEffect, useRef, useState } from 'react';
function App() {

  const msgEnd = useRef(null);
  const [input,setInput] = useState(""); 
  const [messages,setMessages]=useState([
    {
    text: "Hi! Can i help you?",
    isBot: true,
  }
  ]);

  useEffect(()=>{
msgEnd.current.scrollIntoView();
  },[messages])

const handleSend = async () => {
  const text = input;
  setInput('');
  setMessages([
    ...messages,
    {text,isBot:false}
  ])
  const res = await sendMsgToOpenAi(text);
  setMessages([
    ...messages,
    { text, isBot: false},
    {text: res, isBot:true}
  ]);
}

const hanldEnter = async (e)=> {
  if(e.key ==='Enter') await handleSend();
}
const handleQuery= async(e) => {
  const text = e.target.value;
  setMessages([
    ...messages,
    {text,isBot:false}
  ])
  const res = await sendMsgToOpenAi(text);
  setMessages([
    ...messages,
    { text, isBot: false},
    {text: res, isBot:true}
  ]);
}
  return (
    
    <div className="App">
      <div className='sideBar'>
        <div className='upperSide'>
          <div className='upperSideTop'><img className='logo' src={gptLogo}/><span className='brand'>LebroChat</span></div>
          <button className='midBtn' onClick={()=> {window.location.reload()}}><img className='addBtn' src={addBtn}/>New Chat</button>
          <div className='upperSideBottom'>
            <button className='query' onClick={handleQuery} value={"What is Programming?"}><img  src={msgIcon} />What is programming?</button>
            <button className='query' onClick={handleQuery} value={"How to use App?"}><img  src={msgIcon} />How to use app?</button></div>
        </div>
        <div className='lowerSide'>
          <div className='listItems'><img className='listItemsImg' src={home}/>Home</div>
          <div className='listItems'><img className='listItemsImg' src={saved}/>Save</div>
          <div className='listItems'><img className='listItemsImg' src={rocket}/>Upgrade</div>
        </div>
      </div>
      <div className='main'>
      <div className='chats'>
        {messages.map((message,i) =>
        <div key={i} className={message.isBot?'chat bot':"chat"}>
          <img className='chatImg'src={message.isBot?gptImglogo:userIcon} /> <p className='txt'>{message.text}</p>
        </div>
      )}
      </div>
      <div ref={msgEnd} />
      <div className='chatFooter'>
        <div className='inp'>
          <input type='text' placeholder='Send a message...' value={input} onKeyDown={hanldEnter} onChange={(e)=>(setInput(e.target.value))} /> <button className='send' onClick={handleSend}><img src={sendBtn}  alt='send'/></button>
        </div>
        <p>LebroChat may produce inaccurate information about people,places or facts.</p>
      </div>
      </div>
    </div>
  );
}

export default App;
