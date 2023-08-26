import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { questionArr } from "@/utils/questionData";
import Card from "@/components/Card";
import useTransText from "@/utils/transText";
import { createParser } from "eventsource-parser";
import { Song_Myung } from "next/font/google";
import Image from "next/image";

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

    const form = useForm<FormValues>({
        defaultValues: {
            addText: "",
            question: questionArr.map((el: any) => ({ id: el.id, me: "", you: "" }))
        }
    })
    const { handleSubmit, register, control, formState: { errors } } = form;

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

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        function onParse(event: any) {
            if (event.type === 'event') {
                try {
                    const data = JSON.parse(event.data);
                    data.choices
                        .filter(({ delta }: any) => !!delta.content)
                        .forEach(({ delta }: any) => {
                            setAnswer((prev: any) => {
                                return `${prev || ''}${delta.content}`
                            });

                        })
                } catch (e) {
                    alert("AI 컨설팅에 실패했습니다. 다시 시도해 주세요")
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

    return (
        <main className="w-full">
            {answer ? <div className={song.className}>
                <div className="w-full mx-auto">
                    <Image src={`/assets/images/${chosenImage}`} alt="card" width={530} height={530} className="mx-auto sm:visible collapse" />
                    <Image src="/assets/images/taro_6.jpeg" alt="card" width={530} height={530} className="opacity-20 mx-auto visible sm:hidden xxs:-mt-[470px] xs:-mt-[750px] sm:-mt-[600px] md:-mt-0" />
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
                                <h3>추가로 작성하고싶은 고민을 입력하세요!</h3>
                                <textarea rows={5} className="focus:outline-none focus:ring-neutral-500 focus:ring-1 sm:max-w-2xl w-full rounded-md border border-neutral-400 p-4 text-neutral-900 shadow-sm placeholder:text-neutral-400 focus:border-neutral-900" placeholder="없다면 빈칸으로 남겨두어도 좋습니다 :)" {...register("addText")} />
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