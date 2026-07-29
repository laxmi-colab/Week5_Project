const express = require("express");
const router = express.Router();


router.post("/chat", async (req, res) => {

    try {

        const { message } = req.body;


        if (!message) {
            return res.status(400).json({
                success:false,
                message:"Message is required"
            });
        }


        const reply = 
        `AI Assistant Response:
        
        You asked: ${message}

        This is a demo AI response for the project.
        AI feature is working successfully.`;


        res.json({

            success:true,
            message: reply

        });


    } catch(error) {

        res.status(500).json({

            success:false,
            message:"AI service error"

        });

    }

});


module.exports = router;