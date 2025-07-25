import { builder } from '../cli-builder/src';

export default builder({
  entry: {
    index: 'src/index.ts',
    '_index.scss': 'src/_index.scss',
  },
  output: {
    package: {
      exports: {
        exclude: [
          /_index(\.scss)?$/,
          /Accordion\.scss$/,
          /Button\.scss$/,
          /Accordion\.scss$/,
          /Button\.scss$/,
          /Buttons\.scss$/,
          /Checkbox\.scss$/,
          /DropDown\.scss$/,
          /Icon\.scss$/,
          /Link\.scss$/,
          /Notification\.scss$/,
          /Pagination\.scss$/,
          /Panel\.scss$/,
          /Radio\.scss$/,
          /RangeSlider\.scss$/,
          /ScrollArea\.scss$/,
          /Select\.scss$/,
          /SlideController\.scss$/,
          /Spinner\.scss$/,
          /SplitLayout\.scss$/,
          /Stepper\.scss$/,
          /Tabs\.scss$/,
          /Tag\.scss$/,
          /TextArea\.scss$/,
          /TextInput\.scss$/,
          /ToastController\.scss$/,
          /Toggle\.scss$/,
          /Tooltip\.scss$/,
          /WindowController\.scss$/,
        ],
      },
    },
  },
});
