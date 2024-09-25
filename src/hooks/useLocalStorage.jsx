import _ from 'lodash';

export default function useLocalStorage() {
    const hoteisKey = 'hoteis';

    function setItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    function getItem(key) {
        const item = localStorage.getItem(key)
        return JSON.parse(item)
    }
    function deleteItem(key) {
        localStorage.removeItem(key)
    }

    function addHotel(hotel) {
        const hoteis = getItem(hoteisKey) ?? []
        hoteis.push(hotel)
        setItem(hoteisKey, hoteis)
    }

    function removeHotel(id) {
        const hoteis = getItem(hoteisKey)
        const hoteisAtualizados = hoteis.filter(hotel => hotel.id !== id)
        setItem(hoteisKey, hoteisAtualizados)
    }

    function editHotel(id, editedHotel) {
        const hoteis = getItem(hoteisKey)
        const hoteisAtualizado = hoteis.map(hotel => {
            if (hotel.id === id) return editedHotel
            return hotel
        })
        setItem(hoteisKey, hoteisAtualizado);
    }

    function toggleFavoritoHotel(id) {
        const hoteis = getItem(hoteisKey)
        const hoteisAtualizado = hoteis.map(hotel => {
            if (hotel.id === id) return { ..._.cloneDeep(hotel), favorito: !hotel.favorito }
            return hotel
        })
        setItem(hoteisKey, hoteisAtualizado);
    }

    function getHotelById(id) {
        const hoteis = getItem(hoteisKey)
        const hotel = hoteis.find(hotel => hotel.id === id)
        return hotel
    }

    function clearHoteis() {
        deleteItem(hoteisKey)
    }

    return {
        setItem,
        getItem,
        deleteItem,
        addHotel,
        removeHotel,
        editHotel,
        toggleFavoritoHotel,
        clearHoteis,
        getHotelById
    }
}