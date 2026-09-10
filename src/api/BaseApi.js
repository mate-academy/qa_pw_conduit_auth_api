import { expect } from '@playwright/test';
import { testStep } from '../common/helpers/pw';
import * as responseCodes from '../constants/responseCodes';

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

  async parseBody(response) {
    return await response.json();
  }

  async parseIdFromBody(response) {
    const body = await this.parseBody(response);

    return body.id;
  }

  async assertResponseCode(response, code) {
    await this.step(`Assert the code ${code} is returned`, async () => {
      expect(this.parseStatus(response)).toEqual(code);
    });
  }

  async assertSuccessResponseCode(response) {
    await this.assertResponseCode(response, responseCodes.SUCCESS_CODE);
  }

  async assertUnprocessableEntityResponseCode(response) {
    await this.assertResponseCode(response, responseCodes.UNPROCESSABLE_ENTITY);
  }

  async assertUnauthorizedResponseCode(response) {
    await this.assertResponseCode(response, responseCodes.UNAUTHORIZED);
  }

  async assertNotFoundResponseCode(response) {
    await this.assertResponseCode(response, responseCodes.NOT_FOUND);
  }

  async assertBodyIsNotEmpty(response) {
    await this.step(`Assert response body is not empty`, async () => {
      const body = await this.parseBody(response);

      expect(body).not.toBe([]);
    });
  }

  async assertErrorMessageInResponseBody(response, message, key) {
    await this.step(
      `Assert response body contains error message ${key}:${message}`,
      async () => {
        const body = await this.parseBody(response);

        expect(`${key}:${body.errors[key]}`).toEqual(message);
      },
    );
  }

  async assertResponseBodyContainsToken(response) {
    await this.step(`Assert response body contains token`, async () => {
      const body = await this.parseBody(response);

      expect(body.user.token.length > 1).toBe(true);
    });
  }
}
