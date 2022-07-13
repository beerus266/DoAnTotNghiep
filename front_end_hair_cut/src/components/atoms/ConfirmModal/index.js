import Button from "../Button";

const ConfirmModal = ({title, content, setConfirm, closeModal}) => {

    return (
        <div 
            className="absolute flex top-0 left-0 w-full h-full z-50"
            style={{background: 'rgba(15, 23, 42, 0.8)'}}
        >
            <div 
                className="w-1/3 left-1/2 bg-white rounded-lg p-8 flex flex-col fixed"
                style={{ 
                    transform: 'translate(-50%, -50%)',
                    top: '30vh'
                }}
            >
                <div className="text-center text-2xl font-semibold border-b border-b-gray-original pb-4 mb-5">
                    {title}
                </div>
                <div className="px-3 text-gray-cm border-b border-b-gray-original pb-4 mb-5">
                    {content}
                </div>
                <div className="flex justify-end">
                    <Button 
                        text='Confirm'
                        variant='yellow'
                        className='w-20 rounded-md mr-3'
                        onClickFunc={setConfirm}
                    />
                    <Button 
                        text='Cancel'
                        variant='gray'
                        className='w-20 rounded-md'
                        onClickFunc={closeModal}
                    />
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal;