'use client';

import { VidCard } from "@components/VidCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {

  const [videos, setVideos] = useState([]);

  // const apiKey = process.env.ALPHA_KEY;

  const getVideos = async () => {
    console.log('Fetching videos...');
    try {
      const res = await axios.get('/api/videos');
      // console.log(res.data.videos);
      setVideos(res.data.videos);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getVideos();
  },[])

  return (
    <main className="flex flex-col">
      <div className=" bg-blue-300 flex items-center h-16">
        <h1 className="text-4xl font-bold ml-10">Finskool</h1>
      </div>
      <div className=" min-h-screen">
        <div className="px-16 py-8">
          <div className="bg-slate-200 flex justify-between items-center">
            <div className="flex-1 bg-slate-300">One</div>
            <div className="flex-1 bg-slate-400">Two</div>
          </div>
          <h2 className="text-3xl font-semibold my-4">Some Works...</h2>
          {/* <button onClick={() => getVideos()}>Click me</button> */}
          <div>
            {
              videos.map((vid) => {
                return (
                  <div key={vid._id}>
                    <VidCard vidLink={vid.link} stkids={vid.stkids} title={vid.title} />
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      <div className=" h-32 bg-slate-800 text-white">Footer</div>
    </main>
  );
}