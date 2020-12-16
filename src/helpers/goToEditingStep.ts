import PAGE_PATH from './pagePath';

export const goToEditingStep = (
  stepPath: string,
  id: number,
): void => {
  window.location.href = `${window.location.origin}${PAGE_PATH.ADVERTISERS}${stepPath}/edit/${id}`;
};
