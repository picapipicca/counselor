import Link from 'next/link';
import Spline from "@splinetool/react-spline";
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
// const Spline = dynamic(() => import('@splinetool/react-spline'), { loading: () => <div className="w-full min-h-fit h-[50vh]"><p>Loading....</p></div> });

export default function Home() {
  return (
    <section>
      <h1 className="head_text text-center">
        연애고민 상담소
        <br className="max-md:hidden" />
        <span className="red_gradient text-center">AI-Dating Counselor</span>
      </h1>
      <p className='description text-center'>
        친구에게도 가족에게도 마음편히 말할수 없는 연애 고민을,
        <br /> AI 연애 상담사에게 말하고 상담받아 보세요.
      </p>
      {/* <div className="sm:mb-10 mb-4 w-full min-h-fit h-[50vh]">
        <Spline scene="https://prod.spline.design/Y54gATaCehiHdyse/scene.splinecode" />
      </div> */}
      <div className="sm:mb-10 mb-4 w-full min-h-fit h-[50vh]">
        <Suspense fallback={<div className='w-[70%] aspect-square rounded-full bg-gradient-to-r from-indigo-300 from-10% via-orange-300 via-40% to-pink-300 to-90% blur-sm'/>}>
          <Spline scene="https://prod.spline.design/Y54gATaCehiHdyse/scene.splinecode" />
        </Suspense>
      </div>

      <button className='w-full'>
        <Link
          href="/questions"
          className="text-lg font-semibold hover:animate-bounce w-fit px-6 min-w-[100px] sm:px-10 py-3 rounded-full bg-white shadow-lg mx-auto">
          시작하기
        </Link>
      </button>
    </section>
  )
}
