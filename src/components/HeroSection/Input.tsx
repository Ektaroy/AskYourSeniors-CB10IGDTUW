import React, { useState } from "react";
import Dropdown from "../Dropdown";
import { api } from "../../utils/api";
import { toast } from "react-hot-toast";

const Input = () => {
  const [question, setQuestion] = useState("");
  const [selected, setSelected] = useState({
    id: 0,
    name: "",
  });
  const mutation = api.questionsRouter.createQuestion.useMutation();
  const utils = api.useContext();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(question);
    console.log(selected);
    if (selected.id === 0 || selected.name === "" || question === "") {
      toast.error("Please fill all the fields");
    } else {
      toast.loading("Submitting...");
      mutation.mutate(
        {
          statement: question,
          category: selected.name,
        },
        {
          onSuccess: () => {
            toast.dismiss();
            toast.success("Question Submitted Successfully");
            setQuestion("");
            setSelected({
              id: 0,
              name: "",
            });
          },
          onError: () => {
            toast.dismiss();
            toast.error("Something went wrong");
          },
        }
      );
    }
  };

  return (
    <div className="mx-12">
      <div className="mx-auto my-8 flex w-full max-w-7xl flex-col gap-x-4 sm:flex-row">
        <div className="flex-1 shadow-md">
          <label htmlFor="question" className="sr-only">
            Question
          </label>
          <input
            id="question"
            type="question"
            className="w-full rounded-lg border border-transparent px-5 py-10 text-xl text-gray-900 placeholder-gray-500 shadow-sm hover:shadow-lg"
            placeholder="Ask Your Doubt"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div className="my-4 flex h-full flex-col items-center justify-center gap-y-2 sm:my-auto">
          <Dropdown selected={selected} setSelected={setSelected} />
          <button
            onClick={(e) => handleSubmit(e)}
            className="block w-full rounded-md border border-transparent bg-purple-600 px-5 py-2 text-base font-medium text-white shadow hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-10"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
