import axiosClient from "./axiosClient";

export const category = {
    movie: 'movie',
    tv: 'tv'
}

export const movieType = {
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated'
}

export const tvType = {
    popular: 'popular',
    top_rated: 'top_rated',
    on_the_air: 'on_the_air'
}

const tmdbApi = {
    getMoviesList: (type, page) => {
        const url = 'movie/' + movieType[type];
        return axiosClient(url, page);
    },
    getTvList: (type, page) => {
        const url = 'tv/' + tvType[type];
        return axiosClient(url, page);
    },
    getVideos: (cate, id) => {
        const url = category[cate] + '/' + id + '/videos';
        return axiosClient(url);
    },
    search: (cate,page, query) => {
        const url = 'search/' + category[cate];
        return axiosClient(url, page, query);
    },
    actor: (id, mediaType) => {
        const url = 'person/' + id + '/' + mediaType + '_credits';
        return axiosClient(url);
    },
    detail: (cate, id) => {
        const url = category[cate] + '/' + id;
        return axiosClient(url);
    },
    credits: (cate, id) => {
        const url = category[cate] + '/' + id + '/credits';
        return axiosClient(url);
    },
    similar: (cate, id) => {
        const url = category[cate] + '/' + id + '/similar';
        return axiosClient(url);
    },
}

export default tmdbApi;