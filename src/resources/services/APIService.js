import axios from 'axios';
import Cookies from 'js-cookie';
import { COOKIE_NAME_AUTH_TOKEN } from 'config/constants';
import logOutService from './logOutService';
import { API_DOMAIN, API_DJANGO_DOMAIN } from './APIEndpoints';

const AUTH_TOKEN = Cookies.get(COOKIE_NAME_AUTH_TOKEN);
const apiOptions = {
  baseURL: API_DOMAIN,
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
};
const apiOptionsDjango = {
  baseURL: API_DJANGO_DOMAIN,
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
};

const APIService = axios.create(apiOptions);
export const APIServiceDjango = axios.create(apiOptionsDjango);

APIService.interceptors.response.use(null, logOutService);
APIServiceDjango.interceptors.response.use(null, logOutService);

export default APIService;
