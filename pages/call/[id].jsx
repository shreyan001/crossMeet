import { useEffect, useState,useRef, useContext } from "react";
import Modal from  '../../components/functions/bModal'
import Table from "../../Cards/Table2";
import { Player } from "@livepeer/react";
import axios from 'axios';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { useRouter } from "next/router";
import { useAccount } from 'wagmi';
import Image from "next/image";
import { Connect } from "../../components/Connect";
import ToggleButtons from "../../components/Dock";
import { huddleIframeApp } from "@huddle01/huddle01-iframe";
import Chat from "../../components/chat/Chat";
import Panel from "../../components/Panel";
import { AuthContext } from "../../context/auth";







 export default function Calls() {
  const { address, setHandle } = useContext(AuthContext);
  const router = useRouter();
  const [isOwner,setIsOwner] = useState(false);
  const [isOpen,setOpen] = useState(false);
  const [isdata, setIsData] = useState([]);
 const [callName,setcallName] = useState();
 const [name,setName] = useState([]);
 const [ObjId, setObjId]= useState(null);
 const [logo, setLogo]= useState([]);
 const [tTables, setT]= useState([]);  
 const [addr, setAddr]  = useState([]);  
 const useraddress = address;

   const API = process.env.NEXT_PUBLIC_API_URI;

   const [isVisible, setIsVisible] = useState(false);
   const [isVisible2, setIsVisible2] = useState(false);
   const targetDivRef = useRef(null);
 
   const handleButtonClick = () => {
     setIsVisible(!isVisible);
     if (!isVisible) {
        setTimeout(() => {
          targetDivRef.current.scrollIntoView({ behavior: "smooth" });
        }, 0);
      
     }

   };


 
   const handleButtonClick2 = () => {
     setIsVisible2(!isVisible2);
      
     

   };
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


  const runcall = (name) => {
    if(isOpen === true) {
      toast.error("Please close your existing call first");
    }
    setOpen(true);
    setcallName(name);
  };

  const leaveMeet = () => {
    const { id } = router.query;
    router.push(`/login/meet/${id}`)
  
  };

  
  const tableAdd = async (name)=>{
    
    const toastId  = toast.loading("Loading...");
    if (tTables !== []){name = `table${tTables + 1}`};
      const response = await axios.post(`http://${API}/api/tables/add`, {name,_id:ObjId});
    if (response.status === 200) {
      toast.update(toastId, { render: "Created New Table", type: "success", isLoading: false, autoClose: 5000})
      const { data: userData } = await axios.get(`http://${API}/api/tables/?_id=${ObjId}`);
      setIsData(userData.userDoc);
     ;
    } else {

      toast.update(toastId, { render: "Some error occured", type: "error", isLoading: false, autoClose: 5000 })
      
    };

  }

  
  const tableRender = async (name)=>{
   
    const toastId  = toast.loading("Loading...");
    const addr = useraddress;
      const response = await axios.put(`http://${API}/api/tables/${name}`, {addr,_id:ObjId});
    if (response.status === 200) {
      runcall(name);
      toast.update(toastId, { render: "Joined", type: "success", isLoading: false, autoClose: 5000})
      
     ;
    } else {
      toast.update(toastId, { render: "Some error occured", type: "error", isLoading: false, autoClose: 5000 })
      
    };

  }

  



 useEffect(() => {
  const fetchData = async () => {
    try {
      const { id } = router.query;
      if (id) {
        const { data: callData } = await axios.post(`http://${API}/api/calls/get`, { callId: id });
        setAddr(callData.userDoc.Owner);
        if(callData.userDoc.Owner === useraddress){setIsOwner(true)}
        setName(callData.userDoc.callName);
        setObjId(callData.userDoc._id);
        setLogo(callData.userDoc.callLogo);
      }
      if (ObjId !== null) {
        const { data: userData } = await axios.get(`http://${API}/api/tables/?_id=${ObjId}`);
        setIsData(userData.userDoc);
         setT(isdata?.length);
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

<Modal className="mod1" iframeData={ {
    roomUrl: `http://iframe.huddle01.com/${callName+useraddress}`,
    width: "100%",
    height: "97%",
    noBorder: true,
  }} useraddress="useraddress" isOpen={isOpen} name={callName} onClose={(name)=>{handleDelete(name)}}key={1}/>
    <div className="stream">
    <div className="btn1 overflow-hidden"><img className="pb-3" src={logo} width={500} height={500} alt="V"/></div>
    <div className="miniNav"> <h1 className="font-semibold text-xl mx-3">{name}
         </h1> 
    </div>
   <Image src='/wew.svg' height={40} width={40}/>
   <div className="unit"><div className="flex justify-center items-center"><Panel/></div></div>
    <button onClick={leaveMeet} className="button3 bg-red-600">Leave Meet</button>
  </div>
   {console.log(useraddress,"addr")}
  <div className="sec2">
 <div className="w-full flex flex-row h-10 justify-start items-center">
   <h1 className="text-xl font-semibold ml-1 mb-3">Main Event</h1></div>
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
  {isVisible && <div  ref={targetDivRef}
        className="shadowCall2 w-10/12 mx-auto rounded bg-black2 flex min-h-60 flex-col justify-center items-center gap-y-5 my-10 py-5">
    <h1 className="font-semibold text-xl my-1">Networking Slots</h1>
    <div className="flex flex-row w-10/12 gap-y-2 justify-between items-center flex-wrap">
    {console.log(isOwner)}
    {isdata.map((e,index)=>{
        return <Table tableName={e.tableName} OId={ObjId} key={index} onOpen={(name)=>{tableRender(name)}} />
      })}
      {isOwner && <div className=" shadowCall w-5/12 h-32  bg-[#2a2a2a] rounded-md flex flex-row justify-center items-center">
       <div onClick={()=>{tableAdd()}} className="w-11/12 h-24 cursor-pointer shadowCall3 mx-3 flex flex-row items-center justify-center"><h1 className="text-3xl cursor-pointer font-extrabold">+</h1></div> 
      </div>}</div></div>}

      <ToggleButtons network = {handleButtonClick} chat={handleButtonClick2} leaveMeet={()=>{leaveMeet()}}/>

     
 

       
</>);
}

