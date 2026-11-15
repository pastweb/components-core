import { defineConfig } from 'tsdown';

export default defineConfig({
  clean: true,
  entry: 'src/**/*.ts',
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  unbundle: true,
  copy: [
    {
      from: 'src/**/*.{css,scss,sass,less}',
      to: 'dist',
      flatten: false,
    },
    {
      from: 'src/**/README.md',
      to: 'dist',
      flatten: false,
    },
  ],
  exports: {
    customExports: {
      // Component documentation
      './*/README.md': './dist/*/README.md',
      // SCSS / Style exports
      './*.scss': {
        import: './dist/*.scss',
        require: './dist/*.scss',
        style: './dist/*.scss',
      },
      './**/*.scss': {
        import: './dist/**/*.scss',
        require: './dist/**/*.scss',
        style: './dist/**/*.scss',
      },
    },
  },
});
