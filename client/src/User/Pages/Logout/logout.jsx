
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();

        navigate('/');
    };

    return (
    <div>
        <button onClick={handleLogout}>Logout</button>
    </div>
    );
}

export default Logout;