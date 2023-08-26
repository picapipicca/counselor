const useTransText = () => {

    const transQuestion = (questionArray: any[], answers: { id: number, me: string, you: string }[], addText?: string) => {

        const sentences = [];

        // 한글변환 함수
        function convertAnswerToKorean(answer: string) {
            if (answer === "X" || answer === "O") {
                return answer === "O" ? "그렇다" : "아니다";
            } else if(answer === ""){
                return "모르겠다";
            }
            return answer;

        }
        for (let i = 0; i < questionArray.length; i++) {
            const question = questionArray[i];
            const answer = answers[i].id === question.id ? answers[i] : null;

            if (answer) {
                const meAnswer = convertAnswerToKorean(answer.me);
                const youAnswer = convertAnswerToKorean(answer.you);
                const sentence = `${question.title}의 질문에는 나는 ${meAnswer}고 상대방은 ${youAnswer}야.`;
                sentences.push(sentence);
            }
        }

        addText && sentences.push(addText);
        return sentences.join(" ");

    };

    return {
        transQuestion,
    }
}
export default useTransText;