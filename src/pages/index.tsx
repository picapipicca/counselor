import { Inter } from 'next/font/google'
import { useState } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <Layout>
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
        <div className='sm:mt-0 my-4'>
          {/* 캔버스 타로 원 돌아가는 이미지 */}
        </div>
        <div>
          <Link
            href="/questions"
            className="text-lg font-semibold hover:animate-bounce w-fit min-w-[100px] sm:px-10 py-2 rounded-full border bg-white shadow-lg"
          >
            시작하기
          </Link>
        </div>
      </section>
    </Layout>
  )
}
