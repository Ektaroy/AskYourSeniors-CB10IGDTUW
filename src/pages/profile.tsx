import { type GetServerSideProps } from "next";
import { SyntheticEvent, useState } from "react";
import Navbar from "../components/Navbar";
import { getServerAuthSession } from "../server/auth";
import { api } from "../utils/api";
import { toast } from "react-hot-toast";

const settings = [
  {
    name: "Public access",
    description: "This project would be available to anyone who has the link",
  },
  {
    name: "Private to Project Members",
    description: "Only members of this project would be able to access",
  },
  {
    name: "Private to you",
    description: "You are the only one able to access this project",
  },
];

export default function Profile() {
  const [details, setDetails] = useState({
    branch: "",
    gradyear: "",
  });
  const updateUserMutation = api.userRouter.updateUserProfile.useMutation();

  function handleUpdateProfile(e: SyntheticEvent) {
    e.preventDefault();
    if (details.branch === "" || details.gradyear === "") {
      toast.error("Please fill all the fields");
      return;
    } else {
      toast.loading("Updating your profile...");
      updateUserMutation.mutate(
        {
          branch: details.branch,
          year: Number(details.gradyear),
        },
        {
          onSuccess: (data) => {
            toast.dismiss();
            toast.success("Profile updated successfully");
          },
          onError: (error) => {
            toast.dismiss();
            toast.error(error.message);
          },
        }
      );
    }
  }

  return (
    <>
      <Navbar />
<!--       <main className="mx-auto max-w-lg px-4 pt-10 pb-12 lg:pb-16">
        <form>
          <div className="space-y-6">
            <div>
              <h1 className="text-lg font-medium leading-6 text-gray-900">
                User Profile Settings
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>

            <div>
              <label
                htmlFor="branch"
                className="block text-sm font-medium text-gray-700"
              >
                Branch
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="branch"
                  placeholder="CSE"
                  value={details.branch}
                  onChange={(e) =>
                    setDetails({ ...details, branch: e.target.value })
                  }
                  id="branch"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="gradyear"
                className="block text-sm font-medium text-gray-700"
              >
                Graduation Year
              </label>
              <div className="mt-1">
                <input
                  id="gradyear"
                  name="gradyear"
                  type="text"
                  placeholder="2021"
                  value={details.gradyear}
                  onChange={(e) =>
                    setDetails({ ...details, gradyear: e.target.value })
                  }
                  className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setDetails({
                    branch: "",
                    gradyear: "",
                  });
                }}
                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleUpdateProfile}
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-sky-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                Update Your Profile
              </button>
            </div>
          </div>
        </form>
      </main> -->
       <div class="navbar w-5/6 mt-4 m-auto">
    <img src="logo.png" alt="" />
  </div>
  <div class="w-2/5 mx-auto mt-10">
    <h2 class="text-3xl font-bold mb-3 text-violet-900">Details</h2>
    <div class="text-xl mb-12 text-violet-800 font-midbold">
      Fill your details to continue
    </div>
    <form action="" class="m-2">
      <div class="flex flex-col mb-6">
        <label for="branch" class="text-violet-800 font-midbold "
          >Branch</label
        >
        <input
          class="mt-2 px-4 py-2 bg-gray-200 rounded-md text-sm"
          type="text"
          id="branch"
          placeholder="CSE/IT/ECE/MAE"
          required
          value={details.branch}
          onChange={(e) =>
            setDetails({ ...details, branch: e.target.value })
          }
          
        />
      </div>
      <div class="flex flex-col mb-6">
        <label for="gradYear" class="text-violet-800 font-midbold"
          >Graduation year</label
        >
        <input
          class="mt-2 px-4 py-2 bg-gray-200 rounded-md text-sm"
          type="text"
          id="gradYear"
          placeholder="Enter graduation year"
          required
          value={details.gradyear}
          onChange={(e) =>
            setDetails({ ...details, gradyear: e.target.value })
          }
        />
      </div>
    </form>
    <div class="w-full flex justify-center">
      <button
        class="transition duration-1000 text-center w-3/4 mt-4 bg-gradient-to-r from-violet-500 to-violet-800 p-2 rounded-default text-gray-100 hover:bg-gradient-to-r hover:from-violet-700 hover:to-violet-800"
        onClick={handleUpdateProfile}  
        >
        Submit
      </button>
    </div>
  </div> 
</body>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await getServerAuthSession(context);
  if (data?.user.id) {
    return {
      props: {
        data,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
