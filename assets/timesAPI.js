
/*************************
 *
 *  GLOBALS
 *
 *************************/

/** @type {Array} [array of key:value pairs to hold user input] */
var inputData = [ {searchTerm  : ""},
                  {numArticles : ""},
                  {startYear   : "0"},
                  {endYear     : "0"} ];

/*
var inputObject = { searchTerm  : "",
                    numArticles : "",
                    startYear   : "",
                    endYear     : "" };
*/

// a flag for data validation. If false program will not query the API
var isDataValid = true;


/**************************
 *
 * FUNCTION DECLARAIONS
 *
 **************************/


/** FUNCTION DEC:
    [sets event handlers for buttons and form fields] */
function articleSearchFunc() {

  $(".container").on("click","#search-button",getArticlesFunc);
  $(".container").on("click","#button-clear",clearDataFunc);
  $(".container").on("click","#search-term",resetField);
  $(".container").on("click","#start-year",resetField);
  $(".container").on("click","#end-year",resetField);

}


/** FUNCTION DEC:
    [validate a year to make sure it is a number and is 4 digits] */
function isYearValidFunc($jqSelector,year) {
  if ((((parseInt(year)).toString()).length != 4) || (year.length > 4)) {
      isDataValid = false;
      $jqSelector.css("background-color","#FFA8A8");
      $jqSelector.val(year+" <-- invalid input, please use YYYY format");
  }
}

/** FUNCTION DEC:
    [resets the form field to blank and white when user clicks in the field.] */
function resetField() {
  $(this).val("");
  $(this).css("background-color","#FFFFFF");
}


/** FUNCTION DEC:
    [fetches the data from the form and organizes it into an array of key:value pairs] */
function grabDataFunc() {
  // validate to make sure user at least entered a search term
  var reqTerm = $("#search-term").val().trim();
  if (reqTerm === "") {
      isDataValid = false;
      $("#search-term").css("background-color","#FFA8A8");
      $("#search-term").val("* This field is required *");
  }
  // get the search term
  inputData[0].searchTerm = reqTerm;
  // get the number of records to return
  inputData[1].numArticles = $("#num-records-select").val();

  //----- Handle Year Collection and Validation-----
  // create variables for start year & end year to make conditionals more readable
  var beginYearId = $("#start-year");
  var endYearId = $("#end-year");
  var inputStartYear = $("#start-year").val().trim();
  var inputEndYear = $("#end-year").val().trim();

  // check start & end year to see if user entered anything, default is zero if they didn't
  if (inputStartYear != "") {
    // validate year to make sure it isn't too short or too long
    isYearValidFunc(beginYearId,inputStartYear);
    console.log("blank end year "+inputEndYear);
    console.log("blank start year"+inputStartYear);
    // below will only run if isYearValidFunc doesn't make isDataValid false
    if(isDataValid===true) {
        $("#start-year").val(inputStartYear);
        inputData[2].startYear = inputStartYear;
        // append 0101 for Jan 1
        inputData[2].startYear+="0101";
      }
  }
  if (inputEndYear != "") {
    // validate year to make sure it isn't too short or too long
    isYearValidFunc(endYearId,inputEndYear);
    // below will only run if isYearValidFunc doesn't make isDataValid false
    if (isDataValid===true) {
      $("#end-year").val(inputEndYear);
      inputData[3].endYear = inputEndYear;
      // append 1231 for Dec 31
      inputData[3].endYear+="1231";
    }
  }
  // just for testing
  console.log(inputData);
}


/** FUNCTION DEC:
    [clears data in the form fields when the clear button is clicked] */
function clearDataFunc() {
  $(".panel").find("input").val("");
}

/** FUNCTION DEC:
    [uses the inputData array to create a query url and present results to the DOM] */
function getArticlesFunc(){
  // reset isDataValid to true in case user corrected a mistake and clicked submit again
  isDataValid = true;
  // grab data from the form
  grabDataFunc();
  // check to see if data validation above was successful
  if (isDataValid) {
    // get the articles and display...
    console.log("ready to post articles");
  } else {
    // don't fetch articles if data validation unsuccessful
    console.log("not ready to post articles");
  }

}



/********************************************
*
*  CALL ONE FUNCTION AFTER THE DOCUMENT LOADS
*
*********************************************/
$(document).ready(function() {

// triggers event listeners and all logic that follows
articleSearchFunc();


});
