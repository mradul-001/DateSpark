let tab1 = document.getElementById("cont");
let tab2 = document.getElementById("cont2");
let tab3 = document.getElementById("cont3");
let tab4 = document.getElementById("cont4");

var jsonFilePath = "login.json";

function login() {
  let entered_username = document.getElementById("username").value;
  let entered_password = document.getElementById("password").value;

  fetch(jsonFilePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      let user_found = false;

      data.forEach((element) => {
        if (element.username == entered_username) {
          user_found = true;

          if (element.password == entered_password) {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = "main.html";
          } else {
            alert("Wrong Password");
          }
        }
      });

      if (user_found == false) {
        alert("User not found");
      }
    });
}

function check1() {
  tab1.style.display = "none";
  tab2.style.display = "block";
}

function check2() {
  let forget_username = document.getElementById("cont2_username").value;

  fetch(jsonFilePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      let user_found = false;
      data.forEach((element) => {
        if (forget_username == element.username) {
          user_found = true;
          document.getElementById("secret-question").innerHTML =
            element.secret_question;
          tab2.style.display = "none";
          tab3.style.display = "block";
        }
      });
      if (user_found == false) {
        alert("User not found");
      }
    });
}

function check3() {
  let entered_secret_answer = document.getElementById("secret-answer").value;
  let forget_username = document.getElementById("cont2_username").value;
  fetch(jsonFilePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
        data.forEach((element) => {
            if(element.username == forget_username){
                if(element.secret_answer == entered_secret_answer){
                    tab3.style.display = "none";
                    tab4.style.display = "block";
                    tab4.innerHTML = "<p>Your Password Is <p class = 'password_showing_text'>" + element.password + "</p></p><br><button class='jn-btn'><a href='login.html'>Login Again</a></button>";
                }
                else{
                    console.log('hut');
                }
            }
        })
    });
}
