import React from 'react';
import { useState } from 'react'
import logo from './logo.svg';
import './App.css';
import { useSpring, animated } from 'react-spring'
import { setConstantValue } from 'typescript';

const electron = window.require('electron');
const ipc  = electron.ipcRenderer;

const BackgroundComponent = (props) => {
  const animationProps = useSpring({
    config: { duration: props.duration, delay: props.delay },
    from: { left: '0%', top: '100%', width: '100%', height: '0%', background: 'lightgreen' },
    to: async next => {
      while (1) {
        await next({ left: '0%', top: '100%', width: '100%', height: '0%', background: 'lightgreen' })
        await next({ left: '0%', top: '0%', width: '100%', height: '100%', background: 'lightgreen' })
      }
    },
  })

  return (
    <animated.div className="script-box" style={animationProps} />
  )
}

const DraggableArea = () => {
  return (
    <div className={"draggable-area"} >
    </div>
  )
}

function App() {
  const [duration, setDuration] = useState(5000);
  const [delay, setDelay] = useState(0);

  ipc.on('message', (event, data) => { // When the message is received...
    console.log('Message received', event, data);
    setDuration(data.duration | duration) // ... change the state of this React component
    setDelay(data.delay | delay) // ... change the state of this React component
  });

  return (
    <div className={"container"}>
      <DraggableArea />
      <BackgroundComponent duration={duration} delay={delay} />
    </div>
  );
}

export default App;
