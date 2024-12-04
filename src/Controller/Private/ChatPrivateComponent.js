/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const AdminChatComponent = () => {
  const urlapi = process.env.REACT_APP_API_BASE_URL;

  const [tabchatAdmin, setTabchatAdmin] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [adminMessage, setAdminMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessageNotifications, setNewMessageNotifications] = useState({});
  
  // New state for mobile sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch chat list
  useEffect(() => {
    const fetchChatList = () => {
      const payload = {
        Receiver: 'admin@manhduc'
      };
      axios
        .post(`${urlapi}/api/ChatHub/GetAdminAll`, payload)
        .then((res) => {
          setTabchatAdmin(res.data.data);
        })
        .catch((error) => console.error(error));
    };
    const interval = setInterval(fetchChatList, 5000);
  
    fetchChatList();
  
    return () => clearInterval(interval);
  }, []);

  // Fetch messages for active user
  useEffect(() => {
    if (activeUser) {
      const interval = setInterval(() => {
        const payloadForGet = {
          Sender: activeUser,
          Receiver: 'admin@manhduc',
          MessageContent: ''
        };
        axios
          .post(`${urlapi}/api/ChatHub/GetChat`, payloadForGet)
          .then((res) => {
            if (res.data && res.data.data) {
              // Check for new messages
              const newMessages = res.data.data.filter(
                msg => !messages.some(existingMsg => 
                  existingMsg.Timestamp === msg.Timestamp && 
                  existingMsg.MessageContent === msg.MessageContent
                )
              );

              // Update notifications
              if (newMessages.length > 0 && activeUser !== 'admin@manhduc') {
                setNewMessageNotifications(prev => ({
                  ...prev,
                  [activeUser]: (prev[activeUser] || 0) + newMessages.length
                }));
              }

              setMessages(res.data.data);
            }
          })
          .catch((err) => console.error(err));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [activeUser]);

  // Handle user selection
  const handleSelectUser = (user) => {
    setActiveUser(user.Sender);
    setMessages([]);
    // Clear notifications for this user
    setNewMessageNotifications(prev => {
      const updated = {...prev};
      delete updated[user.Sender];
      return updated;
    });
    
    // Close sidebar on mobile after selecting user
    setIsSidebarOpen(false);
  };

  // Send message
  const handleSendMessage = () => {
    if (!adminMessage.trim()) return;

    const payload = {
      Sender: 'admin@manhduc',
      Receiver: activeUser,
      MessageContent: adminMessage
    };

    axios
      .post(`${urlapi}/api/ChatHub/PushSender`, payload)
      .then((res) => {
        if (res.data && res.data.data[0].ErrorCode === 0) {
          setAdminMessage('');
        } else {
          console.error('Gửi tin nhắn thất bại');
        }
      })
      .catch((err) => console.error('Lỗi khi gửi tin nhắn', err));
  };

  // Filtered and searched user list
  const filteredUsers = useMemo(() => {
    return tabchatAdmin.filter(user => 
      user.Sender.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tabchatAdmin, searchTerm]);

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 relative">
      {/* Hamburger Menu for Mobile */}
      <button 
        className="md:hidden absolute top-4 left-4 z-50 p-2 bg-white rounded-lg "
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 6h16M4 12h16M4 18h16" 
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div 
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          md:relative md:block md:w-1/4 lg:w-1/5 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        <div className="sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-center p-4 border-b">Danh sách người dùng</h2>
          {/* Search input */}
          <div className="p-4">
            <input 
              type="text" 
              placeholder="Tìm kiếm người dùng..." 
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* User List */}
        <div className="overflow-y-auto">
          {filteredUsers.map((e, index) => (
            <div
              key={index}
              className={`p-4 cursor-pointer border-b flex justify-between items-center 
                ${activeUser === e.Sender ? 'bg-blue-100' : 'hover:bg-gray-50'}`}
              onClick={() => handleSelectUser(e)}
            >
              <div>
                <p className="font-semibold">{e.Sender}</p>
                <p className="text-sm text-gray-500 truncate">{e.MessageContent}</p>
              </div>
              
            </div>
          ))}
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white ">
        {/* Header */}
        <div className="border-b p-4 font-bold text-lg flex items-center">
          {/* Space for hamburger menu on mobile */}
          <div className="md:hidden w-10"></div>
          {activeUser ? `Chat với: ${activeUser}` : 'Chọn một người dùng'}
        </div>

        {/* Message Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.Sender === 'admin@manhduc' 
                  ? 'justify-end' 
                  : 'justify-start'}`}
              >
                <div
                  className={`p-2 rounded-lg max-w-[70%] ${msg.Sender === 'admin@manhduc'
                    ? 'bg-blue-500 text-white' // Admin: màu xanh
                    : 'bg-gray-300 text-black' // Khách: màu xám
                  }`}
                >
                  {msg.MessageContent}
                  <div className="text-xs text-opacity-70 mt-1">
                    {new Date(msg.Timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">Chưa có tin nhắn nào</p>
          )}
        </div>

        {/* Message Input */}
        {activeUser && (
          <div className="p-4 border-t flex items-center space-x-2">
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              className="flex-grow border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={adminMessage}
              onChange={(e) => setAdminMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Gửi
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChatComponent;