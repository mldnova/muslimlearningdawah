import { Suspense } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader, SiteHeaderView } from "@/components/site-header";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Suspense fallback={<SiteHeaderView pathname={null} />}>
        <SiteHeader />
      </Suspense>
      <main className="flex-1 pt-[4.25rem]">{children}</main>
      <SiteFooter />
    </>
  );
}
