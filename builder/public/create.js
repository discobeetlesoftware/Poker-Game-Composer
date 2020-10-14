// function loadSection() {
// 	$.load('/create/section')
// 	$.ajax({
// 		dataType: 'html',
// 		url: '/create/section',
// 		success: function(result, status, jqxhr) {

// 		}
// 	});
// }

function appendSection() {
	var path = '/create/section/' + $('#sections_container ol li').length;
	$.get(path, function(result) { 
		$('#sections_container ol').append(result); 
	});
}

function appendSectionElement(id) {
	var elementsKey = '#section_' + id + ' .elements';
	var path = '/create/section/' + id + '/element/' + $(elementsKey + ' div').length;
	$.get(path, function(result) {
		$(elementsKey).append(result);
	});
}