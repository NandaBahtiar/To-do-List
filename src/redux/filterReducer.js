// Definisikan action types agar tidak ada salah ketik
const SET_STATUS_FILTER = 'SET_STATUS_FILTER';
const SET_CATEGORY_FILTER = 'SET_CATEGORY_FILTER';
const SET_KEYWORD_FILTER = 'SET_KEYWORD_FILTER';

// Ini adalah kondisi awal saat aplikasi pertama kali dimuat
const initialState = {
    status: 'all', // 'all', 'completed', 'incomplete'
    category: 'all', // 'all' atau kategori spesifik
    keyword: '', // Teks pencarian
};

// Reducer adalah fungsi yang menentukan bagaimana state berubah
const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_STATUS_FILTER:
            // Kembalikan state baru dengan status yang sudah diperbarui
            return { ...state, status: action.payload };

        case SET_CATEGORY_FILTER:
            // Kembalikan state baru dengan kategori yang sudah diperbarui
            return { ...state, category: action.payload };

        case SET_KEYWORD_FILTER:
            // Kembalikan state baru dengan keyword yang sudah diperbarui
            return { ...state, keyword: action.payload };

        default:
            // Jika aksi tidak cocok, kembalikan state yang ada tanpa perubahan
            return state;
    }
};

// Action creators adalah fungsi "pabrik" untuk membuat objek aksi
// Ini akan kita panggil dari komponen UI nanti
export const setStatusFilter = (status) => ({ type: SET_STATUS_FILTER, payload: status });
export const setCategoryFilter = (category) => ({ type: SET_CATEGORY_FILTER, payload: category });
export const setKeywordFilter = (keyword) => ({ type: SET_KEYWORD_FILTER, payload: keyword });

export default filterReducer;