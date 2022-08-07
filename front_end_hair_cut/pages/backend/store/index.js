import { useEffect, useState } from "react";
import { BiArrowBack } from 'react-icons/bi';
import { BsFillStarFill, BsPen, BsStarHalf, BsTrash } from 'react-icons/bs';
import Button from "components/atoms/Button";
import Breadcrumb from "components/organisms/Breadcrumb";
import LayoutBackend from "components/organisms/Layouts/LayoutBackend";
import { useRouter } from "next/router";
import { axios } from "utils/axios";
import cn from "classnames";
import Alert from "components/atoms/Alert";
import Input from "components/atoms/Input/InputBackend";
import { useDispatch, useSelector } from "react-redux";

import ConfirmModal from "components/atoms/ConfirmModal";
import { toast } from "react-toastify";

import { getCookie, makeRandomKey, removeVietnameseTones } from "utils/helpers";
import { loadStores } from "stores/store/store.slice";
import { selectorStores } from "stores/store/store.selector";
import { selectorAccount } from "stores/account/account.selector";
import TextEditor from "components/atoms/RichTextEditor";



export const Store = ({stores}) => {
    
    const router = useRouter();
    const dispatch = useDispatch();
    const [isOpenPostForm, setIsOpenPostForm] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [editStore, setEditStore] = useState({});
    const [delStore, setDelStore] = useState({});
    const [openModalConfirm, setOpenModalConfirm] = useState(false);
    const _stores = useSelector(selectorStores);
    const account = useSelector(selectorAccount); 

    const addNewStore = () => {
        setEditStore({});
        setIsOpenPostForm(true);
    }

    const onEditStore = (store) => {
        setEditStore(store);
        setIsOpenPostForm(true);
    }

    const onDeleteStore = (store) => {
        setDelStore(store);
        setOpenModalConfirm(true);
    }

    const deleteStore = () => {
        setOpenModalConfirm(false);
        let __stores = [..._stores];

        axios.post('store/delete', {
            storeId: delStore.id
        }).then((res) => {
            __stores = __stores.filter((store) => store.id !== res.data.id);
            dispatch(loadStores(__stores));
            toast.success('Delete store successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                pauseOnHover: true,
                theme: "dark"
            });
        }).catch((res) => {console.log(res)});
    }

    useEffect(() => {
        if (router.query.success) {
            setShowAlert(true);
        }
    }, [router.query]);

    useEffect(() => {
        dispatch(loadStores(stores));
    }, []);

    useEffect(() => {

    }, [isOpenPostForm]);

    return (
        <div className="p-10 grow bg-gray-light">
            
            <Breadcrumb 
                page={
                    {
                        title: 'Store',
                        url: '/backend/store'
                    }
                }
            />
            <Alert 
                className={cn(
                    'w-1/3 animate-show-alert fixed top-28 right-10',
                    {
                        'hidden': !showAlert
                    }
                )}
                text='Save store successfully!'
                variant='success'
            />
            {isOpenPostForm 
                ? <PostForm setIsOpenPostForm={setIsOpenPostForm} editStore={editStore}/>
                : <div>
                    <div className="flex justify-end mb-5">
                        <Button text='Add new store' variant='outline-primary' onClickFunc={addNewStore}/>
                    </div>
                    {_stores.map((store) => 
                        <div className="bg-white rounded-lg drop-shadow-xl flex mb-5" key={store.id}>
                            <div className="w-60">
                                <img src={store.image_url || "/placeholder.jpg"} className="m-5 max-h-36 mx-auto"/>
                            </div>
                            <div className="self-center m-5 basis-7/12">
                                <h2 className="text-3xl font-bold mb-3">{store.name}</h2>
                                <h5 className="text-lg font-semibold">{store.address}</h5>
                                <p className="text-sm">{store.description}</p>
                            </div>
                            <div className="basis-2/12 p-5 border-x border-gray-n400 flex flex-col justify-between">
                                <div>   
                                    <h5 className="uppercase text-right font-semibold">star</h5>
                                    <div className='mt-3 flex text-yellow-neutral gap-1 justify-end'>
                                        <BsFillStarFill />
                                        <BsFillStarFill />
                                        <BsFillStarFill />
                                        <BsStarHalf />
                                    </div>
                                </div>
                                <div>
                                    <h5 className="uppercase text-right font-semibold">date created</h5>
                                    <p className="text-right">December 15, 2019</p>
                                </div>
                            </div>
                            <div className="flex flex-col p-5 justify-center items-center">
                                <div className="w-8 h-8 border rounded-full text-blue flex justify-center items-center cursor-pointer mb-2">
                                    <BsPen onClick={() => onEditStore(store)}/>
                                </div>
                                <div className="w-8 h-8 border rounded-full text-red flex justify-center items-center cursor-pointer">
                                    <BsTrash onClick={() => onDeleteStore(store)}/>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            }

            {openModalConfirm && 
                <ConfirmModal 
                    title='Delete a store ?'
                    content={`You will delete store #[${delStore.name}] at #[${delStore.address}]. Are you sure ?`}
                    setConfirm={deleteStore}
                    closeModal={() => setOpenModalConfirm(false)}
                />
            }
            
        </div>
    )
}

Store.getLayout = (page) => <LayoutBackend children={page} />

const PostForm = ({setIsOpenPostForm, editStore = {} }) => {

    const router = useRouter();
    const dispatch = useDispatch();
    const isEditStore = !!Object.keys(editStore).length;
    const [name, setName] = useState(editStore?.name || '');
    const [slug, setSlug] = useState(editStore?.slug || '');
    const [address, setAddress] = useState(editStore?.address || '');
    const [description, setDescription] = useState(editStore?.description || '');
    const [fileImage, setFileImage] = useState(editStore?.image_url || '/placeholder.jpg');
    const allStore = useSelector(selectorStores);
    const user = useSelector(selectorAccount);
    const [editorContent, changeEditorContent] = useState(editStore?.content || '');
    const initialValue = [];

    const autoFillSlug = () => {
        const filterName = removeVietnameseTones(name);
        setSlug(filterName.split(' ').join('-'));
    }

    const onChangeName = (e) => {
        setName(e.target.value);
        const filterName = removeVietnameseTones(e.target.value);
        setSlug(filterName.split(' ').join('-'));

    }

    const uploadImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const newFileName = makeRandomKey();
            const formdata = new FormData();
            formdata.append('file', file);

            axios.post(`upload?image=store&key=${newFileName}`, formdata).then((res) => {
                setFileImage(res.data);
            }).catch((res) => {});
        }
    }

    const submit = () => {
        axios.post('store/create', {
            userId: getCookie('userId'),
            id : isEditStore ? editStore.id : 0,
            name,
            slug,
            address,
            description,
            image: fileImage,
            content: editorContent,
            // headers: {
            //     "Authorization":`Bearer ${context.req.cookies.user}`
            // }
        }).then((res) => {

            let _allStore = [...allStore];
            if (isEditStore) {
                _allStore = _allStore.map((store) => {
                    if (store.id == res.data.id) {
                        return res.data;
                    }
                    return store;
                });
            } else {
                _allStore.unshift(res.data);
            }

            dispatch(loadStores(_allStore));
            setIsOpenPostForm(false);
            toast.success('Save store successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                pauseOnHover: true,
                theme: "dark"
            });
        }).catch((res) => {
             toast.error(res.response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                pauseOnHover: true,
                theme: "dark"
            });
        });
    }

    return (
        <div>
            <BiArrowBack  className="w-10 h-10 cursor-pointer mb-3" onClick={() => setIsOpenPostForm(false)}/>
            <div className="w-full grid grid-cols-4 gap-4 mb-5">
                <div className="col-span-3 bg-white rounded-lg p-5 drop-shadow-xl">
                    <div className="flex">
                        <div className="mb-5 w-1/2 mr-5">
                            <label className="mb-2 block font-semibold">Name</label>
                            <Input placeholder='Enter the name' defaultValue={editStore?.name || ''} onChange={onChangeName} />
                        </div>
                        <div className="mb-5 w-1/2">
                            <div className="mb-2 flex justify-between">
                                <label className="font-semibold">Slug</label>
                                {/* <span 
                                    className="text-xs text-text-green underline cursor-pointer"
                                    onClick={autoFillSlug}
                                >
                                    Auto fill
                                </span> */}
                            </div>
                            <Input placeholder='Enter the name' defaultValue={editStore?.slug || ''} value={slug} onChange={e => setSlug(e.target.value)} />
                        </div>
                    </div>
                    <div className="mb-5 w-full">
                        <label className="mb-2 block font-semibold">Address</label>
                        <Input placeholder='Enter the address' defaultValue={editStore?.address || ''} onChange={e => setAddress(e.target.value)}/>
                    </div>
                    <div className="mb-5 w-full">
                        <label className="mb-2 block font-semibold">Description</label>
                        <Input placeholder='Enter the address' defaultValue={editStore?.description || ''} onChange={e => setDescription(e.target.value)}/>
                    </div>
                    <div className="mb-5 w-full">
                        <label className="mb-2 block font-semibold">Content</label>
                        {/* <QuillNoSSRWrapper  theme="snow" /> */}
                        <TextEditor html={editorContent} setHtml={changeEditorContent}/>
                    </div>
                </div>
                <div className="col-span-1 bg-white rounded-lg p-5 drop-shadow-xl">
                    <div className="mb-5">
                        <label className="mb-2 block font-semibold">Image</label>
                        <div>
                            <img className="w-full" src={fileImage}/>
                            <div className="bg-blue-neutral text-white mt-1 text-center rounded-sm">
                                <label className="block w-full h-full text-center my-auto" htmlFor="storeImage">
                                        Upload image
                                </label>
                            </div>
                            <input type='file' id="storeImage" onChange={uploadImage} className="hidden"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row-reverse">
                <Button 
                    text='Save' 
                    className='text-2xl w-40 h-12' 
                    variant='primary'
                    onClickFunc={submit}
                />
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const stores = await axios.get('store/getStoreByUserId', {
        headers: {
            "Authorization":`Bearer ${context.req.cookies.user}`
        }
    }).then((res) => {
        return res.data;
    }).catch((res) => {

    });

    if (stores) {
        return {
            props: {
                stores
            }
        }
    } else {
        return {
            redirect: {
                destination: '/backend/login',
                permanent:false,
            }
        }
    }

}

export default Store;