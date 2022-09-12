import React, { useEffect, useState } from "react";
import { useArray } from "./utils";

export const TsReactTest = () => {
  const persons: { name: string; age: number }[] = [
    { name: "jack", age: 25 },
    { name: "ma", age: 25 },
  ];

  const { value, clear, removeIndex, add } = useArray(persons);


  return (
    <div>
      <button onClick={() => add({ name: "jack", age: 25 })}>add john</button>
      <button onClick={() => removeIndex(0)}>remove 0</button>
      <button style={{ marginBottom: "50px" }} onClick={() => clear()}>clear</button>
      {
        value.map((person, index) => (
          <div key={index} style={{ marginBottom: "30px" }}>
            <span style={{ color: "red" }}>{index}</span>
            <span>{person.name}</span>
            <span>{person.age}</span>
          </div>
        ))
      }
    </div>
  );
};