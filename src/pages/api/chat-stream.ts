import { NextRequest } from 'next/server';
export const config = {
    runtime: 'edge'
}

export default async function handler(
    req: NextRequest,
    context: any,
) {
    const { userAnswer } = await req.json();

    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
        method: 'POST',
        body: JSON.stringify({
            model:
                "gpt-3.5-turbo",
            messages:
                [
                    {
                        role: "user",
                        content: userAnswer
                    },
                    {
                        role: "system",
                        content: `you are a helpful and professional dating counselor. Write 3 advices based on a given user's message. In particular, consider the personality traits of each person in the user's message and write them in the following style less than 550 characters in korean.
                        1) first advice \n
                        2) second advice \n
                        3) third advice \n 
                        -keywords: keywords of advice \n`
                    },

                ],
            max_tokens: 1000,
            stream: true,
            temperature: 1,
        }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        }
    })

    return new Response(completion.body, {
        status: 200,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        }
    })
}
