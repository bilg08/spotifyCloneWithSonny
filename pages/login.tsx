import { getProviders, signIn } from 'next-auth/react';
type Props = {
  providers: {
    [name:string]:{
      callbackUrl?: string,
      id?: string,
      name?: string,
      signinUrl?: string,
      type?:string
     }
   }
}

function Login({ providers }: Props) {
  return (
    <div className='flex flex-col bg-black min-h-screen w-full justify-center items-center'>
      <img
        alt=''
        className="w-52 mb-5"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png"
      />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={( )=> signIn(provider.id,{callbackUrl:"/"})} className='bg-[#18d860] rounded-full p-5 text-white'>Login with {provider.name}</button>
        </div>
      ))}
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers
    }
  }

}
