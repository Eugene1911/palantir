import isArray from 'lodash/isArray';
import { TTag } from '../stores/AudienceStore';
import { ETagStatus } from '../assets/constants/commonAudienceTypes';

function textToTagsWithCheck(
  text: string,
  tags: TTag[],
  isNewTagAllowed: boolean,
  needReplaceOldTags?: boolean,
): TTag[] {
  let textArray = !!text && text.split(',');
  if (!textArray) {
    return [];
  }

  textArray = textArray
    .map(word => word.trim())
    .filter(word => !!word);

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

export default textToTagsWithCheck;
