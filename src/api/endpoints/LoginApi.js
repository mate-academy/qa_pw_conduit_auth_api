import { BaseAPI } from '../BaseApi';

export class LoginApi extends BaseAPI {
  constructor(request) {
    super(request);
    this._endpoint = '/api/users/login';
    this._headers = { 'content-type': 'application/json' };
  }

  async loginUser(email, password) {
    return await this.step(`Login user`, async () => {
      return await this.request.post(this._endpoint, {
        data: {
          user: {
            email: email,
            password: password,
          },
        },
        headers: this._headers,
      });
    });
  }
}
