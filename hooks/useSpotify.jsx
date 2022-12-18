import { signIn,useSession } from "next-auth/react"
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "49bd11bbfc6e4192a43d3d847ff18db5",
  clientSecret: "10c5dfa0f95c428f8789e875b7440d7e",
});
function useSpotify() {
  const { data: session, status } = useSession();
    useEffect(() => {
    if (session) {
      if (session.error === "refreshTokenError") {
        signIn();
      }
      }
        spotifyApi.setAccessToken(session?.user?.accessToken);
    }, [session]);
      return spotifyApi;

}

export default useSpotify
