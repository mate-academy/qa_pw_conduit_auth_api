import { faker } from '@faker-js/faker';

export const nonExistingEmail = `invalid${faker.internet.email()}`;
export const invalidEmailFormat = faker.internet.email().replace('@', '');
export const invalidPassword = faker.internet.password(3);
