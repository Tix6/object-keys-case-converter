import { camelCaseKeys, customKeys } from '../src/index';

// Tests are made with the camelCaseKeys function but should work the same way with the others.
describe('object case converter', () => {
  test('works on simple objects', () => {
    expect(
      camelCaseKeys({
        hello_world: "it's me",
        camel__case__me: 'please',
      })
    ).toEqual({
      helloWorld: "it's me",
      camelCaseMe: 'please',
    });
  });

  test('leaves others keys untouched', () => {
    expect(
      camelCaseKeys({
        imCamelCased: 'xxx',
        abcd: 1,
      })
    ).toEqual({
      imCamelCased: 'xxx',
      abcd: 1,
    });
  });

  test('change case deeply', () => {
    expect(
      camelCaseKeys({
        you_hou: {
          its_just_me: {
            myself: {
              and_i: ['me', 'myself', 'and i'],
            },
          },
        },
      })
    ).toEqual({
      youHou: {
        itsJustMe: {
          myself: {
            andI: ['me', 'myself', 'and i'],
          },
        },
      },
    });
  });

  test('works on nested arrays', () => {
    expect(
      camelCaseKeys({
        data: [
          {
            service_name: '102',
          },
        ],
      })
    ).toEqual({
      data: [
        {
          serviceName: '102',
        },
      ],
    });
  });

  test('works on nested arrays (deeper)', () => {
    expect(
      camelCaseKeys({
        data: [
          {
            service_name: [{ some_stuff: true }],
          },
        ],
      })
    ).toEqual({
      data: [
        {
          serviceName: [{ someStuff: true }],
        },
      ],
    });
  });

  test('handles case exceptions', () => {
    expect(
      camelCaseKeys(
        {
          change_me: 1,
          im_an_exception: 2,
        },
        {
          im_an_exception: 'Im_an_Exception',
        }
      )
    ).toEqual({
      changeMe: 1,
      Im_an_Exception: 2,
    });
  });

  test('handles deep case exceptions', () => {
    expect(
      camelCaseKeys(
        {
          change_me: {
            key_wont_camel_case: {
              this_key_neither: 42,
            },
          },
        },
        {
          key_wont_camel_case: 'not_in_camel_case',
          this_key_neither: 'neither_does_it',
        }
      )
    ).toEqual({
      changeMe: {
        not_in_camel_case: {
          neither_does_it: 42,
        },
      },
    });
  });

  test('handles deep array case exceptions', () => {
    expect(
      camelCaseKeys(
        {
          hello_world: [
            {
              here_too: {
                other_exception: true,
              },
            },
          ],
        },
        { other_exception: 'OTHER_EXCECPTION' }
      )
    ).toEqual({
      helloWorld: [
        {
          hereToo: {
            OTHER_EXCECPTION: true,
          },
        },
      ],
    });
  });

  test('effective on array of objects', () => {
    expect(
      camelCaseKeys([
        { should_work: true, on_arrays: [] },
        { should_work_bis: true, on_arrays_bis: [] },
      ])
    ).toEqual([
      { shouldWork: true, onArrays: [] },
      { shouldWorkBis: true, onArraysBis: [] },
    ]);
  });

  test('just returns the original argument on other types', () => {
    expect(camelCaseKeys(true)).toEqual(true);
    expect(camelCaseKeys(1)).toEqual(1);
    expect(camelCaseKeys('hello')).toEqual('hello');
    expect(camelCaseKeys([1, 2, 3, 'soleil'])).toEqual([1, 2, 3, 'soleil']);
    expect(camelCaseKeys(undefined)).toEqual(undefined);
    expect(camelCaseKeys(null)).toEqual(null);
  });

  test('with custom function converter', () => {
    const customKeysConverter = customKeys(str =>
      str ? str.slice(6, Infinity) : ''
    );
    expect(
      customKeysConverter({
        almostShortKey: 1,
      })
    ).toEqual({
      ShortKey: 1,
    });
  });
});
