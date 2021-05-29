<?php

	$inData = getRequestInfo();
	
	$id = 0;
	$firstName = "";
	$lastName = "";
	$userName = "";
	$password = "";

	$conn = new mysqli("localhost", "Jstevens", "30Dhsaj&n", "COP4331"); 	
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("INSERT INTO Users (UserID,FirstName,LastName,UserName,Password) VALUES (?,?,?,?,?)");
		if (is_null($stmt)){
			returnWithError( "stmt is null." );
		} else {
			$user_id = null;
			$stmt->bind_param("sssss", $user_id, $inData["firstname"], $inData["lastname"], $inData["username"], $inData["password"]);
		}
		$stmt->execute();

		$stmt->close();
		$conn->close();
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
		$retValue = '{"id":0,"firstName":"","lastName":"","userName":"","password":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","userName":"' . $userName . '","password":"' . $password . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>