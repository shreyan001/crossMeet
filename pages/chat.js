import { useAccount } from 'wagmi';
import { Connect } from "../components/Connect";
import Chat from "../components/chat/Chat";

export default function ProductPage() {


  // Fetch data for the product with the specified ID using `id`

  return (
    <div>
      <h1>Product</h1>
      {/* Display product data here */}
      <Connect/>
      <Chat/>
    </div>
  );
}