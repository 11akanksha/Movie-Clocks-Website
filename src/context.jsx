import React, { useContext, useEffect, useState } from "react";

export const API_Url = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;
// const API_Url = "";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [showError, setShowError] = useState({ show: false, msg: "" });
    const [query, setQuery] = useState("Harry Potter");

    const getMovies = async (url) => {
        setIsLoading(true);
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            if (data.Response === "True") {
                setIsLoading(false);
                setShowError({
                    show: false,
                    msg: ""
                })
                setMovie(data.Search);
            } else {
                setShowError({
                    show: true,
                    msg: data.Error
                })
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        let timer = setTimeout(() => {
            getMovies(`${API_Url}&s=${query}`);
        }, 800);
        return () => clearTimeout(timer);
    }, [query])


    return <AppContext.Provider value={{ isLoading, movie, showError, query, setQuery }}>
        {children}
    </AppContext.Provider>
}

const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider, useGlobalContext };