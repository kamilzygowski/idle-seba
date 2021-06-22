(function(){
    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    console.log("siemanko");
    var redirection_page = '';
    var uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {

            var isNewUser = authResult.additionalUserInfo.isNewUser;

            console.log(isNewUser);

            redirection_page = isNewUser ? 'create_character.html' : 'game.html'; 

            console.log(redirection_page);

            window.location.replace(redirection_page);
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return false;
          },
          uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            //document.getElementById('loader').style.display = 'none';
          }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          //firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          //firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: 'html/politics/terms_of_service.html',
        // Privacy policy url.
        privacyPolicyUrl: 'html/politics/privacy_policy.html'
      };

      // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig);       
})()

