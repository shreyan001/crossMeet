import { useRouter } from "next/router";
import { useState } from "react";
import { useAccount } from 'wagmi';
import { Connect } from "../../../components/Connect";
import Notifi from "../../../components/NotifiCard.jsx";

export default function ProductPage() {
 const router = useRouter();
  const { id } = router.query;
  const [isOpen, setOpen] = useState(false);

  // Fetch data for the product with the specified ID using `id`

  return (
    <div>
      <h1>Product {id}</h1>
      {/* Display product data here */}
      <Connect/>
      <Notifi/>
      <button onClick={()=>{router.push(`/call/${id}`)}} className="button1">Enter Meet</button>
    </div>
  );
}