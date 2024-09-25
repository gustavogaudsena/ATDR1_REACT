import styles from './styles.module.css'
import _ from 'lodash';

export default function Formulario({ formulario, setFormulario, submitForm }) {

    return (
        <form className={styles.formulario}>
            <div className={styles.formularioMainContainerGroup}>
                <div className={styles.formularioContainerGroup}>
                    <div className={styles.formularioGroup}>
                        <label htmlFor='nome-hotel'>Nome</label>
                        <input
                            className={styles.formularioInput}
                            id='nome-hotel'
                            required={true}
                            maxLength={40}
                            type='text'
                            onChange={(e) => setFormulario({ ..._.cloneDeep(formulario), nome: e.target.value })}
                            placeholder='Nome do hotel'
                            value={formulario.nome}
                        />
                    </div>
                    <div className={styles.formularioGroup}>
                        <label htmlFor='estado-hotel'>Estado</label>
                        <input
                            className={styles.formularioInput}
                            id='estado-hotel'
                            required={true}
                            maxLength={40}
                            type='text'
                            onChange={(e) => setFormulario({ ..._.cloneDeep(formulario), localidade: { ..._.cloneDeep(formulario.localidade), estado: e.target.value } })}
                            placeholder='estado do hotel'
                            value={formulario.localidade.estado}
                        />
                    </div>
                    <div className={styles.formularioGroup}>
                        <label htmlFor='cidade-hotel'>cidade</label>
                        <input
                            className={styles.formularioInput}
                            id='cidade-hotel'
                            required={true}
                            maxLength={40}
                            type='text'
                            onChange={(e) => setFormulario({ ..._.cloneDeep(formulario), localidade: { ..._.cloneDeep(formulario.localidade), cidade: e.target.value } })}
                            placeholder='cidade do hotel'
                            value={formulario.localidade.cidade}
                        />
                    </div>
                    <div className={styles.formularioGroup}>
                        <label htmlFor='diaria-hotel'>Diária do hotel</label>
                        <input
                            className={styles.formularioInput}
                            id='diaria-hotel'
                            required={true}
                            min={0}
                            type='number'
                            onChange={(e) => setFormulario({ ..._.cloneDeep(formulario), diaria: e.target.value })}

                            value={formulario.diaria}
                        />
                    </div>
                    <div className={styles.formularioGroup}>
                        <label htmlFor='classificacao-hotel'> Classificação do hotel</label>
                        <input
                            className={styles.formularioInput}
                            id='classificacao-hotel'
                            required={true}
                            min={0}
                            max={5}
                            maxLength={1}
                            type='number'
                            onChange={(e) => setFormulario({ ..._.cloneDeep(formulario), classificacao: e.target.value })}
                            value={formulario.classificacao}
                        />
                    </div>
                    <div className={styles.formularioGroup}>
                        <label htmlFor='descricao-hotel'>Descrição</label>
                        <textarea
                            className={styles.formularioInput}
                            id='descricao-hotel'
                            required={true}
                            rows={4}
                            maxLength={40}
                            type='text'
                            onChange={(e) => setFormulario({ ..._.cloneDeep(formulario), descricao: e.target.value })}
                            placeholder='Descrição do hotel'
                            value={formulario.descricao}
                        />
                    </div>

                    <div className={styles.formularioGroup}>
                        <label>Comodidades</label>
                        <div className={styles.formularioCheckboxGroupContainer}>


                            <div className={styles.formularioCheckboxGroup}>
                                <input
                                    className={styles.formularioInput}
                                    id='wifi-hotel'
                                    type='checkbox'
                                    onChange={(e) => setFormulario({
                                        ..._.cloneDeep(formulario),
                                        servicos: {
                                            ..._.cloneDeep(formulario.servicos),
                                            wifi: e.target.value
                                        }
                                    })}
                                    checked={formulario.servicos.wifi}
                                />
                                <label htmlFor='wifi-hotel'>Wifi</label>
                            </div>
                            <div className={styles.formularioCheckboxGroup}>
                                <input
                                    className={styles.formularioInput}
                                    id='cafe-hotel'
                                    type='checkbox'
                                    onChange={(e) => setFormulario({
                                        ..._.cloneDeep(formulario),
                                        servicos: {
                                            ..._.cloneDeep(formulario.servicos),
                                            cafe: e.target.value
                                        }
                                    })}
                                    checked={formulario.servicos.cafe}
                                />
                                <label htmlFor='cafe-hotel'>Café da Manhã</label>
                            </div>
                            <div className={styles.formularioCheckboxGroup}>
                                <input
                                    className={styles.formularioInput}
                                    id='piscina-hotel'
                                    type='checkbox'
                                    onChange={(e) => setFormulario({
                                        ..._.cloneDeep(formulario),
                                        servicos: {
                                            ..._.cloneDeep(formulario.servicos),
                                            piscina: e.target.value
                                        }
                                    })}
                                    checked={formulario.servicos.piscina}
                                />
                                <label htmlFor='piscina-hotel'>Piscina</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.formularioContainerGroup}>
                    <div className={styles.formularioGroup}>
                        <label htmlFor='imagem-principal-hotel'>Foto principal</label>
                        <input
                            className={styles.formularioInput}
                            id='imagem-principal-hotel'
                            required={true}
                            type='text'
                            onChange={(e) => setFormulario({
                                ..._.cloneDeep(formulario), imagens: {
                                    ..._.cloneDeep(formulario.imagens),
                                    principal: e.target.value
                                }
                            })}
                            placeholder='Url da imagem principal do hotel'
                            value={formulario.imagens.principal}
                        />
                    </div>
                    <div className={styles.formularioGroup}>
                        <label htmlFor='imagem-principal-hotel'>Fotos adicionais</label>
                        <input
                            className={styles.formularioInput}
                            id='imagem-principal-hotel'
                            required={true}
                            type='text'
                            onChange={(e) => setFormulario({
                                ..._.cloneDeep(formulario),
                                imagens: {
                                    ..._.cloneDeep(formulario.imagens),
                                    adicionais: e.target.value
                                }
                            })}
                            placeholder='Url de fotos adicionais separadas por ; (MAX 4)'
                            value={formulario.imagens.adicionais}
                        />
                    </div>
                </div>
            </div>

            <button type='button' onClick={submitForm} >Cadastrar</button>
        </form>
    )
}