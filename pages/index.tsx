import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import axios from "axios"
import { useState } from "react";
import Lottie from "react-lottie-player"
import lottiJson from "../public/5326-loading-10-cooker.json"
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [text,setText] = useState("");
  const [dish,setDish] = useState("");
  const [isLoading,setLoading] = useState(false)
  let handleSubmit = async () => {
    try {
      setLoading(true)
      const dishResp = await axios.post("/api/chat",{dish})
      if(dishResp.data.error){
        throw new Error(dishResp.data)
      }
      setText(dishResp.data.aiResp.choices[0].text)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setText("")
      alert("Something went wrong")
      console.log(error)
    }
  }
  return (
    <>
      <div className="flex flex-col items-center mt-8">
        <div className="">
          <img src="/logo.png" width={140} />
        </div>
        <div className="mt-6 text-center">
          <h1 className="font-serif text-4xl">
            Give me Step-by-step Instruction to Prepare
          </h1>
        </div>
        <div className="mt-6">
          <input
          type="text"
          className="p-1 mr-2 text-3xl text-center border-b-2 border-slate-500 bg-amber-50"
          onChange={(e) => setDish(e.target.value)}
          value={dish}
          
          />
        </div>
        <div className="mt-6">
          <button 
          disabled={isLoading}
          onClick={handleSubmit} className="p-2 bg-orange-400 rounded">
            Get me..
          </button>
        </div>
        {
          isLoading ? <Lottie
          loop
          play
          animationData={lottiJson}
          className="mx-auto"
          style={{width:150,height:150}}
          /> : 
          <div className="w-2/3 p-4 mt-6 rounded-lg ">
          <p style={{ whiteSpace: "pre-line" }}>
            {text}
          </p>
        </div>
        }
      </div>
    </>
  );
}
