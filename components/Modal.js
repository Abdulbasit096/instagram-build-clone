import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { CameraIcon } from "@heroicons/react/outline";
import { storage, db } from "../firebase";
import { collection, addDoc,serverTimestamp,updateDoc, doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import {ref , getDownloadURL,uploadString} from 'firebase/storage';

function Modal() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = useRef();
  const captionRef = useRef();
  const [loading, setLoading] = useState(false);

  const [selectedfile, setSelectedFile] = useState(null);

  const addImageToPost = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (event) => {
      setSelectedFile(event.target.result);
    };
  };

  const uploadPost = async () => {
    if (loading) return;
    setLoading(true);

    const collRef = collection(db, "posts");
    const docRef = await addDoc(collRef, {
      username: session.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp()
    });
    console.log(docRef.id);
    const imageRef = ref(storage,`posts/${docRef.id}/image`);
    await uploadString(imageRef , selectedfile , "data_url").then(async snapshot => {
        const downloadUrl = await getDownloadURL(imageRef);

        await updateDoc(doc(db,'posts',docRef.id),{
            image: downloadUrl
        })

    })

    setLoading(false);
    setSelectedFile(null);
    setOpen(false);


  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></Dialog.Overlay>
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-0 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                {!selectedfile ? (
                  <div
                    onClick={() => filePickerRef.current.click()}
                    className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-red-100 cursor-pointer"
                  >
                    <CameraIcon
                      className="w-6 h-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                ) : (
                  <div>
                    <img
                      onClick={() => setSelectedFile(null)}
                      title="Click to remove image"
                      className="w-full cursor-pointer object-contain"
                      src={selectedfile}
                      alt=""
                    />
                  </div>
                )}

                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Upload a photo
                    </Dialog.Title>
                    <div>
                      <input
                        type="file"
                        ref={filePickerRef}
                        hidden
                        onChange={addImageToPost}
                      />
                    </div>
                    <div>
                      <input
                        placeholder="Add a caption"
                        ref={captionRef}
                        className="border-none focus:ring-0 w-full text-center"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                  onClick={uploadPost}
                  disabled={!selectedfile}
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm  px-4 py-2 bg-red-600 text-base font-medium text-white  hover:bg-red-700  focus:outline-none focus:ring-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                  >
                    {loading ? 'Uploading' : 'Upload Post'}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
