import { useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import LoginBG from "../../assets/Animation - 1729686856892.json";
import { ThemeToggle } from "../../components/theme/theme-toggle";
import { useTheme } from "../../context/theme-provider";

const LoginPage = () => {
  const { theme } = useTheme(); // Access the current theme
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  const backgroundColor = theme === "dark" ? "bg-gray-900" : "bg-gray-100";

  return (
    <div
      className={`min-h-screen ${backgroundColor} flex items-center justify-center p-4 transition-colors duration-300`}
    >
      <Card className="w-full max-w-md">
        <CardHeader className="relative">
          <div className="absolute right-3 top-2">
            <ThemeToggle />
          </div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-48 mb-4"
          >
            <Lottie
              loop
              autoplay
              className="w-full h-full"
              animationData={LoginBG}
            />
          </motion.div>

          <CardTitle
            className={`text-2xl font-bold text-center ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Welcome Back
          </CardTitle>
        </CardHeader>

        <CardContent>
          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <motion.div variants={itemVariants}>
              <label
                className={`${
                  theme === "dark" ? "text-white" : "text-black"
                } block text-sm font-medium mb-1`}
              >
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full ${
                  theme === "dark"
                    ? "bg-gray-800 text-white placeholder-gray-400"
                    : "bg-white text-black placeholder-gray-600"
                } border rounded-md transition-colors duration-300`}
                placeholder="Enter your email"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label
                className={`${
                  theme === "dark" ? "text-white" : "text-black"
                } block text-sm font-medium mb-1`}
              >
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full ${
                  theme === "dark"
                    ? "bg-gray-800 text-white placeholder-gray-400"
                    : "bg-white text-black placeholder-gray-600"
                } border rounded-md transition-colors duration-300`}
                placeholder="Enter your password"
              />
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="w-full" type="submit">
                Sign In
              </Button>
            </motion.div>
          </motion.form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
