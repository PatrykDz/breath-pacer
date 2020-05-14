import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useSpring, animated } from 'react-spring'

const BackgroundComponent = () => {
  const props = useSpring({
    config: {duration: 5000},
    from: { left: '0%', top: '100%', width: '100%', height: '0%', background: 'lightgreen' },
    to: async next => {
      while (1) {
        await next({ left: '0%', top: '100%', width: '100%', height: '0%', background: 'lightgreen' })
        await next({ left: '0%', top: '0%', width: '100%', height: '100%', background: 'lightgreen' })
      }
    },
  })

  return (
    <animated.div className="script-box" style={props} />
  )
}


function App() {
  return (
    <React.Fragment>
      <BackgroundComponent />
    </React.Fragment>
  );
}

export default App;
