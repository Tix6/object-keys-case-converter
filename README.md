# Object Case Converter

Simple javascript object case converter, built over [lodash](https://lodash.com/) string converter functions.  

Works on arrays and litteral objects (deeply), it can handle keys exceptions too.  

This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx) and made with [typescript](https://www.typescriptlang.org/).  

## SUPPORTED CONVERSIONS

- camelCase
- snakeCase
- kebabCase
- lowerCase
- upperCase
- startCase
- upperFirst
- custom

## INSTALL

```
yarn add object-keys-case-converter
```

or  

```
npm install object-keys-case-converter
```

## USAGE

```
import { snakeCaseKeys } from 'object-case-converter';

snakeCaseKeys({
  myData: [
    { firstValue: 1 }
  ];
});

//  my_data: [
//    { first_value: 1 }
//  ];
```

### Custom

```
import { customKeys } from 'object-case-converter';

const customKeysConverter = customKeys(str => str ? str.slice(6, Infinity) : '');

customKeysConverter({
  almostShortKey: 1,
});

//  {
//    ShortKey: 1,
//  }
```

### Exceptions

if for any reason you do not want that some keys to be converted the way it should, just add a dictionary of exceptions, with each key exceptions and their corresponding conversion.

```
import { camelCaseKeys } from 'object-case-converter';

camelCaseKeys(
  {
    change_me: 1,
    im_an_exception: 2,
  },
  {
    im_an_exception: 'exception',
  }
)

//  {
//    changeMe: 1,
//    exception: 2,
//  }
```



