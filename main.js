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
      character: "福"
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
      wall: undefined,
      uid: undefined,
      data: undefined
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
      });
    },
    firebaseLoginGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
          this.uid = result.user.uid;
          this.wall = result.user.uid;
          this.firebaseDatabaseOn(this.uid);
        }).catch((error) => {
          console.error({
            code: error.code,
            message: error.message,
            email: error.email,
            credential: error.credential
          })
          alert("伺服器發生錯誤，請稍後再試");
        });
    },
    getUrlParams(key) {
      let newUrl = new URL(window.location);
      return newUrl.searchParams.get(key);
    }
  },
  created() {
    // 根據 URL param 調出相應的春聯牆
    this.wall = this.getUrlParams("wall");
    if (this.wall) { this.firebaseDatabaseOn(this.wall) }
  }
});

app.mount("#app");