import { useRouter } from "next/router";
import { useAccount } from 'wagmi';
import { Connect } from "../../../components/Connect";
import Panel from "../../../components/Panel"
import { ToastContainer, toast, Slide } from 'react-toastify';

export default function ProductPage() {
 const router = useRouter();
  const { id } = router.query;

  // Fetch data for the product with the specified ID using `id`

  return (
    <div>
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
      <h1>Product {id}</h1>
      {/* Display product data here */}
     
      <Connect/><Panel/>
      <button onClick={()=>{router.push(`/meet/${id}`)}} className="button1">Enter Meet</button>
    </div>
  );
}
