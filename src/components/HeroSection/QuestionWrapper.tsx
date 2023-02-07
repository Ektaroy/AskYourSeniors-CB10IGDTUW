import { useState } from "react";
import { api } from "../../utils/api";
import Question from "./QuestionIndex";
import Answer from "./Answers/Answer";

const QuestionWrapper = () => {
  const [toggleAnswerAndQuestion, setToggleAnswerAndQuestion] = useState(false);
  const { data: questions } =
    api.questionsRouter.getNonApprovedQuestions.useQuery({});
  const { data: answers } = api.answerRouter.nonApprovedAnswers.useQuery({});
  return (
    <div className="my-12">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <h3 className="w-full text-center text-lg font-medium leading-6 text-gray-900">
          {toggleAnswerAndQuestion ? "Answers" : "Questions"}
        </h3>
        <button
          onClick={() => setToggleAnswerAndQuestion(!toggleAnswerAndQuestion)}
          className="focus:shadow-outline-indigo ml-3 inline-flex items-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out hover:bg-indigo-500 focus:border-indigo-700 focus:outline-none active:bg-indigo-700"
        >
          {toggleAnswerAndQuestion ? "Show Questions" : "Show Answers"}
        </button>
      </div>
      {!toggleAnswerAndQuestion ? (
        <>
          {questions?.questions.map((question, index) => (
            <Question key={index} data={question} />
          ))}
        </>
      ) : (
        <>
          {answers?.answers.map((answer, index) => (
            <Answer key={index} answer={answer} />
          ))}
        </>
      )}
    </div>
  );
};

export default QuestionWrapper;
