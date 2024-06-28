import { makeAutoObservable } from "mobx";
import axios from "axios";
import { URL } from "@/app/api/boot/route";

class UserStore {
  id = "";
  name = "";
  email = "";
  phonenumber = "";

  constructor() {
    makeAutoObservable(this);
    if (typeof window !== "undefined") {
      this.loadUserFromServer();
    }
  }
  setId(id) {
    this.id = id;
  }

  setName(name) {
    this.name = name;
  }

  setEmail(email) {
    this.email = email;
  }

  setPhonenumber(phonenumber) {
    this.phonenumber = phonenumber;
  }

  async loadUserFromServer() {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(`${URL}userInfo`, {
          params: { token },
        });
        const userData = response.data;
        this.setId(userData.id);
        this.setName(userData.name);
        this.setEmail(userData.email);
        this.setPhonenumber(userData.phonenumber);
        console.log("Loaded user data:", userData);

      } catch (error) {
        console.error("Error loading user data", error);
      }
    }
  }
}

const userStore = new UserStore();
export default userStore;
