
const http = require('http')  
const url = require('url')  
const port = 3000

var html_file = `
<!DOCTYPE html>
<html>
<head>
	<title>BookKarts</title>
	<style>
	/* spacing */

table {
  table-layout: fixed;
  width: 60%;
  font-size:20px;
  font-color:white;
  border-collapse: collapse;
  border: 2px solid black;
  background: linear-gradient(to bottom, rgba(.2,0.2,0.2,0.2), rgba(.4,.4,.4,.4));
}
body {
    position: relative;
}

	</style>
<!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"> -->
 <meta name="viewport" content="width=device-width, initial-scale=1">
	<script type="text/javascript">
		function searchBooks()
		{
			var term = document.getElementById("searchBox").value;
			if(term=='')
				alert("Please enter a search term");
			else
			{
				var xhr = new XMLHttpRequest();
				xhr.open("get","/search?name="+term,true);
				xhr.onreadystatechange = renderResponse;
				xhr.send();
			}			
		}
		function renderResponse()
		{
		body=document.getElementById('body');
			if(this.status == 200 && this.readyState == 4)
			{
				var books = JSON.parse(this.response)['books'];
				if(books.length == 0)
				{
					var div = document.createElement("div");
					div.innerHTML = "Sorry! Your search query returned no results";
					document.body.appendChild(div);
				}
				else
				{
					var table = document.createElement("table");
					table.setAttribute("class","table-striped");
					var row = document.createElement("tr");
					var heading = document.createElement("td");
					heading.innerHTML = "Name";
					row.appendChild(heading);
					heading = document.createElement("td");
					heading.innerHTML = "Category";
					row.appendChild(heading);
					heading = document.createElement("td");
					heading.innerHTML = "Price";
					row.appendChild(heading);
					table.appendChild(row);
					body.appendChild(table);
					for(var i = 0;i<books.length;i++)
					{
						book = books[i];
						row = document.createElement("tr");
						var name = document.createElement("td");
						name.innerHTML = book['name'];
						var category = document.createElement("td");
						category.innerHTML = book['category'];
						var price = document.createElement("td");
						price.innerHTML = book['price'];
						row.appendChild(name);
						row.appendChild(category);
						row.appendChild(price);
						table.appendChild(row);
					}
				}
			}
		}
	</script>
</head>
<body>
	<div id ="container" style="position: absolute; top: 100px; left: 15%; color:grey;">
	<div class="navbar-header">
	<h1 class="text-uppercase">Welcome to BookKarts</h1>
	</div>
	<br/><br/><hr/>
	<div style="position: relative;top:24px; left: 60px;">
	<input type="text" class="form-control,col-sm-8" id="searchBox" placeholder="Search BookKarts.com">
	<br/><br/>
	<button type="button" class="btn-primary" onclick="searchBooks()">Search</button>
	<div id="books"></div>
	</div>
	<div id='body' style="position: relative; top:60px; left: 240px;"  >
	</div>
	</div>
</body>
</html>
`
var books_arr = ["v1", "v2"]

const requestHandler = (request, response) => {  
	var url_props = url.parse(request.url, true)

	if(request.method == 'GET' && url_props.pathname == '/') {	
		console.log(request.url)
		response.end("<h1>BookKarts Home</h1>")
	}

	if(request.method == 'GET' && url_props.pathname == '/find') {	
		console.log(request.url)
		response.end(html_file)
	}

	if(request.method == 'GET' && url_props.pathname == '/search') {	
		console.log(request.url)
		//TODO logic to search for a book from DB
		//response.end();
	}

	if(request.method == 'GET' && url_props.pathname == '/addbook') {
		console.log(request.url)
		//TODO logic to add a book to DB
		//response.end();
	}
}
const server = http.createServer(requestHandler)

server.listen(port, (err) => {  
  	if (err) {
   		return console.log('something bad happened', err)
  	}
  	console.log('server is listening on ' + port)
})

