
// custom select initialization
if(typeof jQuery.fn.customSelect === 'function'){
	jQuery('.sign-upform .custom-select').customSelect({
		selectStructure: '<div class="selectArea"><div class="left">Show</div><div class="center"><span></span></div><a href="#" class="selectButton"><i class="ico"> </i></a><div class="disabled"></div></div>',
		selectText: '.center span',
		onInit: function(ui){
			ui.fakeSelect.find('.left').text(ui.select.getAttribute('data-option'));
			if (jQuery(ui.select).find('option[selected]').length) {
				ui.fakeSelect.find('.center').removeClass('hide');
			} else {
				ui.fakeSelect.find('.center').addClass('hide');
			}
		},
		onChange: function(event, ui){
			if (jQuery(ui.select).find('option[selected]').length) {
				ui.fakeSelect.find('.center').removeClass('hide');
			} else {
				ui.fakeSelect.find('.center').addClass('hide');
			}
		},
		updateOnResize: true
	});

	jQuery('.contact-form select, .quote select').not('[data-option]').customSelect({
		selectStructure: '<div class="selectArea"><div class="left"></div><div class="center"></div><a href="#" class="selectButton"><i class="ico"> </i></a><div class="disabled"></div></div>',
		defaultText: function(select){
			return select.getAttribute('data-placeholder');
		},
		updateOnResize: true
	});
}