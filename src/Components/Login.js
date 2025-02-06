// import { useState } from "react";

// const Login = ({ setIsLoggedIn }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // Example authentication logic (Replace with actual API check)
//     if (email === "hari@gmail.com" && password === "123") {
//       setIsLoggedIn(true);
//     } else {
//       alert("Invalid credentials!");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient">
//       <div className="bg-white p-8 rounded-2xl shadow-2xl w-full sm:w-96 transform transition-all duration-500 hover:scale-105">
//         <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6 animate-bounce">
//           📚 Book Login
//         </h1>

//         <form onSubmit={handleLogin} className="space-y-6">
//           <div>
//             <label className="block text-lg text-gray-600">Email</label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 hover:shadow-md"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-lg text-gray-600">Password</label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 hover:shadow-md"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 transform hover:scale-105"
//           >
//             Login
//           </button>
//         </form>

//         <div className="text-center mt-4">
//           <p className="text-gray-600 text-sm">
//             Don't have an account?{" "}
//             <span className="text-indigo-500 cursor-pointer hover:underline">
//               Sign up
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;