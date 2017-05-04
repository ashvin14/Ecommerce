$(document).ready(function(){
    $("#myBtn").click(function(){
        $("#myModal").modal();
    });
});
$('#myModal').on('shown.bs.modal', function () {
  $('input').focus()
})