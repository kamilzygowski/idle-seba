var app_firebase = {};
(function(){
      // Your web app's Firebase configuration
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      var firebaseConfig = {
        apiKey: "AIzaSyBCD99clVZrJYf7OfhJVUlCajE5JoQHZH8",
        authDomain: "sd-heroes.firebaseapp.com",
        databaseURL: "https://sd-heroes-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "sd-heroes",
        storageBucket: "sd-heroes.appspot.com",
        messagingSenderId: "815968900837",
        appId: "1:815968900837:web:da80ccecb28b93f49ae60c",
        measurementId: "G-JRW2KKE1FC"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();

      app_firebase = firebase;
})()