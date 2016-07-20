
$('.load').on('click', function() {
	var button = $(this);
	button.addClass('loading');
	var data, container = $('.container');
	window.setTimeout(function() {
		$.get('http://jsonplaceholder.typicode.com/posts/')
			.success(function(posts){
				data = posts;
				for (var i = 0; i < posts.length; ++i) {
					container.append('<div>' + posts[i].title + '</div>');
				}
			})
			.error(function(){})
			.always(function(){
				button.removeClass('loading');
			})
	})
})