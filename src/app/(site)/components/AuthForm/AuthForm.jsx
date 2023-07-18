import Button from "@/app/components/button/Button";
import Input from "@/app/components/input/Input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AuthSocialButton from "../AuthSocial/AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const AuthForm = () => {
  // varient type = 'LOGIN' | 'REGISTER'
  const [varient, setVarient] = useState("LOGIN");

  // Router
  const router = useRouter();

  // sessaion
  const session = useSession();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);

  // loading State
  const [loading, setLoading] = useState(false);

  // toggole varient function
  const toggoleVarient = () => {
    if (varient === "LOGIN") {
      setVarient("REGISTER");
    } else {
      setVarient("LOGIN");
    }
  };

  // React Hook Form
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const formSubmit = (data) => {
    setLoading(true);
    // Register Action Here
    if (varient === "REGISTER") {
      axios
        .post("/api/register", { ...data })
        .then(() => {
          signIn("credentials", { ...data });
        })
        .catch((err) => {
          toast.error(err.response.data);
        })
        .finally(() => setLoading(false));
    }

    //  LOGIN ACTION
    if (varient === "LOGIN") {
      signIn("credentials", { ...data, redirect: false })
        .then((cb) => {
          if (cb?.error) {
            toast.error("Invalid Creadintial");
          }
          if (cb?.ok && !cb?.error) {
            toast.success("Logged in!");
          }
        })
        .finally(() => setLoading(false));
    }
  };

  // Social login Action
  const socialLoginAction = (action) => {
    setLoading(true);
    signIn(action, { redirect: false })
      .then((cb) => {
        if (cb?.error) {
          toast.error("Invalid Creadintial");
        }
        if (cb?.ok && !cb?.error) {
          toast.success("Logged in!");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className=" mt-10 w-full">
      <div className=" w-full bg-white rounded-lg shadow px-4 py-8 sm:px-10">
        <form
          className="w-full flex gap-5 flex-col"
          onSubmit={handleSubmit(formSubmit)}
        >
          {varient === "REGISTER" && (
            <Input
              id={"name"}
              title={"Name"}
              placeholder="ex: Jone Dew"
              required
              register={register}
              errors={errors}
            />
          )}
          <Input
            id={"email"}
            title={"Email"}
            type="email"
            placeholder="ex: jone.dew@exemple.com"
            required
            register={register}
            errors={errors}
          />
          <Input
            id={"password"}
            title={"Password"}
            type="password"
            required
            register={register}
            errors={errors}
          />

          <Button disabled={loading} type={"submit"} fullWidth={true}>
            {varient === "LOGIN" ? "Login" : "Sign up"}
          </Button>
        </form>
        <div className="mt-6">
          <div className="relative ">
            <div className="absolute inset-0 flex items-center">
              <div className=" border-t border-gray-300 w-full" />
            </div>
            <div className=" relative text-sm flex justify-center">
              <span className=" bg-white text-gray-500 px-2">
                Or Continue with
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex mt-6 gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialLoginAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialLoginAction("google")}
            />
          </div>
        </div>

        <div className="mt-6 flex gap-2 justify-center text-sm text-gray-500">
          <div>
            {varient === "LOGIN"
              ? "New to here ?"
              : "Already have an account ?"}
          </div>
          <div className="underline cursor-pointer" onClick={toggoleVarient}>
            {varient === "LOGIN" ? "Register" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthForm;
