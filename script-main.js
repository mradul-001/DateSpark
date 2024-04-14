var isLoggedIn = localStorage.getItem("isLoggedIn");
if (!isLoggedIn || isLoggedIn !== "true") {
  // Redirect to login page if not logged in
  window.location.href = "login.html";
} else {
  // Load main page content
  document.body.style.display = "block"; // Show the body content
}

let q_no = 0;
let data = [];
let max_comp_score = 0;
let max_comp_score_rollno = "";
let jsonFilePath = "student.json";

let q_array = [
  "What is your name?",
  "What is IITB Roll Number?",
  "What is your Year Of Study?",
  "What is your age?",
  "Enter your email: ",
  "Choose your gender: ",
  "Choose your interests: ",
  "Choose your hobbies: ",
];

let input_array = [
  `<input type='text' id='answer' required>`,

  `<input type='text' id='answer' required>`,

  `<select name="" id="answer" required>
                                  <option disabled selected hidden value="">Select</option>
                                  <option value="1">1st</option>
                                  <option value="2">2nd</option>
                                  <option value="3">3rd</option>
                                  <option value="4">4th</option>
                            </select>`,

  `<input type='text' id='answer' required>`,

  `<input type='email' id='answer' required>`,

  `                       <div class="gender">  
                            <label>
                                <input type="radio" name="gender" value="Male" required>
                                Male
                            </label><br>
                             <label>
                                <input type="radio" name="gender" value="Female">
                                Female
                            </label><br>
                            <label>
                                <input type="radio" name="gender" value="Other">
                                Other
                            </label>    
                        </div>`,

  `       <div class="option-container">
                        <div class="option">
                            <input type="checkbox" name="Travel" id="travel">
                            <label for="travel">Travelling</label>
                        </div>

                        <div class="option">
                            <input type="checkbox" name="Sports" id="sports">
                            <label for="sports">Sports</label>
                        </div>

                        <div class="option">
                            <input type="checkbox" name="Movies" id="movies">
                            <label for="movies">Movies</label>
                        </div>

                        <div class="option">
                            <input type="checkbox" name="Music" id="music">
                            <label for="music">Music</label>
                        </div>

                        <div class="option">
                            <input type="checkbox" name="Literature" id="literature">
                            <label for="literature">Literature</label>
                        </div>

                        <div class="option">
                            <input type="checkbox" name="Technology" id="technology">
                            <label for="technology">Technology</label>
                        </div>

                        <div class="option">
                            <input type="checkbox" name="Fashion" id="fashion">
                            <label for="fashion">Fashion</label>
                        </div>

                        <div class="option">
                            <input type="checkbox" name="Art" id="art">
                            <label for="art">Art</label>
                        </div>
                    </div>
`,
  `                    <div class="option-container2">

                                        <div class="option">

                                            <input type="checkbox" name="Reading" id="reading">
                                            <label for="reading">Reading</label>
                                        </div>

                                        <div class="option">

                                            <input type="checkbox" name="Cooking" id="cooking">
                                            <label for="cooking">Cooking</label>

                                        </div>


                                        <div class="option">

                                            <input type="checkbox" name="Coding" id="coding">
                                            <label for="coding">Coding</label>

                                        </div>

                                        <div class="option">

                                            <input type="checkbox" name="Gardening" id="gardening">
                                            <label for="gardening">Gardening</label>

                                        </div>

                                        <div class="option">

                                            <input type="checkbox" name="Painting" id="painting">
                                            <label for="painting">Painting</label>

                                        </div>

                                        <div class="option">

                                            <input type="checkbox" name="Photography" id="photography">
                                            <label for="photography">Photography</label>

                                        </div>

                                        <div class="option">

                                            <input type="checkbox" name="Watching Instagram / Youtube" id="youtube">
                                            <label for="youtube">Watching Instagram / Youtube</label>

                                        </div>

                                        <div class="option">

                                            <input type="checkbox" name="Playing Instruments" id="instruments">
                                            <label for="instruments">Playing Musical Instruments</label>

                                        </div>

                                </div>`,
];

document.getElementById("question").innerHTML =
  "<h2>" +
  (q_no + 1) +
  ".) " +
  q_array[q_no] +
  "</h2>" +
  input_array[q_no] +
  "<br><button onclick='nextQuestion()'>Next</button>";

function logout(){
  localStorage.clear();
  window.location.href = "index.html";
}


function fadeOut(element, duration, callback) {
  element.style.transition = `opacity ${duration}s ease-in-out`;
  element.style.opacity = 0;
  setTimeout(callback, duration * 1000);
}

function fadeIn(element, duration, callback) {
  element.style.transition = `opacity ${duration}s ease-in-out`;
  element.style.opacity = 1;
  setTimeout(callback, duration * 1000);
}

// Function to open a new tab and navigate to output.html
function openOutputPage() {
  const newTab = window.open("output.html", "_blank");
  if (newTab) {
    setTimeout(() => {
      newTab.focus();
    }, 500); // Delay to ensure the new tab is fully loaded before focusing
  } else {
    console.error("Failed to open new tab.");
  }
}

function submit() {
  var hobbies = [];
  var checkboxes = document.querySelectorAll(
    '.option-container2 input[type="checkbox"]'
  );
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      hobbies.push(checkbox.name);
    }
  });

  data.push(hobbies);

  let age_of_user = Number(data[3]);
  let gender_of_user = data[5];
  let interests_of_user = data[6];
  let hobbies_of_user = data[7];
  let interests_of_user_set = new Set(interests_of_user);
  let hobbies_of_user_set = new Set(hobbies_of_user);

  fetch(jsonFilePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((element) => {
        let age = Number(element.Age);
        let interests = element.Interests;
        let hobbies = element.Hobbies;
        let gender = element.Gender;
        let interest_set = new Set(interests);
        let hobbies_set = new Set(hobbies);

        let union_of_interests = new Set([
          ...interests_of_user_set,
          ...interest_set,
        ]);

        let intersection_of_interests = new Set(
          [...interests_of_user].filter((x) => interest_set.has(x))
        );

        let union_of_hobbies = new Set([
          ...hobbies_of_user_set,
          ...hobbies_set,
        ]);

        let intersection_of_hobbies = new Set(
          [...hobbies_of_user_set].filter((x) => hobbies_set.has(x))
        );

        if (gender != gender_of_user) {
          let age_factor =
            1 - Math.abs(age - age_of_user) / Math.max(age, age_of_user);
          let interest_factor =
            intersection_of_interests.size / union_of_interests.size;
          let hobbies_factor =
            intersection_of_hobbies.size / union_of_hobbies.size;
          let comp_score =
            0.3 * age_factor + 0.3 * interest_factor + 0.4 * hobbies_factor;

          if (
            comp_score > max_comp_score &&
            data[1] != element.IITB_Roll_Number
          ) {
            max_comp_score = comp_score;
            max_comp_score_rollno = element.IITB_Roll_Number;
          }
        }
      });

      data.forEach((element) => {
        if (element.IITB_Roll_Number == max_comp_score_rollno) {
          localStorage.setItem(
            "highestScoringStudent",
            JSON.stringify(element)
          );

          // Call the function to open the new tab after a delay of 2000 milliseconds
          // setTimeout(openOutputPage, 2000);
          openOutputPage();
        }
      });
    });
}

function nextQuestion() {
  q_no += 1;

  var question_box = document.getElementById("question");

  // Get the values of name, roll no, year of study, age and email
  if (q_no < 6) {
    var currentAnswer = document.getElementById("answer").value;
    data.push(currentAnswer);
  }

  // Get the value of gender
  if (q_no == 6) {
    var selectedGender = document.querySelector('input[name="gender"]:checked');
    if (selectedGender) {
      var genderValue = selectedGender.value;
      data.push(genderValue);
    } else {
    }
  }

  // Obtain the value of interests
  if (q_no == 7) {
    var interests = [];
    var checkboxes = document.querySelectorAll(
      '.option-container input[type="checkbox"]'
    );

    checkboxes.forEach(function (checkbox) {
      if (checkbox.checked) {
        interests.push(checkbox.name);
      }
    });

    data.push(interests);
  }

  // Obtain the value of hobbies in similar manner like I did for interests
  if (q_no == 8) {
    var hobbies = [];
    var checkboxes = document.querySelectorAll(
      '.option-container2 input[type="checkbox"]'
    );

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        hobbies.push(checkbox.name);
      }
    });

    data.push(hobbies);
  }

  // Change the question and give fading effect
  if (q_no < 7) {
    fadeOut(question_box, 0.5, function () {
      question_box.innerHTML =
        "<h2>" +
        (q_no + 1) +
        ".) " +
        q_array[q_no] +
        "</h2>" +
        input_array[q_no] +
        "<button onclick='nextQuestion()'>Next</button>";

      fadeIn(question_box, 0.5, function () {
        question_box.style.transition = ""; // Reset transition
      });
    });
  }

  if (q_no == 7) {
    fadeOut(question_box, 0.5, function () {
      question_box.innerHTML =
        "<h2>" +
        (q_no + 1) +
        ".) " +
        q_array[q_no] +
        "</h2>" +
        input_array[q_no] +
        "<button onclick='submit()'>Find Match!</button>";

      fadeIn(question_box, 0.5, function () {
        question_box.style.transition = ""; // Reset transition
      });
    });
  }
}
