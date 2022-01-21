import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Moment from "react-moment";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),

    [db]
  );

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          image={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
}

export default Posts;

function Post({ id, username, userImg, image, caption }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setComments(snapshot.docs);
        }
      ),

    [id]
  );
  useEffect(
    () =>
      onSnapshot(query(collection(db, "posts", id, "likes")), (snapshot) => {
        setLikes(snapshot.docs);
      }),

    [id]
  );

  const likePost = async () => {
    await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
      username: session.user.username,
    });
  };
  const removeLikePost = async () => {
    await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
  };

  const sentComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="bg-white my-7 border rounded-sm">
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
      <img className="w-full  object-cover" src={image}/>
      {/* Buttons */}

      {session && (
        <div className="flex items-center justify-between px-4 pt-4">
          <div className="flex items-center justify-center space-x-3">
            {likes.filter((like) => like.id === session.user.uid)
              .length > 0 ? (
              <HeartIconFilled
                className="navBtnNotHidden text-red-500"
                onClick={removeLikePost}
              />
            ) : (
              <HeartIcon onClick={likePost} className="navBtnNotHidden" />
            )}
            <ChatIcon className="navBtnNotHidden" />
            <PaperAirplaneIcon className="navBtnNotHidden" />
          </div>
          <div>
            <BookmarkIcon className="navBtnNotHidden" />
          </div>
        </div>
      )}
      <p className="mt-4 ml-4 font-bold">
        {likes.length} {likes.length > 1 ? "Likes" : "Like"}
      </p>
      {/* Caption */}
      <p className="p-5 truncate">
        <span className="font-bold mr-1">{username}</span>
        {caption}
      </p>

      <div className="ml-10 h-20 overflow-y-scroll scrollbar-hide">
        {comments.length > 0 &&
          comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-4 mb-3">
              <img
                className="h-8 w-8 rounded-full"
                src={comment.data().profileImg}
              />
              <p className="text-sm flex-1 ">
                <span className="font-bold">{comment.data().username} </span>
                {comment.data().comment}
              </p>
              <Moment fromNow className="pr-5 text-sm">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
      </div>

      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Add a comment..."
            className="border-none flex-1 focus:ring-0 outline-none"
          />
          <button
            onClick={(e) => sentComment(e)}
            type="submit"
            disabled={!comment.trim()}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
      {/* Input */}
    </div>
  );
}
