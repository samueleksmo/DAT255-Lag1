$(document).ready(function() {
	$('.deletePortcall').on('click', deletePortcall);
});

function deletePortcall(){
	var confirmation = confirm('Are you sure?');

	if(confirmation){
		
		$.ajax({
			type:'DELETE',
			url:'/' + $(this).data('id')
		}).done(function(response){
			window.location.replace('/');
		});
		window.location.replace('/');
	} else {
		return false;
	}
}