import { configureViewport } from '@storybook/addon-viewport';

export const setupWebappViewports = () => {
  const height = '667px';

  const viewports = {};

  const addViewport = (name, width) => {
    viewports[name] = {
      name,
      styles: { width, height }
    };
  };

  const addViewportVersions = (name, width) => {
    addViewport(`${name}-1`, `${width - 1}px`);
    addViewport(`${name}`, `${width}px`);
    addViewport(`${name}+1`, `${width + 1}px`);
  };

  addViewportVersions('xxs', 375);
  addViewportVersions('xs', 576);
  addViewportVersions('sm', 768);
  addViewportVersions('md', 992);

  configureViewport({ viewports: viewports });
};
