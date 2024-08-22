import { Loader2 } from "lucide-react";
import { Suspense } from "react";

async function fetchData() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { data: "Hello, World!" };
}

async function Content() {
  const data = await fetchData();
  return <div className="text-xl">{data.data}</div>;
}

export default function LoadingPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg">기본 텍스트</h1>
      <Suspense fallback={<Loader2 className="animate-spin size-4" />}>
        <Content />
      </Suspense>
    </div>
  );
}
