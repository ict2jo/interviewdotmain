import { makeAutoObservable } from "mobx";
import axios from "axios";
import { URL } from "@/app/api/boot/route";

class UserStore {
  id = "";
  name = "";
  email = "";
  phonenumber = "";
  u_idx = "";
  p_job = "";
  p_class = "";
  p_career = "";
  p_location = "";
  field = "";
  addr = "";

  constructor() {
    makeAutoObservable(this);
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        this.loadUserFromServer();
      }
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

  setPhonenumber(phonenumber) {
    this.phonenumber = phonenumber;
  }

  loadUserFromServer() {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${URL}userInfo`, { params: { token } })
        .then((userInfoResponse) => {
          const userData = userInfoResponse.data;
          this.setPhonenumber(userData.phonenumber);
          this.setName(userData.name);
          this.setId(userData.id);
          this.setU_idx(userData.u_idx);
          this.setEmail(userData.email);
          this.setField(userData.field);
          console.log("Loaded user data:", userData);

          return axios.get(`/mypage/selfprofile?id=${userData.id}`);
        })
        .then((selfProfileResponse) => {
          if (selfProfileResponse.data.length === 0) {
            return axios
              .post(`/mypage/selfprofileinsert?u_idx=${this.u_idx}`)
              .then(() => null);
          } else {
            const selfProfileData = selfProfileResponse.data[0];
            this.setAddr(selfProfileData.addr);
            this.setP_job(selfProfileData.p_job);
            this.setP_class(selfProfileData.p_class);
            this.setP_career(selfProfileData.p_career);
            this.setP_location(selfProfileData.p_location);
            console.log("selfProfileResponse:", selfProfileData);
          }
        })
        .catch((error) => {
          console.error("Error loading user data", error);
        });
      }
    }
}


const userStore = new UserStore();
export default userStore;
