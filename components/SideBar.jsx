import {
  HomeIcon,
  MagnifyingGlassIcon,
  BuildingLibraryIcon,
  RssIcon,
  HeartIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import {playListIdState} from '../atoms/playListAtom'
function SideBar() {

  const spotifyApi = useSpotify();
  const { data: session } = useSession();

  const [playlists, setPlaylists] = useState();
  const [playlistid, setPlaylistid] = useRecoilState(playListIdState);


  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className="hidden md:inline text-gray-500 scrollbar-hide overflow-scroll p-5 border-r border-gray-900">
      <div className="space-y-4">
        <button
          onClick={() => signOut()}
          className="flex items-center space-x-2 hover:text-white">
          <p>Logout</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <BuildingLibraryIcon className="h-5 w-5" />
          <p>Library</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <MagnifyingGlassIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
      </div>
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Your episodes</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        {/* PlayList */}
        {playlists?.map((playlist) => (
          <p onClick={() => {
            setPlaylistid(playlist.id);
          }} key={playlist.id}>
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
