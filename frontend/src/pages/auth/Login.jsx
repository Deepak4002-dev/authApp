import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/authActions";

const Login = () => {
  // Setting up the form with React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogged, role } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (isLogged) {
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    }
  }, [isLogged, role, navigate]);

  // Form submission function
  const onSubmit = async (data) => {
    try {
      const response = await dispatch(userLogin(data)).unwrap();
      if ((response.role = "user")) {
        navigate("user-dashboard");
      } else {
        navigate("admin-dashboard");
      }
      toast.success(response.message);
    } catch (error) {
      toast.error(error || "Login Failed");
    }
  };

  return (
    <div className="h-screen w-screen">
      <div className="max-w-md mx-auto mt-10 p-6 bg-gray-200 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "At least 6 character required",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 text-black rounded-md hover:bg-blue-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

// const onSubmit = async (data) => {
//   try {
//     const response = await dispatch(userLogin(data)).unwrap();
//     const { token, role } = response; // Destructure the response
//     dispatch(setCredentials({ token, role })); // Save token and role in Redux
//     toast.success("Login successful");
//     navigate("/user-dashboard");
//   } catch (error) {
//     toast.error(error || "Login Failed");
//   }
// };
