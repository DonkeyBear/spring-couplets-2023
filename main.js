// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsTyYoZCzet5LcsereERM1TmzqKET0o60",
  authDomain: "spring-couplets-2023.firebaseapp.com",
  projectId: "spring-couplets-2023",
  storageBucket: "spring-couplets-2023.appspot.com",
  messagingSenderId: "837788521556",
  appId: "1:837788521556:web:e48c5e896c76b6ca3109c1",
  measurementId: "G-F5F0NGXBX3",
  databaseURL: "https://spring-couplets-2023-default-rtdb.asia-southeast1.firebasedatabase.app"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// alert("5");

// Vue 3 section
// ljpLethNw4MWqXSsrU3jsrcCbXt1
/* 
uid: {
  name: "NICKNAME",
  couplets: [
    {
      sender: "SENDER-NAME",
      message: "MESSAGE-CONTENT",
      style: "1",
      text: "福"
    }
  ]
}
*/
// TODO: 複製網址
const app = Vue.createApp({
  data() {
    return {
      coupletNow: 0,
      pageNow: 1,
      wall: undefined, // 牆面所有者的 UID
      uid: undefined, // 已登入使用者的 UID
      name: undefined, // 牆面所有者的名字
      couplets: undefined, // 將取得的 data 處理過後得到的 array
      data: undefined,
      coupletPost: {
        sender: "",
        message: "",
        text: ""
      }
    }
  },
  methods: {
    firebaseDatabaseSet(location = "/", data = {}) {
      db.ref(location).set(data).then(() => {
        console.log("建立成功");
      }).catch(() => {
        alert("伺服器發生錯誤，請稍後再試");
      });
    },
    firebaseDatabaseOnce(location = "/") {
      db.ref(location).once("value", (snapshot) => {
        this.data = snapshot.val();
      });
    },
    firebaseDatabaseOn(location = "/") {
      db.ref(location).on("value", (snapshot) => {
        this.data = snapshot.val();
        this.couplets = Object.values(this.data.couplets);
      });
    },
    firebaseLoginPopup() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
          this.uid = result.user.uid;
          this.wall = result.user.uid;
          this.firebaseDatabaseOn(this.uid);
        }).catch((error) => {
          alert(`Code: ${error.code}\nMessage: ${error.message}\nEmail: ${error.email}\nCredential: ${error.credential}`);
          alert("發生錯誤，請稍後再試");
          return {
            code: error.code,
            message: error.message,
            email: error.email,
            credential: error.credential
          }
        });
    },
    pushCouplet() {
      this.coupletPost.style = this.getStyle();
      db.ref(`${this.wall}/couplets`).push(this.coupletPost);
    },
    getStyle() {
      // 1: 80%, 2: 15%, 3: 5%
      let stylePool = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 3];
      return stylePool[Math.floor(Math.random() * stylePool.length)];
    },
    firebaseLoginRedirection() {
      const providerGoogle = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(providerGoogle);
    },
    firebaseLoginRedirectionResult() {
      firebase.auth()
        .getRedirectResult()
        .then((result) => {
          if (result.user) {
            this.uid = result.user.uid;
            this.wall = result.user.uid;
            this.firebaseDatabaseOn(this.uid);
          }
        }).catch((error) => {
          alert(`Code: ${error.code}\nMessage: ${error.message}\nEmail: ${error.email}\nCredential: ${error.credential}`);
          alert("發生錯誤，請稍後再試");
          return {
            code: error.code,
            message: error.message,
            email: error.email,
            credential: error.credential
          }
        });
    },
    getUrlParams(key) {
      let newUrl = new URL(window.location);
      return newUrl.searchParams.get(key);
    },
    isSafari() {
      return (navigator.userAgent.toLowerCase().indexOf("safari") != -1);
    },
    changePage(delta) {
      let pageNew = this.pageNow + delta
      if ((pageNew > Math.ceil(this.couplets.length / 9)) || pageNew < 1) {
        return;
      } else {
        this.pageNow = pageNew;
      }
    }
  },
  created() {
    // 根據 URL param 調出相應的春聯牆
    this.wall = this.getUrlParams("wall");
    if (this.wall) { this.firebaseDatabaseOn(this.wall) }

    // 調整不同瀏覽器的登入方式（popup/redirection）
    if (this.isSafari()) { this.firebaseLoginRedirectionResult() }
  }
});

app.mount("#app");