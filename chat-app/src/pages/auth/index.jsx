import Background from "../../assets/login3.png";
import Victory from "../../assets/victory.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/api-client";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/lib/constants";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";

const Auth = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const validateLogin = () => {
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required.");
      return false;
    }
    return true;
  };
  const validateSignup = () => {
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password should be same.");
      return false;
    }
    return true;
  };
  const handleLogin = async () => {
    try {
      if (validateLogin()) {
        const response = await apiClient.post(
          LOGIN_ROUTE,
          { email, password },
          { withCredentials: true }
        );
        if (response.data.user.id) {
          setUserInfo(response.data.user);
          if (response.data.user.profileSetup) navigate("/chat");
          else navigate("/profile");
        } else {
          console.log("error");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignup = async () => {
    try {
      if (validateSignup()) {
        const response = await apiClient.post(
          SIGNUP_ROUTE,
          {
            email,
            password,
          },
          { withCredentials: true }
        );
        if (response.status === 201) {
          setUserInfo(response.data.user);
          navigate("/profile");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#141620] via-[#191b25] to-[#111116] relative overflow-hidden">
      {/* floating background blur */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-purple-600 opacity-30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-600 opacity-30 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl flex flex-col xl:flex-row overflow-hidden w-[90vw] md:w-[70vw] lg:w-[60vw] xl:w-[55vw] bg-white/5">
        {/* Left Panel */}
        <div className="flex flex-col justify-center items-center gap-8 w-full xl:w-1/2 p-10 text-white">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-4xl font-bold">Welcome to</h1>
            {/* <img src={Victory} alt="Logo" className="h-14" /> */}
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              VChat
            </h1>
          </div>

          <p className="text-center text-gray-300 text-sm md:text-base">
            Create two demo accounts to try out real-time chat. Already have an account? Log in below.
          </p>

          <Tabs defaultValue="login" className="w-full max-w-sm">
            <TabsList className="bg-transparent border-b border-white/10 flex justify-center gap-6">
              <TabsTrigger
                value="login"
                className="data-[state=active]:border-b-2 border-purple-500 text-gray-300 data-[state=active]:text-purple-400 pb-2 font-medium transition-all"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="data-[state=active]:border-b-2 border-purple-500 text-gray-300 data-[state=active]:text-purple-400 pb-2 font-medium transition-all"
              >
                Signup
              </TabsTrigger>
            </TabsList>

            {/* LOGIN TAB */}
            <TabsContent value="login" className="flex flex-col gap-5 mt-8">
              <Input
                placeholder="Email"
                type="email"
                className="rounded-xl p-5 bg-white/10 text-white placeholder:text-gray-400 border-none focus:ring-2 focus:ring-purple-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Password"
                type="password"
                className="rounded-xl p-5 bg-white/10 text-white placeholder:text-gray-400 border-none focus:ring-2 focus:ring-purple-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                className="rounded-xl p-5 bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90 transition-all font-semibold"
                onClick={handleLogin}
              >
                Login
              </Button>
            </TabsContent>

            {/* SIGNUP TAB */}
            <TabsContent value="signup" className="flex flex-col gap-5 mt-8">
              <Input
                placeholder="Email"
                type="email"
                className="rounded-xl p-5 bg-white/10 text-white placeholder:text-gray-400 border-none focus:ring-2 focus:ring-purple-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Password"
                type="password"
                className="rounded-xl p-5 bg-white/10 text-white placeholder:text-gray-400 border-none focus:ring-2 focus:ring-purple-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                placeholder="Confirm Password"
                type="password"
                className="rounded-xl p-5 bg-white/10 text-white placeholder:text-gray-400 border-none focus:ring-2 focus:ring-purple-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                className="rounded-xl p-5 bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90 transition-all font-semibold"
                onClick={handleSignup}
              >
                Signup
              </Button>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Panel */}
        <div className="hidden xl:flex items-center justify-center bg-[#111116] relative">
          <img
            src={Background}
            alt="Login Illustration"
            className="h-[650px] object-contain opacity-90 drop-shadow-[0_0_20px_rgba(128,0,255,0.3)]"
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
