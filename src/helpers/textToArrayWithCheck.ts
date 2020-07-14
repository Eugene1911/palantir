import isArray from 'lodash/isArray';

function textToArrayWithCheck(
  text: string,
  wordList: string[],
): string[] {
  const textArray = !!text && text.split(',');

  if (isArray(textArray)) {
    return textArray
      .map(word => word.trim())
      .filter(word => word && !wordList.includes(word));
  }

  return null;
}

export default textToArrayWithCheck;
