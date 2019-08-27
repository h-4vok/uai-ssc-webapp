import { configure } from '@storybook/react';

export const setupWebappStories = () => {
  const filesEndingInStoriesJS = require.context(
    './stories',
    true,
    /.stories.js$/
  );
  const loadStories = () =>
    filesEndingInStoriesJS
      .keys()
      .forEach(filename => filesEndingInStoriesJS(filename));

  configure(loadStories, module);
};
