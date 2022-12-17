import { atom } from "recoil"; 

type PlayListType = {
    collaborative?: boolean,
    description?: string,
    external_urls?: {
        spotify:string
    },
    followers?: {
        href: string | null,
        total:number
    },
    href?: string,
    id?: string,
    images?: [
        {
            url: string,
            height: number,
            width:string
        }
    ],
    name?:string
};
export const playListState: {
  key: string,
  default?: PlayListType
} = atom({
  key: "playListState",
  default: {
    images: [{
      url:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png'

    }
  ]}
});

export const playListIdState = atom({
  key: "playListIdState",
  default: "6x4K8mELaYqJe3kh0fFPoH",
});