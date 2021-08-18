
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

    function boostHero(heroId){
      firebase.database().ref(uid + "/ownedHeros/" + heroId).update({
        power: firebase.database.ServerValue.increment(1)
      })
    }

    function updateMoney(value){
      firebase.database().ref(uid).update({
        gold: value
      });
    }

    async function updateTactics(used, slotId, heroId, avatar){
      if(!used){
        //DEFAULT
        firebase.database().ref(uid + "/tactics/" + slotId).update({
          avatar: "images/slotWindow.png",
          heroId: 0,
          used: used
        })
      }
      else {
        firebase.database().ref(uid + "/tactics/" + slotId).update({
          avatar: avatar,
          heroId: heroId,
          used: used
        })
      }
    }

   async function updateInventory(value){
      inventory = await getInventory();
      inventory.push(value);
      firebase.database().ref(uid + "/inventory").set(inventory);
    }

    async function removeFromInventory(value){
      inventory = await getInventory();
      var pos = inventory.indexOf(value);
      inventory.splice(pos,1);
      firebase.database().ref(uid + "/inventory").set(inventory);
    }

    async function heroTactics(heroId, slot, usedd){
      await firebase.database().ref(uid + "/ownedHeros/" + heroId).update({
        used: true
      })
      console.log("UZYWANY W TEAMIE");
    }
    
    async function unlockHero(id){
      var request = new XMLHttpRequest();
      //pobranie info z pliku json o danym bohaterze
      request.open("GET","json/hero.json", false);
      request.send(null);
      var herosInfo = JSON.parse(request.responseText);
      console.log(herosInfo[id]);
      //zapisanie w firebasie
      firebase.database().ref(uid + "/ownedHeros/" + id ).update(herosInfo[id]);
    }

    async function getTactics(){
      var tactics = [];
      await firebase.database().ref(uid + "/tactics").get().then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          tactics = snapshot.val();
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });

      return tactics;
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

      //tutaj wyjecie z info naszych bohaterow tylko ich id i wrzucenie do osobnej tablicy
      var ownedHerosId = [];
      for (var i = 0 ; i < 5; i ++){
        if(ownedHeros[i]){
          ownedHerosId.push(ownedHeros[i].id);
        }
      }
  
      console.log(ownedHerosId);
      return ownedHerosId;
    }

    async function getOwnedHero(heroId){
      var heroInfo = 0;
      await firebase.database().ref(uid + "/ownedHeros/" + heroId).get().then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          heroInfo = snapshot.val();
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
      
    return heroInfo;
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
          //console.log(snapshot.val());
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
        ownedHeros: {},
        tactics: [  {"slotId": 0, "x": 100, "y": 100, "avatar": "images/slotWindow.png", "used": false, "heroId": 0},
        {"slotId": 1, "x": 100, "y": 300, "avatar": "images/slotWindow.png", "used": false, "heroId": 0},
        {"slotId": 2, "x": 100, "y": 500, "avatar": "images/slotWindow.png", "used": false, "heroId": 0},
        {"slotId": 3, "x": 300, "y": 200, "avatar": "images/slotWindow.png", "used": false, "heroId": 0},
        {"slotId": 4, "x": 300, "y": 400, "avatar": "images/slotWindow.png", "used": false, "heroId": 0}]
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
    gameApp.getOwnedHero = getOwnedHero;
    gameApp.updateInventory = updateInventory;
    gameApp.removeFromInventory = removeFromInventory;
    gameApp.boostHero = boostHero;
    gameApp.heroTactics = heroTactics;
    gameApp.getTactics = getTactics;
    gameApp.updateTactics = updateTactics;
})()

