import { useState } from "react";
import { huddleIframeApp } from "@huddle01/huddle01-iframe";
import Image from "next/image";

function ToggleButtons({leaveMeet,network,chat}) {
  const [button1On, setButton1On] = useState(false);
  const [button2On, setButton2On] = useState(false);
  const [button3On, setButton3On] = useState(false);
  const [button4On, setButton4On] = useState(false);
  const [button5On, setButton5On] = useState(false);

  const toggleButton1 = () => {
    if(button1On=== false){
    huddleIframeApp.methods.muteMic();
    console.log("mute");
     setButton1On(!button1On);}
     else{
        huddleIframeApp.methods.unmuteMic();
        console.log("unmumute");
     setButton1On(!button1On);}
     };
  

  const toggleButton2 = () => {
    setButton2On(!button2On);
    // perform button 2's toggle function here
  };

  const toggleButton3 = () => {
    setButton3On(!button3On);
    // perform button 3's toggle function here
  };

  const toggleButton4 = () => {
    setButton4On(!button4On);
    chat();
  };

  const toggleButton5 = () => {
    setButton5On(!button5On);
    network()
  };

  

  return (
    <div className="dock"><Image 
    className="dock-item"
    src={button1On ? "/toggle/mute1.svg" : "/toggle/mute2.svg"}
    alt="Button 1"
    onClick={toggleButton1}
    height={50}
    width={50}
  />
      <Image 
    className="dock-item"
        src={button2On ? "/toggle/camera1.svg" : "/toggle/camera2.svg"}
        alt="Button 2"
        onClick={toggleButton2}
        height={50}
    width={50}
      />
      <Image 
    className="dock-item"
        src={button3On ? "/toggle/react1.svg" : "/toggle/react2.svg"}
        alt="Button 3"
        onClick={toggleButton3}
        height={50}
    width={50}
      />
      <Image 
    className="dock-item"
        src={button4On ? "/toggle/chat1.svg" : "/toggle/chat2.svg"}
        alt="Button 4"
        onClick={toggleButton4}
        height={50}
    width={50}
      />
      <Image 
    className="dock-item"
        src={button5On ? "/toggle/network1.svg" : "/toggle/network2.svg"}
        alt="Button 5"
        onClick={toggleButton5}
        height={50}
    width={50}
      /><Image 
    className="dock-item"
    src="/toggle/Leave.svg"
    alt="leave"
    onClick={leaveMeet}
    height={50}
    width={50}
  />
    </div>
  );
}

export default ToggleButtons;
