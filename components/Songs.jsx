import { useRecoilValue } from "recoil";
import { playListState } from "../atoms/playListAtom";
import Song from "./song";

function Songs() {
    const playlist = useRecoilValue(playListState);

    return <div className="text-white">
        {playlist?.tracks?.items.map((track,i) => (
            <Song track={track}  key={track.id} order={i} />
       ))}
    </div>;
}
export default Songs