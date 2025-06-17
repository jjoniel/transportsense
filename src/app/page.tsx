import { Suspense } from "react";
import PageContent from "@/components/PageContent";

function Loading() {
  return <div className="min-h-screen w-full bg-black"></div>;
}

export default function HomePage() {
  return (
      <main className="min-h-screen relative">
        <Suspense fallback={<Loading />}>
          <PageContent />
        </Suspense>
      </main>
  );
}