async function askAI() {

    const prompt = document.getElementById("prompt").value;

    document.getElementById("loading").innerHTML = "Loading...";

    document.getElementById("result").innerHTML = "";

    const response = await fetch("http://localhost:5000/api/ai/chat", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            prompt: prompt
        })

    });

    const data = await response.json();

    document.getElementById("loading").innerHTML = "";

    document.getElementById("result").innerHTML = data.reply;

}