import { useContext } from "react";
import { UserContext } from "./UserContext";

function Child() {
  const user = useContext(UserContext);
  return <h2 style={{ color: "purple" }}>useContext- Hello, {user}!</h2>;
}

export default Child;