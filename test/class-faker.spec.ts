import {Fake, generateFakeData} from '../src';

describe('faker', () => {
  it('Should create object with id', async () => {
    class ToGenerate {
      @Fake(() => 'id')
      id: string;
    }
    const generated = generateFakeData(ToGenerate);
    expect(generated.id).toEqual('id');
  });

  it('Should be possible to pass exclude option to generateFakeData to exclude some keys', async () => {
    class ToGenerate {
      @Fake(() => 'id')
      id: string;

      @Fake(() => 'property')
      property: string;
    }
    const generated = generateFakeData(ToGenerate, {exclude: ['id']});
    expect(generated.id).not.toBeDefined();
    expect(generated.property).toEqual('property')
  });

  it('Should be possible to mark some properties as optional', async () => {
    let hasBeenGenerated = false;
    let hasNotBeenGenerated = false;
    for (let i = 0; i < 1000; i++) {
      class ToGenerate {
        @Fake(() => 'id')
        id: string;

        @Fake(() => 'property', {optional: true})
        property?: string;
      }
      const generated = generateFakeData(ToGenerate);
      if (generated.property) {
        hasBeenGenerated = true;
      } else {
        hasNotBeenGenerated = true;
      }
    }
    expect(hasBeenGenerated).toBeTruthy();
    expect(hasNotBeenGenerated).toBeTruthy();
  });

  it('Should not fail with only optional ', async () => {
    class ToGenerate {
      @Fake(() => 'property', {optional: true})
      property?: object
    }
    expect(() => generateFakeData(ToGenerate)).not.toThrow();
  });
});
