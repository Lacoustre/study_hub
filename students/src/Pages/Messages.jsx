import { useState } from "react"
import { Send, Search, Phone, Video, ArrowLeft, Paperclip, Mic, Check, CheckCheck } from "lucide-react"
import { Navbar, Avatar } from '../Components';

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState(null)
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const [toasts, setToasts] = useState([])

  const chats = [
    {
      id: 1,
      name: "Sarah Johnson",
      lastMessage: "Thanks for the math help!",
      time: "2:30 PM",
      unread: 2,
      avatar: "SJ",
      status: "online",
    },
    {
      id: 2,
      name: "Michael Chen",
      lastMessage: "When is our next physics session?",
      time: "1:15 PM",
      unread: 0,
      avatar: "MC",
      status: "online",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      lastMessage: "The chemistry notes were helpful",
      time: "11:45 AM",
      unread: 1,
      avatar: "ER",
      status: "offline",
    },
    {
      id: 4,
      name: "Study Group",
      lastMessage: "Alex: I'll share my notes tomorrow",
      time: "Yesterday",
      unread: 0,
      avatar: "SG",
      status: "offline",
    },
    {
      id: 5,
      name: "Prof. Williams",
      lastMessage: "Office hours are on Monday at 3pm",
      time: "Yesterday",
      unread: 0,
      avatar: "PW",
      status: "offline",
    },
  ]

  const messages = selectedChat
    ? [
        { id: 1, text: "Hi! Ready for our session?", sender: "other", time: "2:25 PM", status: "read" },
        { id: 2, text: "Yes, I have my notes ready", sender: "me", time: "2:26 PM", status: "read" },
        { id: 3, text: "Great! Let's start with calculus", sender: "other", time: "2:27 PM", status: "read" },
        {
          id: 4,
          text: "I was having trouble with derivatives of composite functions. Could you explain the chain rule again?",
          sender: "me",
          time: "2:28 PM",
          status: "read",
        },
        {
          id: 5,
          text: "Of course! The chain rule is used when you have a function inside another function. You take the derivative of the outer function and multiply by the derivative of the inner function.",
          sender: "other",
          time: "2:29 PM",
          status: "read",
        },
        { id: 6, text: "Thanks for the math help!", sender: "other", time: "2:30 PM", status: "delivered" },
      ]
    : []

  const showToast = (message, type = 'success') => {
    const id = Date.now()
    const toast = { id, message, type }
    setToasts(prev => [...prev, toast])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }

  const sendMessage = () => {
    if (message.trim()) {
      setMessage("")
    }
  }

  const handleVideoCall = () => {
    showToast(`Starting video call with ${selectedChat.name}...`, 'info')
  }

  const handleVoiceCall = () => {
    showToast(`Starting voice call with ${selectedChat.name}...`, 'info')
  }



  const handleAttachment = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*,video/*,audio/*,.pdf,.doc,.docx'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        showToast(`Sending ${file.name}`, 'success')
      }
    }
    input.click()
  }

  const handleVoiceNote = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          showToast('Recording voice note...', 'info')
          // Stop the stream after showing toast
          stream.getTracks().forEach(track => track.stop())
        })
        .catch(err => {
          showToast('Microphone access denied', 'error')
        })
    } else {
      showToast('Voice recording not supported', 'error')
    }
  }

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="h-screen bg-blue-50 flex flex-col">
      <Navbar />

      <div className="flex flex-1 h-full overflow-hidden pt-20 sm:pt-32">

        <div className={`${selectedChat ? 'hidden lg:flex' : 'flex'} w-full lg:w-1/3 lg:min-w-[350px] bg-white flex-col border-r border-blue-200`}>

          <div className="p-2 bg-white">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search or start new chat"
                className="w-full pl-10 py-2 bg-blue-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>


          <div className="flex-1 overflow-y-auto">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`px-3 py-3 cursor-pointer hover:bg-blue-50 ${
                  selectedChat?.id === chat.id ? "bg-blue-100" : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Avatar name={chat.name} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-[#111b21] truncate">{chat.name}</h3>
                      <span className={`text-xs ${chat.unread > 0 ? "text-blue-600" : "text-gray-500"}`}>
                        {chat.time}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                      {chat.unread > 0 ? (
                        <span className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {chat.unread}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        <div
          className={`${selectedChat ? 'flex-1' : 'hidden lg:flex lg:flex-1'} flex flex-col bg-blue-25`}
        >
          {selectedChat ? (
            <>

              <div className="px-4 py-3 bg-blue-100 flex justify-between items-center border-l border-blue-200">
                <div className="flex items-center space-x-3 flex-1">
                  <button 
                    className="p-2 hover:bg-blue-200 rounded-full"
                    onClick={() => setSelectedChat(null)}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <Avatar name={selectedChat.name} size="sm" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{selectedChat.name}</h3>
                      <p className="text-xs text-green-500 font-medium">
                        {selectedChat.status === "online" ? "online" : ""}
                      </p>
                    </div>
                    {selectedChat.status !== "online" && (
                      <p className="text-xs text-gray-600">
                        last seen today at 3:45 PM
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-blue-600">
                  <button 
                    className="p-2 hover:bg-blue-200 rounded-full"
                    onClick={handleVideoCall}
                  >
                    <Video className="h-5 w-5" />
                  </button>
                  <button 
                    className="p-2 hover:bg-blue-200 rounded-full"
                    onClick={handleVoiceCall}
                  >
                    <Phone className="h-5 w-5" />
                  </button>
                </div>
              </div>


              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[65%] px-3 py-2 rounded-lg ${
                        msg.sender === "me" ? "bg-blue-500 text-white" : "bg-white text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <div className={`flex items-center justify-end gap-1 mt-1`}>
                        <p className={`text-[10px] ${msg.sender === "me" ? "text-blue-100" : "text-gray-500"}`}>{msg.time}</p>
                        {msg.sender === "me" &&
                          (msg.status === "read" ? (
                            <CheckCheck className="h-3 w-3 text-blue-200" />
                          ) : (
                            <Check className="h-3 w-3 text-blue-200" />
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>


              <div className="p-3 bg-blue-100">
                <div className="flex items-center gap-2">
                  <button 
                    className="p-2 hover:bg-blue-200 rounded-full text-blue-600"
                    onClick={handleAttachment}
                  >
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      placeholder="Type a message"
                      className="w-full py-3 px-4 bg-white border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>
                  <button 
                    className="p-2 hover:bg-blue-200 rounded-full text-blue-600" 
                    onClick={message.trim() ? sendMessage : handleVoiceNote}
                  >
                    {message.trim() ? <Send className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-blue-600 bg-blue-50">
              <div className="text-center max-w-md p-6 hidden lg:block">
                <div className="mx-auto mb-8 w-72 h-72 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="w-48 h-48 bg-blue-200 rounded-full flex items-center justify-center text-6xl text-blue-500">💬</div>
                </div>
                <h2 className="text-3xl font-light text-blue-900 mb-3">TutorChat</h2>
                <p className="text-sm text-blue-700 mb-6">
                  Connect with your tutors and fellow students instantly. Start meaningful conversations that enhance your learning experience.
                </p>
                <div className="text-xs text-blue-500 mt-4">
                  <span>Secure messaging</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="fixed top-20 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out ${
              toast.type === 'success' ? 'bg-green-500 text-white' :
              toast.type === 'error' ? 'bg-red-500 text-white' :
              toast.type === 'warning' ? 'bg-yellow-500 text-white' :
              'bg-blue-500 text-white'
            }`}
          >
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                toast.type === 'success' ? 'bg-green-300' :
                toast.type === 'error' ? 'bg-red-300' :
                toast.type === 'warning' ? 'bg-yellow-300' :
                'bg-blue-300'
              }`} />
              <span className="text-sm font-medium">{toast.message}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}