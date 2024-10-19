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

  const handleValidatePassword = (password: string, confirm_password: string) => {
    console.log("password", password, "confirm_password", confirm_password);
    if (password !== confirm_password) {
      return false;
    }
    return true;
  }


  return (
    <form
      action={action}
      method="post"
      onSubmit={async (e) => {
        e.preventDefault();
        console.log("submitting form");
        const formData = new FormData(e.currentTarget);


        if(action == '/api/signup'){
          const isValid  = handleValidatePassword(formData.get("password") as string, formData.get("confirm_password") as string);
          if (!isValid) {
                  alert(
                    `Passwords do not match`,
                  );
            return;
          }
        }

        let response;
        try {
        response = await fetch(action, {
          method: "POST",
          body: formData,
          // redirect: "manual",
        });
        console.log("response:",response)

      } catch (error) {
        console.log("error", error);
      }

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