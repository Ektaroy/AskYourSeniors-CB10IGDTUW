import { api } from "../../utils/api";
import Question from "./Question";

const QuestionWrapper = () => {
  const { data } = api.questionsRouter.getNonApprovedQuestions.useQuery({});
  return (
    <div className="my-12">
      {data?.questions.map((question, index) => (
        <Question key={index} data={question} />
      ))}
    </div>
  );
};

export default QuestionWrapper;
