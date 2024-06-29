import { makeAutoObservable } from "mobx";
import axios from "axios";
import { URL } from "@/app/api/boot/route";

class UserStore {
  id = "";
  name = "";
  email = "";
  phonenumber = "";
  u_idx = "";
  p_job= "";
  p_class= "";
  p_career= "";
  p_location= "";
  field= "";
  addr= "";

  constructor() {
    makeAutoObservable(this);
    if (typeof window !== "undefined") {
      this.loadUserFromServer();
    }
  }
  setId(id) {
    this.id = id;
  }
  setU_idx(u_idx) {
    this.u_idx = u_idx;
  }

  setName(name) {
    this.name = name;
  }
  setPhonenumber(phonenumber) {
    this.phonenumber = phonenumber;
  }

  setEmail(email) {
    this.email = email;
  }
  setP_job(p_job) {
    this.p_job = p_job;
  }
  setP_class(p_class) {
    this.p_class = p_class;
  }

  setP_career(p_career) {
    this.p_career = p_career;
  }

  setP_location(p_location) {
    this.p_location = p_location;
  }
  setField(field) {
    this.field = field;
  }
  setAddr(addr) {
    this.addr = addr;
  }
  async loadUserFromServer() {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const userInfoResponse = await axios.get(`${URL}userInfo`, {
          params: { token },
        });
        const userData = userInfoResponse.data;
        console.log("Loaded user data:", userData);
        
        const selfProfileResponse = await axios.get(`/mypage/selfprofile?id=${userData.id}`);
        const selfProfileData = selfProfileResponse.data[0];
        this.setPhonenumber(selfProfileData.phonenumber);
        this.setName(selfProfileData.name);
        this.setId(selfProfileData.id);
        this.setU_idx(selfProfileData.u_idx);
        this.setEmail(selfProfileData.email);
        this.setP_job(selfProfileData.p_job);
        this.setP_class(selfProfileData.p_class);
        this.setP_career(selfProfileData.p_career);
        this.setP_location(selfProfileData.p_location);
        this.setAddr(selfProfileData.addr);
        this.setField(selfProfileData.field);
  
        console.log("Loaded selfProfileData:", selfProfileData);
      }
    } catch (error) {
      console.error("Error loading user data", error);
    }
  }
}
const userStore = new UserStore();
export default userStore;
