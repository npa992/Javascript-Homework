// from data.js
var tableData = data;

// Create a function that will create an html table based on the data passed into it
function createTable(data) {
  var tbody = d3.select("tbody");
  data.forEach(x => {
    tbody.append("tr");
    Object.entries(x).forEach(([key, value]) => {
      var cell = tbody.append("td");
      cell.text(value);
    });
  });
}

//Pass the whole dataset into a table with our createTable function
createTable(tableData);


  //Select the buttons and input field in order to allow filtered results
var button = d3.select('#filter-btn')


button.on('click', function() {
  d3.event.preventDefault();

    //grab the value entered in the input box
  var inputField = d3.select('#datetime')
  var inputValue = inputField.property('value');

    // filter the data based on the date entered in the input box
  var filteredData = tableData.filter(x => x.datetime == inputValue);


    //remove the previous data entered into the table
  d3.select('tbody').remove();
  d3.select('table').append('tbody')

    //Use the createTable function to generate a data for the filtered data
  createTable(filteredData)
    
})

//optional multi-level filtering

button.on('click', function() {
  d3.event.preventDefault();

  // define the input variable and grab their values
  var inputDate = d3.select('#datetime').property('value')
  var inputCity = d3.select('#city').property('value')
  var inputState = d3.select('#state').property('value')
  var inputCountry = d3.select('#country').property('value')
  var inputShape = d3.select('#shape').property('value')

  // create a dictionary from the input values so that we can use them for our filter function
  var filter = {datetime:inputDate, city: inputCity, state: inputState, country: inputCountry, shape:inputShape}

  // remove null values not entered
  Object.keys(filter).forEach((key) => (filter[key] == "") && delete filter[key]);

  //This will filter through the tableData based on multiple criterion
  var filterData=tableData.filter(function(item) {
    for (var key in filter) {
      if (filter[key] != item[key]){
        return false
      } return true
    }
  });

  //remove existing table so that we can add filtered data
  d3.select('tbody').remove();
  d3.select('table').append('tbody');

  //use the function to create the data for the filtered table
  createTable(filterData)

})



// var filterData= tableData.filter(x => {
//   Object.entries(filter).forEach(([key, value]) => {
//     if (value == null) {
//       return;
//     } else if (x.key != value) {
//       return false;
//     } else {return true}
//   })
// });