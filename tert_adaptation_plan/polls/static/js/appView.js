define(['appView'], function(appView) {

    const Root = Marionette.ItemView.extend({

        tagName: 'h1',
        className: 'h3',
        template: _.template('Hello World'),

    });
    const root = new Root();
    root.render();
    $('#app').html(root.$el);


    const Logo = Marionette.ItemView.extend({
		template: _.template($('#logo').html()),
	});
	const logo = new Logo();
	logo.render();
	$('#logo').html(logo.$el);

	const Form = Marionette.ItemView.extend({
		template: _.template($('#form').html()),
	});
	const form = new Form();
	form.render();
	$('#form').html(form.$el);

})



