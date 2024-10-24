import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { Input } from "../../components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginBG from "../../assets/Animation - 1729686856892.json";
import { ThemeToggle } from "../../components/theme/theme-toggle";
import { useTheme } from "../../context/theme-provider";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { login } from "../../redux/actions/userActions";

const strongPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const formSchema = z.object({
  email: z
    .string()
    .email()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .max(30, { message: "Email max is 30 characters" }),
  password: z.string().refine((value) => strongPassword.test(value), {
    message:
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
  }),
});

const LoginPage = () => {
  const { error, loading } = useSelector((state: RootState) => state.user);
  const { theme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const trimmedValues = {
      email: values.email.trim(),
      password: values.password.trim(),
    };
    dispatch(login(trimmedValues));
  }

  const backgroundColor = theme === "dark" ? "bg-gray-900" : "bg-gray-100";

  return (
    <div
      className={`min-h-screen ${backgroundColor} flex items-center justify-center p-4 transition-colors duration-300`}
    >
      <Card className="w-full max-w-md shadow-lg">
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
            onSubmit={form.handleSubmit(onSubmit)}
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
                {...form.register("email")}
                type="email"
                className={`w-full ${
                  theme === "dark"
                    ? "bg-gray-800 text-white placeholder-gray-400"
                    : "bg-white text-black placeholder-gray-600"
                } border rounded-md transition-colors duration-300`}
                placeholder="Enter your email"
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.email.message}
                </p>
              )}
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
                {...form.register("password")}
                type="password"
                className={`w-full ${
                  theme === "dark"
                    ? "bg-gray-800 text-white placeholder-gray-400"
                    : "bg-white text-black placeholder-gray-600"
                } border rounded-md transition-colors duration-300`}
                placeholder="Enter your password"
              />
              {form.formState.errors.password && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.password.message}
                </p>
              )}
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? "Loading..." : "Sign In"}
              </Button>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </motion.div>
          </motion.form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
