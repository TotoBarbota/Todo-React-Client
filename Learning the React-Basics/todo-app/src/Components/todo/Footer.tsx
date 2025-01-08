import "./Footer.css";
import { useAuth } from "../security/AuthContex";

export default function Footer() {
  const authContext = useAuth();
  console.log(authContext);

  return (
    <div className="">
      <div className="">
        <p className="">&copy; 2024 TodoBarbota. All rights reserved.</p>
      </div>
    </div>
  );
}
