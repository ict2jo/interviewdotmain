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
    setTimeout(() => {
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem("token");

      this.setUserInfo({
        id: '',
        name: '',
        email: '',
        phonenumber: '',
        u_idx: '',
        p_job: '',
        p_class: '',
        p_career: '',
        p_location: '',
        field: '',
        addr: '',
        birth: '',
        active: '',
        provider: '',
        kakao: '',
        naver: '',
        google: '',
      });
    }, 2000)

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
    userStore.setU_idx(userInfo.u_idx);
    userStore.setP_job(userInfo.p_job);
    userStore.setP_class(userInfo.p_class);
    userStore.setP_career(userInfo.p_career);
    userStore.setP_location(userInfo.p_location);
    userStore.setField(userInfo.field);
    userStore.setAddr(userInfo.addr);
    userStore.setBirth(userInfo.birth);
    userStore.setActive(userInfo.active);

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