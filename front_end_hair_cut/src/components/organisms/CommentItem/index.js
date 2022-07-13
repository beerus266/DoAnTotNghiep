import { FaRegUserCircle } from 'react-icons/fa';

const CommentItem = ({comment}) => {

    const date = new Date(comment.createAt).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric' });
    
    const hidePhoneNumber = (phoneNumber) => {
        const middle = phoneNumber.slice(3, -3);
        const hideMiddle = Array.from({length: middle.length}, (_) => "*").join('');

        return phoneNumber.slice(0, 3) + hideMiddle + phoneNumber.slice(-3);
    }
    
    return (
        <div className="py-3 px-7 bg-gray-cm rounded-md text-white mb-5 flex">
            <FaRegUserCircle  className='w-10 h-10 my-auto mr-3'/>
            <div className='w-11/12'>
                <div className="flex mb-2">
                    <div className="text-xl font-bold mr-5">{hidePhoneNumber(comment.phoneNumber)}</div>
                    <span className="text-sm text-gray-n500 my-auto">{date}</span>
                </div>
                <div className="text-gray-n500">
                    {comment.comment}
                </div>
            </div>
        </div>
    )
}

export default CommentItem;