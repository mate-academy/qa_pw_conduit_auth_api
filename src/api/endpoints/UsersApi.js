import { expect } from '@playwright/test';
import { BaseAPI } from '../BaseApi';

export class UsersApi extends BaseAPI {
  constructor(request) {
    super(request);
    this._endpoint = '/api/users';
    this._headers = { 'content-type': 'application/json' };
  }

  async registerNewUser(userData) {
    return await this.step(`Register new user`, async () => {
      return await this.request.post(this._endpoint, {
        data: { user: userData },
        headers: this._headers,
      });
    });
  }

  async login(credentials) {
    return await this.step(`Login existing user`, async () => {
      return await this.request.post(`${this._endpoint}/login`, {
        data: { user: credentials },
        headers: this._headers,
      });
    });
  }

  async updateUser(userData) {
    return await this.step(`Update existing user`, async () => {
      let headers = {
        authorization: `Token ${userData.token}`,
        ...this._headers,
      };

      return await this.request.put('api/user', {
        data: { user: userData },
        headers,
      });
    });
  }

  async parseTokenFromBody(response) {
    const body = await this.parseBody(response);

    return body.user.token;
  }

  async assertResponseBodyContainsPlainText(response, expectedText) {
    await this.step(`Assert response body contains plain text: ${expectedText}`, async () => {
      const bodyText = await response.text();
      expect(bodyText.trim()).toBe(expectedText);
    });
  }

  async assertResponseBodyContainsToken(response) {
    await this.step(`Assert response body contains token`, async () => {
      const body = await this.parseBody(response);

      expect(body.user.token.length > 1).toBe(true);
    });
  }

  async assertEmailHasCorrectValue(response, email) {
    await this.step(`Assert response body has correct email`, async () => {
      const body = await this.parseBody(response);

      expect(body.user.email).toBe(email);
    });
  }

  async assertUsernameHasCorrectValue(response, username) {
    await this.step(`Assert response body has correct username`, async () => {
      const body = await this.parseBody(response);

      expect(body.user.username).toBe(username);
    });
  }

  async assertImageHasCorrectValue(response, image) {
    await this.step(
      `Assert response body has correct image value`,
      async () => {
        const body = await this.parseBody(response);

        expect(body.user.image).toBe(image);
      },
    );
  }

  async assertBioHasCorrectValue(response, bio) {
    await this.step(`Assert response body has correct bio`, async () => {
      const body = await this.parseBody(response);

      expect(body.user.bio).toBe(bio);
    });
  }
}
