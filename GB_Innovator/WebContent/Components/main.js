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
	
	var status = validateItemForm1();
	
	if (status != true)
	{
	$("#alertError").text(status);
	$("#alertError").show();
	return;
	}
	
});

function validateItemForm1()
{
	
	if ($("#campTitle").val().trim() == "")
	{
		return "Please Insert Camp Title"
	}
	if ($("#category").val() == "0")
	{
		return "Select Category.";
	}
	if ($("#projectDetails").val().trim() == "" || $("#projectDetails").val().length() < 10)
	{
		return "Required minimun 10 words"
	}
	if ($('input[name="manage"]:checked').length === 0)
	{
		return "Select a Manage by Option";
	}
	if ($("#minGoal").val().trim() == "")
	{
		return "Please Set Campaign goal Amount"
	}
	if ($("#deadLine").val().trim() == "")
	{
		return "Please Select a deadline"
	}
	if ($('input[name="Agreement"]:checked').length === 0)
	{
		return "You must agree to out terms";
	}
	
	
	return true;
}

