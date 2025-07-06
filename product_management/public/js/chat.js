import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'

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

// SERVER_RETURN_MESSAGE
  socket.on("SERVER_RETURN_MESSAGE",data=>{
    const myId=document.querySelector("[my-id]").getAttribute("my-id")//lấy giá trị
    const body=document.querySelector(".chat .inner-body")
    //tạo thẻ div
      const div=document.createElement("div")
      let htmlFullName="";
      //check tin nhắn có phải của người gửi ko
      if(myId==data.userId){
        div.classList.add("inner-outgoing")
      }else{
        htmlFullName=`<div class="inner-name">${data.fullName}</div>`
        div.classList.add("inner-incoming")
        
      }
      
      div.innerHTML= `
        ${htmlFullName}
        <div class="inner-content">${data.content}</div>
      `
      //add vào body
      body.appendChild(div)

      bodyChat.scrollTop=bodyChat.scrollHeight//cách top đúng bằng chiều cao của scroll

  })
// END SERVER_RETURN_MESSAGE 

//Sửa croll chat xuống dưới bottom khi load trang    
const bodyChat=document.querySelector(".chat .inner-body")
if(bodyChat){
  bodyChat.scrollTop=bodyChat.scrollHeight//cách top đúng bằng chiều cao của scroll

}

//show icon chat
  const buttonIcon = document.querySelector('.button-icon')
  if(buttonIcon){
    const tooltip = document.querySelector('.tooltip')
    Popper.createPopper(buttonIcon, tooltip)
    buttonIcon.onclick = () => {
    tooltip.classList.toggle('shown')
  }
  }
//end show icon

// Insert icon to input 
const emojiPicker=document.querySelector('emoji-picker')
if(emojiPicker){
  const input=document.querySelector(".chat .inner-form input[name='content']")

  emojiPicker.addEventListener("emoji-click",event=>{
    const icon=event.detail.unicode
    input.value=input.value+icon; //Có tin nhắn trước đó
  })
}
// end Insert icon to input 
