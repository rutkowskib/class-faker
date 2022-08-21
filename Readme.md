# class-faker

Little helper package designed to improve testing when using DTOs. Instead of writing functions to create fake objects
to test with class-faker gives you ability to define how faked object should look like directly in class.

## Usage
### Basic usage
```
import {Fake, generateFakeData} from 'class-faker';

class User {
  @Fake(() => 'a9f17dd1-810d-494e-b60a-aae625650401')
  id: string;

  @Fake(() => 'username')
  username: string;
}
const user = generateFakeData(User);
console.log(user); // { id: 'a9f17dd1-810d-494e-b60a-aae625650401', username: 'username' }
```

### Usage with options
```
import {Fake, generateFakeData} from 'class-faker';

class User {
  @Fake(() => 'a9f17dd1-810d-494e-b60a-aae625650401')
  id: string;

  @Fake(() => 'username')
  username: string;
}
const user = generateFakeData(User, {exclude: ['username']});
console.log(user); // { id: 'a9f17dd1-810d-494e-b60a-aae625650401' }
```

## Options
| Name    | Type     | Description                                  | Default |
|---------|----------|----------------------------------------------|---------|
| exclude | string[] | Names of properties that should not be faked | []      |


