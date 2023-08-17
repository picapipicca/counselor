import React, { useState } from "react";
import { questionArr } from "@/utils/dummy";
import Card from "@/components/Card";

const QuestionPage = () => {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [question, setQuestion] = useState<string>('');
    const [answer, setAnswer] = useState<any>();

    const onGenerate = async () => {
        setAnswer(undefined)
        const { botAnswer } = await fetch('/api/generate', {
            method: 'POST',
            body: JSON.stringify({ question })
        }).then(res => res.json());
        setAnswer(botAnswer);
    }
    //onGenerate 어디서 해서 question을 어디로 보내고 생성할지?
    // 1. 마지막으로 카드에 인풋 넣어서 더 하고싶은말 적게하고,
    // array로 받아온것을 다시 잘 정리해서 (utils에서 작성 에픽 여,남 받아오는것에 따라 바뀌는것 참고) 한줄로 만들어서 onGenerate
    // generate된 queston을 신상정보를 데이터로 저장 
    // 2. 로딩중에는 주고 사진을 랜덤으로 보여주기
    // 3. result 를 컴포넌트 조립해서 보여주기 (부적, 따다닥 나타나기 등)
    // 4. react-hook-form 다시 도전해보기
    // 어드민 페이지
    // 구상 : questionArr를 어드민에서 관리한다 어드민에서 가지고오기
    // 질문 장르에 따라 버튼을 만들어서 (어드민에서 만들면 생기게) 들어갈수있게
    //예: 관계 유지, 관계 이별, 사랑을 갈구, 등등 그 mei 페이지 다시 들어가보기

    const goBack = (idx: number) => {
        setCurrentIdx(idx - 1);
    }
    const onSwipe = (direction: any) => {
        if (currentIdx >= 0 && currentIdx < questionArr.length - 1) {
            setCurrentIdx(currentIdx + 1);
        }
        if (direction === 'result') {
            onGenerate()

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
                                    <div key={index}>
                                        <p className="font-semibold text-lg">{index + 1}/{questionArr.length}</p>
                                        <Card index={currentIdx} section={section} setQuestion={setQuestion} />
                                        <div className="flex">
                                            {index > 0 && <button onClick={() => goBack(index)} className="fixed left-0">&lt;</button>}
                                            <button className="fixed right-0" onClick={() => onSwipe(index === questionArr.length - 1 ? 'result' : 'right')}>{index < (questionArr.length - 1) ? `>` : `결과보기`}</button>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                </>
            }
        </main>
    );
}

export default QuestionPage;