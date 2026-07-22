import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import UploadBox from "../components/UploadBox";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <section className="flex flex-col items-center justify-center px-6 text-center mt-20">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-7xl font-extrabold"
        >
          AI Powered
          <br />
          Food Calorie Estimator
        </motion.h1>

        <p className="mt-8 max-w-3xl text-base text-gray-400">
          Upload a picture of your meal and receive instant AI-powered
          calorie estimates, macro breakdowns, and personalized nutrition
          insights.
        </p>

        <UploadBox />
      </section>
    </div>
  );
}

export default Home;