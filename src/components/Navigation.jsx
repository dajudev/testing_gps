import "../styles/Navigation.css";

export function Navigation(){
    return (
        <div className="main-nav">

            <h1>Home</h1>
            <ul>
                <li>link 1</li>
                <li>link 2</li>
                <li>link 3</li>
                <li>link 4</li>
                <li>link 5</li>
            </ul>

            <div className="user_actions">
                <span> <i className="fa-solid fa-user"></i> username </span>
                <span> <i className="fa-solid fa-right-from-bracket"></i> logout</span>
            </div>
        </div>
    );
}
