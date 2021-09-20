import { useHistory } from 'react-router-dom';

export const usernameSubmitHandler = e => {
    const name = e.target.value;
    localStorage.setItem('username', name);
    useHistory.push(`/home/${name}`)
}