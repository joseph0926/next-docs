"use client";

export default function LoadingPageError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col">
      <h2 className="text-destructive">Error</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>다시 시도해주세요</button>
    </div>
  );
}
