import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import HamburgerIcon from "./HamburgerIcon";

const Nav = () => {
    const [toggleDropdown, setToggleDropdown] = useState(false);
    return (
        <nav className="flex justify-between w-full sm:mb-4 mb-4 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image src="/assets/images/crystal_ball.png" alt="logo" width={30} height={30} className="object-contain w-auto h-auto" />
                <p className="logo_text">연고사</p>
            </Link>

            {/* Desktop Navigation */}
            <div className="sm:flex hidden">
                <div className="flex gap-3 md:gap-5">
                    <button type="button" className="black_btn">공유하기</button>
                    <Link href={"/"} className="outline_btn">홈</Link>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden">
                <ul className="menu">
                    <li onClick={() => setToggleDropdown((prev) => !prev)} onBlur={() => setToggleDropdown(false)}>
                            <HamburgerIcon />
                        {toggleDropdown && (
                            <ul className="group-hover:visible">
                                <li>
                                    <Link href={"/"} className="dropdown_detail" onClick={() => setToggleDropdown(false)}>
                                        홈으로
                                    </Link>
                                </li>
                                <li>
                                    <button className="dropdown_detail" type="button" onClick={() => setToggleDropdown(false)}>
                                        공유하기
                                    </button>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;