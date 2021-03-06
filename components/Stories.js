import { useEffect, useState } from "react";
import {useSession} from 'next-auth/react';


function Stories() {
  const [suggestions, setSuggestions] = useState([]);
  const { data:session} = useSession();


  useEffect(() => {
    fetch('https://api.github.com/users?page=1&per_page=25')
    .then(res => res.json())
    .then(data => setSuggestions(data))
  }, []);

  return (
    <div className="flex space-x-2 p-6 bg-white shadow-sm mt-8 border-gray-200 rounded-sm overflow-x-scroll scrollbar-hide">
      {session && <Story username={session.user.username} image={session.user.image} />}
      {suggestions?.map((profile)=>(
        <Story image={profile.avatar_url} username={profile.login} key={profile.id} />
      ))}
    </div>
  );
}

export default Stories;

function Story({ image, username }) {
  return (
    <div>
      <img
        src={image}
        className=" rounded-full p-[1.5px] object-contain border-2 border-red-400 cursor-pointer hover:scale-110 transition transform duration-200 ease-out"
      />
      <p className="text-xs w-14 truncate text-center">{username}</p>
    </div>
  );
}
