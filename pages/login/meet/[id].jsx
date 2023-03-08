import { useRouter } from "next/router";
import { useAccount } from 'wagmi';
import { Connect } from "../../../components/Connect";

export default function ProductPage() {
 const router = useRouter();
  const { id } = router.query;

  // Fetch data for the product with the specified ID using `id`

  return (
    <div>
      <h1>Product {id}</h1>
      {/* Display product data here */}
      <Connect/>
      <button onClick={()=>{router.push(`/meet/${id}`)}} className="button1">Enter Meet</button>
    </div>
  );
}
