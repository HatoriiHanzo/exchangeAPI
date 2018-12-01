document.getElementById('date').max = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];
  
  let select = document.getElementById("currency"),
        arr = ["EUR", "USD", "GBP", "AUD", "CAD", "JPY"];

    for (let i = 0; i < arr.length; i++){
      let option = document.createElement("OPTION"),
      txt = document.createTextNode(arr[i]);
      option.appendChild(txt);
      option.setAttribute("value",arr[i]);
      select.insertBefore(option,select.lastChild);
    };


document.getElementById("button").addEventListener('click',getRate);


function getRate(){

  let date = document.getElementById("date").value;
  let currency = document.getElementById("currency").value

  fetch('https://api.exchangeratesapi.io/' + date + '?base=' + currency)
  .then((res) => res.json())
  .then((data) =>{
    let table = document.getElementById('table');
    table.innerHTML = "<tr><th onclick="+"sortTable(0)"+">currency &varr;</th><th>buy</th><th>sell</th></tr>";
    for( let x in data.rates){
      let newRow = table.insertRow(-1);
      let cell = newRow.insertCell(-1);
      let cell2 = newRow.insertCell(-1);
      let cell3 = newRow.insertCell(-1);
      cell.innerHTML = Object(x);
      cell2.innerHTML = Object(data.rates[x] * 0.95).toFixed(4);
      cell3.innerHTML = Object(data.rates[x] * 1.05).toFixed(4);
      
      let cells = document.getElementById("table").getElementsByTagName("td");
      for (var i = 0; i < cells.length; i++) {
          if (cells[i].innerHTML == "EUR") {
              cells[i].parentNode.style.color = "red";
          }
          if (cells[i].innerHTML == "USD") {
              cells[i].parentNode.style.color = "red";
          }
          if (cells[i].innerHTML == "GBP") {
              cells[i].parentNode.style.color = "red";
          }
          if (cells[i].innerHTML == "AUD") {
              cells[i].parentNode.style.color = "red";
          }
          if (cells[i].innerHTML == "CAD") {
              cells[i].parentNode.style.color = "red";
          }
          if (cells[i].innerHTML == "JPY") {
              cells[i].parentNode.style.color = "red";
          }
      }
    }
  });
}

function sortTable(n) {
  console.log('click')
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("table");
  switching = true;
  dir = "asc"; 
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++; 
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}