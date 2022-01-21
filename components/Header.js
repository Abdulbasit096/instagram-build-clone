import Image from "next/image";
import { HomeIcon } from "@heroicons/react/solid";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {useRecoilState} from 'recoil'
import {modalState} from '../atoms/modalAtom'

function Header() {
  const { data: session } = useSession();
  const [open , setOpen] = useRecoilState(modalState)

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between  max-w-6xl mx-5 lg:mx-auto">
        {/* Left */}
        <div className="hidden lg:inline-grid relative  w-24 cursor-pointer">
          <Image
            src="https://links.papareact.com/ocw"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="lg:hidden flex-shrink-0 relative  w-10 cursor-pointer">
          <Image
            src="https://links.papareact.com/jjm"
            layout="fill"
            objectFit="contain"
          />
        </div>
        {/* Middle */}
        <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
        {/* Right */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon className="navBtn" />
          <MenuIcon className="h-5 w-5 md:hidden cursor-pointer " />

          {session ? (
            <>
              <div className="relative navBtn">
                <PaperAirplaneIcon className="navBtn rotate-45 " />
                <div className="absolute -top-1 -right-2 text-xs bg-red-500 w-5 h-5 rounded-full text-center text-white animate-pulse ">
                  3
                </div>
              </div>
              <PlusCircleIcon onClick={() =>setOpen(true)} className="navBtnNotHidden" />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />
              <img
                onClick={signOut}
                src={session?.user.image}
                alt="Profile"
                className="h-8 w-8 rounded-full cursor-pointer"
              />
            </>
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
