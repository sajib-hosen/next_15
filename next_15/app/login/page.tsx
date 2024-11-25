import React from "react";
import Form from "next/form";
import SubmitBtn from "./submit-btn";

const LoginPage = () => {
  return (
    <div className=" px-10">
      <h1 className=" text-center">This is server action</h1>

      <div className=" p-6 flex flex-col items-center">
        <div className=" w-[250px]">
          <p>form with action route /login</p>
          <Form action="/login" className=" flex flex-col space-y-2 text-black">
            {/* On submission, the input value will be appended to 
          the URL, e.g. /search?query=abc */}
            <input name="email" />
            <input name="pass" />
            <SubmitBtn />
          </Form>
        </div>

        <div className=" w-[250px]">
          <p>Form with action</p>
          <Form
            action={async (formData: FormData) => {
              "use server";
              const body = Object.fromEntries(formData);

              // Filter out keys starting with `$ACTION_ID_`
              const cleanedBody = Object.fromEntries(
                Object.entries(body).filter(
                  ([key]) => !key.startsWith("$ACTION_ID_")
                )
              );

              console.log("Body >>", cleanedBody);
            }}
            className=" flex flex-col space-y-2 text-black"
          >
            <input name="email" required />

            <input name="pass" required />

            {/* Multiple submit buttons with unique names and values */}

            {/* <button type="submit" name="submitAction" value="save" className="text-white">
              Save
            </button> */}

            {/* <button type="submit" name="submitAction" value="delete" className="text-red-500" >
              Delete
            </button> */}

            <SubmitBtn />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
