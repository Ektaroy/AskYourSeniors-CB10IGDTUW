import React, { type SyntheticEvent } from "react";
import { FiCheck } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { api } from "../../../utils/api";
import { toast } from "react-hot-toast";
import { type Question } from "@prisma/client";

interface QuestionProps {
  answer: {
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
  };
}

const AnswerIndex: React.FC<QuestionProps> = ({ answer }) => {
  const deleteanswermutation = api.answerRouter.rejectAnswer.useMutation();

  const approveanswermutation = api.answerRouter.approveAnswer.useMutation();

  function handleDelete(e: SyntheticEvent, answerid: string) {
    e.preventDefault();
    toast.loading("Deleting answer...");
    deleteanswermutation.mutate(
      {
        id: answerid,
      },
      {
        onSuccess: () => {
          toast.dismiss();
          toast.success("Deleted answer successfully!");
        },
        onError: () => {
          toast.dismiss();
          toast.error("Failed to delete answer!");
        },
      }
    );
  }

  function handleApprove(e: SyntheticEvent, answerid: string) {
    e.preventDefault();
    toast.loading("Approving answer...");
    approveanswermutation.mutate(
      {
        id: answerid,
      },
      {
        onSuccess: () => {
          toast.dismiss();
          toast.success("Approved answer successfully!");
        },
        onError: () => {
          toast.dismiss();
          toast.error("Failed to approve answer!");
        },
      }
    );
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between border px-4 shadow-lg sm:flex-row sm:px-6 lg:px-8">
      <div className="flex items-center">
        <div className="mr-2 flex items-center">
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src={answer.user?.image ?? "https://i.pravatar.cc/300"}
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
      <div className="ml-4 flex flex-1 flex-col items-start justify-center">
        <div className="truncate text-lg font-medium">
          Q.{" "}
          <span className="rounded-md bg-red-100 px-2 text-red-700">
            {answer.question?.statement}
          </span>
        </div>
        <div className="truncate text-lg font-medium">
          Ans.{" "}
          <span className="rounded-md bg-green-100 px-2 py-1 text-green-700">
            {answer.statement}
          </span>
        </div>
      </div>
      <div className="my-4">
        <div className="flex space-x-8">
          <div className="flex flex-col gap-y-4">
            <button
              type="button"
              onClick={(e) => handleApprove(e, answer.id)}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <FiCheck className="text-xl" />
            </button>

            <button
              type="button"
              onClick={(e) => handleDelete(e, answer.id)}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <FiTrash2 className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerIndex;
