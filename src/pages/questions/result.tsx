import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hook";
import { createParser } from 'eventsource-parser';
import { Song_Myung } from "next/font/google";
import { useRouter } from "next/router";

const song = Song_Myung({ weight: "400", subsets: ['latin'], })

const ResultPage = () => {
    const router = useRouter();
    const [botAnswer, setBotAnswer] = useState<any>('');
    const questionData = useAppSelector((state) => state.fetchOpenAI.answerInLine);

    const onGenerate = async (userAnswer: string) => {

        const response = await fetch('/api/chat-stream', {
            method: "POST",
            body: JSON.stringify({ userAnswer }),
        })

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        function onParse(event: any) {
            if (event.type === 'event') {
                try {
                    const data = JSON.parse(event.data);
                    data.choices
                        .filter(({ delta }: any) => !!delta.content)
                        .forEach(({ delta }: any) => {
                            setBotAnswer((prev: any) => {
                                return `${prev || ''}${delta.content}`
                            })
                        })
                } catch (e) {
                    console.log(e);
                }
            }
        }
        const parser = createParser(onParse);

        while (true && reader) {
            const { value, done } = await reader.read();
            const dataString = decoder.decode(value);
            if (done || dataString.includes('[DONE]')) break;
            parser.feed(dataString);

        }
    }

    useEffect(() => {
        if (!questionData) {
            alert("잘못된 접근입니다. 다시 시도해 주세요 :'(");
            router.push('/questions');
        };;
        onGenerate(questionData);
    }, [questionData])

    return (
        <section className="sm: max-w-2xl mx-auto">
            {botAnswer ? <div className={song.className}>
                <p className='text-lg'>{botAnswer}</p>
            </div> : null}

        </section>
    )
}
export default ResultPage;