import styles from "./styles.module.css";
import { BsFillGeoAltFill } from "react-icons/bs";
import { MdAttachMoney } from "react-icons/md";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { IoBed } from "react-icons/io5";
import { GoTrash } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import { toast } from "react-toastify";

export default function Card({ hotel, isGerenciadorAtivo, toggleFormulario, getHoteis }) {
    const navigate = useNavigate();
    const { removeHotel, toggleFavoritoHotel } = useLocalStorage()

    const diariaBRL = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(hotel.diaria);

    const handleNavigate = () => {
        navigate(`/hotel/${hotel.id}`)
    }

    const toggleFavorito = (event) => {
        event.stopPropagation();
        toggleFavoritoHotel(hotel.id)
        getHoteis()
    }

    const handleEdit = (event) => {
        event.stopPropagation();
        toggleFormulario(event, hotel.id)
    }

    const handleDelete = (event) => {
        event.stopPropagation();
        removeHotel(hotel.id)
        getHoteis()
        toast('Hotel excluido com sucesso!', {
            type: 'success'
        })
    }


    return (
        <div className={styles.card} onClick={handleNavigate}>
            <img
                className={styles.cardImage}
                src={hotel.imagens.principal}
            />
            <div className={styles.cardFavorito}>
                {
                    hotel.favorito &&
                    <IoIosStar onClick={toggleFavorito} size='20px' />
                }
                {
                    !hotel.favorito &&
                    <IoIosStarOutline onClick={toggleFavorito} size='20px' />
                }
            </div>
            {
                isGerenciadorAtivo &&
                <div className={styles.cardGerenciadores}>
                    <CiEdit onClick={handleEdit} size='16px' />
                    <GoTrash onClick={handleDelete} size='16px' />
                </div>
            }

            <div className={styles.cardContainer}>
                <div className={styles.cardNome}>
                    <IoBed />
                    {hotel.nome}
                </div>
                <div className={styles.cardLocalidade}>
                    <BsFillGeoAltFill />
                    {hotel.localidade.cidade} - {hotel.localidade.estado}
                </div>
                <div className={styles.cardClassificacao}>
                    <IoIosStar />

                    {hotel.classificacao}
                </div>
                <div className={styles.cardDiaria}>
                    <MdAttachMoney />
                    Diária de {diariaBRL}
                </div>
            </div>
        </div >
    );
}
