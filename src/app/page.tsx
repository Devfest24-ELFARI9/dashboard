import Global from "@/components/Dashboard/Global";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title:
    " Global Dashboard ",
  description: "This is Home Dashboard ",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Global />
      </DefaultLayout>
    </>
  );
}
