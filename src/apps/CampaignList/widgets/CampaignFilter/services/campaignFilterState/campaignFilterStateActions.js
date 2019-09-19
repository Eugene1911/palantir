import { getUsers } from 'resources/api';

async function requestUser(params) {
  try {
    const response = await getUsers(params);
    const usersList =
      response && //
      response.data && //
      response.data.response;

    if (usersList) {
      return usersList.map(user => user.id);
    }

    return [];
  } catch (e) {
    return [];
  }
}

export default requestUser;
