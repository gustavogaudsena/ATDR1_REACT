import styles from './styles.module.css'
import { IoBed } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from 'react';
import Formulario from '../formulario';
import { toast } from 'react-toastify';
import _ from 'lodash';
import useLocalStorage from '../../hooks/useLocalStorage';

export default function ModalFormulario({ toggleFormulario, isAnimating, handleSubmit, formularioId }) {
    const TOAST_ID = 'toast-formulario'
    const { getHotelById } = useLocalStorage()

    const [formulario, setFormulario] = useState({
        id: formularioId,
        nome: '',
        diaria: 0,
        classificacao: 0,
        descricao: '',
        imagens: {
            principal: '',
            adicionais: ''
        },
        localidade: {
            estado: '',
            cidade: ''
        },
        servicos: { wifi: false, cafe: false, piscina: false }
    })

    function submitForm() {
        const hasError = {
            error: false,
            fields: [],
            message: ''
        }

        if (!formulario['nome']) {
            hasError.error = true
            hasError.fields.push('Nome')
            hasError.message = ''
        }

        if (!hasError.error && !formulario['imagens']['principal']) {
            hasError.error = true
            hasError.fields.push('Foto Principal')
            hasError.message = ''
        }

        if (!hasError.error && !formulario['localidade']['estado']) {
            hasError.error = true
            hasError.fields.push('Estado')
            hasError.message = ''
        }

        if (!hasError.error && !formulario['localidade']['cidade']) {
            hasError.error = true
            hasError.fields.push('Cidade')
            hasError.message = ''
        }

        if (!hasError.error && (!formulario['diaria'] || isNaN(formulario['diaria']) || formulario['diaria'] <= 0)) {
            hasError.error = true
            hasError.fields.push('diária')
            hasError.message = 'Diária deve ser um número positivo válido'
        }

        if (!hasError.error && (!formulario['classificacao'] || isNaN(formulario['classificacao']) || formulario['classificacao'] <= 0)) {
            hasError.error = true
            hasError.fields.push('Classificação')
            hasError.message = 'Classificação deve ser um número entre 0 e 5'
        }

        if (hasError.error) {
            const message = hasError.error.message ?? `Preencha o campo obrigatório: ${hasError.fields.join(', ')}`

            toast(message, {
                toastId: TOAST_ID,
                type: 'error'
            })

            return;
        }
        const imagensAdicionais = formulario['imagens']['adicionais'].split(';').slice(0, 4)
        setFormulario(prevFormulario => {
            const updatedFormulario = {
                ..._.cloneDeep(prevFormulario),
                imagens: {
                    ..._.cloneDeep(prevFormulario.imagens),
                    adicionais: imagensAdicionais
                }
            }

            handleSubmit(updatedFormulario)

            return updatedFormulario;
        })

     
    }

    useEffect(() => {
        if (!formularioId) return
        const hotel = getHotelById(formularioId);
        const imagensAdicionais = hotel.imagens.adicionais.join(';')
        setFormulario({
            ..._.cloneDeep(hotel),
            imagens: {
                ..._.cloneDeep(hotel.imagens),
                adicionais: imagensAdicionais
            }
        })
    }, [])

    return (
        <div className={styles.formularioBg}>
            <div className={styles.formularioClosingBg} onClick={toggleFormulario}></div>
            <div className={styles.formularioContainer} data-animating={isAnimating}>
                <div className={styles.headerFormulario}>
                    <div className={styles.headerFormularioTitle}>
                        <IoBed size='40px' />
                        <h1>Hotéis</h1>
                    </div>
                    <span className={styles.headerFormularioLink} onClick={toggleFormulario}>
                        <IoMdClose />
                    </span>
                </div>

                <Formulario formulario={formulario} setFormulario={setFormulario} submitForm={submitForm} />

            </div >

        </div>
    )
}