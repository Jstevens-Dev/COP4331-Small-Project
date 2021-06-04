var urlBase = 'http://cop4331-8.com/LAMPAPI';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
//	var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";

//	var jsonPayload = '{"username" : "' + login + '", "password" : "' + hash + '"}';
	var jsonPayload = '{"username" : "' + login + '", "password" : "' + password + '"}';
	var url = urlBase + '/Login.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				var jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
		
				if( userId < 1 )
				{		
					document.getElementById("loginResult").innerHTML = "Username/Password incorrect";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();
	
				window.location.href = "index.html";
				
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	var data = document.cookie;
	var splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "Login.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "Login.html";
}

function addUser()
{
	var firstName = document.getElementById("firstName").value;
	var lastName = document.getElementById("lastName").value;
	var userName = document.getElementById("userName").value;
	var password = document.getElementById("password").value;
	document.getElementById("addUserResult").innerHTML = "";
	
	var jsonPayload = '{"firstname" : "' + firstName + '", "lastname" : "' + lastName + '", "username" : "' + userName + '", "password" : "' + password + '"}';
	var url = urlBase + '/Register.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("addUserResult").innerHTML = "User has been added";
			}
		};
		xhr.send(jsonPayload);

		window.location.href = "Login.html";
	}
	catch(err)
	{
		document.getElementById("addUserResult").innerHTML = err.message;
	}
	
}

function addContact()
{
	var firstName = document.getElementById("newContactFirstName").value;
	var lastName = document.getElementById("newContactLastName").value;
	var email = document.getElementById("newContactEmail").value;
	var phoneNO = document.getElementById("newContactPhoneNO").value;
	document.getElementById("addContactResult").innerHTML = "";
	
	var jsonPayload = '{"firstname" : "' + firstName + '", "lastname" : "' + lastName + '", "email" : "' + email + '", "phoneNO" : "' + phoneNO + '", "userID" : ' + userId + '}';
	var url = urlBase + '/AddContact.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("addContactResult").innerHTML = "Contact has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("addContactResult").innerHTML = err.message;
	}
	
}

function displayAllContacts(){
    var jsonPayload = '{"userId : ' + userId + '}';
    var url = urlBase + '/ReadContact' + extension;

    var contactList ="";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try{
        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                for(var i=0; i<jsonObject.results.length; i++){
                    contactList += jsonObject.results[i];
                    if(I , jsonObject.results.length-1){
                        contactList += "<br />\r\n";
                    }
                }

                document.getElementsByTagName("p")[0].innerHTML = contactList;
            }
        }
        xhr.send(jsonPayload);
    }
    catch(err){
        document.getElementById("showContactResult").innerHTML = err.message;
    }
}

function searchContact()
{
	var search = document.getElementById("searchText").value;
	document.getElementById("contactSearchResult").innerHTML = "";
	
	var contactList = "";
	var contactTable = document.getElementById("contactTable");
	
    var jsonPayload = '{"search" : "' + search + '", "userID" : ' + userId + '}';
	var url = urlBase + '/SearchContact.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				var table = document.getElementById("contactTable");
				
				while(table.rows.length > 1) {
					table.deleteRow(table.rows.length - 1);
				}
				
				document.getElementById("contactSearchResult").innerHTML = "Contact(s) has been retrieved";
				var jsonObject = JSON.parse( xhr.responseText );
				
				for( var i=0; i<jsonObject.results.length; i++ )
				{
					var newRow = table.insertRow(table.rows.length);
					var cell = newRow.insertCell(0);
					
					cell.innerHTML = jsonObject.results[i].firstname;
					cell = newRow.insertCell(1);
					cell.innerHTML = jsonObject.results[i].lastname;
					cell = newRow.insertCell(2);
					cell.innerHTML = jsonObject.results[i].email;
					cell = newRow.insertCell(3);
					cell.innerHTML = jsonObject.results[i].phoneNO;
					cell = newRow.insertCell(4);
					// ', ' + jsonObject.results[i].firstname + ', ' + jsonObject.results[i].lastname + ', ' + jsonObject.results[i].email + ', ' + jsonObject.results[i].phoneNO + 
					cell.innerHTML = '<button type="button" id="updateContactButton" onclick="openForm(' + jsonObject.results[i].contactID + ')">Edit</button>';
					cell = newRow.insertCell(5);
					cell.innerHTML = '<button id="deleteContactButton" onclick="deleteContact(' + (i + 1) + ', ' + jsonObject.results[i].contactID + ')">Delete</button>';
				}
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
	
}

function deleteContact( rowIndex, contactID )
{
	var table = document.getElementById("contactTable");
	
	var jsonPayload = '{"contactID" : ' + contactID + '}';
	var url = urlBase + '/DeleteContact.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	
	xhr.send(jsonPayload);

	table.deleteRow(rowIndex);
}

function updateContact()
{


}

function addColor()
{
	var newColor = document.getElementById("colorText").value;
	document.getElementById("colorAddResult").innerHTML = "";
	
	var jsonPayload = '{"color" : "' + newColor + '", "userId" : ' + userId + '}';
	var url = urlBase + '/AddColor.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorAddResult").innerHTML = "Color has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorAddResult").innerHTML = err.message;
	}
	
}

function searchColor()
{
	var srch = document.getElementById("searchText").value;
	document.getElementById("colorSearchResult").innerHTML = "";
	
	var colorList = "";
	
	var jsonPayload = '{"search" : "' + srch + '","userId" : ' + userId + '}';
	var url = urlBase + '/SearchColors.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
				var jsonObject = JSON.parse( xhr.responseText );
				
				for( var i=0; i<jsonObject.results.length; i++ )
				{
					colorList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						colorList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = colorList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorSearchResult").innerHTML = err.message;
	}
	
}

// , firstname, lastname, email, phoneNO
function openForm( contactID ){
	document.getElementById("contactInfo").style.display = "block";
	document.getElementById("newContact").style.display="none";
	//document.getElementById("firstNameUpdate") = firstname;
	//document.getElementById("lastNameUpdate") = lastname;
	//document.getElementById("emailUpdate") = email;
	//document.getElementById("phoneUpdate") = phoneNO;
}

function closeForm(){
	document.getElementById("contactInfo").style.display = "none";
}

function openNewForm(){
	document.getElementById("newContact").style.display="block";
}

function closeNewForm(){
	document.getElementById("newContact").style.display="none";
	document.getElementById("contactInfo").style.display = "none";
} 
