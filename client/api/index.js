import axios from 'axios';

// import { apiPrefix } from '../../etc/config.json';
import { apiPrefix } from '../../etc/configForLocalDB.json';

export default {
    clearDB() {
        return axios.delete(`${apiPrefix}/films`);
    },

    uploadFile(file) {
        let data = new FormData();
        data.append('file', file);
        return axios.post(`${apiPrefix}/upload`, data);
    },

    listFilms() {
        return axios.get(`${apiPrefix}/films`);
    },

    listFindByTitleFilms(title) {
        return axios.get(`${apiPrefix}/films/title/${title}`);
    },

    listFindByStarsFilms(stars) {
        return axios.get(`${apiPrefix}/films/stars/${stars}`);
    },

    createFilm(data) {
        return axios.post(`${apiPrefix}/films`, data);
    },

    deleteFilm(filmId) {
        return axios.delete(`${apiPrefix}/films/${filmId}`);
    }
}