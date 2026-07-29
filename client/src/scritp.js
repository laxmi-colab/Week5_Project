async function askAI(){

    const message = document.getElementById("userInput").value;

    if(!message){
        alert("Enter message");
        return;
    }


    try{

        document.getElementById("response").innerHTML =
        "Loading...";


        const response = await fetch(
            "http://localhost:5000/api/ai/chat",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    message:message
                })
            }
        );


        const data = await response.json();


        document.getElementById("response").innerHTML =
        data.reply || data.message;


    }
    catch(error){

        console.log(error);

        document.getElementById("response").innerHTML =
        "Server error";

    }

}