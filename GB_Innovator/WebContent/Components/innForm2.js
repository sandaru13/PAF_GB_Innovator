$(document).ready(function()
{
		$("#alertSuccess").hide();
		$("#alertError").hide();
});

$(document).on("click", "#btnSubmit", function(event)
{
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();
	
	var status = validateItemForm2();
	
	if (status != true)
	{
	$("#alertError").text(status);
	$("#alertError").show();
	return;
	}
	
});

function validateItemForm2()
{
	
	if ($("#nationality").val().trim() == "")
	{
		return "Please insert your nationality"
	}
	
	if ($("#getPass").val().trim() == "")
	{
		return "Please Inset your passport number"
	}


	if ($("#getbank").val().trim() == "")
	{
		return "Please insert your bank Name"
	}
	
	if ($("#bankNumber").val().trim() == "")
	{
		return "Please provide your Account Number"
	}
	
	if ($("#address").val().trim() == "")
	{
		return "Please provide your home address"
	}
	
	if ($("#contacNumber").val().trim() == "" || $("#contacNumber").val().length() != 10)
	{
		return "Please provide a valid Contact Number"
	}
	
	return true;
}