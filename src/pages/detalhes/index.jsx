import { Link, useParams } from 'react-router-dom'
import styles from './styles.module.css'
import HeaderDetalhes from '../../components/headerDetalhes';
import { useEffect, useState } from 'react';
import { BsFillGeoAltFill } from "react-icons/bs";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { MdPool } from "react-icons/md";
import { FaWifi } from "react-icons/fa";
import { PiCoffeeFill } from "react-icons/pi";
import useLocalStorage from '../../hooks/useLocalStorage';
import useTheme from '../../hooks/useTheme';

const SERVICOS_DISPONIVEIS = [
    {
        key: 'wifi',
        nome: 'Wifi',
        icon: <FaWifi />
    },
    {
        key: 'cafe',
        nome: 'Café',
        icon: <PiCoffeeFill />
    },
    {
        key: 'piscina',
        nome: 'Piscina',
        icon: <MdPool />
    },
]

export default function Detalhes() {
    let { hotelId } = useParams();
    const { toggleFavoritoHotel, getHotelById } = useLocalStorage()
    const [hotel, setHotel] = useState(getHotelById(hotelId))
    const [diaria, setDiaria] = useState(0)

    const { theme, getTheme } = useTheme()

    const toggleFavorito = (event) => {
        event.stopPropagation();
        toggleFavoritoHotel(hotel.id)
        setHotel(getHotelById(hotelId))
    }


    useEffect(() => {
        if (hotel && hotel.diaria) {
            const diariaBRL = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(hotel.diaria);

            setDiaria(diariaBRL)
        }
    }, [])

    return (
        <div data-theme={theme}>
            <div className={styles.detalhes} >
                <HeaderDetalhes />
                {
                    hotel &&
                    <div className={styles.detalhesContainer}>
                        <div className={styles.detalhesContainerNome}>
                            <h2>{hotel.nome}</h2>
                            <div className={styles.detalhesClassificacao}>
                                <IoIosStar /> {hotel.classificacao}
                            </div>
                            <div className={styles.detalhesFavorito} title='Favorito' onClick={toggleFavorito} >
                                {
                                    hotel.favorito &&
                                    <IoIosStar />
                                }
                                {
                                    !hotel.favorito &&
                                    <IoIosStarOutline />
                                }
                            </div>
                        </div>
                        <div className={styles.detalhesLocalidade}>
                            <BsFillGeoAltFill />
                            {hotel.localidade.cidade} - {hotel.localidade.estado}
                        </div>


                        <div className={styles.detalhesContainerPrincipal}>
                            <div className={styles.detalhesImagens}>
                                <img
                                    className={styles.detalhesImagemPrincipal}
                                    src={hotel.imagens.principal}
                                />
                                {
                                    hotel.imagens.adicionais?.length &&
                                    <div className={styles.detalhesContainerImagensAdicionais}>
                                        {
                                            hotel.imagens.adicionais.map((src, idx) =>
                                                <img
                                                    key={`imagem_adicional_${idx}`}
                                                    className={styles.detalhesImagemAdicionais}
                                                    src={src}
                                                />
                                            )
                                        }
                                    </div>
                                }
                            </div>

                            <div className={styles.detalhesContainerDescricao}>
                                <div className={styles.detalhesDescricao}>
                                    <p>{hotel.descricao}</p>
                                </div>
                                <div className={styles.detalhesDescricaoDiaria}>
                                    <b>Diárias:</b> {diaria}
                                </div>
                                <span>
                                    Comodidades:
                                </span>
                                <div className={styles.detalhesServicos}>

                                    {
                                        SERVICOS_DISPONIVEIS.map((servico, idx) => {
                                            if (!hotel.servicos[servico.key]) return
                                            return <span key={`servico_${idx}`}>{servico.icon}</span>;
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {
                    !hotel &&
                    <div className={styles.detalhesNotFound}>
                        Não foi encontrado nenhum hotel para esse id.
                    </div>
                }
            </div>
        </div >
    )
}