
<?php

$inData = getRequestInfo();

$id = 0;
$firstName = "";
$lastName = "";

$conn = new mysqli("localhost", "Jstevens", "30Dhsaj&n", "COP4331"); 	
if( $conn->connect_error )
{
	returnWithError( $conn->connect_error );
}
else
{
	$stmt = $conn->prepare("SELECT UserID,FirstName,LastName FROM Users WHERE UserName=? AND Password =?");
	if (is_null($stmt)){
		returnWithError( "stmt is null." );
	} else {
		$stmt->bind_param("ss", $inData["username"], $inData["password"]);
	}
	$stmt->bind_param("ss", $inData["username"], $inData["password"]);
	$stmt->execute();
	$result = $stmt->get_result();

	if( $row = $result->fetch_assoc()  )
	{
		returnWithInfo( $row['FirstName'], $row['LastName'], $row['UserID'] );
	}
	else
	{
		returnWithError("No Records Found");
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

function returnWithInfo( $firstName, $lastName, $id )
{
	$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
	sendResultInfoAsJson( $retValue );
}

?>
