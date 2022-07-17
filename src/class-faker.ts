import 'reflect-metadata';

const propertiesKey = Symbol('propertiesKey');
const dataFakerKey = Symbol('dataFakerKey');

type Class<T> = new (...args: any[]) => T;

export const Fake = (fun): (target: object, propertyKey: string) => void => {
  return registerProperty(fun);
}

const registerProperty = (fun) => (target: object, propertyKey: string): void => {
  let properties: string[] = Reflect.getMetadata(propertiesKey, target);
  if (properties) {
    properties.push(propertyKey);
  } else {
    properties = [propertyKey];
    Reflect.defineMetadata(propertiesKey, properties, target);
  }
  Reflect.defineMetadata(dataFakerKey, fun, target, propertyKey);
}


function getFakeFunction(target: any, propertyKey: string) {
  return Reflect.getMetadata(dataFakerKey, target, propertyKey);
}

function getFakedProperties<T>(origin: T): T {
  const properties: string[] = Reflect.getMetadata(propertiesKey, origin);
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
  return mock as T;
};
