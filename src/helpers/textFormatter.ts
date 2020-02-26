enum MarkdownSymbols {
  bold = '**',
  italic = '_',
  link = '[]()',
  heading = '#',
  unorderedList = '- ',
  orderedList = '1. ',
}

type Selection = { start: number; end: number };

type TextFormatterParams = {
  controlName: string;
  inputValue: string | undefined;
  selection: Selection;
};

const splitTextBy = ({
  inputValue,
  selection,
}: {
  inputValue: string;
  selection: Selection;
}): [string, string, string] => {
  const beforeSelection = inputValue.substring(0, selection.start);
  const selectedValue = inputValue.slice(selection.start, selection.end);
  const afterSelection = inputValue.substring(selection.end);

  return [beforeSelection, selectedValue, afterSelection];
};

const addBold = ({
  inputValue,
  selection,
}: {
  inputValue: string;
  selection: Selection;
}) => {
  if (selection.start === selection.end) {
    return `${inputValue}${MarkdownSymbols.bold}${MarkdownSymbols.bold}`;
  }

  const [beforeSelection, selectedValue, afterSelection] = splitTextBy({
    inputValue,
    selection,
  });

  return `${beforeSelection}${MarkdownSymbols.bold}${selectedValue}${MarkdownSymbols.bold}${afterSelection}`;
};

const addItalic = ({
  inputValue,
  selection,
}: {
  inputValue: string;
  selection: Selection;
}) => {
  if (selection.start === selection.end) {
    return `${inputValue}${MarkdownSymbols.italic}${MarkdownSymbols.italic}`;
  }

  const [beforeSelection, selectedValue, afterSelection] = splitTextBy({
    inputValue,
    selection,
  });

  return `${beforeSelection}${MarkdownSymbols.italic}${selectedValue}${MarkdownSymbols.italic}${afterSelection}`;
};

const addLink = ({
  inputValue,
  selection,
}: {
  inputValue: string;
  selection: Selection;
}) => {
  if (selection.start === selection.end) {
    return `${inputValue}${MarkdownSymbols.link}`;
  }

  const [beforeSelection, selectedValue, afterSelection] = splitTextBy({
    inputValue,
    selection,
  });

  const [openingBracket, ...rest] = MarkdownSymbols.link;

  return `${beforeSelection}${openingBracket}${selectedValue}${rest.join(
    ''
  )}${afterSelection}`;
};

const addHeading = ({
  controlName,
  inputValue,
}: {
  controlName: 'heading' | 'unorderedList' | 'orderedList';
  inputValue: string;
}) => {
  return `${MarkdownSymbols[controlName]}${inputValue}`;
};

const formatValue = ({
  controlName,
  inputValue,
  selection,
}: {
  controlName: string;
  inputValue: string;
  selection: Selection;
}) => {
  switch (controlName) {
    case 'bold': {
      return addBold({ inputValue, selection });
    }
    case 'italic': {
      return addItalic({ inputValue, selection });
    }
    case 'link': {
      return addLink({ inputValue, selection });
    }
    case 'orderedList':
    case 'unorderedList':
    case 'heading': {
      return addHeading({ inputValue, controlName });
    }

    default: {
      return inputValue;
    }
  }
};

const calculateSelection = ({
  controlName,
  selection,
}: {
  controlName: string;
  selection: Selection;
}) => {
  if (selection.start === selection.end) {
    switch (controlName) {
      case 'bold': {
        return { start: selection.start + 2, end: selection.end + 2 };
      }
      case 'italic':
      case 'link':
      case 'heading': {
        return { start: selection.start + 1, end: selection.end + 1 };
      }
      case 'orderedList': {
        return { start: selection.start + 3, end: selection.end + 3 };
      }
      case 'unorderedList': {
        return { start: selection.start + 2, end: selection.end + 2 };
      }

      default:
        return selection;
    }
  }

  switch (controlName) {
    case 'bold': {
      return { start: selection.end + 4, end: selection.end + 4 };
    }
    case 'unorderedList':
    case 'italic': {
      return { start: selection.end + 2, end: selection.end + 2 };
    }
    case 'orderedList':
    case 'link': {
      return { start: selection.end + 3, end: selection.end + 3 };
    }
    case 'heading': {
      return { start: selection.end + 1, end: selection.end + 1 };
    }

    default:
      return selection;
  }
};

export default ({
  controlName,
  inputValue = '',
  selection,
}: TextFormatterParams) => {
  const formattedValue = formatValue({ controlName, inputValue, selection });
  const newSelection = calculateSelection({ selection, controlName });

  return { formattedValue, newSelection };
};
