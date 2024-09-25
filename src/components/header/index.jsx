import Filter from '../filter'
import styles from './styles.module.css'

export default function Header({ busca, setBusca , openFormulario}) {
    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <Filter busca={busca} setBusca={setBusca} openFormulario={openFormulario}/>
            </div>
        </header>
    )
}