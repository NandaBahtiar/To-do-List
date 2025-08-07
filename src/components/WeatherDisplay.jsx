import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeatherRequest } from '../redux/weatherActions';

const WeatherDisplay = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.weather);
    const [location, setLocation] = useState('Jakarta');

    useEffect(() => {
        // Kirim request dengan lokasi default saat pertama kali dimuat
        dispatch(fetchWeatherRequest(location));
    }, [dispatch]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (location.trim()) {
            dispatch(fetchWeatherRequest(location));
        }
    };

    return (
        <div className="p-4 mb-6 bg-blue-50 border border-blue-200 rounded-lg">
            <form onSubmit={handleSearch} className="flex items-center gap-2 mb-4">
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Masukkan Lokasi..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                    disabled={loading}
                >
                    {loading ? 'Mencari...' : 'Cari'}
                </button>
            </form>

            {loading && <p className="text-center text-gray-500">Memuat data cuaca...</p>}
            {error && <p className="text-center text-red-500">Gagal memuat data: {error}</p>}
            {data && (
                <div className="text-center">
                    <h3 className="font-bold text-lg text-blue-800">Cuaca di {data.nearest_area[0].areaName[0].value}</h3>
                    <p className="text-blue-600">{data.current_condition[0].weatherDesc[0].value}</p>
                    <p className="text-2xl font-bold text-blue-900">{data.current_condition[0].temp_C}°C</p>
                </div>
            )}
        </div>
    );
};

export default WeatherDisplay;