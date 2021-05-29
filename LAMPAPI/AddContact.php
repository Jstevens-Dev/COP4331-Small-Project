<?php
	$inData = getRequestInfo();
	
	$contactID = null;
	$firstName = $inData["firstname"];
	$lastName = $inData["lastname"];
	$email = $inData["email"];
	$phoneNO = $inData["phoneNO"];
	$userID = $inData["userID"];

	$conn = new mysqli("localhost", "Jstevens", "30Dhsaj&n", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT INTO Contacts (ContactID,FirstName,LastName,Email,PhoneNo,UserID) VALUES(?,?,?,?,?,?)");
		$stmt->bind_param("ssssss", $contactID, $firstName, $lastName, $email, $phoneNO, $userID);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>