import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Console | Ultimate iTech",
  description: "Ultimate iTech Pvt. Ltd. secure administrative control workspace.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function ControlPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
