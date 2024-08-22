import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div>
      <Loader2 className="size-4 animate-spin" />
      <p>데이터 로딩,,,</p>
    </div>
  );
}
