export type Selection = { start: number; end: number };

export enum MarkdownSymbols {
  bold = '**',
  italic = '_',
  link = '[]()',
  heading = '#',
  unorderedList = '- ',
  orderedList = '1. ',
}

export type MarkdownSymbol = keyof typeof MarkdownSymbols;
