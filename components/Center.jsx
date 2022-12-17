import { useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { use, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playListIdState,playListState } from "../atoms/playListAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";


const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];


function Center() {
    const { data: session, status } = useSession();
    const spotifyApi = useSpotify();
    const [color, setColor] = useState(null);
    const playlistid = useRecoilValue(playListIdState);
    const [playlist, setPlayList] = useRecoilState(playListState);
  
    useEffect(() => {
      const number = Math.floor(Math.random() * colors.length);
      const randomColor = colors[number];
      setColor(randomColor);
    }, [playlistid]);

    useEffect(() => {
       spotifyApi
          .getPlaylist(playlistid)
         .then(async (data) => {
             setPlayList(data.body);
            });
    }, [spotifyApi, playlistid]);
    
  return (
    <div className="flex-grow text-white h-screen overflow-scroll scrollbar-hide">
      <header className="absolute rounded-full top-5 right-8">
        <div className="flex bg-black   items-center space-x-3  cursor-pointer p-1 pr-2 rounded-full">
          <img
            alt=""
            className="rounded-full w-10 h-10"
            src={`${
              session?.user?.image
                ? session?.user?.image
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png"
            }`}
          />
          <h1>{session?.user?.name}</h1>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80`}>
        <img className="w-44 h-44" src={playlist?.images[0]?.url} />
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">PlayList</h1>
          <p className="text-2xl font-bold">{playlist?.name}</p>
        </div>
      </section>
      <Songs />
    </div>
  );
}


export default Center;
