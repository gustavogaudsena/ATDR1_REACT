import _ from 'lodash';
import { useEffect, useState } from 'react';
import useLocalStorage from './useLocalStorage';

export default function useTheme() {
    const [theme, setTheme] = useState()
    const { getItem, setItem } = useLocalStorage()

    useEffect(() => {
        getTheme();
    }, [])

    function getTheme() {
        const localTheme = getItem('theme') ?? 'light'
        setTheme(localTheme)
    }

    function toggleTheme() {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setItem('theme', newTheme)
        setTheme(newTheme)
    }

    return {
        theme,
        getTheme,
        setTheme,
        toggleTheme
    }
}