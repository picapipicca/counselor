import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<any>();

  const onGenerate = async (e: any) => {
    e.preventDefault();
    setAnswer(undefined)
    const { botAnswer } = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify({ question })
    }).then(res => res.json());
    setAnswer(botAnswer);
  }
  return (
    <div>
      <h1>Generate text</h1>
      <input type="text" onChange={(e) => setQuestion(e.target.value)} className='h-10 px-2 text-black' />
      <button onClick={onGenerate} className='bg-gray-100 h-10 px-2 ml-2 text-black rounded-lg'>Generate</button>
      <p className='mt-10'>{answer}</p>
    </div>
  )
}
