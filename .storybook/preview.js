import { GlobalStyle } from '../src/components/GlobalStyle/GlobalStyle';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [
  Story => (
    <>
      <GlobalStyle />
      <Story />
    </>
  )
];
