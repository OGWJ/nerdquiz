import { useHistory } from "react-router-dom";

export const usernameSubmitHandler = (e) => {
  e.preventDefault();
  const name = e.target.value;
  localStorage.setItem("username", name);
  const history = useHistory();
  history.push(`/home/${name}`);
};
