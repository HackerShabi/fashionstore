import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Layout Components
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";

// Pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Category from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Contact from "./pages/Contact";
import BecomeSeller from "./pages/BecomeSeller";
import Blog from "./pages/Blog";
import Help from "./pages/Help";

// Admin Routes
import AdminRoutes from "./admin/AdminRoutes";

// Context
import { CartProvider } from "./context/CartContext";

// Chat Icon Component
const ChatIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { text: message, sender: 'user' }];
    setMessages(newMessages);
    setMessage("");
    
    // Add automated response after a short delay
    setTimeout(() => {
      setMessages([...newMessages, { 
        text: "Thanks for your message! Our team will get back to you soon.", 
        sender: 'bot' 
      }]);
    }, 1000);
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="bg-accent hover:bg-accent/90 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-105"
        aria-label="Chat with us"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Chat Header */}
          <div className="bg-primary text-white p-4">
            <h3 className="font-medium">Chat with Us</h3>
            <p className="text-xs opacity-75">We typically reply within minutes</p>
          </div>
          
          {/* Chat Messages */}
          <div className="h-80 overflow-y-auto p-4 flex flex-col space-y-3">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-sm">Send us a message and we'll respond as soon as possible.</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.sender === 'user' 
                      ? 'bg-accent/10 text-primary ml-auto rounded-tr-none' 
                      : 'bg-gray-100 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              ))
            )}
          </div>
          
          {/* Chat Input */}
          <form onSubmit={handleSubmit} className="border-t p-2 flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
            />
            <button
              type="submit"
              className="bg-accent text-white px-4 rounded-r-md hover:bg-accent/90 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
          
          {/* Social Links */}
          <div className="bg-gray-50 p-3 flex justify-center space-x-3 border-t">
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            <a href="tel:+1234567890" className="text-blue-600 hover:text-blue-800">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.384 17.752a2.108 2.108 0 00-.522-.645 5.22 5.22 0 00-.715-.502 2.289 2.289 0 00-.644-.29c-.238-.071-.487-.034-.784.111-.296.146-.487.253-.57.324a9.212 9.212 0 01-.859.476c-.143.071-.35.156-.623.255-.274.1-.548.156-.823.17-.238 0-.533-.057-.886-.17a9.22 9.22 0 01-1.094-.476 11.832 11.832 0 01-1.214-.738c-.2-.133-.487-.341-.858-.623a9.331 9.331 0 01-.833-.738 19.343 19.343 0 01-.935-.95 9.49 9.49 0 01-.774-.884c-.215-.275-.43-.565-.645-.87a7.004 7.004 0 01-.502-1.005 5.566 5.566 0 01-.255-.96 3.622 3.622 0 01-.05-.937c.012-.275.068-.55.17-.824.1-.275.186-.48.255-.623.07-.143.19-.36.36-.645.17-.286.262-.447.273-.483.06-.107.166-.297.36-.57.17-.286.262-.447.273-.483.06-.107.166-.297.32-.57.156-.274.19-.523.106-.749a2.026 2.026 0 00-.278-.644c-.13-.203-.297-.43-.502-.715a2.108 2.108 0 00-.645-.522c-.227-.107-.454-.127-.681-.06-.227.071-.392.12-.495.145-.107.024-.274.06-.502.111a3.274 3.274 0 00-.502.17c-.143.072-.31.168-.502.29-.19.12-.31.2-.359.24-.906.57-1.587 1.17-2.044 1.799-.274.382-.464.776-.57 1.183-.107.406-.166.764-.176 1.07-.012.31.006.633.05.973.048.335.09.58.126.733.036.155.102.37.196.645.095.274.155.447.18.517.31.787.752 1.574 1.329 2.36a15.339 15.339 0 001.799 2.044c.43.405.99.846 1.683 1.323.692.478 1.252.834 1.683 1.07.43.238.833.442 1.214.612.38.17.76.32 1.139.45.38.132.727.224 1.04.278.31.06.608.09.893.09.286 0 .563-.03.834-.09.27-.06.516-.126.738-.196.227-.072.43-.144.612-.22.18-.072.334-.132.46-.18.13-.048.25-.102.36-.16.108-.06.203-.108.286-.147.083-.036.16-.072.23-.106.072-.036.137-.06.196-.075.06-.012.113-.03.16-.05.05-.024.102-.03.16-.02.06.012.126.042.196.09.072.048.126.09.16.126.037.036.091.102.161.196.072.095.126.167.161.22.036.049.102.143.196.286.095.143.155.239.18.286.025.048.091.167.196.36.107.19.179.32.22.39.048.07.126.214.231.43.107.215.167.36.18.435.013.072.013.196 0 .37-.011.17-.03.292-.05.37-.023.083-.071.22-.145.412-.072.19-.12.32-.145.39-.024.07-.09.208-.196.415a1.722 1.722 0 01-.22.36c-.06.072-.172.196-.34.37-.17.17-.293.292-.37.36-.108.107-.256.22-.442.34-.19.12-.36.215-.517.286-.155.072-.32.137-.496.196-.179.06-.334.107-.47.145-.13.036-.296.078-.496.126-.203.048-.37.084-.503.106-.13.024-.308.054-.532.09-.227.036-.42.054-.583.05a7.03 7.03 0 01-.935-.075 8.234 8.234 0 01-1.094-.255 12.284 12.284 0 01-1.2-.435c-.394-.167-.752-.334-1.07-.502a12.555 12.555 0 01-.998-.57 16.724 16.724 0 01-1.034-.681 10.322 10.322 0 01-.94-.738 40.698 40.698 0 01-1.038-.935c-.334-.322-.645-.644-.935-.967a35.36 35.36 0 01-.884-.995 12.855 12.855 0 01-.681-1.035c-.191-.31-.37-.62-.537-.934-.167-.322-.304-.62-.41-.895a8.043 8.043 0 01-.292-.834c-.071-.25-.12-.48-.145-.69a6.992 6.992 0 01-.06-.645 6.928 6.928 0 01.015-.57c.012-.203.042-.43.09-.681.048-.25.09-.456.126-.616.036-.155.09-.334.16-.532.072-.203.137-.38.196-.532.06-.155.143-.334.25-.538.108-.203.203-.37.286-.501.083-.131.196-.292.34-.481.143-.191.262-.346.36-.462.096-.12.226-.268.39-.447.167-.18.31-.322.431-.431.12-.108.274-.232.462-.37.19-.14.345-.25.47-.331.12-.084.28-.185.475-.306.19-.12.36-.22.505-.3.143-.084.31-.173.501-.27.19-.096.36-.173.505-.232.143-.06.31-.12.5-.18.191-.06.358-.108.502-.145.143-.036.31-.072.5-.106.192-.036.358-.06.502-.075.143-.012.31-.03.5-.05.192-.024.358-.03.502-.015.143.012.31.03.5.05.192.024.358.06.502.106.143.048.31.108.5.18.192.072.358.149.502.232.143.083.31.173.5.27.192.095.358.18.502.255.143.071.292.155.445.25.155.095.292.18.41.255.12.072.268.167.446.286.179.12.334.226.466.32.13.096.292.215.481.36.19.143.345.262.462.36.12.095.28.226.481.39.203.167.37.31.502.431.13.12.292.274.481.462.19.19.345.345.462.465.12.12.268.28.445.48.179.203.322.37.431.502.108.131.232.298.37.502.14.203.244.37.315.502.072.131.161.31.27.537.107.226.185.416.23.57.049.155.102.345.161.57.06.226.102.42.126.582.024.167.048.37.075.612.024.238.036.44.036.612 0 .167-.012.37-.036.607-.024.238-.048.44-.075.607-.024.167-.066.37-.126.612a5.224 5.224 0 01-.16.57 4.555 4.555 0 01-.232.57c-.083.18-.16.334-.23.463-.072.13-.167.297-.286.502-.12.203-.226.37-.32.502-.096.13-.215.297-.36.5-.143.204-.262.37-.36.502-.095.13-.226.292-.39.486-.167.19-.31.345-.431.465-.12.12-.274.274-.462.461-.19.19-.345.345-.465.465-.12.12-.28.268-.481.445-.203.179-.37.322-.502.43-.13.108-.298.238-.502.39-.203.155-.37.28-.502.375-.13.096-.298.209-.502.34-.203.13-.37.232-.502.306-.13.072-.298.161-.502.27-.203.107-.37.19-.502.25-.13.06-.298.131-.502.215-.203.083-.37.149-.502.196-.13.048-.298.102-.502.16-.203.06-.37.108-.502.145-.13.036-.298.078-.502.126-.203.048-.37.084-.502.106-.13.024-.298.054-.502.09-.203.036-.37.06-.502.075-.13.012-.298.03-.502.05-.203.024-.37.03-.502.015-.13-.012-.298-.03-.502-.05-.203-.024-.37-.06-.502-.106-.13-.048-.298-.102-.502-.16-.203-.06-.37-.108-.502-.145-.13-.036-.298-.09-.502-.161z" />
              </svg>
            </a>
            <a href="mailto:contact@fashionstore.com" className="text-red-600 hover:text-red-800">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
            <Link to="/admin/login" className="text-primary hover:text-accent flex items-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
              <span className="ml-1 text-xs">Admin</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen font-poppins">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Store Front Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:category" element={<Category />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/become-seller" element={<BecomeSeller />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/help" element={<Help />} />
              
              {/* Admin Routes */}
              <Route path="/admin/*" element={<AdminRoutes />} />
            </Routes>
          </main>
          <Footer />
          <ChatIcon />
    </div>
      </Router>
    </CartProvider>
  );
}

export default App;
