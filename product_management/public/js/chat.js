// CLIENT_SEND_MESSAGE
const formSendData=document.querySelector(".chat .inner-form")
if(formSendData){
  formSendData.addEventListener("submit",(e)=>{
    e.preventDefault();

    const content=e.target.elements.content.value
    if(content){
      //gửi lên server, trong js file socket nhúng trước chat nên có socket
      socket.emit("CLIENT_SEND_MESSAGE",content)
      //gán lại giá trị bằng string rỗng
      e.target.elements.content.value=""
    }


  })
}
// END CLIENT_SEND_MESSAGE