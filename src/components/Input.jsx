import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import {
  updateDoc,
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

import { RxImage } from 'react-icons/rx';
import { AiOutlineSend } from 'react-icons/ai';
import { IoMdAttach } from 'react-icons/io';

const Input = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (image) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        (error) => {
          // Handle unsuccessful uploads
          // setErr(true);
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, 'chats', data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                data: Timestamp.now(),
                image: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          data: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });

    await updateDoc(doc(db, 'userChats', data.user.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });

    setText('');
    setImage(null);
  };

  return (
    <div className="input h-[50px] bg-white p-5 flex justify-between items-center">
      <input
        type="text"
        placeholder="Type something..."
        className="border-none focus:outline-none  w-full  placeholder:text-gray-400"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send flex items-center gap-3">
        <IoMdAttach size={20} />
        <input
          type="file"
          id="file"
          className="hidden"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="file">
          <RxImage size={20} />
        </label>
        <button onClick={handleSend} className="py-2 px-5 bg-blue-400 rounded">
          <AiOutlineSend size={20} color="#fefe" />
        </button>
      </div>
    </div>
  );
};

export default Input;
