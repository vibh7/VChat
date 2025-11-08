import { animationDefaultOptions } from "@/lib/utils";
import Lottie from "react-lottie-player";

const LottieAnimation = () => {
  return (
    <Lottie
      loop
      play
      animationData={animationDefaultOptions.animationData}
      style={{ width: 200, height: 200 }}
      rendererSettings={{
        preserveAspectRatio: "xMidYMid slice",
      }}
    />
  );
};

export default LottieAnimation;

