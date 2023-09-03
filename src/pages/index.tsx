import Link from 'next/link';
import dynamic from 'next/dynamic';
const Spline = dynamic(() => import('@splinetool/react-spline'),
  {
    ssr: false,
    loading: () => <div className='mx-auto my-auto w-[60%] h-[60%] rounded-full bg-gradient-to-r from-indigo-300 from-10% via-orange-300 via-40% to-pink-300 to-90% blur-sm animate-pulse' />
  });

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
      <div className="sm:mb-10 sm:w-full w-full mb-4 min-h-fit sm:h-[50vh] h-[35vh] flex ">
        <Spline scene="https://prod.spline.design/Y54gATaCehiHdyse/scene.splinecode"/>
      </div>

      <button className='w-full mb-10'>
        <Link
          href="/questions"
          className="text-lg font-semibold hover:animate-bounce w-fit px-6 min-w-[100px] sm:px-10 py-3 rounded-full bg-white shadow-lg mx-auto">
          시작하기
        </Link>
      </button>
    </section>
  )
}
