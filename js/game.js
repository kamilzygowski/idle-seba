
var gameApp = {};

(function(){
    var firebase = app_firebase;
    var loggedUser = null;
    var uid = null;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          uid = user.uid;
          loggedUser = user;
          
        } else {
            uid = null;
            window.location.replace("index.html");
        }
      });

    
    function logOut(){
      firebase.auth().signOut();  
    } 

    function gainLevel(value){
      firebase.database().ref(uid).update({
        level: value
      });
    }

    function gainSkill(value){
      firebase.database().ref(uid).update({
        skill: value
      });
    }

    async function getCharacterInfo(){
      var character_info = '';
      await firebase.database().ref(uid).get().then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          character_info = snapshot.val();
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });

      console.log("NAAAA");
      return character_info;
    }

    async function createCharacter(){
      await firebase.database().ref(uid).set({
        name: document.getElementById('nameField').value,
        level: 0,
        skill: 0
      });
      //TO TRZEBA ZROBIC TAK ZE JAK SIE WYSLE SUCCESFUL TO DOPIERO MA ZALADOWAC GAME.HTML
      window.location.replace("game.html");
    }

    gameApp.getCharacterInfo = getCharacterInfo;
    gameApp.createCharacter = createCharacter;
    gameApp.logOut = logOut;
    gameApp.gainLevel = gainLevel;
    gameApp.gainSkill = gainSkill;
})()

