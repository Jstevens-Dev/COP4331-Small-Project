<?php

	$inData = getRequestInfo();
	
	$searchResults = "";
	$searchCount = 0;

	$conn = new mysqli("localhost", "Jstevens", "30Dhsaj&n", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("SELECT ContactID,FirstName,LastName,Email,PhoneNO FROM Contacts WHERE (((FirstName LIKE ? OR LastName LIKE ?) OR Email LIKE ?) OR PhoneNO LIKE ?) AND UserID = ?");
		$firstName = "%" . $inData["search"] . "%";
		$lastName = "%" . $inData["search"] . "%";
		$email = "%" . $inData["search"] . "%";
		$phoneNO = "%" . $inData["search"] . "%";
		$userID = $inData["userID"];
		$stmt->bind_param("sssss", $firstName, $lastName, $email, $phoneNO, $userID);
		$stmt->execute();	
		$result = $stmt->get_result();
		
		while($row = $result->fetch_assoc())
		{
			if( $searchCount > 0 )
			{
				$searchResults .= ",";
			}
			$searchCount++;
			$searchResults .= '{"contactID" : "' . $row["ContactID"] . '", "firstname" : "' . $row["FirstName"] . '", "lastname" : "' . $row["LastName"] . '", "email" : "' . $row["Email"] . '", "phoneNO" : "' . $row["PhoneNO"] . '"}';
		}
		
		if( $searchCount == 0 )
		{
			returnWithError( "No Records Found" );
		}
		else
		{
			returnWithInfo( $searchResults );
		}
		
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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults )
	{
		//$retValue = json_encode($searchResults);
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>