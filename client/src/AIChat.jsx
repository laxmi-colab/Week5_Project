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
          message
        })
      });

      const data = await res.json();

      setResponse(data.message || data.response);

    } catch (error) {

      setResponse("Server error");

    }

  };


  return (
    <div className="container mt-5">

      <h2>AI Assistant</h2>

      <textarea
        className="form-control"
        rows="4"
        placeholder="Ask something..."
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
      />

      <button
        className="btn btn-primary mt-3"
        onClick={sendMessage}
      >
        Send
      </button>


      <div className="card mt-4 p-3">

        <h5>AI Response:</h5>

        <p>{response}</p>

      </div>

    </div>
  );
}

export default AIChat;