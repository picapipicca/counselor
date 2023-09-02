import { useEffect } from "react";

interface UseSNSShareParams {
    title?: string;
    url?: string;
    option?: {
        windowOpenTarget: "_blank" | "_parent" | "_self" | "_top";
    }
}

declare global {
    interface Window {
        Kakao: any;
    }
}
export const isShareSupported = () => navigator.share ?? false;

const useSNSShare = ({ title, url, option }: UseSNSShareParams) => {
    // const { t } = useTranslation();

    const shareToFaceBook = () => {
        const sharedLink = encodeURIComponent(url!);
        openWidnow(`http://www.facebook.com/sharer/sharer.php?u=${sharedLink}`);
    }

    const shareToKakaoTalk = () => {
        if (window.Kakao === undefined) {
            alert("카카오톡 공유는 모바일에서만 가능합니다.")
            return;
        }

        const kakao = window.Kakao;

        if (!kakao.isInitialized()) {
            kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
        }

        kakao.Share.sendDefault({
            objectType: "feed",
            content: {
                title: title,
                description: 'AI 연애고민 상담소에 오신 것을 환영합니다. AI가 당신의 연애고민을 해결해드릴게요. 지금 바로 AI 연애고민 상담소에 연애고민을 남겨보세요!',
                imageUrl:
                    // 'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
                    "",
                link: {
                    mobileWebUrl: url,
                    webUrl: url,
                },
                buttons: [
                    {
                        title: "나도 테스트 하러가기",
                        link: {
                            mobileWebUrl: url,
                        }
                    }
                ]
            },

            text: title,
            link: {
                mobileWebUrl: url,
                webUrl: url,
            },
        });
    };

    const shareToNavigator = ({ title, url }: { title: string; url: string }) => {
        const sharedData = {
            text: title,
            url: url,
        };

        try {
            if (navigator.canShare && navigator.canShare(sharedData) && isShareSupported()) {
                navigator
                    .share(sharedData)
                    .then(() => {
                        console.log("성공")
                    })
                    .catch(() => {
                        console.log("실패")

                    });
            } else {
                window.navigator.clipboard.writeText(url).then(() => alert("링크가 복사되었습니다."))
            }
        } catch (e) {
            console.log("실패")
        }
    };

    const openWidnow = (url: string) => {
        window.open(url, option?.windowOpenTarget || "_blank");
    };

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return {
        shareToKakaoTalk,
        shareToFaceBook,
        shareToNavigator,
    };
};

export default useSNSShare;