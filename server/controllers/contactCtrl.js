const Contact=require('../model/contact')

const submitMessage=async(req,res)=>{
    const { name, email, message } = req.body;

    try{
        const newContact= new Contact({
            name,
            email,
            message
        });
        await newContact.save();
        res.status(200).json({message:'message sent sucessfully'});
    }
    catch(error){
        console.log('error saving message:',error);
        res.status(500).json({message:'error sending message'});
    }

}
module.exports = submitMessage;