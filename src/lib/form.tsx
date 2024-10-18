"use client";

import { useRouter } from "next/navigation";

const Form = ({
  children,
  action,
}: {
  children: React.ReactNode;
  action: string;
}) => {
  const router = useRouter();
  return (
    <form
      action={action}
      method="post"
      onSubmit={async (e) => {
        e.preventDefault();
        console.log("submitting form");
        const formData = new FormData(e.currentTarget);
        const response = await fetch(action, {
          method: "POST",
          body: formData,
          // redirect: "manual",
        });

        console.log("response", response);  
        if (response.ok) {
          // redirected
          // when using `redirect: "manual"`, response status 0 is returned
          return router.push("/");
        }
      }}
    >
      {children}
    </form>
  );
};

export default Form;