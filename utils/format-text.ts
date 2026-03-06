export const formatText = (textArray: string[]): string => {
    return textArray
      ?.map((text, index) => {
        const formattedText = text.replace(/-/g, ' ').replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
        if (textArray.length === 1) {
          return formattedText;
        }
        if (index === textArray.length - 1 && textArray.length > 1) {
          return ` & ${formattedText}`;
        }
        return index === textArray.length - 2 ? `${formattedText}` : `${formattedText}, `;
      })
      .join('')
      .replace(', &', ' &');
  };