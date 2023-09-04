import { NextRequest } from 'next/server';
// import { OpenAIStream } from "../../utils/OpenAIStream";
import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser";
export const config = {
    runtime: 'edge'
}
export default async function handler(
    req: NextRequest,
    context: any,
) {
    let counter = 0;
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
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
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        }
    })

    // return new Response(completion.body, {
    //     status: 200,
    //     headers: {
    //         "Content-Type": "application/json; charset=utf-8",
    //     }
    // })

    const stream = new ReadableStream({
        async start(controller) {
            function onParse(event: ParsedEvent | ReconnectInterval) {
                if (event.type === "event") {
                    const data = event.data;
                    if (data === "[DONE]") {
                        controller.close();
                        return;
                    } try {
                        const json = JSON.parse(data);
                        const text = json.choices[0].delta.content;
                        if (counter < 2 && (text.match(/\n/) || []).length) {
                            return;
                        }
                        const queue = encoder.encode(text);
                        controller.enqueue(queue);
                        counter++;
                    } catch (e) {
                        controller.error(e);
                    }
                }
            }
            const parser = createParser(onParse);
            for await (const chunk of completion.body as any) {
                parser.feed(decoder.decode(chunk));
            }
        },
    });
    return new Response(stream, { status: 200 });
    // const response = new Response(stream, {
    //     status: 200,
    //     headers: {
    //         "Content-Type": "application/json",
    //     }
    // })
    // response.headers.set("Content-Type", "application/json; charset=utf-8")
    // return response;


};



// export const config = {
//     runtime: "edge",
// };

// const handler = async (req: Request): Promise<Response> => {
//     const { userAnswer } = (await req.json()) as {
//         userAnswer?: string;
//     };
//     console.log(userAnswer);

//     const payload = {
//         model:
//             "gpt-3.5-turbo",
//         messages:
//             [
//                 {
//                     role: "user",
//                     content: userAnswer
//                 },
//                 {
//                     role: "system",
//                     content: `you are a helpful and professional dating counselor. Write 3 advices based on a given user's message. In particular, consider the personality traits of each person in the user's message and write them in the following style less than 550 characters in korean.
//                         1) first advice \n
//                         2) second advice \n
//                         3) third advice \n 
//                         -keywords: keywords of advice \n`
//                 },

//             ],
//         max_tokens: 1000,
//         stream: true,
//         temperature: 1,
//     };

//     const stream = await OpenAIStream(payload);
//     return new Response(stream);
// };

// export default handler;