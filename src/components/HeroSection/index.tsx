import { useState } from "react";
import Dropdown from "../Dropdown";
import { api } from "../../utils/api";

export default function Heorsection() {
  const [selected, setSelected] = useState({
    id: 0,
    name: "",
  });
  const [question, setQuestion] = useState("");

  const allQuestions = api.questionsRouter.getQuestions.useQuery();
  console.log(allQuestions.data?.questions);

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="relative sm:py-16">
        <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gray-50 px-6 py-10 shadow-xl sm:px-12 sm:py-20">
            <div className="relative">
              <div className="sm:text-center">
                <h2 className="text-3xl font-extrabold tracking-tight text-black sm:text-4xl">
                  Get notified when we&rsquo;re launching.
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-indigo-700">
                  Sagittis scelerisque nulla cursus in enim consectetur quam.
                  Dictum urna sed consectetur neque tristique pellentesque.
                </p>
              </div>
              <div className="mt-12 sm:mx-auto sm:flex sm:max-w-2xl">
                <div className="flex-1">
                  <label htmlFor="cta_email" className="sr-only">
                    Question
                  </label>
                  <input
                    id="question"
                    type="question"
                    className="block w-full rounded-md border border-transparent px-5 py-10 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                    placeholder="Enter Your Question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-3">
                  <div className="flex flex-col items-center justify-center gap-y-2">
                    <Dropdown selected={selected} setSelected={setSelected} />
                    <button className="block w-full rounded-md border border-transparent bg-indigo-500 px-5 py-1.5 text-base font-medium text-black shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-10">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
