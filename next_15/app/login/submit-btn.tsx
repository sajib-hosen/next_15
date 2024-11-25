"use client";

import React from "react";
import { useFormStatus } from "react-dom";

const SubmitBtn = () => {
  const status = useFormStatus();

  return (
    <button type="submit" className=" text-white">
      {status.pending ? "..." : "Submit"}
    </button>
  );
};

export default SubmitBtn;
