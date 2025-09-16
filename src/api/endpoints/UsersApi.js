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
    const token = body?.user?.token ?? null;
    if (typeof token !== 'string' || token.trim() === '') {
      throw new Error(`Token not found in response body`);
    }
    return token;
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
      const token = body?.user?.token;
      expect(typeof token).toBe('string');
      expect(token.trim().length).toBeGreaterThan(0);
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

  // ---------- Generic validation helper (for field-level 422s) ----------
  async assertValidationError(response, field, expectedMessage = 'is invalid') {
    await this.step(`Assert 422 validation error for '${field}'`, async () => {
      expect(response.status()).toBe(422);
      const body = await this.parseBody(response);
      const v = body?.errors?.[field];
      const messages = v === undefined ? [] : (Array.isArray(v) ? v : [String(v)]);
      expect(messages.length).toBeGreaterThan(0);
      expect(messages).toContain(expectedMessage);
    });
  }

  // ---------- Invalid-credentials helper (for login with wrong creds) ----------
  async assertInvalidCredentials(response) {
    await this.step(`Assert invalid credentials (422 with 'invalid' message)`, async () => {
      expect(response.status()).toBe(422);
      const body = await this.parseBody(response);
      const errors = body?.errors ?? {};
      // Prefer 'email or password', but be tolerant if backend sends a string/array elsewhere.
      const raw =
        errors['email or password'] ??
        errors.credentials ??
        errors.error ??
        null;
      const messages = raw == null ? [] : (Array.isArray(raw) ? raw : [String(raw)]);
      expect(messages.length).toBeGreaterThan(0);
      expect(messages.join(' ').toLowerCase()).toContain('invalid');
    });
  }

  // ---------- Unauthorized body helper (for 401 payload) ----------
  async assertUnauthorizedErrorBody(response, expected = 'Unauthorized') {
    await this.step(`Assert unauthorized error payload`, async () => {
      expect(response.status()).toBe(401);
      const ct = response.headers()['content-type'] || '';
      if (ct.includes('application/json')) {
        const body = await this.parseBody(response);
        const raw =
          body?.errors?.body ??
          body?.errors?.message ??
          body?.message ??
          body?.error ??
          [];
        const messages = Array.isArray(raw) ? raw : [String(raw)];
        expect(messages.join(' ').toLowerCase()).toContain(expected.toLowerCase());
      } else {
        const text = (await response.text?.()) ?? '';
        expect(String(text).toLowerCase()).toContain(expected.toLowerCase());
      }
    });
  }
}
