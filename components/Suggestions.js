import { useState, useEffect } from "react";



function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/users?page=1&per_page=5')
    .then(res => res.json())
    .then(data => setSuggestions(data))
  }, []);

  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
        <button className="text-gray-600 font-semibold">See All</button>
      </div>

        {suggestions?.map((profile)=>(
            <div className='flex items-center justify-between mt-3' key={profile.id}>
                <img className="h-10 w-10 rounded-full border p-[2px]" src={profile.avatar_url} alt="" />
                <div className='flex-1 ml-4'>
                    <h2 className='font-semibold text-sm'>{profile.login}</h2>
                    <h3 className='text-sm text-gray-400'>Works at Google</h3>
                </div>
                <button className='text-blue-400 text-sm'>Follow</button>
            </div>
        ))}



    </div>
  );
}

export default Suggestions;
