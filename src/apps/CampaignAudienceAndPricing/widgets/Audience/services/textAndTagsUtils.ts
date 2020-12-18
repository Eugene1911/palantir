import isArray from 'lodash/isArray';
import union from 'lodash/union';
import { TTag } from '../stores/AudienceStore';
import { ETagStatus } from '../assets/constants/commonAudienceTypes';

export function getTextArray(text?: string): string[] {
  const textArray = !!text && text.split(',');
  if (!textArray) {
    return [];
  }

  return union(
    textArray.map(word => word.trim()).filter(word => !!word),
    [],
  );
}

export async function checkTags(
  textArray: string[],
  newTagsId: string[],
  getTag: (id: string) => Promise<any | boolean>,
) {
  // eslint-disable-next-line no-restricted-syntax
  for (const text of textArray) {
    // eslint-disable-next-line no-await-in-loop
    const tag = await getTag(text);
    console.log('checkTags', tag);
    tag?.id ? newTagsId.push(tag.id) : newTagsId.push(text);
  }
}

// export function textToTag(textArray: string[], isActive) {
//   return textArray.map(textItem => ({
//     id: textItem,
//     status: ETagStatus.ACTIVE,
//     tooltip: '',
//   }));
// }

export function textToTagsWithCheck(
  text: string,
  tags: TTag[],
  isNewTagAllowed: boolean,
  needReplaceOldTags?: boolean,
): TTag[] {
  const textArray = getTextArray(text);

  if (isArray(textArray)) {
    if (isNewTagAllowed) {
      const filteredTags = needReplaceOldTags
        ? []
        : tags.filter(tag => !textArray.includes(String(tag.id)));

      return [
        ...filteredTags,
        ...textArray.map(textItem => ({
          id: textItem,
          status: ETagStatus.ACTIVE,
          tooltip: '',
        })),
      ];
    }

    return tags.filter(tag => textArray.includes(String(tag.id)));
  }

  return null;
}
