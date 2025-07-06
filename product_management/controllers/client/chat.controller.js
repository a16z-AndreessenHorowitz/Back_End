const Chat=require("../../models/chat.model")
const User=require("../../models/user.model")
// [GET] /chat
module.exports.index=async (req, res)=>{
  //lấy id
  const userId=res.locals.user.id
  // socket.io
  _io.once('connection', (socket) => {
    //sock nhận từ client
    socket.on("CLIENT_SEND_MESSAGE", async (content)=>{
      //Lưu vào database
      const chat=new Chat({
        user_id:userId,
        content:content
      })
      await chat.save();
    })
  })
  // end socket 

  //Lấy data từ database
  const chats=await Chat.find({
    deleted:false,
  })
  //Lấy ra user
  for(const chat of chats){
    const infoUser=await User.findOne({
      _id:chat.user_id
    }).select("fullName avatar")

    chat.infoUser=infoUser
  }
  //end lấy data
res.render("client/pages/chat/index",{
  pageTitle:"Chat", 
  chats:chats
})
}
