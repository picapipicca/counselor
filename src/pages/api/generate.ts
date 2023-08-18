// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import openai from "@/utils/openai";

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const body = JSON.parse(req.body);
  const { question } = body || {};

  const completion = await openai.createChatCompletion({
    model:
      "gpt-3.5-turbo",
    messages:
      [
        {
          role: "user",
          content: `${question}`
        },
        {
          role: "system",
          content: "you are a dating counselor for couples. please answer the following questions in korean in 5 options in a nutshell. and recap the advice with keywords. "
        }
      ],
    max_tokens: 400,
    temperature: 0.7

  });
  const botAnswer = completion.data.choices[0].message.content;
  
  res.status(200).json({ botAnswer });
}
