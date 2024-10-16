const Message = require("../modals/Message-model");

const contactData = async(req,res) => {
   try {
      const contactData = await Message.find({isSolved:false})
      res.render("layout", { body: "Contact", result: contactData });
   } catch (error) {
    console.log(`Error While getting Contact data ${error}`);
    
   }
}


const changeStatus = async(req,res) => {
 try {
     await Message.findByIdAndUpdate({_id:req.params.id},{isSolved:true})
     res.status(200).redirect("/admin/user/contact/contact-data")
 } catch (error) {
    console.log(error);
    
 }
   
}

const solvedContactqueries = async(req,res) => {
    try {
        const contactData = await Message.find({isSolved:true})
        res.render("layout", { body: "SolvedContact", result: contactData });
     } catch (error) {
      console.log(`Error While getting Contact data ${error}`);
      
     }
}

module.exports = {contactData,changeStatus,solvedContactqueries}