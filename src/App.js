import React from 'react';
import { useState } from 'react'
import logo from './logo.svg';
import './App.css';
import { useSpring, animated } from 'react-spring'
import { setConstantValue } from 'typescript';

const BackgroundComponent = (props) => {
  const animationProps = useSpring({
    config: { duration: props.duration },
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
  // const [duration, setDuration] = useState(5000);
  // const handleWheel = (event) => {
  //   if (event.nativeEvent.ctrlKey && event.nativeEvent.wheelDelta > 0) {
  //     console.log('scroll up, current duration: ' + duration);
  //     setDuration(duration + 1000);
  //   } else if(event.nativeEvent.ctrlKey && event.nativeEvent.wheelDelta < 0) {
  //     console.log('scroll down, current duration: ' + duration);
  //     setDuration(duration - 1000);
  //   }
  // }

  const duration = 5000;

  return (
    <div className={"container"}>
      <DraggableArea />
      <BackgroundComponent duration={duration} />
    </div>
  );
}

export default App;
