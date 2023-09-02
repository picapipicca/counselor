import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import HamburgerIcon from "./HamburgerIcon";
import useSNSShare from "@/utils/useSNSShare";

const Nav = () => {

    const [toggleDropdown, setToggleDropdown] = useState(false);
    const { shareToFaceBook, shareToNavigator } = useSNSShare({ title: "AI 연애고민 상담소", url: "https://datexpert.site" });
    // const onHandleShare = () => {
    //     if (navigator.share) {
    //         navigator.share({
    //             title: '연애고민 상담소',
    //             text: 'AI에게 받는 연애상담, 궁금하지 않으신가요~?',
    //             url: 'https://datexpert.site/',
    //         })
    //             .then(() => alert('url이 복사되었습니다!'))
    //             .catch((error) => console.log('url 복사에 실패하였습니다'));
    //     } else {
    //         alert('공유하기가 지원되지 않는 환경입니다');
    //     }
    // }
    // const handleShare = () => {
    //     const result = await share(dataToShare);
    //     if (result === "copyToClipboard") {
    //         alert("링크를 클립보드에 복사하였습니다.");
    //     } else if (result === "fail") {
    //         alert("공유하기가 지원되지 않는 환경입니다.");
    //     }

    // }
    const shareToKakaoTalk = () => {
        const kakao = window.Kakao;
        kakao.Share.sendDefault({
            objectType: "feed",
            content: {
                title: "AI 연애고민 상담소",
                description: 'AI 연애고민 상담소에 오신 것을 환영합니다. AI가 당신의 연애고민을 해결해드릴게요. 지금 바로 AI 연애고민 상담소에 연애고민을 남겨보세요!',
                imageUrl:
                    // 'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
                    "",
                link: {
                    mobileWebUrl: "https://datexpert.site",
                    webUrl: "https://datexpert.site",
                },
                buttons: [
                    {
                        title: "나도 테스트 하러가기",
                        link: {
                            mobileWebUrl: "https://datexpert.site",
                        }
                    }
                ]
            },
            text: "AI 연애고민 상담소",
            link: {
                mobileWebUrl: "https://datexpert.site",
                webUrl: "https://datexpert.site",
            },
        });
    };

    useEffect(() => {
        const kakao = window.Kakao;
        if (kakao === undefined) {
            return;
        }
        if (!kakao.isInitialized()) {
            kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
        }
    }, []);

    return (
        <nav className="flex justify-between w-full sm:mb-4 mb-4 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image src="/assets/images/crystal_ball.png" alt="logo" width={30} height={30} className="object-contain w-auto h-auto" />
                <p className="logo_text">연고사</p>
            </Link>

            {/* Desktop Navigation */}
            <div className="sm:flex hidden">
                <div className="flex gap-3 md:gap-5">
                    <button type="button" className="black_btn" onClick={() => shareToNavigator({ title: "AI 연애고민 상담소", url: "https://datexpert.site" })}>공유하기</button>
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
                                    <div className="mx-auto bg-[#f1f0ea] text-center p-1 space-y-1 rounded-lg" onClick={() => setToggleDropdown(false)}>공유하기
                                        <button className="dropdown_detail" type="button" onClick={shareToKakaoTalk}>카카오톡</button>
                                        <button className="dropdown_detail" type="button" onClick={() => shareToFaceBook()}>페이스북</button>
                                        <button className="dropdown_detail" type="button" onClick={() => shareToNavigator({ title: "AI 연애고민 상담소", url: "https://datexpert.site" })}> url</button>
                                    </div>
                                    {/* <button className="dropdown_detail" type="button" onClick={() => { setToggleDropdown(false); shareToKakaoTalk(); }}>
                                        공유하기
                                    </button> */}
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div >
        </nav >
    );
}

export default Nav;