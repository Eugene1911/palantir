import isArray from 'lodash/isArray';

function textToTagsID(text: string, tags): string[] {
  let textArray = !!text && text.split(',');
  textArray = textArray.map(word => word.trim());

  if (isArray(textArray)) {
    return tags
      .filter(tag => textArray.includes(String(tag.id)))
      .map(tag => tag.id);
  }

  return null;
}

export default textToTagsID;
