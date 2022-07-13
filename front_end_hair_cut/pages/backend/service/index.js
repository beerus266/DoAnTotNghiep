import cn from "classnames";
import Alert from "components/atoms/Alert";
import Button from "components/atoms/Button";
import Breadcrumb from "components/organisms/Breadcrumb";
import LayoutBackend from "components/organisms/Layouts/LayoutBackend";
import { useRouter } from "next/router";
import Input from "components/atoms/Input/InputBackend";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { BsPen, BsTrash } from "react-icons/bs";

import { toast } from "react-toastify";
import Switch from 'react-switch';

import { axios } from "utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { selectorAccount } from "stores/account/account.selector";
import { makeRandomKey } from "utils/helpers";
import ConfirmModal from "components/atoms/ConfirmModal";
import { loadServices } from "stores/service/service.slice";
import { selectorServices } from "stores/service/service.selector";

const Service = ({initServices = [], stores}) => {

    const router = useRouter();
    const dispatch = useDispatch();
    // const [services, setServices] = useState(initServices || []);
    const services = useSelector(selectorServices);
    const [currentStoreId, setCurrentStoreId] = useState(stores[0]?.id);
    const [isOpenPostForm, setIsOpenPostForm] = useState(false);
    const [openModalConfirm, setOpenModalConfirm] = useState(false);
    const [editService, setEditService] = useState({});
    const [delService, setDelService] = useState({});

    const onEditService = (service) => {
        setEditService(service);
        setIsOpenPostForm(true);
    }

    const onDeleteService = (service) => {
        setDelService(service);
        setOpenModalConfirm(true);
    }

    const addNewService = () => {
        setEditService({});
        setIsOpenPostForm(true);
    }

    const deleteService = () => {
        setOpenModalConfirm(false);
        let _services = [...services];

        axios.post('service/delete', {
            serviceId: delService.id
        }).then((res) => {
            _services = _services.filter((service) => service.id !== res.data.id);
            // dispatch(loadStores(_service));
            // setServices(_services);
            dispatch(loadServices(_services));
            toast.success('Delete service successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                pauseOnHover: true,
                theme: "dark"
            });
        }).catch((res) => {console.log(res)});
    }

    const changeStore = async (storeId) => {
        const _services = await axios.post('service/getByStoreId', {
            storeId: storeId,
        })
        .then((res) => res.data)
        .catch((res) => {
    
        });
        setCurrentStoreId(storeId);
        dispatch(loadServices(_services));
    }

    useEffect(() => {
        dispatch(loadServices(initServices));
    }, []);

    return (
        <div className="p-10 grow bg-gray-light">
            <Breadcrumb  
                page={
                    {
                        title: 'Service',
                        url: '/backend/service'
                    }
                }
            />

            {isOpenPostForm
                ? <PostForm setIsOpenPostForm={setIsOpenPostForm} editService={editService} storeId={currentStoreId}/>
                : <div>
                    <div className="flex justify-end mb-5">
                        <Button text='Add new service' variant='outline-primary' onClickFunc={addNewService}/>
                    </div>
                    <div className="bg-white inline-block">
                        <div className="flex">
                            {stores.map((store) => 
                                <div 
                                    className={cn(
                                        " w-60 border-r-2 border-r-orange-honey h-8 flex justify-center items-center cursor-pointer", 
                                        store.id == currentStoreId ? "bg-white border-t-4 border-t-orange-honey" : "bg-gray-n400"
                                    )}
                                    onClick={() => changeStore(store.id)}
                                >
                                    <h2>{store.name}</h2>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="bg-white p-5">
                        {services.map((service, i) => 
                            <div className="bg-gray-n500 rounded-lg flex mb-5" key={service.id}>
                                <div className="w-16 flex justify-center items-center">
                                    <strong>{i+1}</strong>
                                </div>
                                <div className="w-60">
                                    <img src={service.image_url || "/placeholder.jpg"} className="m-5 max-h-36 mx-auto"/>
                                </div>
                                <div className="self-center m-5 basis-7/12">
                                    <h2 className="text-3xl font-bold mb-3">{service.name}</h2>
                                    <h5 className="text-lg font-semibold">{service.address}</h5>
                                    <p className="text-sm">{service.description}</p>
                                </div>
                                <div className="basis-2/12 p-5 border-x border-gray-n400 flex flex-col justify-between">
                                    <div>   
                                        <h5 className="uppercase text-right font-semibold">Price</h5>
                                        <p className="text-right">{service.price} K</p>
                                    </div>
                                    <div>
                                        <h5 className="uppercase text-right font-semibold">date created</h5>
                                        <p className="text-right">December 15, 2019</p>
                                    </div>
                                </div>
                                <div className="flex flex-col p-5 justify-center items-center">
                                    <div className="w-8 h-8 border rounded-full text-blue flex justify-center items-center cursor-pointer mb-2">
                                        <BsPen onClick={() => onEditService(service)}/>
                                    </div>
                                    <div className="w-8 h-8 border rounded-full text-red flex justify-center items-center cursor-pointer">
                                        <BsTrash onClick={() => onDeleteService(service)}/>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            }

            {openModalConfirm && 
                <ConfirmModal
                    title='Delete a service ?'
                    content={`You will delete service #[${delService.name}]. Are you sure ?`}
                    setConfirm={deleteService}
                    closeModal={() => setOpenModalConfirm(false)}
                />
            }
        </div>
    )
}

Service.getLayout = (page) => <LayoutBackend children={page} />

const PostForm = ({setIsOpenPostForm, editService, storeId}) => {

    const router = useRouter();
    const dispatch = useDispatch();
    const isEditService = !!Object.keys(editService).length;
    const [name, setName] = useState(editService?.name || '');
    const [price, setPrice] = useState(editService?.price || '');
    const [description, setDescription] = useState(editService?.description || '');
    const [isMainService, setIsMainService] = useState(editService ? editService?.isMainService : true);
    const [fileImage, setFileImage] = useState(editService?.image_url || '/placeholder.jpg');
    const services = useSelector(selectorServices);

    const onChangePrice = (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
            return;
        } else {
            setPrice(e.target.value.concat(e.key));
        }
    }

    const uploadImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const newFileName = makeRandomKey();
            const formdata = new FormData();
            formdata.append('file', file);

            axios.post(`upload?image=service&key=${newFileName}`, formdata).then((res) => {
                setFileImage(res.data);
            }).catch((res) => {});
        }
    }

    useEffect(() => {}, [])

    const submit = () => {
        axios.post('service/create', {
            storeId,
            id : isEditService ? editService.id : 0,
            name,
            price,
            description,
            isMainService,
            imageUrl: fileImage
        }).then((res) => {
            let _services = [...services];
            if (isEditService) {
                _services = _services.map((service) => {
                    if (service.id == res.data.id) {
                        return res.data;
                    }
                    return service;
                });
            } else {
                _services.unshift(res.data);
            }

            dispatch(loadServices(_services));

            toast.success('Save service successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                pauseOnHover: true,
            });
            setIsOpenPostForm(false);
        }).catch((res) => {

        });
    }

    return (
        <div>
            <BiArrowBack  className="w-10 h-10 cursor-pointer mb-3" onClick={() => setIsOpenPostForm(false)}/>
            <div className="w-full grid grid-cols-4 gap-4 mb-5">
                <div className="col-span-3 bg-white rounded-lg p-5 drop-shadow-xl">
                    <div className="mb-5 w-1/2">
                        <label className="mb-2 block font-semibold">Name</label>
                        <Input placeholder='Enter the name' defaultValue={editService?.name || ''} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="mb-5 w-full">
                        <label className="mb-2 block font-semibold">Description</label>
                        <Input placeholder='Enter the address' defaultValue={editService?.description || ''} onChange={e => setDescription(e.target.value)}/>
                    </div>
                    <div className="mb-5 w-full">
                        <label className="mb-2 block font-semibold">Price</label>
                        <Input placeholder='Enter the address' defaultValue={editService?.price || ''} onKeyPress={onChangePrice}/>
                    </div>
                    <div className="mb-5 w-full">
                        <div className="mb-2 font-semibold">
                            <label className="mb-3">Main service</label>
                            <Switch checked={isMainService} onChange={(e) => setIsMainService(e)}/>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 bg-white rounded-lg p-5 drop-shadow-xl">
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

export const getServerSideProps = async (ctx) => {

    const stores = await axios.get(`store/getStoreTab`, {
        userId: ctx.req.cookies.userId
    }).then((res) => {
        return res.data;
    }).catch((res) => {
    });

    const services = await axios.post(`service/getByStoreId`, {
        storeId: 1
    }).then((res) => {
        return res.data;
    }).catch((res) => {
    });

    if (services) {
        return {
            props: {
                initServices: services,
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

export default Service;
