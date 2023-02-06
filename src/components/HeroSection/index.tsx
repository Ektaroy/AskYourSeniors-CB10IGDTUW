import { api } from "../../utils/api";
import Input from "./Input";
import Question from "./Question";

export default function Heorsection() {
  const { data } = api.questionsRouter.getQuestions.useQuery({});

  return (
    <>
      <Input />
      {data?.questions.map((question, index) => (
        <Question key={index} data={question} />
      ))}
    </>
  );
}
