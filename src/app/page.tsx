import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="bg-black text-white h-screen flex items-center justify-center">
      <div        
        className="p-6 bg-green-500 text-black rounded-full shadow-lg cursor-pointer"
      >
        Hover Me
      </div>
    </div>
  );
}
