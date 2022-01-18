import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";

const posts = [
  {
    id: "123",
    username: "a.bdul_b.asit",
    userImg: "https://avatars.githubusercontent.com/u/55397611?v=4",
    image: "https://avatars.githubusercontent.com/u/55397611?v=4",
    caption: "This is me",
  },
  {
    id: "123",
    username: "a.bdul_b.asit",
    userImg: "https://avatars.githubusercontent.com/u/55397611?v=4",
    image: "https://avatars.githubusercontent.com/u/55397611?v=4",
    caption: "This is me",
  },
  {
    id: "123",
    username: "a.bdul_b.asit",
    userImg: "https://avatars.githubusercontent.com/u/55397611?v=4",
    image: "https://avatars.githubusercontent.com/u/55397611?v=4",
    caption: "This is me",
  },
  {
    id: "123",
    username: "a.bdul_b.asit",
    userImg: "https://avatars.githubusercontent.com/u/55397611?v=4",
    image: "https://avatars.githubusercontent.com/u/55397611?v=4",
    caption: "This is me",
  },
];

function Posts() {
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.username}
          userImg={post.userImg}
          image={post.image}
          caption={post.caption}
        />
      ))}
    </div>
  );
}

export default Posts;

function Post({ id, username, userImg, image, caption }) {
  return (
    <div className='bg-white my-7 border rounded-sm'>
      {/* Header */}
      <div className="flex items-center p-5">
        <img
          src={userImg}
          className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
        />
        <p className="flex-grow font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>
      {/* Image */}
      <img className="w-full  object-cover" src={image} alt="" />
      {/* Buttons */}
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="flex items-center justify-center space-x-3">
          <HeartIcon className="navBtnNotHidden" />
          <ChatIcon className="navBtnNotHidden" />
          <PaperAirplaneIcon className="navBtnNotHidden" />
        </div>
        <div>
          <BookmarkIcon className="navBtnNotHidden" />
        </div>
      </div>
      {/* Captions */}
     <p className='p-5 truncate'>
        <span className='font-bold mr-1'>{username}</span> 
        {caption}
     </p>
      <form className="flex items-center p-4">
        <EmojiHappyIcon className="h-7"/>
        <input type="text" 
        placeholder='Add a comment...'
        className="border-none flex-1 focus:ring-0 outline-none"  />
        <button className='font-semibold text-blue-400' type="submit">Post</button>
      </form>
      {/* Input */}
    </div>
  );
}
