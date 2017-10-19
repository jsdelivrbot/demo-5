$(function() {
	$('#example').DataTable({
		"ordering": false,
		"searching": false,
		"lengthChange": false,
		"scrollCollapse": false,
		"language": {
			"emptyTable": "没有找到相关信息",
			"zeroRecords": "没有找到相关信息",
			"paginate": {
				"previous": "<",
				"next": ">"
			},
			"info": "共_PAGES_页"
		},
		"ajax": "../json/data.json",
		"columns": [{
			"data": "name"
		}, {
			"data": "position"
		}, {
			"data": "office"
		}, {
			"data": "extn"
		},{
			"data": "position"
		}, {
			"data": "office"
		}]
	});
});