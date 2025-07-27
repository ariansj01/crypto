import React, { useState, useRef, useEffect } from 'react';
import { Button, Form, Input, message, Typography } from 'antd';
import axios from 'axios';
import { FaRobot, FaUser, FaPaperPlane, FaInfoCircle, FaTimes } from 'react-icons/fa';
const { TextArea } = Input;
const { Title, Text } = Typography;

const AiChat = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [fullResult, setFullResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const chatContainerRef = useRef(null);
  const API_KEY = 'aGJmHi2MCdTev8nzkd5qJhvBOukUegVQJOJvUIQE';

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [fullResult]);

  const onFinish = async(value) => {
    setIsLoading(true);
    messageApi.open({
      type: 'success',
      content: 'Please Wait',
    });
    try {
      const result = await axios.post('https://api.cohere.ai/v1/chat',
        {
          model: 'command-r-plus',
          message: value.Question,
          messages: [
            {
              role: 'user',
              content: value.Question
            }
          ],
          max_tokens: 4000
        },
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "https://api.cohere.ai/v1/chat"
          },
        }
      );
      setFullResult([...fullResult, value.Question, result.data.text]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error connecting to Cohere:', error);
      messageApi.open({
        type: 'error',
        content: 'Error getting response',
      });
      setIsLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-4 md:p-6">
      {contextHolder}
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 shadow-2xl border border-white/20 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl mr-4">
                <FaRobot className="text-2xl text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">AI Crypto Assistant</h2>
                <p className="text-gray-300 mt-1">Your 24/7 crypto trading companion</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <span className="text-gray-300 text-sm">Status</span>
                <div className="text-white text-xl font-bold flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  Online
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        {showWelcome && (
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 shadow-2xl border border-white/20 mb-6 relative animate-fade-in">
            <button
              onClick={() => setShowWelcome(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes />
            </button>
            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                <FaInfoCircle className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Welcome to AI Crypto Assistant!</h3>
                <p className="text-gray-300">
                  I'm here to help you with all your cryptocurrency questions. You can ask me about:
                </p>
                <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                  <li>Market analysis and trends</li>
                  <li>Trading strategies and tips</li>
                  <li>Cryptocurrency fundamentals</li>
                  <li>Technical analysis and indicators</li>
                  <li>Risk management and portfolio diversification</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Chat Container */}
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 shadow-2xl border border-white/20 mb-6">
          <div 
            ref={chatContainerRef}
            className="h-[500px] md:h-[600px] overflow-y-auto space-y-4 mb-6 pr-4 custom-scrollbar"
          >
            {fullResult.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <FaRobot className="text-4xl mx-auto mb-4" />
                  <p>Start a conversation by asking a question about cryptocurrency</p>
                </div>
              </div>
            ) : (
              fullResult.map((item, index) => (
                <div
                  key={index}
                  className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div
                    className={`max-w-[80%] md:max-w-[70%] rounded-2xl p-4 ${
                      index % 2 === 0
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'bg-white/10 text-white'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      {index % 2 === 0 ? (
                        <FaUser className="mr-2 text-white" />
                      ) : (
                        <FaRobot className="mr-2 text-purple-400" />
                      )}
                      <span className="font-semibold">
                        {index % 2 === 0 ? 'You' : 'AI Assistant'}
                      </span>
                    </div>
                    <p className="whitespace-pre-wrap">{item}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input Form */}
          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="relative"
          >
            <Form.Item
              name="Question"
              rules={[{ required: true, message: 'Please input your question!' }]}
              className="mb-0"
            >
              <TextArea
                rows={3}
                placeholder="Ask me anything about cryptocurrency..."
                className="bg-white/10 backdrop-blur-sm text-white border-white/30 rounded-xl pr-12 resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="absolute right-2 bottom-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-none transform hover:scale-105 transition-all duration-300"
              icon={<FaPaperPlane />}
            >
              Send
            </Button>
          </Form>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Market Analysis', 'Trading Tips', 'Risk Management', 'Portfolio Review'].map((action, index) => (
            <button
              key={index}
              onClick={() => onFinish({ Question: `Tell me about ${action.toLowerCase()}` })}
              className="backdrop-blur-lg bg-white/10 rounded-xl p-4 text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AiChat;