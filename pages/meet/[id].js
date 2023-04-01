import { useEffect, useState,useRef, useContext } from "react";
import Modal from  '../../components/functions/Modal'
import Stall from "../../Cards/Stall";
import Table from "../../Cards/Table2";
import Drooms from "../../Cards/Drooms";
import { Player } from "@livepeer/react";
import axios from 'axios';
import { ToastContainer, toast, Slide } from 'react-toastify';
import StallModal from "../../Cards/StallModal";
import { useRouter } from "next/router";
import { useAccount } from 'wagmi';

import Image from 'next/image'
import ToggleButtons from "../../components/Dock";
import Chat from "../../components/chat/Chat";
import ModalForm from "../../components/createRoom";
import Panel from "../../components/Panel";
import { AuthContext } from "../../context/auth";




 function Meets() {
  const router = useRouter();
  const [openTab, setOpenTab] = useState(1);
  const [isOwner,setIsOwner] = useState(false);
  const [isOpen,setOpen] = useState(false);
  const [isOpen2,setOpen2] = useState(false);
  const [isdata, setIsData] = useState([]);
  const [ channel, setChannel] = useState([]);
  const [stalls , setStalls] = useState([]);
 const [meetName,setMeetName] = useState();
 const [stallModal,setstallModal] = useState(false);
 const [stallModalName,setstallModalName] = useState([]);
 const [name,setName] = useState([]);
 const [ObjId, setObjId]= useState(null);
 const [logo, setLogo]= useState([]);
 const [addr, setAddr]  = useState([]);  
const [isVisible, setIsVisible] = useState(false);
 const [isVisible2, setIsVisible2] = useState(false);
 const [tTables, setT]= useState([]);  
 const targetDivRef = useRef(null);
 const [Room, setRoom] = useState(false); 
 const { address, setHandle } = useContext(AuthContext);

 const handleButtonClick = () => {
   setIsVisible(!isVisible);
   if (!isVisible) {
      setTimeout(() => {
        targetDivRef.current.scrollIntoView({ behavior: "smooth" });
      }, 10);
    
   }

 };  const tableAdd = async ()=>{
    
  const toastId  = toast.loading("Loading...");
  let name;
  if (tTables !== []){name = `table${tTables + 1}`};
    const response = await axios.post(`http://${API}/api/tables/add`, {name,_id:ObjId});
  if (response.status === 200) {
    toast.update(toastId, { render: "Created New Table", type: "success", isLoading: false, autoClose: 5000})
    const { data: userData } = await axios.get(`http://${API}/api/tables/?_id=${ObjId}`);
    setIsData(userData.userDoc);
    setT(isdata?.length);
   ;
  } else {

    toast.update(toastId, { render: "Some error occured", type: "error", isLoading: false, autoClose: 5000 })
    
  };

}

const roomAdd = async ()=>{
    
setRoom(true);

}

const handleButtonClick2 = () => {
   setIsVisible2(!isVisible2);
 };

 const leaveMeet = () => {
  const { id } = router.query;
  router.push(`/login/meet/${id}`)

};
   


 const useraddress = address;
  console.log(useraddress);
   const API = process.env.NEXT_PUBLIC_API_URI;


   const handleDelete = async(name1) => {
    try {
      const response = await axios.delete(
        `http://${API}/api/tables/${name1}/`,
        { data: { addr: useraddress, _id: ObjId } }
      );
  
      if (response.status === 204 || response.status === 200) {
        setOpen(false);     
      } else {
        console.log("Failed to delete address");
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  const handleDelete2 = async(name1) => {
 
    try {
      const response = await axios.delete(
        `http://${API}/api/stalls/${name1}/`,
        { data: { addr: useraddress, _id: ObjId } }
      );
  
      if (response.status === 204 || response.status === 200) {
        setOpen2(false);     
      } else {
        console.log("Failed to delete address");
      }
    } catch (error) {
      console.log(error);
    }
    };

  

  const runMeet = (name) => {
    if(isOpen === true) {
      toast.error("Please close your existing meet first");
    }
    setOpen(true);
    setMeetName(name);
  };

  const runMeet2 = (name) => {
    if(isOpen === true) {
      toast.error("Please close your existing meet first");
    }
    setOpen2(true);
    setMeetName(name);
    setstallModal(false);
  };


  const runModal = (name) => {
    if(stallModal === true) {
      toast.error("Please close your existing meet first");
    }
    setstallModal(true);
    setstallModalName(name);
  };

  
  const tableRender = async (name)=>{
   
    const toastId  = toast.loading("Loading...");
    const addr = useraddress;
      const response = await axios.put(`http://${API}/api/tables/${name}`, {addr,_id:ObjId});
    if (response.status === 200) {
      runMeet(name);
      toast.update(toastId, { render: "Joined", type: "success", isLoading: false, autoClose: 5000})
      
     ;
    } else {
      toast.update(toastId, { render: "Some error occured", type: "error", isLoading: false, autoClose: 5000 })
      
    };

  }

  const tableRender2 = async (name)=>{
   
    const toastId  = toast.loading("Loading...");
    const addr = useraddress;
      const response = await axios.put(`http://${API}/api/stalls/${name}`, 
       {addr,_id:ObjId}
      
      );
    if (response.status === 200) {
      runMeet2(name);
      toast.update(toastId, { render: "Joined", type: "success", isLoading: false, autoClose: 5000})
      
     ;
    } else {
      toast.update(toastId, { render: "Some error occured", type: "error", isLoading: false, autoClose: 5000 })
      
    };

  }



 const channelToast = ()=> {
   toast.success("channels will be implemented soon");
 }
 useEffect(() => {
  const fetchData = async () => {
    try {
      const { id } = router.query;
      if (id) {
        const { data: meetData } = await axios.post(`http://${API}/api/meets/get`, { meetId: id });
        console.log(meetData);
        if(meetData.userDoc.Owner === useraddress){setIsOwner(true)}
        setName(meetData.userDoc.meetName);
        setObjId(meetData.userDoc._id);
        setLogo(meetData.userDoc.meetLogo);
        setAddr(meetData.userDoc.Owner);
      }
      if (ObjId !== null) {
        const { data: userData } = await axios.get(`http://${API}/api/tables/?_id=${ObjId}`);
        setIsData(userData.userDoc);

        const { data: channelsData } = await axios.get(`http://${API}/api/channels/?_id=${ObjId}`);
        setChannel(channelsData.userDoc);

        const { data: stallsData } = await axios.get(`http://${API}/api/stalls/?_id=${ObjId}`);
        setStalls(stallsData.userDoc);
        console.log(stallsData.userDoc);
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while fetching data');
    }
  };
  fetchData();
}, [router.query, ObjId]);

 
 
 
  return (
    <>
    
<ToastContainer
transition={Slide}
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
{console.log(ObjId)}
<StallModal stallModal={stallModal} OId={ObjId} name={stallModalName} onOpen={(name)=>tableRender2(name)} onClose={()=>{setstallModal(false)}}/>
<Modal className="mod1" iframeData={ {
    roomUrl: `http://iframe.huddle01.com/${meetName+useraddress}`,
    width: "100%",
    height: "97%",
    noBorder: true,
  }} useraddress="useraddress" isOpen={isOpen} name={meetName} onClose={(name)=>{handleDelete(name)}}key={1}/>
<ModalForm isOpen={Room} ObjId={ObjId} onClose={()=>{setRoom(false)}}/>
<Modal className="mod1" iframeData={ {
    roomUrl: `http://iframe.huddle01.com/${meetName+useraddress}`,
    width: "100%",
    height: "97%",
    noBorder: true,
  }} useraddress="useraddress" isOpen={isOpen2} name={meetName} onClose={(name)=>{handleDelete2(name)}} key={2}/>

    <div className="stream">
    <div className="btn1 overflow-hidden"><img className="pb-3" src={logo} width={500} height={500} alt="V"/></div>
    
    <div className="miniNav px-3"> <h1>{name}
         </h1> 
    </div>
    <Image src='/wew.svg' height={40} width={40}/>
   <div className="unit"><div className=" bg-black rounded-lg ml-1 p-1"><Image src='/1212.svg' height={20} width={20}/>
   </div><div className="flex justify-center items-center"><Panel/></div></div>
    <button onClick={()=>{leaveMeet()}} className="button3 bg-red-600">Leave Meet</button>
  </div>
   
  <div className="sec2">
 <div className="w-full flex flex-row h-10 justify-center items-center">
   <h1 className="text-xl font-semibold mb-6">Main Event</h1></div>
 <div className="w-full flex gap-4 items-center justify-center flex-row"><div className="streamb">
<Player
      title="stream"
      playbackId="8dd55f8l5jsiyhd8"
      showPipButton
      objectFit="cover"
      priority
    /></div> 
{isVisible2 && <Chat addr={addr} logo={logo}/>}
  </div></div>
  {isVisible && <div ref={targetDivRef} className='MeetShadow'>
      <div  className="flex flex-wrap w-10/12 my-4 mx-auto rounded-sm ">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  " MeetShadow px-6 py-5 rounded block text-xl leading-normal font-semibold " +
                  (openTab === 1
                    ? "text-white bg-" + '#1c1c1c' + "-600"
                    : "text-" + '#1c1c1c' + "-600 bg-[#1c1c1c]")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Stalls
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xl font-semibold MeetShadow px-3 py-5 rounded block leading-normal " +
                  (openTab === 2
                    ? "text-white bg-" + '#1c1c1c' + "-600"
                    : "text-" + '#1c1c1c' + "-600 bg-[#1c1c1c]")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                 Open Tables
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xl font-semibold MeetShadow px-1 py-5 shadow-lg rounded block leading-normal " +
                  (openTab === 3
                    ? "text-white bg-" + '#1c1c1c' + "-600"
                    : "text-" + '#1c1c1c' + "-600 bg-[#1c1c1c]")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                 Discussion Rooms
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-[#1c1c1c] MeetShadow w-full mb-6 shadow-lg  rounded">
            <div className="px-3 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                <div className="w-11/12 z-10 mx-auto rounded-2xl flex min-h-60 flex-wrap justify-between gap-y-5 py-5">

      {stalls.map((e)=>{
        return <Stall title={e.titleName} OId={ObjId} stallName={e.stallName} host={e.host} onOpen={(name)=>{runModal(name);}} key={e._id}/>
      })}
    {isOwner && <div  className=" cursor-pointer w-4/12 h-32 p-2 addTab">
    <div className="addTabin flex flex-col items-center h-full justify-center gap-3">
    <h1 className="text-2xl font-extrabold">+</h1><h1 className="font-semibold">Create Stall</h1></div></div>}
      
    </div>
      
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                <div className="w-11/12 z-20 mx-auto rounded-2xl flex min-h-60 flex-wrap justify-around gap-y-5 py-5">

    {isdata.map((e,index)=>{
        return <Table tableName={e.tableName} OId={ObjId} key={index} onOpen={(name)=>{tableRender(name)}} />
      })}
      {isOwner && <div onClick={()=>{tableAdd()}} className="w-4/12 cursor-pointer h-32 p-2 addTab">
    <div className="addTabin z-30 flex flex-col items-center h-full justify-center gap-3 ">
    <h1 className="text-2xl font-extrabold">+</h1><h1 className="font-semibold">Create Table</h1></div></div>}</div>
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
               <div className="w-11/12 mx-auto rounded-2xl flex min-h-60 flex-wrap justify-between gap-y-5 py-5">

      {channel.map((e)=>{
        return <Drooms channelName={e.channelName} OId={ObjId} host={e.host} topicName={e.topicName}  onOpen={()=>channelToast()} key={e._id}/>
      })}  {isOwner && <div onClick={()=>{roomAdd()}} className="w-4/12 h-32 p-2 cursor-pointer addTab">
    <div className="addTabin flex flex-col items-center h-full justify-center gap-3">
    <h1 className="text-2xl font-extrabold">+</h1><h1 className="font-semibold">Create Room</h1></div></div>}
      </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>}
      <ToggleButtons network = {handleButtonClick} chat={handleButtonClick2} leaveMeet={()=>{leaveMeet()}}/>
    
 

       
  </>);
}

export default Meets;