import styles from './styles.module.css'

export default function Filter() {
    return (
        <div className={styles.filterContainer}>
            <form className={styles.filterForm}>
                <div>
                    <span>Hotéis</span>
                </div>
            </form>
        </div>)
}