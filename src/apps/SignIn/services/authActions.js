import { AUTH_TOKEN } from 'helpers/endpointsApi';
import { COOKIE_NAME_AUTH_TOKEN } from 'config/constants';
import Cookies from 'js-cookie';
import AUTH_TYPES_ACTIONS from './authTypesActions';

const CLIENT_ID = '82373163275325578249468654384273';
const CLIENT_SECRET = '11111111111111111111111111111111';
const USER_EMAIL = 'super@trafficstars.com';
const USER_PASSWORD = 'password';

function authReuqest(despath) {
  const fetchReqestOptions = {
    method: 'POST',
  };
  const authRequestParams = [
    'grant_type=password',
    `client_id=${CLIENT_ID}`,
    `client_secret=${CLIENT_SECRET}`,
    `username=${USER_EMAIL}`,
    `password=${USER_PASSWORD}`,
  ];

  despath({
    type: AUTH_TYPES_ACTIONS.BEGIN,
  });

  fetch(
    `${AUTH_TOKEN}?${authRequestParams.join('&')}`,
    fetchReqestOptions,
  )
    .then(response => response.json())
    .then(response => {
      const { access_token } = response;

      Cookies.set(COOKIE_NAME_AUTH_TOKEN, access_token);

      despath({
        type: AUTH_TYPES_ACTIONS.SUCCESS,
        payload: response,
      });

      window.location.href = '/AppList';
    })
    .catch(error =>
      despath({
        type: AUTH_TYPES_ACTIONS.FAILURE,
        payload: error,
      }),
    );
}

export default authReuqest;
