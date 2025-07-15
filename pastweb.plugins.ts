import { builder } from '../cli-builder/src';

export default builder({
  entry: {
    index: 'src/index.ts',
    '_index.scss': 'src/_index.scss',
  },
  output: {
    package: true,
  }
});
