import axios, { isAxiosError } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '',
  timeout: 10000
});

const logOnDev = (message) => {
  if (import.meta.env.NODE_ENV === 'development') {
    console.log(message);
  }
};

const onErrorResponse = (error) => {
  if (isAxiosError(error)) {
    const { message } = error;
    const { method, url } = error.config;
    const { status, statusText } = error.response;

    logOnDev(`[API] ${method?.toUpperCase()} ${url} | Error ${status} ${statusText} | ${message}`);

    switch (status) {
      case 400:
        console.error('잘못된 요청입니다.');
        break;
      case 401:
        console.error('인증 실패입니다.');
        break;
      case 403:
        console.error('권한이 없습니다.');
        break;
      case 404:
        console.error('찾을 수 없는 페이지입니다.');
        break;
      case 500:
        console.error('서버 오류입니다.');
        break;
      default:
        console.error(`에러가 발생했습니다. ${message}`);
    }
  } else if (error instanceof Error && error.name === 'TimeoutError') {
    logOnDev(`[API] | TimeoutError ${error.toString()}`);
    console.error('요청 시간이 초과되었습니다.');
  } else {
    logOnDev(`[API] | Error ${error.toString()}`);
    console.error(`에러가 발생했습니다. ${error.toString()}`);
  }

  return Promise.reject(error);
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => onErrorResponse(error)
);

export default api;
