"use client";

import { useState } from "react";

export default function RootTemplate({ children }) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Template Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment Template Count
      </button>
      {children}
    </div>
  );
}
