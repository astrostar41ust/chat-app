import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import { ChatContext } from '../../context/ChatContest'

const HomePage = () => {

    const { selectedUser } = useContext(ChatContext)

  return (
    <div className='border border-blue-800/50 w-full h-screen sm:px-[15%] sm:py-[5%] bg-black'>
        
        <div className={`backdrop-blur-xl border-2 border-blue-600/50 rounded-2xl bg-gradient-to-br from-blue-900/20 to-black/40
        overflow-hidden h-[100%] grid  relative ${selectedUser ? 'md:grid-cols-[1fr_1.75fr] lg:grid-cols-[1fr_1.75fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' : 'md:grid-cols-2'}   `}>
            <Sidebar/>
            <ChatContainer />
            <RightSidebar  />

        </div>

    </div>
  )
}

export default HomePage