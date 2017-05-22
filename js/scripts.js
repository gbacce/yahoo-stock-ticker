// 1. Make an AJAX request when the user submits the form. Include the user input in the AJAX request.
// 2. When the AJAX has a response (JSON), check to see if there was any valid data.
// 3. If there is valid data, load up the table with the data.


// 1. Give the user the ability to search for multiple symbols.
// 2. Multiple will return an array inside of quote. A single will return one object.




$(document).ready(function(){

	var userStockSavedIfAny = localStorage.getItem('lastSymbolSearched');
	console.log(userStockSavedIfAny);
	ajaxRequests = 0;


	$('.yahoo-finance-form').submit(function(){
		// Prevent the browser from submitting the form. JavaScript will handle everything.
		event.preventDefault();
		// Get whatever the user typed and stash it in a var
		var symbol = $('#symbol').val().toUpperCase();
		// Store symbol in local storage so it will last even after browser closes or changes pages.
		localStorage.setItem('lastSymbolSearched', symbol);

		var url = `http://query.yahooapis.com/v1/public/yql?q=env%20%27store://datatables.org/alltableswithkeys%27;select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22'${symbol}'%22)%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json`;
		// console.log(url);
		$.getJSON(url,(theDataJSFound)=>{
			// console.log(theDataJSFound);
			var stockInfo = theDataJSFound.query.results.quote
			console.log(stockInfo);


			updateTable = function() {

				// Create new HTML for table
				var newHTML = '';
				newHTML += '<tr>';
					newHTML += `<td>${stockInfo.Symbol}</td>`;
					newHTML += `<td>${stockInfo.Name}</td>`;
					newHTML += `<td>${stockInfo.Ask}</td>`;
					newHTML += `<td>${stockInfo.Bid}</td>`;
					newHTML += `<td>${stockInfo.Change}</td>`;
				newHTML += `</tr>`;


				// Update HTML inside table body
				if (ajaxRequests == 0) {
					$('#stock-ticker-body').html(newHTML);
				} else if (ajaxRequests > 0) {
					$('#stock-ticker-body').append(newHTML);
				}

				ajaxRequests += 1

			}

			updateTable();


		})
	});

	console.log("I'm the last line... but I'm not last, because JS is asynchronous!")
});

