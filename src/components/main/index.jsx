import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import Card from '../card';
import { MdAttachMoney } from "react-icons/md";
import { IoIosStar } from "react-icons/io";
import { LuMoveDown, LuMoveUp } from "react-icons/lu";
import { IoSettingsSharp } from "react-icons/io5";
import useLocalStorage from '../../hooks/useLocalStorage';
import useTheme from '../../hooks/useTheme';


export default function Main({ hoteisDb, hoteis, setHoteis, busca, toggleFormulario, getHoteis }) {
    const [ordernacaoBy, setOrdenacaoBy] = useState('');
    const [ordenacaoAsc, setOrdenacaoAsc] = useState(false);
    const [filterFavoritos, setFilterFavoritos] = useState(false);
    const [isGerenciadorAtivo, setIsGerenciadorAtivo] = useState(false);
    const { theme } = useTheme()

    const selectedColor = theme === 'dark' ? 'var(--secondary)': 'var(--primary)';

    const handleOrdenacao = (event) => {
        const key = event.currentTarget.value;

        const validKey = hoteis.every(hotel => Object.keys(hotel).includes(key))
        if (!validKey) return

        setOrdenacaoBy(key);
        setOrdenacaoAsc(!ordenacaoAsc)

        const hoteisOrdenados = hoteis.sort((a, b) => ordenacaoAsc ? b[key] - a[key] : a[key] - b[key])
        setHoteis(hoteisOrdenados)
    }

    const handleFavoritos = (event) => {
        const isFilterFavoritoActive = !filterFavoritos;
        setFilterFavoritos(isFilterFavoritoActive)
        setOrdenacaoBy('');
        setOrdenacaoAsc(false);
        const hoteisFavoritos = hoteisDb.filter(hotel => hotel.favorito === true || !isFilterFavoritoActive) // Se filtro estiver ativo busca sempre todos os dados
        setHoteis(hoteisFavoritos)
    }

    const handleGerenciador = (event) => {
        setIsGerenciadorAtivo(!isGerenciadorAtivo)
    }

    useEffect(() => {
        setFilterFavoritos(false);
    }, [busca])

    return (
        <main className={styles.main}>
            <div className={styles.mainContainerControle}>
                <div className={styles.mainOrdenacao}>
                    <button onClick={handleOrdenacao} value='classificacao'>
                        <IoIosStar />
                        <span>Classificação</span>
                        <span className={styles.mainOrdenacaoArrows}>
                            <LuMoveDown
                                color={
                                    ordernacaoBy == 'classificacao' && !ordenacaoAsc
                                        ? selectedColor
                                        : undefined
                                }
                            />
                            <LuMoveUp
                                color={
                                    ordernacaoBy == 'classificacao' && ordenacaoAsc
                                        ? selectedColor
                                        : undefined
                                } />
                        </span>
                    </button>
                    <button onClick={handleOrdenacao} value='diaria'>
                        <MdAttachMoney />
                        <span>Preço</span>
                        <span className={styles.mainOrdenacaoArrows}>
                            <LuMoveDown
                                color={
                                    ordernacaoBy == 'diaria' && !ordenacaoAsc
                                        ? selectedColor
                                        : undefined
                                }
                            />
                            <LuMoveUp
                                color={
                                    ordernacaoBy == 'diaria' && ordenacaoAsc
                                        ? selectedColor
                                        : undefined
                                } />
                        </span>
                    </button>
                </div>
                <div className={styles.mainGerenciadores}>
                    <button className={styles.mainGerenciadoresFavoritos} onClick={handleFavoritos} data-selected={filterFavoritos}>
                        <IoIosStar />
                        <span>Favoritos</span>
                    </button>
                    <button onClick={handleGerenciador} data-selected={isGerenciadorAtivo} >
                        <IoSettingsSharp />
                       <span>Gerenciar</span>
                    </button>
                </div>
            </div>
            <div className={styles.mainContainerCards}>
                {
                    hoteis &&
                    hoteis.map(hotel =>
                        <Card hotel={hotel} key={hotel.id} isGerenciadorAtivo={isGerenciadorAtivo} toggleFormulario={toggleFormulario} getHoteis={getHoteis} />
                    )
                }
                {
                    !hoteis.length &&
                    <div className={styles.mainNotFound}>
                        {
                            busca &&
                            'Não foi encontrado nenhum hotel com o nome buscado.'
                        }
                        {
                            !busca &&
                            !filterFavoritos &&
                            'Não há hoteis cadastrados.'
                        }
                        {
                            !busca &&
                            filterFavoritos &&
                            'Não há hoteis favoritados.'
                        }
                    </div>
                }
            </div>
        </main>
    )
}