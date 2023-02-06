import { Dialog, Transition } from "@headlessui/react";
import { Fragment, type SyntheticEvent, useState } from "react";
import { api } from "../../utils/api";
import toast from "react-hot-toast";

export default function DetailModal() {
  const [open, setOpen] = useState(true);
  const [data, setData] = useState({
    branch: "",
    year: "Graduation Year",
  });
  const mutate = api.userDetailsRouter.addUserDetails.useMutation();

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    if (data.branch === "" || data.year === "Graduation Year") {
      toast.error("Please fill all the fields");
      return;
    } else {
      toast.loading("Adding details...");
      mutate.mutate(
        {
          branch: data.branch,
          year: Number(data.year),
        },
        {
          onSuccess: () => {
            toast.dismiss();
            toast.success("Details added successfully");
            setOpen(false);
          },
          onError: (err) => {
            toast.dismiss();
            toast.error(err.message);
          },
        }
      );
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-slate-200 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Add Details
                    </Dialog.Title>
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Branch
                      </label>
                      <input
                        type="text"
                        name="branch"
                        id="branch"
                        value={data.branch}
                        onChange={(e) =>
                          setData({ ...data, branch: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-red-200 px-2 py-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Year
                      </label>
                      <input
                        type="number"
                        name="year"
                        id="year"
                        placeholder="Graduation Year"
                        value={data.year}
                        onChange={(e) =>
                          setData({ ...data, year: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-red-200 px-2 py-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Submit
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
