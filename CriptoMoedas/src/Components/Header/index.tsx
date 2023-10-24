import { Link } from "react-router-dom"
import styles from "./header.module.css"
import logoimg from "../../assets/logo.svg"

export function Header(){
    return(
        <header className={styles.container}>
            <div className={styles.logo}>
                <Link to="/">
                    <img src={logoimg} alt="Logo CriptoMoedas"/>
                </Link>

            </div>
            
        </header>
    )
}