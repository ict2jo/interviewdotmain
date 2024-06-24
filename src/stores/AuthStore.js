import { makeAutoObservable } from "mobx";

class AuthStore {
  user = null;
  token = null;
  isAuthenticated = false;

  constructor() {
    makeAutoObservable(this);
  }

  login(user, token) {
    this.user = user;
    this.token = token;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    this.setAuthenticated(true);
  }

  logout() {
    this.user = null;
    this.token = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  setUser(user) {
    this.user = user;
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser() {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }



  setToken(token) {
    this.token = token
    if (token) {
      localStorage.setItem("token", token);
      this.setAuthenticated(true);
    } else {
      localStorage.removeItem("token");
      this.setAuthenticated(false);
    }
  }
  // 토큰 로드
  loadToken() {
    const token = localStorage.getItem("token");
    if (token) {
      this.token = token;
    }
  }

  // 인증상태 변경 액션 
  setAuthenticated(authenticated) {
    this.isAuthenticated = authenticated;
  }

}
const authStore = new AuthStore(); // AuthStore 인스턴스 생성
export default authStore;