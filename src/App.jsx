import "./App.css";
import RegisterForm from "./components/RegisterForm";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <RegisterForm />
      <ToastContainer />
    </>
  );
}

export default App;
