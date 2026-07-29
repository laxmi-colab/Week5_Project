import React, { useState } from "react";

function AIChat() {

  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {

    try {

      const res = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: message
        })
      });

      const data = await res.json();

      setResponse(data.message || data.response);

    } catch(error) {

      setResponse("Backend error");

    }

  };


  return (
    <div>

      <h2>AI Assistant</h2>

      <input
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        placeholder="Ask AI"
      />

      <button onClick={sendMessage}>
        Send
      </button>

      <h3>{response}</h3>

    </div>
  );

}

export default AIChat;