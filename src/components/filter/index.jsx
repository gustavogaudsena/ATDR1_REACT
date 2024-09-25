import styles from './styles.module.css'
import { IoBed } from "react-icons/io5";

export default function Filter({ busca, setBusca, openFormulario }) {

    return (
        <div className={styles.filterContainer} >
            <div className={styles.filterHeading}>
                <IoBed size='40px' />
                <h1>Hotéis</h1>
            </div>
            <form className={styles.filterForm}>
                <input
                    className={styles.filterInput}
                    type='text'
                    onChange={(e) => setBusca(e.target.value)}
                    value={busca}
                    placeholder='Nome'
                />

                <button type='button' onClick={openFormulario}>
                    Adicionar
                </button>
            </form >
        </div >
    )
}