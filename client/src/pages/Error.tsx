import {Link} from "react-router-dom";

export default function Error() {
    return (
        <div>
            <h2>Hey! you seem a bit lost!</h2>
            <img src={""} alt="404 not found"/>
            <p>Get back <Link to="/">home</Link>?</p>
        </div>
    )
}