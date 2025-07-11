import User from "../models/user.model.js";
export const getUsersForSidebar = async (req,res)=>{
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId }}).select("-password");
        res.status(200).json(filteredUsers)


    }catch(err){
        console.log("Error in getUsersForSidebar",err.message);
        res.status(500).json({ error: "Internal server error"});

    }

};

export const getMessages = async(req,res) =>{
    try{
        const {id:userToChatId }= req.params
        const senderId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:senderId , receiverId:userToChatId},
                {senderId:userToChatId , receiverId:senderId},

            ],
        });
        res.status(200).json(messages);


    }catch(err){
        console.log("Error in get messages controller",err.message);
        res.status(500).json({ error: "Internal server error"});
        

    }
}

export const sendMessage = async(req,res) =>{
    try{
        const {text,image} = req.body;
        const {id:receiverId }= req.params
        const senderId = req.user._id;

        let imageUrl;
        if (image){
            const uploadResponse = await cloudinary.uploader(image);
            imageUrl = uploadResponse.secure_url;

        }

        const newMessage =  new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,

        
        });
        await newMessage.save()

        res.status(201).json(newMessage);


    }catch(err){
        console.log("Error in get sendMessage controller",err.message);
        res.status(500).json({ error: "Internal server error"});
        

    }
}