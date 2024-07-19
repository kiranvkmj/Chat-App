import React from 'react';

const Message = () => {
  console.log('Message component rendered');
  
  return (
    <div className='chat chat-end'>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img 
                alt='tailwind css chat bubble componenet'
                src={"https://avatar.iran.liara.run/public/boy"}
                />
            </div>
         </div>
        <div className={`chat-bubble text-white bg-blue-500`}>hii i am kiran </div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center '>12:42 </div>
    </div>
  )
}

export default Message;

// STARTER CODE SNIPPET 

// import React from 'react';

// const Message = () => {
//   console.log('Message component rendered');
  
//   return (
//     <div className='chat chat-end'>
//         <div className='chat-image avatar'>
//             <div className='w-10 rounded-full'>
//                 <img 
//                 alt='tailwind css chat bubble componenet'
//                 src={"https://avatar.iran.liara.run/public/boy"}
//                 />
//             </div>
//          </div>
//         <div className={`chat-bubble text-white bg-blue-500`}>hii i am kiran </div>
//         <div className='chat-footer opacity-50 text-xs flex gap-1 items-center '>12:42 </div>
//     </div>
//   )
// }

// export default Message;
