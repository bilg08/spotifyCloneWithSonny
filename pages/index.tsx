import {getSession} from "next-auth/react";
import Center from "../components/Center";
import Player from "../components/Player";
import SideBar from "../components/SideBar";

export default function Home() {
  return (
    <div className="">
      <main className="bg-black h-screen flex overflow-hidden">
        <SideBar />
        <Center />
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
      
    </div>
  );
}
export async function getServerSideProps(context:any) {
  const session = await getSession(context);
  return {
    props: {
      session
    }
  }
}


