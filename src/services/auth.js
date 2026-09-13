const STORAGE_KEY = 'digital_mov_auth';

export const auth = {
  async login(email, password) {
    await new Promise((r) => setTimeout(r, 400));
    const user = { id: 1, name: 'Admin', email };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  async register(name, email, password) {
    await new Promise((r) => setTimeout(r, 400));
    const user = { id: Date.now(), name, email };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  logout() {
    localStorage.removeItem(STORAGE_KEY);
  },

  getCurrentUser() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  isAuthenticated() {
    return !!this.getCurrentUser();
  },
};
