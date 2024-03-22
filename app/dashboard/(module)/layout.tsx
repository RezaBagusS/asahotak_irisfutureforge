import { Suspense } from "react";

interface PageProps {
  children: React.ReactNode;
}

export default function Page({ children }: PageProps) {
  return <Suspense>{children}</Suspense>;
}
