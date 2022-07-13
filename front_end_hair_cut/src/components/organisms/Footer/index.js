import CopyRight from "../CopyRight";

const Footer = () => {
    return (
        <div>
            <div className="px-5 pb-2 pt-10 bg-gray-light">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-wrap justify-around">
                        <div className="w-1/6">
                        <p className="font-semibold text-lg">Barber Store</p>
                        </div>
                        <div className="w-1/4 text-left">
                            <p className="font-semibold text-lg">Information</p>
                            <div className="mt-4 text-sm text-text-contrast leading-9">
                                <a href="#">About us</a>
                                <a href="#">Contact us</a>
                            </div>
                        </div>
                        <div className="w-1/4 text-left">
                            <p className="font-semibold text-lg">Location</p>
                            <div className="mt-4 text-sm text-text-contrast leading-9">
                                <p>v217 Wrangler Drive</p>
                                <p>Coppel, TX, 75019</p>
                                <p>United States</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CopyRight />
        </div>
    )
}

export default Footer;