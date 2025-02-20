import "./App.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const schema = z.object({
  firstName: z.string()
    .min(3, "Min Length At Least 3")
    .max(20, "Max length almost 20 characters"),
  email: z.string()
    .email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/(?=.*[A-Z])/, "At least 1 Uppercase letter required")
    .regex(/(?=.*\d)/, "At least 1 Number required")
    .regex(/(?=.*[@$!%*?&])/, "At least 1 special character required"),
});

export default function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form Submitted:", data);
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border md:px-8 px-6 md:py-10 py-8 rounded-md text-left md:w-[330px] w-[300px] bg-gray-400"
    >
      {/* First Name .........................*/}
      <div>
        <label className="text-black font-semibold">First Name:</label><br />
        <input
          placeholder="Enter First Name"
          className="text-xs bg-white text-black font-semibold border-none my-2 p-2 md:w-[250px] w-[220px]"
          {...register("firstName")}
        />
        {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName.message}</p>}
      </div>

      {/* Email....................... */}
      <div className="py-2">
        <label className="text-black font-semibold">Email:</label><br />
        <input
          placeholder="Enter Your Email"
          className="text-xs bg-white text-black font-semibold border-none my-1 p-2 md:w-[250px] w-[220px]"
          type="email"
          {...register("email")}
        />
        {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
      </div>

      {/* Password................... */}
      <div className="pb-3">
        <label className="text-black font-semibold">Password:</label><br />
        <input
          placeholder="Enter Your Password"
          className="text-xs bg-white text-black font-semibold border-none my-1 p-2 md:w-[250px] w-[220px]"
          type="password"
          {...register("password")}
        />
        {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
      </div>

      {/* Submit Button............... */}
      <input
        className="border p-2 px-4 rounded-lg bg-blue-600 text-sm"
        type="submit"
        disabled={isSubmitting}
        value={isSubmitting ? "Submitting..." : "Submit"}
      />
    </form>
  );
}



///react hook form without zod.....................


// import './App.css'
// import { useForm } from "react-hook-form";
// function App() {
//   const { register,
//     handleSubmit,
//     watch,
//     reset,
//     formState: { errors, isSubmitting }
//   } = useForm();

//   async function onSubmit(data) {
//     await new Promise((resolve) => setTimeout(resolve, 1000))
//     console.log("From Submit...", data);


//     reset()
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className='border md:px-8 px-6 md:py-10 py-8 rounded-md text-left md:w-[330px] w-[300px] bg-gray-400'>
//       {/* firstname ....................................*/}
//       <div>
//         <label className='text-black font-semibold'>First Name : </label><br />
//         <input placeholder='Enter First Name' className=' text-xs bg-white text-black font-semibold border-none my-2 p-2 md:w-[250px] w-[220px]' {...register("firstName", {
//           required: "First Name is required",
//           minLength: { value: 3, message: 'Min Length At Least 3' },
//           maxLength: { value: 20, message: 'Max length almost 20 characters' }
//         })}
//           aria-invalid={errors.firstName ? "true" : "false"} />
//         {errors.firstName && <p role='alert' className='text-red-600 text-sm'>{errors.firstName?.message}</p>}
//       </div>

//       {/* Email ....................................*/}
//       <div className='py-2'>
//         <label className='text-black font-semibold'>Email : </label><br />
//         <input
//         placeholder='Enter Your Email'
//           className='text-xs bg-white text-black font-semibold border-none my-1 p-2 md:w-[250px] w-[220px]'
//           type="email"
//           {...register("email", {
//             required: "Email is required",
//             pattern: {
//               value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//               message: "Invalid email address",
//             },
//           })}
//         />
//         {errors.email && <p className='text-red-600 text-sm'>{errors.email.message}</p>}
//       </div>


//       {/* Password ....................................*/}
//       <div className='pb-3'>
//         <label className='text-black font-semibold'>Password : </label><br />
//         <input
//         placeholder='Enter Your Password'
//           className=' text-xs bg-white text-black font-semibold border-none my-1 p-2 md:w-[250px] w-[220px]'
//           type="password"
//           {...register("password", {
//             required: "Password is required",
//             minLength: {
//               value: 8,
//               message: "Password must be at least 8 characters",
//             },
//             pattern: {
//               value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//               message:
//                 "1 Uppercase, 1 Number, and 1 special character required",
//             },
//           })}
//         />
//         {errors.password && <p className='text-red-600 text-sm'>{errors.password.message}</p>}      </div>

//       <input className='border p-2 px-4 rounded-lg bg-blue-600 text-sm' type="submit" disabled={isSubmitting} value={isSubmitting ? "Submitting" : "Submit"} />
//     </form>
//   )
// }

// export default App
