import { useState,useEffect} from 'react';
import axios from 'axios';
export default function Table({onOpen,tableName,OId}){
   const API = process.env.NEXT_PUBLIC_API_URI;
    const [isdata, setData] = useState([]); 
    
    let x = 4 - isdata.length;
 
    const synx2 = async(name) => {
      const {data} = await axios.get(`http://${API}/api/tables/${name}/?_id=${OId}`) 
      console.log(data, name)
      let data2 = data;
     if (data2) {
       
    const {data} = await axios.post(`http://${API}/api/users`, {addr:data2,_id:OId} )
    console.log(data,name);
    setData(data);
    }};

    useEffect(() => {
      synx2(tableName); 
  }, []);

 useEffect(() => {
    const intervalId = setInterval(() => {
    synx2(tableName); 

    }, 10000);

    return () => clearInterval(intervalId);
  }, [isdata]);

const items = new Array(x).fill(null);


    return (
               
        <div className=" shadowCall flex flex-wrap items-center justify-center gap-4 w-5/12 h-32 bg-[#2a2a2a] px-4 py-2 rounded-sm ">{console.log(isdata,tableName)}
           {isdata.map((i)=>{return <div className="profles2">{console.log(isdata)}
               <div className="image-clip2"><img src={ i.image} alt={i.name}/></div> 
                <div className=" font-normal">{i.name}</div>
            </div>})}
{items.map((_, idx) => <div key={idx} onClick={()=>{onOpen(tableName),synx2(tableName)}} className="joinCall cursor-pointer">
  <div className=" flex flex-col items-center justify-center px-4 rounded-sm"><h3 className=' mt-4 font-bold text-lg'>+</h3><h4 className='font-semibold text-sm'>Join</h4></div></div>)}
           </div>
    )
                    
 
} 