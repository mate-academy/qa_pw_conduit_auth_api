import { expect } from '@playwright/test';
import { testStep } from '../common/helpers/pw';
import {
  SUCCESS_CODE,
  UNPROCESSABLE_ENTITY,
  UNAUTHORIZED,
  NOT_FOUND,
} from '../constants/responceCodes';

export class BaseAPI {
  _endpoint;
  _headers;

  constructor(request) {
    this.request = request;
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun);
  }

  parseStatus(response) {
    return response.status();
  }

  parseText(response) {
    return response.text();
  }

  async parseBody(response) {
    return await response.json();
  }

  async parseIdFromBody(response) {
    const body = await this.parseBody(response);

    return body.id;
  }

  async assertText(response, text) {
    await this.step(`Assert response text contains "${text}"`, async () => {
      const body = await this.parseText(response);
      expect(body).toContain(text);
    });
  }

  async assertResponseCode(response, code) {
    await this.step(`Assert the code ${code} is returned`, async () => {
      expect(this.parseStatus(response)).toEqual(code);
    });
  }

  async assertSuccessResponseCode(response) {
    await this.assertResponseCode(response, SUCCESS_CODE);
  }

  async assertUnauthorizedResponseCode(response) {
    await this.assertResponseCode(response, UNAUTHORIZED);
  }

  async assertNotFoundResponseCode(response) {
    await this.assertResponseCode(response, NOT_FOUND);
  }

  async assertUnprocessableEntityResponseCode(response) {
    await this.assertResponseCode(response, UNPROCESSABLE_ENTITY);
  }

  async assertBodyIsNotEmpty(response) {
    await this.step(`Assert response body is not empty`, async () => {
      const body = await this.parseBody(response);

      expect(body).not.toBe([]);
    });
  }

  async assertErrorMessageInResponseBody(response, message) {
    await this.step(
      `Assert response body contains error message "${message}"`,
      async () => {
        const body = await this.parseBody(response);
        const [key, expectedError] = message.split(':');

        const actualError = body.errors[key.trim()];

        const errorMessage = Array.isArray(actualError)
          ? actualError[0]
          : actualError;

        expect(errorMessage).toBe(expectedError.trim());
      },
    );
  }
}
