import React, { useState } from "react";
import { api } from "../../utils/api";
import { toast } from "react-hot-toast";
import { Question } from "@prisma/client";
import { useSession } from "next-auth/react";

interface QuestionProps {
  data: {
    user: {
      image: string | null;
      id: string;
      name: string | null;
      year: number | null;
      branch: string | null;
    } | null;
    statement: string;
    category: string | null;
    id: string;
  };
}

type AnswerType = {
  answers: {
    user: {
      id: string;
      name: string | null;
      image: string | null;
      year: number | null;
      branch: string | null;
    } | null;
    question: Question | null;
    id: string;
    statement: string;
  }[];
};

const Question: React.FC<QuestionProps> = ({ data }) => {
  const [addAnswer, setAddAnswer] = useState(false);
  const [answer, setAnswer] = useState("");
  const { data: session } = useSession();
  const [viewAnswers, setViewAnswers] = useState<AnswerType>();
  const [view, setView] = useState(false);
  const answers = api.answerRouter.approvedAnswers.useMutation();
  const addAnswerMutation = api.answerRouter.addAnswerToQuestion.useMutation();

  function handleViewAnswers(e: React.SyntheticEvent, id: string) {
    e.preventDefault();
    answers.mutate(
      {
        questionId: id,
      },
      {
        onSuccess: (data) => {
          setViewAnswers(data);
          setView(true);
        },
        onError: () => {
          toast.error("Error getting answers");
        },
      }
    );
  }

  function handleAddAnswer(e: React.SyntheticEvent) {
    e.preventDefault();
    // don't allow juniors to answer
    if (
      typeof session?.user.year === "number" &&
      typeof data.user?.year === "number" &&
      session?.user.year > data.user?.year
    ) {
      toast.error("You cannot answer this question");
      return;
    }
    if (answer === "") {
      toast.error("Answer cannot be empty");
      return;
    } else {
      toast.loading("Adding answer...");
      addAnswerMutation.mutate(
        {
          questionId: data.id,
          statement: answer,
        },
        {
          onSuccess: () => {
            toast.dismiss();
            toast.success("Answer added successfully");
            setAnswer("");
            setAddAnswer(false);
          },
          onError: () => {
            toast.dismiss();
            toast.error("Error adding answer");
          },
        }
      );
    }
  }

  return (
    <>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between border px-4 shadow-lg sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center">
          <div className="mr-2 flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src={data.user?.image ?? "https://picsum.photos/200/300"}
                alt={data.user?.name ?? "User"}
              />
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {data.user?.name ?? "User"}
            </p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <p>{data.user?.year ?? "Year"}</p>
              <p>{data.user?.branch ?? "Branch"}</p>
            </div>
            <div className="mt-3 inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
              {data.category ?? "Category"}
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-start px-4 py-2 text-xl text-gray-700">
          {data.statement}
        </div>
        <div className="my-4">
          <div className="flex space-x-8">
            <div className="flex flex-col gap-y-4">
              <button
                type="button"
                onClick={(e) => {
                  setView(!view);
                  if (!view) {
                    handleViewAnswers(e, data.id);
                  }
                }}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-pink-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <span className="text-xl">View Answers</span>
              </button>

              <button
                type="button"
                onClick={() => setAddAnswer(!addAnswer)}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-purple-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <span className="text-xl">Add Answer</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between border px-4 shadow-lg sm:flex-row sm:px-6 lg:px-8">
        {view && (
          <>
            <div className="flex max-w-7xl flex-col gap-y-4">
              {answers.data?.answers.map((answer, index) => (
                <div
                  key={index}
                  className="my-4 flex max-w-7xl flex-col px-4 sm:flex-row sm:px-6 lg:px-8"
                >
                  <div className="flex">
                    <div className="mr-2 flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={
                            answer.user?.image ?? "https://i.pravatar.cc/300"
                          }
                          alt={answer.user?.name ?? "User"}
                        />
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {answer.user?.name ?? "User"}
                      </p>
                      <div className="flex space-x-1 text-sm text-gray-500">
                        <p>{answer.user?.year ?? "Year"}</p>
                        <p>{answer.user?.branch ?? "Branch"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 items-start px-4 py-2 text-xl text-gray-700">
                    {answer.statement}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between border px-4 shadow-lg sm:flex-row sm:px-6 lg:px-8">
        {addAnswer && (
          <div className="m-8 flex w-full gap-x-4">
            <textarea
              className="w-full rounded-lg border px-3 py-2 text-gray-700 focus:outline-none"
              rows={4}
              placeholder="Answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button
              type="button"
              onClick={handleAddAnswer}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-purple-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <span className="text-lg">Submit Answer</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Question;
