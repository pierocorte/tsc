class API {
  #endpoint = "http://localhost:3000/api/v1";
  #accessToken = null

  async getUsers() {
    // let users = await fetch("/js/data/users.json");
    let users = await fetch(this.#endpoint + '/users');
    users = await users.json();
    return users;
  }

  async fake_login(email, password) {
    return { status: 200 }
  }

  async login(email, password) {
    const res = await fetch(`${this.#endpoint}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // per ricevere/impostare il cookie httpOnly del refresh
      body: JSON.stringify({ email, password })
    });
    return res
    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();
    this.#accessToken = data.accessToken;
    return 'Login succeeded';
  }

  async logout() {
    const res = await fetch(`${this.#endpoint}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // per ricevere/impostare il cookie httpOnly del refresh
    });
    return res
    if (!res.ok) throw new Error("Logout failed");
    return 'Logout succeeded';
  }


  // Wrapper: allega Bearer, se 401 prova un refresh e ritenta una sola volta
  async apiFetch(path, opts = {}, retried = false) {
    const headers = new Headers(opts.headers || {});
    if (this.#accessToken) headers.set("Authorization", `Bearer ${this.#accessToken}`);

    const res = await fetch(`${this.#endpoint}${path}`, {
      ...opts,
      headers,
      credentials: "include" // serve per il refresh endpoint (cookie)
    });

    if (res.status === 401 && !retried) {
      try {
        await this.refresh();
        return this.apiFetch(path, opts, true);
      } catch {
        throw new Error("Unauthorized (refresh failed)");
      }
    }
    return await res.json();
  }

  async refresh() {
    const res = await fetch(`${this.#endpoint}/auth/refresh`, {
      method: "POST",
      credentials: "include"
    });
    if (!res.ok) throw new Error("Refresh failed");
    const data = await res.json();
    this.#accessToken = data.accessToken;
    return data;
  }
}

export default API = new API();
