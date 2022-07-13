import cn from "classnames";
import Button from "components/atoms/Button";
import HtmlContent from "components/atoms/HtmlContent";
import { axios } from "utils/axios";
import { useForm } from "react-hook-form";
import CommentItem from "components/organisms/CommentItem";
import { useRef, useState } from "react";

const Store = ({store, comment}) => {
    const commentRef = useRef();
    const [comments, setComments] = useState(comment || []);
    const { register, handleSubmit, setValue,formState : {errors}} = useForm({mode: 'onSubmit'});

    const onSubmit = (data) => {
        axios.post('comment/create', {
            storeId: store.id,
            comment: data.comment,
            phoneNumber: data.phoneNumber
        }).then((data) => {
            let _comments = [...comments];
            _comments.unshift(data.data);
            setComments(_comments);
            setValue('comment', '');
            setValue('phoneNumber', '');
            commentRef.current.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        }).catch((res) => {
            console.log(res);
        })
    }
    
    return (
        <div className="mx-auto max-w-full md:max-w-60 xl:max-w-screen-xl">
            <div className="mb-40">
                <div className="flex my-10">
                    <div className="basis-3/5  mr-16">
                        <div className="flex flex-wrap mb-8">
                            <div className={cn('w-full overflow-hidden')}>
                                <h1 className="font-semibold text-2xl mb-8 text-center">{store.name}</h1>
                                {store?.image_url && (
                                    <div className="mb-5">
                                        <img className="mx-auto" src={store?.image_url} alt={store?.image_url} />
                                    </div>
                                )}
                                <HtmlContent
                                    html={store.content}
                                />
                            </div>
                        </div>
                        <div className="text-3xl font-semibold mb-5">Comments</div>
                        <div className="mb-5" ref={commentRef}>
                            {comments.map((comment) => <CommentItem comment={comment}/>)}
                        </div>
                    </div>
                    <form className="" onSubmit={handleSubmit(onSubmit)}>
                        <div className="bg-gray-light rounded-lg p-5">
                            <h2 className="text-lg">
                                Leave a comment
                            </h2>
                            <div className="mb-3">
                                <label className="text-gray-cm">Message</label>
                                <textarea {...register('comment')} rows={3} className="w-full border border-gray-n600 rounded-lg p-2"></textarea>
                            </div>
                            <div className="mb-5">
                                <label className="text-gray-cm">Phone number</label>
                                <input 
                                    className="w-full p-2 border border-gray-n600 rounded-lg" 
                                    {...register('phoneNumber')}
                                />
                            </div>
                            <div className="">
                                <Button type='submit' className='w-32' text='Post comment' variant='yellow'/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async (ctx) => {

    const { query } = ctx;
    const store = await axios.get(`store/getStorePage/${query.slug}`, {
        // slug: query.slug
    }).then(res => res.data);

    const comment = await axios.post('comment/getCommentByStoreId', {
        storeId: store.id
    }).then(res => res.data);

    return {
        props: {
            store,
            comment
        }
    }
}

export default Store;