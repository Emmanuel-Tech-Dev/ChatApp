import React from 'react';
import SideBar from '../components/SideBar';
import Chat from '../components/Chat';

const Home = () => {
  return (
    <div>
      <div className="home bg-blue-300  flex justify-center items-center h-[100vh]">
        <div className="container border-2 w-[60%] h-[80%] rounded-md flex overflow-hidden ">
          <SideBar />
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Home;
