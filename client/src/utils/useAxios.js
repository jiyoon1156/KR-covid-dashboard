import { useState, useEffect } from "react";
import axios from "axios";
import CONSTANTS from "../constants/constants";

const useAxios = () => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
        .all([axios.get(CONSTANTS.compositionEndpoint), axios.get(CONSTANTS.dailyEndpoint), axios.get(CONSTANTS.vaccineEndpoint)])
        .then(res => {
            const newData = {
                composition: res[0].data,
                daily: res[1].data,
                vaccine: res[2].data
            };
            setData(newData);
            setLoading(false);
        });
    }, []);
    return { loading, data, error };
}

export default useAxios;