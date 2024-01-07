import React from "react";
import { Input } from "../Fragments/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FormLogin = () => {
  const navigate = useNavigate();

  const localStorage = window.localStorage;
  React.useEffect(() => {
    try {
      const Session = JSON.parse(localStorage["Login"]);
      if (Session) {
        const user = Session.role;
        navigate("/dashboard", { state: user });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [msg, setMsg] = React.useState("");

  const Login = async () => {
    const response = await axios.post(
      "https://gudang-backend-production.up.railway.app/login",
      {
        username,
        password,
      }
    );
    console.log(response.data);
    if (response.data.status === "404") {
      setMsg(response.data.message);
    } else {
      setMsg("Berhasil Login");
      localStorage.setItem("Login", JSON.stringify(response.data));
      navigate("/dashboard", { state: response.data.role });
    }
  };

  return (
    <div class="p-6 shadow-md lg:p-9 bg-gray-50 dark:bg-gray-900 rounded-xl">
      <h2 class="mb-4 text-xl font-bold lg:mb-8 lg:text-3xl dark:text-gray-400">
        Login
      </h2>
      <div class="flex flex-col p-0 m-0 gap-5">
        <Input
          type="text"
          label="Username"
          placeholder="Enter your username!"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          label="Password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>{msg}</p>
        <button
          onClick={() => {
            Login(username, password);
          }}
          class="w-full px-4 py-3 font-semibold text-gray-200 bg-blue-500 rounded-lg dark:bg-blue-500 hover:text-blue-200 "
        >
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default FormLogin;
