import Link from "next/link";
import cn from 'classnames';
import { useEffect, useRef, useState } from "react";
import PhoneBookingForm from "../PhoneBookingForm";


const Banner = () => {
    const bannerContainer = useRef(null);
    const [actualSlide, setActualSlide] = useState(0);
    const translateBanner = { 
        transition: 'all .4s ease-out',
        transform: `translate3d(-${actualSlide*100}%, 0px, 0px)` 
    };

    const data = [
        {
            link: '',
            // image: 'https://d7y19uepu1s8k.cloudfront.net/52/storage/section/413.PT0DE6273901886bf4.png'
            image: 'https://storage.30shine.com/banner/20220119_BannerSC100_w.jpg'
        },
        {
            link: '',
            // image: 'https://d7y19uepu1s8k.cloudfront.net/52/storage/section/413.PT0DE6273901886bf4.png'
            image: 'https://storage.30shine.com/banner/20220210_Banner_30Shine_Moca_w.jpg'
        },
        {
            link: '',
            // image: 'https://d7y19uepu1s8k.cloudfront.net/52/storage/section/413.PT0DE6273901886bf4.png'
            image: 'https://storage.30shine.com/banner/220126_BannerUon_w.jpg'
        },
    ];

    const scrollTo = (index) => {
        clearTimeout(slideTimeout);
        setActualSlide(index);
    }

    const slideTimeout = setTimeout(() => {
        if (actualSlide == data.length - 1) {
            setActualSlide(0);
        } else {
            setActualSlide(actualSlide + 1);
        }
    }, 3000);

    useEffect(() => {
        clearTimeout(slideTimeout);
        slideTimeout;
    }, [actualSlide]);

    return (
        <div className="relative mb-10">
            <div ref={bannerContainer}  className='embla rounded-ssm overflow-hidden'>
                <div className="flex" style={translateBanner}>
                    {data.map((i, index) =>
                        <div key={index}
                            className='relative basis-full shrink-0 mr-1.5'
                        >
                            <Link href={i.link}>
                                <picture>
                                    <img
                                        src={i.image}
                                        alt={i.title || 'Banner'}
                                        className='rounded-ssm'
                                    />
                                </picture>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            {/* <div className="text-center w-full">
                {data.length > 1 && data.map((_, index) => {
                    return (
                        <span
                            key={index}
                            className={cn(
                                'w-2 h-2 rounded-full inline-block mx-1 cursor-pointer',
                                index === actualSlide ? 'bg-blue' : 'bg-black opacity-20'
                            )}
                            onClick={() => scrollTo(index)}
                        ></span>
                    );
                })}
            </div> */}
            <PhoneBookingForm />
        </div>
    );
}

export default Banner;