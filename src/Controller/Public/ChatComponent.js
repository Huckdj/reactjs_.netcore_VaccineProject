/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ChatComponent = () => {
  const urlapi = process.env.REACT_APP_API_BASE_URL;
  const [messages, setMessages] = useState([]); // Lưu trữ các tin nhắn
  const [inputMessage, setInputMessage] = useState(''); // Tin nhắn hiện tại
  const [SDT, setSDT] = useState('');
  const [openChats, setOpenChats] = useState(false);
  const [statusMessage, setStatusMessage] = useState(''); // Thông báo thành công hoặc thất bại

  const [payload, setPayload] = useState({
    Sender: SDT,
    Receiver: "admin@manhduc",
    MessageContent: ""
  });

  useEffect(() => {
    // Lấy số điện thoại từ localStorage nếu có
    const historyUser = localStorage.getItem('cuser');
    if (historyUser) {
      setSDT(historyUser);
      setOpenChats(true);
    }
  }, []);

  useEffect(() => {
    if (openChats) {
      const interval = setInterval(() => {
        const payloadForGet = {
          Sender: SDT,
          Receiver: "admin@manhduc",
          MessageContent: ""
        };
        axios
          .post(`${urlapi}/api/ChatHub/GetChat`, payloadForGet)
          .then((res) => {
            if (res.data && res.data.data) {
              const formattedMessages = res.data.data.map((msg) => ({
                text: msg.MessageContent,
                fromUser: msg.Sender === SDT,
                timestamp: msg.Timestamp
              }));
              setMessages(formattedMessages);
            }
          })
          .catch((err) => console.error(err));
      }, 2000);

      return () => clearInterval(interval); // Cleanup khi component unmount
    }
  }, [openChats, SDT, urlapi]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    const historyUser = localStorage.getItem('cuser');
    const newPayload = { ...payload, Sender: historyUser, MessageContent: inputMessage };
    
    axios.post(`${urlapi}/api/ChatHub/PushSender`, newPayload)
      .then((res) => {
        if (res.data && res.data.data[0].ErrorCode === 0) {
          setInputMessage('');
          setStatusMessage('Tin nhắn đã được gửi thành công!'); // Thông báo thành công
        } else {
          setStatusMessage('Gửi tin nhắn thất bại!'); // Thông báo thất bại
        }
      })
      .catch((err) => {
        console.error(err);
        setStatusMessage('Gửi tin nhắn thất bại!'); // Thông báo lỗi khi có lỗi
      });
  };

  const handleStart = () => {
    if (SDT.trim() === '') return;
    setOpenChats(true);
    localStorage.setItem('cuser', SDT);
  };

  return (
    <div className="fixed min-w-[300px] min-h-[400px] bg-white bottom-[140px] right-6 shadow-lg z-50 rounded-lg p-4">
      <h2 className="font-semibold text-xl text-center mb-4">Chat với hỗ trợ viên</h2>

      {openChats ? (
        <div>
          <div className="border rounded-lg p-3 h-[300px] overflow-y-auto">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg my-1 ${
                    msg.fromUser
                      ? 'bg-blue-500 text-white ml-auto max-w-[70%] text-right'
                      : 'bg-gray-300 text-black mr-auto max-w-[70%]'
                  }`}
                >
                  {msg.text}
                  <div className="text-xs text-black-500">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">Chưa có tin nhắn nào</p>
            )}
          </div>

          {/* Thông báo gửi tin nhắn */}
          {statusMessage && (
            <div className="text-center text-sm text-red-500 mt-2">
              {statusMessage}
            </div>
          )}

          <div className="mt-4 flex items-center">
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              className="flex-grow border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
            >
              Gửi
            </button>
          </div>
        </div>
      ) : (
        <div className="justify-center grid items-center">
          <input
            onChange={(e) => setSDT(e.target.value)}
            value={SDT}
            className="border outline-none p-2 rounded-md"
            placeholder="Nhập số điện thoại"
          />
          <button
            className="mt-6 border p-2 bg-blue-300 rounded-md hover:bg-blue-400"
            onClick={handleStart}
          >
            Bắt đầu
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
