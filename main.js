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

if (新建春聯牆) {
  登入(); // 取得UID
  if (UID已存在) {
    DB.取得NAME(UID);
    DB.取得春聯(UID);
    
  } else {

  }

} else if (貼春聯) {

}

*/
const app = Vue.createApp({
  data() {
    return {
      coupletNow: 0,
      pageNow: 1,
      wall: undefined,
      uid: undefined,
      data: undefined
      /*
      user1: {
        name: "Apple",
        doorStyle: {
          color: "#333",
          doorknob: "3"
        },
        messages: [
          {
            sender: "Andy",
            message: "I'm here!",
            couplet: {
              style: "1",
              character: "福",
              direction: "1"
            }
          },
          {
            sender: "Good Man",
            message: "I Love You.",
            couplet: {
              style: "1",
              character: "肛",
              direction: "1"
            }
          },
          {
            sender: "Andy2",
            message: "I'm here2!\nBLABLABLAB\nawdawdwd.",
            couplet: {
              style: "1",
              character: "你",
              direction: "1"
            }
          },
          {
            sender: "Andy3",
            message: "I'm here3!",
            couplet: {
              style: "1",
              character: "丟",
              direction: "1"
            }
          },
          {
            sender: "Good Man",
            message: "I Love You.",
            couplet: {
              style: "1",
              character: "肛",
              direction: "1"
            }
          },
          {
            sender: "Good Man",
            message: "I Love You.",
            couplet: {
              style: "1",
              character: "Y",
              direction: "1"
            }
          },
          {
            sender: "Good Man",
            message: "I Love You.",
            couplet: {
              style: "1",
              character: "肛",
              direction: "1"
            }
          },
          {
            sender: "Good Man",
            message: "I Love You.",
            couplet: {
              style: "1",
              character: "E",
              direction: "1"
            }
          },
          {
            sender: "Good Man",
            message: "I Love You.",
            couplet: {
              style: "1",
              character: "F",
              direction: "1"
            }
          },
          {
            sender: "Good Man",
            message: "I Love You.",
            couplet: {
              style: "1",
              character: "B",
              direction: "1"
            }
          },
          {
            sender: "Good Man",
            message: "I Love You.",
            couplet: {
              style: "1",
              character: "A",
              direction: "1"
            }
          }
        ]
      },
      user2: {
        name: "Good Man",
        doorStyle: {
          color: "#333",
          doorknob: "3"
        },
        messages: [
          {
            sender: "Andy again",
            message: "I'm here, too!",
            couplet: {
              style: "1",
              character: "財",
              direction: "3"
            }
          }
        ]
      }
      */
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
      /* const providerGoogle = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(providerGoogle); */
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
          this.uid = result.user.uid;
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
    },
    addUrlParam(url, key, value) {
      let newUrl = new URL(url);
      newUrl.searchParams.set(key, value);
      return newUrl;
    }
  },
  created() {
    // 根據 URL param 調出相應的春聯牆
    this.wall = this.getUrlParams("wall");
    if (this.wall) { this.firebaseDatabaseOn(this.wall) }

    /* const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        this.uid = result.user.uid;
        this.firebaseDatabaseOn(this.uid);
      }).catch((error) => {
        console.error({
          code: error.code,
          message: error.message,
          email: error.email,
          credential: error.credential
        })
        alert("伺服器發生錯誤，請稍後再試");
      }); */

    /* firebase.auth()
      .getRedirectResult()
      .then((result) => {
        this.uid = result.user.uid;
        this.firebaseDatabaseOn(this.uid);
      }).catch((error) => {
        console.error({
          code: error.code,
          message: error.message,
          email: error.email,
          credential: error.credential
        })
        alert("伺服器發生錯誤，請稍後再試");
      }); */
  }
});

app.mount("#app");