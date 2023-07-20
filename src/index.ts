import 'reflect-metadata';

const propertiesKey = Symbol('propertiesKey');
const dataFakerKey = Symbol('dataFakerKey');
const optionsKey = Symbol('optionsKey');

type Class<T> = new (...args: any[]) => T;

type FakeOptions = {
  optional?: boolean;
  dependsOn? :string;
}

export const Fake = (fun, options?: FakeOptions): (target: object, propertyKey: string) => void => {
  return registerProperty(fun, options);
}

const registerProperty = (fun, options?: FakeOptions) => (target: object, propertyKey: string): void => {
  let properties: string[] = Reflect.getMetadata(propertiesKey, target);
  if (properties) {
    properties.push(propertyKey);
  } else {
    properties = [propertyKey];
    Reflect.defineMetadata(propertiesKey, properties, target);
  }
  Reflect.defineMetadata(dataFakerKey, fun, target, propertyKey);
  Reflect.defineMetadata(optionsKey, options ?? {}, target, propertyKey);
}


function getFakeFunction(target: any, propertyKey: string) {
  return Reflect.getMetadata(dataFakerKey, target, propertyKey);
}

function getFakedProperties<T>(origin: T): T {
  const properties: string[] = Reflect.getMetadata(propertiesKey, origin) ?? [];
  const result = {};
  properties.forEach(key => result[key] = origin[key]);
  return result as T;
}

type generateOptions = {
  exclude?: string[];
}
export const generateFakeData = <T>(ClassToFake: Class<T>, options: generateOptions = {}): T => {
  const obj = new ClassToFake();
  const mock = {};
  const keys = getFakedProperties(obj);
  Object.keys(keys)
    .filter((key: string) => (options.exclude || []).includes(key) ? undefined: key)
    .map((key: string) => {
      const mockFunction = getFakeFunction(obj, key);
      mock[key] = mockFunction();
    });
  Object.keys(keys).forEach((key) => {
    const options = Reflect.getMetadata(optionsKey, obj, key);
    if (options.optional) {
      if (Math.random() > 0.5) {
        mock[key] = undefined;
      }
    }
    if (options.dependsOn) {
      if (!mock[options.dependsOn]) {
        mock[key] = undefined;
      }
    }
  });
  return mock as T;
};
