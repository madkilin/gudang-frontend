import React from "react";
import FormLogin from "../Components/Layouts/FormLogin";

const Login = () => {
  return (
    <section class="h-96 lg:h-screen font-poppins ">
      <div class="relative z-10 flex justify-center h-screen py-7 lg:py-16 dark:bg-gray-800 2xl:py-44">
        <div class="absolute top-0 bottom-0 left-0 w-full h-full bg-gray-50 dark:bg-gray-900 lg:bottom-0 lg:h-auto lg:w-full">
          <div class="absolute inset-0 lg:bg-[#00000066] "> </div>
          <img
            src="https://vietful.vn/wp-content/uploads/2021/12/warehouse-la-gi-2.jpg"
            class="object-cover w-full h-full"
          />
        </div>
        <div class="flex items-center justify-center">
          <div class="relative max-w-6xl px-4 mx-auto">
            <div class="max-w-xl mx-auto lg:max-w-5xl">
              <div class="flex flex-wrap items-center -mx-4">
                <div class="hidden w-full px-6 mb-16 lg:w-3/5 lg:mb-0 lg:block">
                  <h2 class="text-4xl font-bold leading-loose text-left text-gray-100 dark:text-gray-300 mb-9 lg:text-6xl ">
                    Sistem Manajemen Gudang
                  </h2>
                  <p class="text-lg text-left text-gray-200 dark:text-gray-300 ">
                    You are welcome here!
                  </p>
                </div>
                <div class="w-full px-4 lg:w-2/5">
                  <FormLogin />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
