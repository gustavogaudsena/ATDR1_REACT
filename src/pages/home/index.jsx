import { useEffect, useState } from 'react';
import Header from '../../components/header'
import Main from '../../components/main'
import styles from './styles.module.css'
import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from '../../hooks/useLocalStorage';
import ModalFormulario from '../../components/modalFormulario';
import { FiPlus } from "react-icons/fi";
import { MdOutlineCleaningServices } from "react-icons/md";
import { toast } from 'react-toastify';
import { CiDark, CiLight } from "react-icons/ci";
import useTheme from '../../hooks/useTheme';


const MOCK_HOTEIS = [
    {
        id: uuidv4(),
        nome: 'Hotel Constantino Paleta',
        imagens: {
            principal: '/images/main-hotel-1.png',
            adicionais: [
                '/images/main-hotel-2.png',
                '/images/main-hotel-3.png'
            ]
        },
        classificacao: 4,
        diaria: 2000,
        descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit aliquid veritatis voluptatum corrupti beatae tenetur accusantium repudiandae dolores quae saepe, nam earum, nesciunt, quos alias? Vero porro qui commodi laborum.',
        localidade: {
            cidade: 'Juiz de Fora',
            estado: 'MG'
        },
        servicos: {
            wifi: true,
            piscina: true,
            cafe: true
        },
        favorito: false
    },
    {
        id: uuidv4(),
        nome: 'Hotel Estrela do Mar',
        imagens: {
            principal: '/images/main-hotel-2.png',
            adicionais: [
                '/images/main-hotel-1.png',
                '/images/main-hotel-3.png'
            ]
        },
        classificacao: 3,
        diaria: 4000,
        descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit aliquid veritatis voluptatum corrupti beatae tenetur accusantium repudiandae dolores quae saepe, nam earum, nesciunt, quos alias? Vero porro qui commodi laborum.',
        localidade: {
            cidade: 'Juiz de Fora',
            estado: 'MG'
        },
        servicos: {
            wifi: true,
            piscina: true,
            cafe: true
        },
        favorito: true
    },
    {
        id: uuidv4(),
        nome: 'Pousada Jardim Encantado',
        imagens: {
            principal: '/images/main-hotel-3.png',
            adicionais: [
                '/images/main-hotel-2.png',
                '/images/main-hotel-4.png'
            ]
        },
        classificacao: 5,
        diaria: 3000,
        descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit aliquid veritatis voluptatum corrupti beatae tenetur accusantium repudiandae dolores quae saepe, nam earum, nesciunt, quos alias? Vero porro qui commodi laborum.',
        localidade: {
            cidade: 'Juiz de Fora',
            estado: 'MG'
        },
        servicos: {
            wifi: true,
            piscina: true,
            cafe: false
        },
        favorito: false
    },
    {
        id: uuidv4(),
        nome: 'Resort Vista do Horizonte',
        imagens: {
            principal: '/images/main-hotel-4.png',
            adicionais: [
                '/images/main-hotel-3.png',
                '/images/main-hotel-2.png'
            ]
        },
        classificacao: 3,
        diaria: 3200,
        descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit aliquid veritatis voluptatum corrupti beatae tenetur accusantium repudiandae dolores quae saepe, nam earum, nesciunt, quos alias? Vero porro qui commodi laborum.',
        localidade: {
            cidade: 'Juiz de Fora',
            estado: 'MG'
        },
        servicos: {
            wifi: true,
            piscina: false,
            cafe: true
        },
        favorito: true
    },
]

export default function Home() {
    const [busca, setBusca] = useState('');
    const [hoteis, setHoteis] = useState([]);
    const [filteredHoteis, setFilteredHoteis] = useState([...hoteis]);
    const [isFormularioOpen, setIsFormularioOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [formularioId, setFormularioId] = useState('');

    const { getItem, setItem, deleteItem, editHotel, addHotel } = useLocalStorage()
    const { theme, toggleTheme } = useTheme()

    useEffect(() => {
        getHoteis()
    }, []);

    useEffect(() => {
        setFilteredHoteis(hoteis)
    }, [hoteis]);

    useEffect(() => {
        if (busca.trim()) {
            const hoteisFiltrados = [...hoteis].filter(hotel => hotel.nome.trim().toUpperCase().includes(busca.trim().toUpperCase()))
            setFilteredHoteis(hoteisFiltrados)
            return
        }
        setFilteredHoteis(hoteis);
    }, [busca])

    function addMock() {
        setItem('hoteis', MOCK_HOTEIS)
        getHoteis()
    }

    function clearHoteis() {
        deleteItem('hoteis');
        setHoteis([])
    }

    function getHoteis() {
        const hoteisLocalStorage = getItem('hoteis');
        setHoteis(hoteisLocalStorage ?? [])
    }

    function toggleFormulario(event, id = '') {
        if (isFormularioOpen) {
            setIsAnimating(true);
            setTimeout(() => {
                setIsFormularioOpen(false);
                setIsAnimating(false);
            }, 190);
            setFormularioId('')
        } else {
            setFormularioId(id)
            setIsFormularioOpen(true);
        }

    }

    function handleSubmit(formulario) {
        if (formulario.id) {
            editHotel(formulario.id, formulario)
            toast('Hotel atualizado com sucesso!', {
                type: 'success'
            })
        }
        else {
            formulario.id = uuidv4()
            addHotel(formulario)
            toast('Hotel adicionado com sucesso!', {
                type: 'success'
            })
        }
        getHoteis();
        toggleFormulario();
    }

    function toggleDarkMode() {
        toggleTheme()
    }

    return (
        <div className={styles.homeContainer} data-theme={theme}>
            <Header busca={busca} setBusca={setBusca} openFormulario={toggleFormulario} />
            <Main hoteisDb={hoteis} hoteis={filteredHoteis} setHoteis={setFilteredHoteis} busca={busca} toggleFormulario={toggleFormulario} getHoteis={getHoteis} />
            {
                isFormularioOpen &&
                <ModalFormulario isAnimating={isAnimating} toggleFormulario={toggleFormulario} handleSubmit={handleSubmit} formularioId={formularioId} />
            }
            <div className={styles.homeMockContainer}>
                <button className={styles.homeMockButton} onClick={addMock} title='Adicionar Mock'>
                    <FiPlus />
                </button>
                <button className={styles.homeMockButton} onClick={clearHoteis} title='Limpar hoteis'>
                    <MdOutlineCleaningServices />
                </button>
            </div>
            <div className={styles.homeThemeContainer}>
                <button className={styles.homeMockButton} onClick={toggleDarkMode} title='Aciona Dark Mode'>
                    {
                        theme === 'dark' &&
                        <CiDark />
                    } 
                    {
                        theme === 'light' &&
                        <CiLight />
                    } 
                </button>
            </div>
        </div>
    )
}