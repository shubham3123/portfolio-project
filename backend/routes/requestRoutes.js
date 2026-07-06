const express = require('express');
const router = express.Router();

/* 
@route  POST /api/requests
@desc   Submit a client request or callback

*/

router.post('/',  async(urlReq, res) => {
    const {name, email, description, requestType, callbackTime } = urlReq.body;

    try {
        const newRequest = new Request(
            {
                name,
                email,
                description,
                requestType,
                callbackTime
            });

            await newRequest.save();
            res.status(201).json({success:true, message:'Request Submitted !'});
            }
            catch(error){res.status(500).json({success: false, error: 'Server Error !'})}
                   
            });

            module.exports = router;