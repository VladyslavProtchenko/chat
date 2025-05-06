import React from 'react';

export type Props = {
  data: {
    message: string,
    user: { username: string }
  },
  myMessage: boolean;
}
const Message = ({data, myMessage}: Props) => {
  return (
    <div className={`flex flex-col px-4 py-2 min-w-[200px] max-w-1/2 ${myMessage && ' self-end '} `}>
        <p className=' text-wrap'>{data.message}</p>
        <div className='text-xs text-gray-400'>{data.user.username}</div>
    </div>
  );
}

export default Message;
