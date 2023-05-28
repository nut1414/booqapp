import React, { useState } from "react";
export function ReviewWithComment({ title, star }) {
  const count = star;
  return (
    <div>
      <div className=" ml-32">
        <p className=" text-xl font-bold">{title}</p>
        <div className="mt-3">
          <button value={"1"}>
            <img src="/starB.svg"></img>
          </button>
          <button value={"2"}>
            <img src="/starB.svg"></img>
          </button>
          <button value={"3"}>
            <img src="/starB.svg"></img>
          </button>
          <button value={"4"}>
            <img src="/starB.svg"></img>
          </button>
          <button value={"5"}>
            <img src="/starB.svg"></img>
          </button>
          {count == "1" ? (
            <div className="inline-flex mt-2">
              <img src="/starY.svg"></img>
              <img src="/starB.svg"></img>
              <img src="/starB.svg"></img>
              <img src="/starB.svg"></img>
              <img src="/starB.svg"></img>
            </div>
          ) : count == "2" ? (
            <div className="inline-flex mt-2">
              <img src="/starY.svg"></img>
              <img src="/starY.svg"></img>
              <img src="/starB.svg"></img>
              <img src="/starB.svg"></img>
              <img src="/starB.svg"></img>
            </div>
          ) : count == "3" ? (
            <div className="inline-flex mt-2">
              <img src="/starY.svg"></img>
              <img src="/starY.svg"></img>
              <img src="/starY.svg"></img>
              <img src="/starB.svg"></img>
              <img src="/starB.svg"></img>
            </div>
          ) : count == "4" ? (
            <div className="inline-flex mt-2">
              <img src="/starY.svg"></img>
              <img src="/starY.svg"></img>
              <img src="/starY.svg"></img>
              <img src="/starY.svg"></img>
              <img src="/starB.svg"></img>
            </div>
          ) : count == "5" ? (
            <div className="inline-flex mt-2">
              <img src="/starY.svg"></img>
              <img src="/starY.svg"></img>
              <img src="/starY.svg"></img>
              <img src="/starY.svg"></img>
              <img src="/starY.svg"></img>
            </div>
          ) : null}
        </div>
        <input
          type="text"
          name="comment"
          placeholder="Comment Here"
          className="mt-3 pl-3 rounded-lg w-[56rem] h-20 border border-black"
        ></input>
      </div>
    </div>
  );
}
