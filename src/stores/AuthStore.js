import { makeAutoObservable } from "mobx";

class AuthStore {
  user = null;
  token = null;
  isAuthenticated = false;
  userInfo = {
    id: '',
    name: '',
    email: '',
    phonenumber: '',
    provider: '',
    kakao: '',
    naver: '',
    google: '',
  }
  constructor() {
    makeAutoObservable(this);
    this.loadToken();
  }

  setAuthenticated(authenticated) {
    this.isAuthenticated = authenticated;
  }
  login(user, token) {
    this.user = user;
    this.token = token;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    this.isAuthenticated = true;
  }

  logout() {
    this.user = null;
    this.token = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.isAuthenticated = false;
    this.userInfo = {
      id: '',
      name: '',
      email: '',
      phonenumber: '',
      provider: '',
      kakao: '',
      naver: '',
      google: '',
    };
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

  setUserInfo(userInfo) {
    this.userInfo = { ...userInfo };
  }

  get UserInfo() {
    return this.userInfo;
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem("token", token);
      this.setAuthenticated(true);
    } else {
      localStorage.removeItem("token");
      this.setAuthenticated(false);
    }
  }

  loadToken() {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem('token');
      if (token) {
        this.token = token;
        this.isAuthenticated = true;
      } else {
        this.token = null;
        this.isAuthenticated = false;
      }
    } else {
      this.token = null;
      this.isAuthenticated = false;
    }
  }

  // 인증상태 변경 액션 
  setAuthenticated(authenticated) {
    this.isAuthenticated = authenticated;
  }

}
const authStore = new AuthStore(); // AuthStore 인스턴스 생성
export default authStore;