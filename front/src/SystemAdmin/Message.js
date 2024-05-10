import React from "react";

const Message = () => {
  return (
    <div className="w-11/12 mx-auto">
        <div>
          <h2 className="font-sans">Message #MID</h2>
          <div className="flex text-slate-400">
            <h6 className="pr-2 border-r-2 border-slate-400">Audience(e.g Active Orders)</h6>
            <h6 className="ml-2">Nov 20, 2024</h6>
          </div>
        </div>
        <h6 className="my-3 font-semibold">Title</h6>
        <h6>
          Lorem ipsum dolor sit amet consectetur. Est consectetur interdum
          placerat eget aliquam venenatis scelerisque viverra. Sed sem phasellus
          commodo nullam lobortis. Amet sit pulvinar laoreet quis sapien
          suscipit lacinia turpis volutpat. Tincidunt commodo erat et augue leo
          nulla quis. Nunc ornare odio orci lobortis.{" "}
        </h6>
    </div>
  );
};

export default Message;
