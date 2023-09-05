import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Song_Myung } from "next/font/google";
import { createParser } from "eventsource-parser";
import { DefaultSeo } from "next-seo";
import useTransText from "@/utils/transText";
import Card from "@/components/Card";
import { questionArr } from "@/utils/questionData";

const song = Song_Myung({ weight: "400", subsets: ['latin'], })

type FormValues = {
    question: any[];
    addText: string;
}

const QuestionPage = () => {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [inputBox, setInputBox] = useState(false);
    const [answer, setAnswer] = useState('');
    const { transQuestion } = useTransText()
    const images = ["card_img_1.png", "card_img_2.png"];
    const chosenImage = images[(new Date().getMinutes() % 2)]

    const { handleSubmit, register, control, formState: { errors } } = useForm<FormValues>
        ({
            defaultValues: {
                addText: "",
                question: questionArr.map((el: any) => ({ id: el.id, me: "", you: "" }))
            }
        });

    const onSubmit = (data: any) => {
        const answerInLine = transQuestion(questionArr, data.question, data.addText);
        onGenerate(answerInLine)
    }

    const goBack = (idx: number) => {
        setCurrentIdx(idx - 1);
        setInputBox(false);
    }
    const onSwipe = (direction: any) => {
        if (currentIdx >= 0 && currentIdx < questionArr.length - 1) {
            setCurrentIdx(currentIdx + 1);
        }
        if (direction === 'result') {
            setInputBox(true);
        }
    }

    const onGenerate = async (userAnswer: string) => {
        const response = await fetch('/api/chat-stream', {
            method: "POST",
            body: JSON.stringify({ userAnswer }),
        })
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = response.body;
        if (!data) {
            return;
        }
        const reader = data.getReader();
        const decoder = new TextDecoder();
        let done = false;
        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            setAnswer((prev) => prev + chunkValue);
        }
    }

    return (
        <main className="w-full">
            <DefaultSeo
                title="상담 중"
                openGraph={{
                    type: 'website',
                    url: 'https://datexpert.site/questions',
                    siteName: 'AI 연애 상담사',
                    locale: 'ko_KR',
                }}
            />
            {answer ? <div className={song.className}>

                <div className="w-full mx-auto pt-10 relative">
                    <Image src={`/assets/images/${chosenImage}`} alt="card" width={600} height={500} className="mx-auto sm:visible collapse max-h-[80vh]" />
                    <Image src="/assets/images/taro_6.jpeg" alt="card" fill className="opacity-20 visible sm:hidden mt-10 max-h-[70vh] overflow-auto" />
                </div>
                <div className="result_txt">
                    <p className="mx-auto text-gray-600">{answer}</p>
                </div>
            </div> :
                <>
                    {
                        questionArr.map((section: any, index: number) => {
                            if (currentIdx === index) {
                                return (
                                    <div key={index} className="pt-8 px-4">
                                        <div className="mb-6 h-1 max-w-2xl mx-auto bg-neutral-200 items-center flex">
                                            <div className={`h-1 bg-[#fde58a]`} style={{ width: `${((index + 1) / questionArr.length) * 100}%` }}></div>
                                            <div className="w-5 border border-[#fbd24e] box-border bg-white aspect-square rounded-full -ml-2" />
                                        </div>
                                        <Card errors={errors} control={control} index={currentIdx} section={section} />
                                        <div className="sm:max-w-2xl h-10 mx-auto grid grid-flow-col grid-cols-6 justify-items-center -mt-10 ">
                                            <button onClick={() => goBack(index)} className={`${index <= 0 ? "opacity-50 pointer-events-none" : ""} col-span-3 col-start-1 col-end-4 bg-red-100 animate-fade-in rounded-l-lg w-full text-sm font-medium text-gray-500 transition-colors ease-out hover:text-black`}>&lt;</button>
                                            <button className={`${inputBox ? "opacity-50 pointer-events-none" : ""} w-full col-span-3 col-start-4 col-end-7 animate-fade-in bg-blue-100 rounded-r-lg text-sm font-medium text-gray-500 transition-colors ease-out hover:text-black`} onClick={() => onSwipe(`${index < questionArr.length - 1 ? 'right' : 'result'}`)}>{`>`}</button>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                    {inputBox &&
                        <section>
                            <div className="mx-auto w-full text-center p-6 space-y-2">
                                <h3>추가로 작성하고싶은 고민을 입력하세요! </h3>
                                <textarea rows={6}
                                    className="focus:outline-none focus:ring-neutral-500 focus:ring-1 sm:max-w-2xl w-full rounded-md border border-neutral-400 p-4 text-neutral-900 shadow-sm placeholder:text-neutral-400 focus:border-neutral-900"
                                    placeholder="예시 ) 그 사람과 더 잘 지내고 싶어요 / (어떤 상황에서) 자꾸 다투게 되요. 어떻게 해야 이런 상황을 피할수 있을까요? / 연인은 (이러이러한) 성격입니다. 상처 받지 않게 설득하는 방법이 있을까요? 등등.." {...register("addText")} />
                            </div>
                            <button className="mx-auto mb-8 black_btn" onClick={handleSubmit(onSubmit)}>
                                결과보기
                            </button>
                        </section>}
                </>
            }
        </main >
    );
}

export default QuestionPage;