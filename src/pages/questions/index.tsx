import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { questionArr } from "@/utils/dummy";
import Card from "@/components/Card";

type FormValues = {
    question: any[];
    addText: string;
}

const QuestionPage = () => {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answer, setAnswer] = useState<any>();
    
    const onGenerate = async () => {
        setAnswer(undefined)
        const { botAnswer } = await fetch('/api/generate', {
            method: 'POST',
            //answer 자리에 받은 데이터 넣어주기
            body: JSON.stringify({ answer })
        }).then(res => res.json());
        setAnswer(botAnswer);
    }
    const form = useForm<FormValues>({
        defaultValues: {
            addText: "",
            question: [
                { me: "", you: "" },
                { me: "", you: "" },
                { me: "", you: "" },
                { me: "", you: "" },
                { me: "", you: "" },
                { me: "", you: "" },
                { me: "", you: "" },
                { me: "", you: "" },
                { me: "", you: "" },
                { me: "", you: "" },
                { me: "", you: "" },
                { me: "", you: "" },
                { me: "", you: "" },
                { me: "", you: "" },]
        }
    })
    const { handleSubmit, register, control, formState: { errors } } = form;
    const onSubmit = (data: any) => {
        console.log(data);
    }
    //onGenerate 어디서 해서 question을 어디로 보내고 생성할지?
    // 1. 마지막으로 카드에 인풋 넣어서 더 하고싶은말 적게하고,-완료 
    // array로 받아온것을 다시 잘 정리해서 (utils에서 작성 에픽 여,남 받아오는것에 따라 바뀌는것 참고) 한줄로 만들어서 onGenerate - onSubmtit 에서 작성하기
    // generate된 queston을 신상정보를 데이터로 저장 
    // 2. 로딩중에는 주고 사진을 랜덤으로 보여주기
    // 3. result 를 컴포넌트 조립해서 보여주기 (부적, 따다닥 나타나기 등)
    // 4. react-hook-form 다시 도전해보기
    // 어드민 페이지
    // 구상 : questionArr를 어드민에서 관리한다 어드민에서 가지고오기
    // 질문 장르에 따라 버튼을 만들어서 (어드민에서 만들면 생기게) 들어갈수있게
    //예: 관계 유지, 관계 이별, 사랑을 갈구, 등등 그 mei 페이지 다시 들어가보기
    // global css 에 apply error남

    const goBack = (idx: number) => {
        setCurrentIdx(idx - 1);
    }
    const onSwipe = (direction: any) => {
        if (currentIdx >= 0 && currentIdx < questionArr.length - 1) {
            setCurrentIdx(currentIdx + 1);
        }
        if (direction === 'result') {
            // onGenerate()

        }
    }
    return (
        <main className="w-full">
            {answer ? (<div className="flex flex-col items-center">{answer}</div>) :
                <>
                    {
                        questionArr.map((section: any, index: number) => {
                            if (currentIdx === index) {
                                return (
                                    <div key={index} className="pt-8">
                                        <p className="font-semibold text-lg text-center">{index + 1}/{questionArr.length}</p>
                                        <Card control={control} index={currentIdx} section={section} />
                                        <div className="w-1/4 h-10 mx-auto grid grid-cols-6 justify-items-center -mt-12">
                                            {index > 0 && <button onClick={() => goBack(index)} className="w-10 animate-fade-in rounded-full px-4 py-1.5 text-sm font-medium text-gray-500 transition-colors ease-out hover:text-black">&lt;</button>}
                                            {index < questionArr.length - 1 && <button className="w-10 col-end-7 animate-fade-in rounded-full px-4 py-1.5 text-sm font-medium text-gray-500 transition-colors ease-out hover:text-black" onClick={() => onSwipe('right')}>{`>`}</button>}
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                    {currentIdx === (questionArr.length - 1) && <div><div className="mx-auto w-full text-center p-6 space-y-2"><h3>추가로 작성하고싶은 고민을 입력하세요!</h3><textarea rows={5} className="rounded w-1/4 border border-gray-300" placeholder="없다면 빈칸으로 남겨두어도 좋습니다 :)" {...register("addText")} /></div><button className="mx-auto mb-8 black_btn" onClick={handleSubmit(onSubmit)}>결과보기</button></div>}
                </>
            }
        </main>
    );
}

export default QuestionPage;