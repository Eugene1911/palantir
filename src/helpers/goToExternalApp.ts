import PAGE_PATH from './pagePath';

export const goToExternalApp = (
  appPath: string,
  id: number | string = '',
  isEdit = true,
): void => {
  const urlBase = `${window.location.origin}${PAGE_PATH.ADVERTISERS}`;
  window.location.href = `${urlBase}${appPath}${
    isEdit ? '/edit' : ''
  }/${id}`;
};
