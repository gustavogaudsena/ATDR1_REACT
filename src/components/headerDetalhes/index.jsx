import styles from './styles.module.css'
import { Link } from 'react-router-dom';
import { IoBed } from "react-icons/io5";

export default function HeaderDetalhes() {

    return (
        <div className={styles.headerDetalhes}>
            <div className={styles.headerDetalhesTitle}>
                <IoBed size='40px' />
                <h1>Hotéis</h1>
            </div>
            <Link to={`/`} className={styles.headerDetalhesLink}>
                Voltar
            </Link>
        </div >
    )
}