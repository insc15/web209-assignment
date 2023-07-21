import Container from "../components/layout/container";
import { BsTelephoneInbound, BsPinterest, BsInstagram, BsFacebook, BsHandbag, BsHeart, BsPerson, BsGeoAlt } from "react-icons/bs";
import { BiEnvelope, BiSearch, BiPhoneIncoming } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import CategorySelector from "./category.header";
import { useState, useEffect } from "react";

function Header() {
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    // const location = useLocation();
    const navigate = useNavigate();
    // const [path, setPath] = useState<string>('');
    // const headerRef = useRef(null);
    // useEffect(() => {
    //     setPath(location.pathname);
    // }, [location.pathname]);

    useEffect(() => {
        setSearchKeyword('');
    }, [navigate]);

    const handleSearchInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        const inputElement = event.target as HTMLInputElement;
        setSearchKeyword(inputElement.value);
    };

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const searchParams = new URLSearchParams();
        searchParams.append('s', searchKeyword);
        navigate({
            pathname: 'search',
            search: searchParams.toString()
        });
    };
    return (
        <header className="">
            <div className="bg-[#111214] text-gray-300 text-xs">
                <Container className="py-3 flex justify-between items-center">
                    <div className="flex items-center">
                        <p className="flex items-center">
                            <BsTelephoneInbound className="text-base" />
                            <span className="ml-2">+(84) - 1800 - 4635</span>
                        </p>
                        <p className="flex items-center ml-4">
                            <BiEnvelope className="text-base" />
                            <span className="ml-2">info@bookstore.com</span>
                        </p>
                    </div>
                    <ul className="flex items-center">
                        <li className="ml-5"><a href="https://github.com/programeoww" target="_blank"><FaGithub className="text-xl" /></a></li>
                        <li className="ml-5"><a href="#" target="_blank"><BsPinterest className="text-xl" /></a></li>
                        <li className="ml-5"><a href="#" target="_blank"><BsInstagram className="text-xl" /></a></li>
                        <li className="ml-5"><a href="#" target="_blank"><BsFacebook className="text-xl" /></a></li>
                    </ul>
                </Container>
            </div>
            <div className="border-b border-solid border-gray-300">
                <Container className="py-5 flex justify-between items-center">
                    <div className="">
                        <Link to="/">
                            <img src={logo} alt="logo" className="w-44" />
                        </Link>
                    </div>
                    <div className="flex items-center w-3/4 justify-end">
                        <form className="w-full" action="" onSubmit={(event)=>handleSearchSubmit(event)}>
                            <label className="relative bg-gray-100 rounded-full w-full block">
                                <BiSearch size="22" className="text-gray-400 mr-3 absolute top-1/2 -translate-y-1/2 left-5" />
                                <input value={searchKeyword}
                                    onInput={(event)=>handleSearchInputChange(event)} className="bg-transparent outline-none w-full px-14 py-3" type="text" placeholder="Search products..." />
                                <button className="absolute top-0 bottom-0 bg-primary hover:bg-button-hover duration-150 rounded-full px-9 right-0 text-white">
                                    <BiSearch size="22" />
                                </button>
                            </label>
                        </form>
                        {/* <p className="mx-8 hover:underline cursor-pointer shrink-0"><BsGeoAlt className="inline" size="20" /> Find a book store</p> */}
                        <ul className="flex items-center">
                            <li className="relative ml-5 cursor-pointer hover:text-primary duration-150">
                                <BsPerson size="26" />
                            </li>
                            <li className="relative ml-5 cursor-pointer hover:text-primary duration-150">
                                <BsHeart size="22" />
                                <span className="absolute top-0 right-0 rounded-full bg-gray-600 text-white p-px text-xs w-4 h-4 text-center translate-x-1/3 -translate-y-1/4 outline-white outline">0</span>
                            </li>
                            <li className="relative ml-5 cursor-pointer hover:text-primary duration-150">
                                <BsHandbag size="22" />
                                <span className="absolute top-0 right-0 rounded-full bg-gray-600 text-white p-px text-xs w-4 h-4 text-center translate-x-1/3 -translate-y-1/4 outline-white outline">0</span>
                            </li>
                        </ul>
                    </div>
                </Container>
            </div>
            <Container className="py-5 flex items-center">
                <div className="w-2/12">
                    <CategorySelector />
                </div>
                <nav className="w-10/12 flex items-center justify-end">
                    <ul className="flex justify-center font-medium w-full">
                        <li className="hover:text-primary duration-150 cursor-pointer mx-5"><Link to="/">Trang chủ</Link></li>
                        <li className="hover:text-primary duration-150 cursor-pointer mx-5">Về chúng tôi</li>
                        <li className="hover:text-primary duration-150 cursor-pointer mx-5"><Link to="/shop">Cửa hàng</Link></li>
                        <li className="hover:text-primary duration-150 cursor-pointer mx-5">Tin tức</li>
                        <li className="hover:text-primary duration-150 cursor-pointer mx-5">Liên hệ</li>
                    </ul>
                    <div className="flex items-center shrink-0">
                        <div className="p-2 rounded-full bg-gray-200 text-primary">
                            <BiPhoneIncoming className="text-2xl" />
                        </div>
                        <p className="ml-5">
                            <span className="block font-semibold text-primary">+(84) - 1800 - 4635</span>
                            <span className="block text-xs font-medium">24/7 Support Center</span>
                        </p>
                    </div>
                </nav>
            </Container>
        </header>
    );
}

export default Header;