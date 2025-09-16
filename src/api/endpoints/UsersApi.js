// src/api/users/UsersApi.js
import { expect } from '@playwright/test';
import { BaseAPI } from '../BaseApi';

export class UsersApi extends BaseAPI {
  constructor(request) {
    super(request);
    this._endpoint = '/api/users';
    this._headers = { 'content-type': 'application/json' };
  }

  // ---------- Actions ----------
  async registerNewUser(userData) {
    return await this.step(`Register new user`, async () => {
      return await this.request.post(this._endpoint, {
        data: { user: userData },
        headers: this._headers,
      });
    });
  }

  async loginUser({ email, password }) {
    return await this.step(`Login user`, async () => {
      return await this.request.post(`${this._endpoint}/login`, {
        data: { user: { email, password } },
        headers: this._headers,
      });
    });
  }

  async updateUser(userData) {
    return await this.step(`Update existing user`, async () => {
      const headers = {
        authorization: `Token ${userData.token}`,
        ...this._headers,
      };
      return await this.request.put('/api/user', {
        data: { user: userData },
        headers,
      });
    });
  }

  // ---------- Parsers ----------
  async parseTokenFromBody(response) {
    const body = await this.parseBody(response);
    return body.user.token;
  }

  // ---------- Assertions: status codes ----------
  async assertSuccessResponseCode(response) {
    await this.step(`Assert status is 200 OK`, async () => {
      expect(response.status()).toBe(200);
    });
  }

  async assertUnauthorizedResponseCode(response) {
    await this.step(`Assert status is 401 Unauthorized`, async () => {
      expect(response.status()).toBe(401);
    });
  }

  async assertUnprocessableEntityResponseCode(response) {
    await this.step(`Assert status is 422 Unprocessable Entity`, async () => {
      expect(response.status()).toBe(422);
    });
  }

  // ---------- Assertions: body fields ----------
  async assertResponseBodyContainsToken(response) {
    await this.step(`Assert response body contains token`, async () => {
      const body = await this.parseBody(response);
      expect(body?.user?.token?.length > 1).toBe(true);
    });
  }

  async assertEmailHasCorrectValue(response, email) {
    await this.step(`Assert response body has correct email`, async () => {
      const body = await this.parseBody(response);
      expect(body?.user?.email).toBe(email);
    });
  }

  async assertUsernameHasCorrectValue(response, username) {
    await this.step(`Assert response body has correct username`, async () => {
      const body = await this.parseBody(response);
      expect(body?.user?.username).toBe(username);
    });
  }

  async assertImageHasCorrectValue(response, image) {
    await this.step(`Assert response body has correct image value`, async () => {
      const body = await this.parseBody(response);
      expect(body?.user?.image).toBe(image);
    });
  }

  async assertBioHasCorrectValue(response, bio) {
    await this.step(`Assert response body has correct bio`, async () => {
      const body = await this.parseBody(response);
      expect(body?.user?.bio).toBe(bio);
    });
  }

  async assertInvalidCredentials(response) {
    await this.step(`Assert invalid credentials (422 + "email or password" = "is invalid")`, async () => {
      expect(response.status()).toBe(422);

      const body = await this.parseBody(response);
      const errors = body?.errors || {};
      expect(Object.keys(errors)).toEqual(['email or password']);
      expect(typeof errors['email or password']).toBe('string');
      expect(errors['email or password']).toBe('is invalid');
    });
}

}
