import { Controller } from "react-hook-form";

interface CardProps {
    index: number;
    section: any;
    control: any;
}

const Card = ({ control, section, index }: CardProps) => {

    return (
        <section className="mx-auto sm:max-w-xl w-full p-10 bg-white border border-gray-200 rounded-lg shadow sm:p-10">
            <h3 className="mb-3 text-xl font-medium text-gray-900 md:text-xl"> <span className="text-orange-600">Q.</span>&nbsp; {section.title}</h3>
            <div className="py-6 space-y-3">
                <p>본인</p>
                <Controller
                    control={control}
                    name={`question.${index}.me`}
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                        <div className="flex space-x-4"  >
                            {section.answerList.map((el: string, idx: number) => <button className="border border-gray-200 px-4 outline_btn" value={el} {...fieldProps} onClick={() => onChange(el)}
                                key={idx}>{el}</button>)}
                        </div>
                    )}
                />

                <p>상대방</p>
                <Controller
                    control={control}
                    name={`question.${index}.you`}
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                        <div className="flex space-x-4">
                            {section.answerList.map((el: string, idx: number) => <button className="border border-gray-200 px-4 outline_btn" value={el} {...fieldProps} onClick={() => onChange(el)}
                                key={idx}>{el}</button>)}
                        </div>
                    )}
                />
            </div>
        </section>
    )
}
export default Card;