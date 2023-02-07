import { api } from "../../utils/api";
import Question from "./Question";

const QuestionsWrapperIndex = () => {
  const { data } = api.questionsRouter.getQuestions.useQuery({});
  return (
    <div className="my-12">
      {data?.questions.map((question, index) => (
        <Question key={index} data={question} />
      ))}
    </div>
  );
};

export default QuestionsWrapperIndex;
