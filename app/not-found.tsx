import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <h1 className="text-3xl font-bold mb-5">Content Not Found 😢</h1>
      <button className="btn btn-primary">
        <Link href={"/"}>Go To Home</Link>
      </button>
    </div>
  );
};

export default NotFound;
