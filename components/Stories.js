function Stories() {
  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 rounded-sm overflow-x-scroll">
      <Story
        image="https://avatars.githubusercontent.com/u/55397611?v=4"
        username="Abdul Basit"
      />
      <Story
        image="https://avatars.githubusercontent.com/u/55397611?v=4"
        username="Abdul Basit"
      />
      <Story
        image="https://avatars.githubusercontent.com/u/55397611?v=4"
        username="Abdul Basit"
      />
      <Story
        image="https://avatars.githubusercontent.com/u/55397611?v=4"
        username="Abdul Basit"
      />
      <Story
        image="https://avatars.githubusercontent.com/u/55397611?v=4"
        username="Abdul Basit"
      />
      <Story
        image="https://avatars.githubusercontent.com/u/55397611?v=4"
        username="Abdul Basit"
      />
      <Story
        image="https://avatars.githubusercontent.com/u/55397611?v=4"
        username="Abdul Basit"
      />
      <Story
        image="https://avatars.githubusercontent.com/u/55397611?v=4"
        username="Abdul Basit"
      />
    </div>
  );
}

export default Stories;

function Story({ image, username }) {
  return (
    <div>
      <img
        src={image}
        className=" rounded-full p-[1.5px] object-contain border-2 border-red-400 cursor-pointer"
      />
      <p className="text-xs w-14 truncate text-center">{username}</p>
    </div>
  );
}
