import { makeAutoObservable } from "mobx";
import userStore from "./UserStore";
class AuthStore {
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


  logout() {
    this.token = null;
    this.isAuthenticated = false;
    localStorage.removeItem("token");

    this.setUserInfo({
      id: '',
      name: '',
      email: '',
      phonenumber: '',
      provider: '',
      kakao: '',
      naver: '',
      google: '',
    });

    console.log(this.isAuthenticated);
  }

  setUser(user) {
    this.user = user;
  }

  setUserInfo(userInfo) {
    this.userInfo = { ...userInfo };
    userStore.setId(userInfo.id);
    userStore.setName(userInfo.name);
    userStore.setEmail(userInfo.email);
    userStore.setPhonenumber(userInfo.phonenumber);
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

  setAuthenticated(authenticated) {
    this.isAuthenticated = authenticated;
  }

}
const authStore = new AuthStore();
export default authStore;