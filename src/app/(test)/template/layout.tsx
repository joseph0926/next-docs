"use client";

import { useState } from "react";

export default function RootLayout({ children }) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Layout Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment Layout Count
      </button>
      {children}
    </div>
  );
}
