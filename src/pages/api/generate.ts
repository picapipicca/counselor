// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import openai from "@/utils/openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const body = JSON.parse(req.body);
  const { userAnswer } = body || {};

  const completion = await openai.createChatCompletion({
    model:
      "gpt-3.5-turbo",
    messages:
      [
        {
          role: "user",
          content: `${userAnswer}`
        },
        {
          role: "system",
          content: "you are a helpful,professional dating counselor. please offer 3 way of accessible, convenient and affordable solution to help struggling couples to improve their relationship. please answer in korean within 700 characters and show the keywords at the end."
        }
      ],
    max_tokens: 500,
    temperature: 1

  });
  const botAnswer = completion.data.choices[0].message.content;

  res.status(200).json({ botAnswer });
}
