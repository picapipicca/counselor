import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
    titleTemplate: "%s - AI 연애고민 상담소",
    additionalLinkTags: [
        {
            rel: 'icon',
            href: '/assets/images/favicon.ico',
        },
        {
            rel: 'manifest',
            href: '/assets/images/site.webmanifest',
        },
    ],
    openGraph: {
        type: 'website',
        locale: 'ko_KR',
        url: 'https://datexpert.site/',
        siteName: 'AI 연애고민 상담소',
        description:
            "AI 연애고민 상담소에 오신 것을 환영합니다. AI가 당신의 연애고민을 해결해드립니다. 지금 바로 AI 연애고민 상담소에 연애고민을 남겨보세요!",
        // images: [
        //     {
        //         url: "/home-og-image.jpeg",
        //         width: 1200,
        //         height: 630,
        //         alt: "Og Image Alt",
        //     },
        // ],
    },
};

export default config;