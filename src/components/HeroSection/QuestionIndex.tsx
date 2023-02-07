import React, { type SyntheticEvent } from "react";
import { FiCheck } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { api } from "../../utils/api";
import { toast } from "react-hot-toast";

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

const QuestionIndex: React.FC<QuestionProps> = ({ data }) => {
  const deletequestionmutation =
    api.questionsRouter.deleteQuestion.useMutation();

  const approvequestionmutation =
    api.questionsRouter.approveQuestion.useMutation();

  function handleDelete(e: SyntheticEvent, questionid: string) {
    e.preventDefault();
    toast.loading("Deleting question...");
    deletequestionmutation.mutate(
      {
        id: questionid,
      },
      {
        onSuccess: () => {
          toast.dismiss();
          toast.success("Question deleted successfully");
        },
        onError: () => {
          toast.dismiss();
          toast.error("Error deleting question");
        },
      }
    );
  }

  function handleApprove(e: SyntheticEvent, questionid: string) {
    e.preventDefault();
    toast.loading("Approving question...");
    approvequestionmutation.mutate(
      {
        id: questionid,
      },
      {
        onSuccess: () => {
          toast.dismiss();
          toast.success("Question approved successfully");
        },
        onError: () => {
          toast.dismiss();
          toast.error("Error approving question");
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
              src={data.user?.image ?? "https://i.pravatar.cc/300"}
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
              onClick={(e) => handleApprove(e, data.id)}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <FiCheck className="text-xl" />
            </button>

            <button
              type="button"
              onClick={(e) => handleDelete(e, data.id)}
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

export default QuestionIndex;
