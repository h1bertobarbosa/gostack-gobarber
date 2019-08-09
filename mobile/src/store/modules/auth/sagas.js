import { Alert } from 'react-native';
import { all, takeLatest, put, call } from 'redux-saga/effects';
import api from '~/services/api';
import { signInSucess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (user.provider) {
      Alert.alert(
        'Erro no login',
        'Usuários não pode ser prestador de serviços'
      );
      return;
    }

    yield put(signInSucess(token, user));
  } catch (error) {
    Alert.alert(
      'Falha no login',
      'Falha na autenticação, verifique seus dados'
    );
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
    });
  } catch (error) {
    Alert.alert(
      'Falha no cadastro',
      'Falha no cadastro, verifique seus dados !'
    );
  }
}

export function setToken({ payload }) {
  if (!payload) return;
  const { token } = payload.auth;
  api.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
