import { useHistory } from "react-router-dom";

// logic moved to inside component for hook call
export const usernameSubmitHandler = (e) => {
  e.preventDefault();
  console.log(e.target)
  const name = e.target[0].value;
  localStorage.setItem("username", name);
  // const history = useHistory();
  // history.push(`/home/${name}`);
};
