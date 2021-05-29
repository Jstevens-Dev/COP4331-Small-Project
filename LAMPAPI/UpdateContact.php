<?php
	$inData = getRequestInfo();
	
	$firstName = $inData["firstname"];
	$lastName = $inData["lastname"];
	$email = $inData["email"];
	$phoneNO = $inData["phoneNO"];
	$contactID = $inData["contactID"];

	$conn = new mysqli("localhost", "Jstevens", "30Dhsaj&n", "COP4331");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("Update Contacts SET FirstName=?,LastName=?,Email=?,PhoneNo=? WHERE ContactID=?");
		$stmt->bind_param("sssss", $firstName, $lastName, $email, $phoneNO, $contactID);
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