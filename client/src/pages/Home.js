import React from 'react';
import Dashboard from '../components/Dashboard';
import useAxios from '../utils/useAxios';

const Home = () => {

    const {loading, data, error} = useAxios();
    // loading, error 시 처리
    if (loading) return "loading";
    if (error) return "error";
    console.log(data);

    return <Dashboard data={data}/>;
}

export default Home;
