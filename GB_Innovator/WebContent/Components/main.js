$(document).ready(function()
{
		$("#alertSuccess").hide();
		$("#alertError").hide();
});

$(document).on("click", "#btnSave", function(event)
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
	
	//If form is valid
	var type = ($("#hidItemIDSave").val() == "") ? "POST" : "PUT";
	
	$.ajax(
			{ 
			 url : "InnovatorAPI", 
			 type : type, 
			 data : $("#formInnv").serialize(), 
			 dataType : "text", 
			 complete : function(response, status) 
			 { 
			 onItemSaveComplete(response.responseText, status); 
			 } 
			});
	
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

function onItemSaveComplete(response, status)
{ 
		if (status == "success") 
		 { 
		 var resultSet = JSON.parse(response); 
		 
			 if (resultSet.status.trim() == "success") 
			 { 
			 
				 $("#alertSuccess").text("Successfully saved."); 
			 
				 $("#alertSuccess").show(); 
			 
				 $("#divItemsGrid").html(resultSet.data); 
			 } else if (resultSet.status.trim() == "error") 
			 { 
			 
				 $("#alertError").text(resultSet.data); 
			 
				 $("#alertError").show(); 
			 } 
			 } else if (status == "error") 
			 { 
			
				 $("#alertError").text("Error while saving."); 
			
				 $("#alertError").show(); 
			 } else
			 { 
			
				 $("#alertError").text("Unknown error while saving.."); 
			 
				 $("#alertError").show(); 
			 } 
		$("#hidItemIDSave").val(""); 
		$("#formInnv")[0].reset(); 
}

$(document).on("click", ".btnUpdate", function(event)
		{ 
		 $("#hidItemIDSave").val($(this).data("itemid")); 
		 $("#campTitle").val($(this).closest("tr").find('td:eq(0)').text()); 
		 $("#category").val($(this).closest("tr").find('td:eq(1)').text()); 
		 $("#projectDetails").val($(this).closest("tr").find('td:eq(2)').text()); 
		 $("#manage").val($(this).closest("tr").find('td:eq(3)').text()); 
		 $("#inReward").val($(this).closest("tr").find('td:eq(4)').text()); 
		 $("#minGoal").val($(this).closest("tr").find('td:eq(5)').text()); 
		 $("#deadLine").val($(this).closest("tr").find('td:eq(6)').text()); 
		});

$(document).on("click", ".btnRemove", function(event)
		{ 
		 $.ajax( 
		 { 
		 url : "InnovatorAPI", 
		 type : "DELETE", 
		 data : "itemID=" + $(this).data("itemid"),
		 dataType : "text", 
		 complete : function(response, status) 
		 { 
		 onItemDeleteComplete(response.responseText, status); 
		 } 
		 }); 
		});

function onItemDeleteComplete(response, status)
{ 
	 if (status == "success") 
	 { 
	 
		 var resultSet = JSON.parse(response); 
	 
		 if (resultSet.status.trim() == "success") 
		 { 
			 $("#alertSuccess").text("Successfully deleted."); 
			 $("#alertSuccess").show(); 
			 $("#divItemsGrid").html(resultSet.data); 
			 
		 } else if (resultSet.status.trim() == "error") 
		 { 
			 $("#alertError").text(resultSet.data); 
			 $("#alertError").show(); 
		 } 
		 
		 } else if (status == "error") 
		 { 
			 $("#alertError").text("Error while deleting."); 
			 $("#alertError").show(); 
		 } else
		 { 
			 $("#alertError").text("Unknown error while deleting.."); 
			 $("#alertError").show(); 
		 } 

}

