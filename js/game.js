
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

    function updateMoney(value){
      firebase.database().ref(uid).update({
        gold: value
      });
    }

   async function updateInventory(value){
      inventory = await getInventory();
      inventory.push(value);
      firebase.database().ref(uid + "/inventory").set(inventory);
    }
    
    async function unlockHero(id){
      ownedHeros = await getOwnedHeros();
      //ownedHeros = [];
      ownedHeros.push(id);
      firebase.database().ref(uid + "/ownedHeros").set(ownedHeros);
    }

    async function getOwnedHeros(){
      var ownedHeros = [];
      await firebase.database().ref(uid + "/ownedHeros").get().then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          ownedHeros = snapshot.val();
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });

      console.log("NAAAA");
      return ownedHeros;
    }

    async function getInventory(){
      var inventory = [];
      await firebase.database().ref(uid + "/inventory").get().then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          inventory = snapshot.val();
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
      
      return inventory;
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

      return character_info;
    }

    async function createCharacter(){
      await firebase.database().ref(uid).set({
        name: document.getElementById('nameField').value,
        level: 0,
        skill: 0,
        gold: 50,
        hp: 800,
        inventory: [],
        ownedHeros: []
      });
      //TO TRZEBA ZROBIC TAK ZE JAK SIE WYSLE SUCCESFUL TO DOPIERO MA ZALADOWAC GAME.HTML
      window.location.replace("game.html");
    }

    gameApp.getCharacterInfo = getCharacterInfo;
    gameApp.createCharacter = createCharacter;
    gameApp.logOut = logOut;
    gameApp.gainLevel = gainLevel;
    gameApp.gainSkill = gainSkill;
    gameApp.updateMoney = updateMoney;
    gameApp.getInventory = getInventory;
    gameApp.unlockHero = unlockHero;
    gameApp.getOwnedHeros = getOwnedHeros;
    gameApp.updateInventory = updateInventory;
})()

