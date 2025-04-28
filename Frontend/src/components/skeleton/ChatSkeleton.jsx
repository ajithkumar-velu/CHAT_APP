import React from 'react'


const ChatSkeleton = () => {
    return (
        <div className='flex-1 px-5 overflow-y-auto' >
            {Array(11).fill(null).map((msg, idx) => (
                <div key={idx} className={`chat ${idx%2 === 0 ? "chat-end" : "chat-start"}`}>
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full skeleton">
                            
                        </div>
                    </div>
                    <div className="chat-header mb-1">
                        {/* Obi-Wan Kenobi */}
                        <time className="text-xs opacity-50"><p className='w-11 h-3 skeleton' ></p></time>
                    </div>
                    <div className="chat-bubble skeleton"><p className='w-36 h-6' ></p></div>
                    <div className="chat-footer opacity-50 skeleton mt-1"><p className='w-20 h-3' ></p></div>
                </div>
            ))}
            
        </div>
    )
}

export default ChatSkeleton