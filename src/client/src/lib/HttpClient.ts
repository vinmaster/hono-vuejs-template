import { hc } from 'hono/client';
import type { AppRoutes } from '../../../server/routes/routes';

const serverUrl = import.meta.env.DEV ? 'http://localhost:3000' : '/';
const client = hc<AppRoutes>(serverUrl);

export class HttpClient {
  static async getDate() {
    let res = await client.api.date.$get();
    if (res.status >= 400) throw new Error(await res.text());
    return await res.json();
  }

  static async getUsers() {
    let res = await client.api.users.$get();
    if (res.status >= 400) throw new Error(await res.text());
    return await res.json();
  }

  static async register(body: { username: string }) {
    let res = await client.api.users.register.$post({ json: body });
    if (res.status >= 400) throw new Error(await res.text());
    return await res.json();
  }

  static async login(body: { username: string }) {
    let res = await client.api.users.login.$post({ json: body });
    if (res.status >= 400) throw new Error(await res.text());
    return await res.json();
  }
}
