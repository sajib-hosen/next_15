"use client";

import React from "react";

const BaseCSR = () => {
  const [isClicked, setIsClicked] = React.useState(false);
  const [txt, setTxt] = React.useState("");
  const [time, setTime] = React.useState("");

  React.useEffect(() => {
    const x = async () => {
      const waitFor = (await import("@/app/utlities/wait-for")).default; // import function dynamically

      await waitFor(5);

      setTxt(`js loaded ${new Date().toLocaleString()}`);

      setInterval(function () {
        setTime(new Date().toLocaleString());
      }, 1000);
    };
    x();
  }, []);

  return (
    <div className=" border border-red-500">
      <br />
      <p>{txt}</p>
      <br />
      <p>time {time}</p>
      <br />
      {isClicked && <p>button clicked</p>}
      <br />
      <button
        onClick={() => {
          setIsClicked(true);
        }}
      >
        click me
      </button>
    </div>
  );
};

export default BaseCSR;
