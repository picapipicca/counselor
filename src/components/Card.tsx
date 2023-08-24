import { Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useWatch } from "react-hook-form";
interface CardProps {
    index: number;
    section: any;
    control: any;
    errors?: any;
}

const Card = ({ control, section, index, errors }: CardProps) => {
    const results = useWatch({ control, name: "question" })
    
    return (
        <section className="mx-auto sm:max-w-2xl w-full px-6 py-10 bg-white border border-gray-200 rounded-lg shadow sm:p-10 sm:h-[45vh] h-[50vh]">
            <h3 className="mb-3 text-xl font-medium text-gray-900 md:text-xl"> <span className="text-orange-600">Q.</span>&nbsp; {section.title}</h3>
            <div className="py-6 space-y-3">
                <p>본인</p>
                <Controller
                    control={control}
                    name={`question.${index}.me`}
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                        <>
                            <div className="grid grid-flow-col auto-cols-auto sm:flex sm:space-x-4 sm:justify-around">
                                {section.answerList.map((el: string, idx: number) =>
                                    <button
                                        className={`${results.find((el: any) => el.id === section.id).me === el ? "bg-gray-100 text-blue-700" : "bg-white text-gray-900"} shrink border border-gray-200 sm:py-4 px-1 primary_btn`}
                                        value={el} {...fieldProps}
                                        onClick={() => onChange(el)}
                                        key={idx}>{el}
                                    </button>)}
                            </div>
                        </>
                    )}
                />

                {errors && <ErrorMessage
                    errors={errors}
                    name={`question.${index}.me`}
                    render={({ message }: any) => (
                        <div className="text-right absolute right-0">
                            <p className="text-red-500 text-base leading-3.5 mb-0 my-1">
                                {message}
                            </p>
                        </div>
                    )}
                />}

                <p>상대방</p>
                <Controller
                    control={control}
                    name={`question.${index}.you`}
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                        <>
                            <div className="grid grid-flow-col auto-cols-auto sm:flex sm:space-x-4 sm:justify-around">
                                {section.answerList.map((el: string, idx: number) =>
                                    <button
                                        className={`${results.find((el: any) => el.id === section.id).you === el ? "bg-gray-100 text-blue-700" : "bg-white text-gray-900"} shrink border border-gray-200 sm:py-4 px-1 primary_btn`}
                                        value={el} {...fieldProps}
                                        onClick={() => onChange(el)}
                                        key={idx}>{el}
                                    </button>)}
                            </div>
                        </>
                    )}
                />
            </div>
            {errors && <ErrorMessage
                errors={errors}
                name={`question.${index}.me`}
                render={({ message }: any) => (
                    <div className="text-right absolute right-0">
                        <p className="text-red-500 text-base leading-3.5 mb-0 my-1">
                            {message}
                        </p>
                    </div>
                )}
            />}
        </section>
    )
}
export default Card;