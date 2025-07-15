## Props

| PropName     | type                                   | required | default                    | Description                                                                |
|--------------|----------------------------------------|----------|----------------------------|----------------------------------------------------------------------------|
| cls          | (...args: ClassValue[]) => string;     |    yes   |              -             | function to handle CssModules classes and classes switching                |
| src          | string                                 |    no    |             ""             | It can contains the image url or the svg raw to be embedded in the <i/> tag|
| name         | Record<string, string>                 |    no    |             {}             | icon name with the format `collection:name` to match the `collection` structure ot the [iconify](https://iconify.design/docs/api/) api |
| collection   | Record<string, Record<string, string>> |    no    |             {}             | Object that contains the icons collection with key a collection name and an object as `{ iconName: '...source' }`.           |
| apiUrl       | string                                 |    no    | https://api.iconify.design | the api url used to retrive the icon |

The component is able to switch between img icons and svg sources provided via the `src` prop.
If an asset URL or a data URL is assigned to the prop `src` the component will render an `<img />` tag inside the `<i/>` tag passing the src vaule to it.
In this case you can even assign a `name` to be rendered as in the `alt` attribute of the `img` tag.
If an `svg` source is assigned to the prop `src` the SVG will rendered inside  teh `<i/>` tag;
Is possible organise the icons in collections using the `collection` prop, which expect to be an object `{ collectionName: { iconName: ...source } }`, where the `source`
is intended to be a `URL/dataURL`or an `svg` string.
To retive the icon from a `collection` you can use the `name` porps with the syntax `collectionName:iconName`, if the icon is not found inside the collection or the collection it is not present,
the component will to find the collection and the icon calling the [iconify](https://iconify.design/docs/api/) api.
For more info about iconfy please visit the official [website](https://iconify.design/docs/).

## Template
```tsx
import { withDefaultProps, useMediator } from '@pastweb/x';
import { icon as iconMediator, IconMediator } from '@pastweb/components/Icon';
import { DEFAULT_PROPS } from './constants';
import { IconProps, IconDefaultProps } from './types';

export function Icon(props: IconProps) {
  const p = withDefaultProps<IconDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<IconMediator>(iconMediator, p);
  const s = m.state;

  return (
    <>
      <i class={p.cls('Icon')} #if={s.iconData} #html={s.iconData} />
      <i class={p.cls('Icon')} #else-if={s.src}>
        <img src={s.src} alt={s.iconName} />
      </i>
    </>
  );
}
```
