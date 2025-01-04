import './Footer.css'
import { useAuth } from "../security/AuthContex";

export default function Footer() {
    const authContext = useAuth()
    console.log(authContext);

    return(
        <footer className="footer border-top border-light border-5 p-2 mt-5">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <p className="text-center text-muted">&copy; 2024 TodoBarbota. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}