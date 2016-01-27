$(function () {

    var Preloader = {
        'element_class': 'preload_ajax',
        'show': function () {
            var element = this.getElement();
            if (element == false) return false;
            element.fadeIn();
        },
        'hide': function () {
            var element = this.getElement();
            if (element == false) return false;
            if (element.is(':animated') == false)element.fadeOut(200);
            else setTimeout(function () {
                element.fadeOut(200);
            }, 300);
        },
        'getElement': function () {
            if (this.element_class == undefined || this.element_class == '') {
                alert('no prealoder class');
                return (false);
            }
            var element = $('.' + this.element_class);
            if (element.length < 1) {
                alert('No object with this class ' + this.element_class);
                return (false);
            }
            return element;
        }
    };

    $(document).on('click', '.edit_group, .add_group', function () {
        Preloader.show();

        var group = $(this).parents('.panel-group').data('group'),
            position = $(this).parents('.ba-roles__block').data('position');

        $('#groupOptions').find('.modal-body').empty();

        $.ajax({
            url: '/group-fields',
            data: {'position': position, 'group_id': group},
            type: "POST",
            success: function (data) {
                $('#groupOptions').find('.modal-body').html(data);
            }
        });
        Preloader.hide();
    });

    $(document).on('click', '.delete_group', function () {
        var group = $(this).parents('.panel-group').data('group'),
            position = $(this).parents('.ba-roles__block').data('position'),
            form = $('#confirm-delete').find('form');
        form.find('input[name="position"]').val(position);
        form.find('input[name="group_id"]').val(group);
    });

    $(document).on('submit', '.form_image', function (e) {
        e.preventDefault();

        var form = $(this),
            image = new FormData(this),
            group = form.data('group');

        if (form.find('input[type="file"]').val() == '') {
            form.find('.error').text('Please Add Image').show();

            setTimeout(function () {
                form.find('.error').empty().hide()
            }, 5000);
            return false;
        }

        Preloader.show();

        $.ajax({
            url: '/group-image',
            data: image,
            processData: false,
            contentType: false,
            type: "POST",
            success: function (data) {
                $('.' + group + '_group').find('.v-image').eq(form.find('.position').val()).add(form.find('.v-image')).html('<img src="' + data + '" alt="" />');

                form.find('.success').text('Image uploaded successfully').show();
                Preloader.hide();

                setTimeout(function () {
                    form.find('.success').empty().hide()
                }, 5000);

            }, error: function (data) {

                var errors = $.parseJSON(data.responseText);

                form.find('.error').text(errors.image[0]).show();
                Preloader.hide();

                setTimeout(function () {
                    form.find('.error').empty().hide()
                }, 5000);
            }
        });

    });

    $(document).on('click', '.modal button[type="submit"]', function () {
        $(this).parents('.modal').find('.modal-body form').eq(0).submit();
    });

    $(document).on('submit', '.modal-body .form_group', function (e) {
        e.preventDefault();
        var form = $(this),
            group = form.data('group');
        Preloader.show();

        $.ajax({
            url: '/' + group,
            data: $(this).serialize(),
            type: "POST",
            success: function () {
                location.reload();
            }, error: function (data) {
                Preloader.hide();
                var errors = $.parseJSON(data.responseText);
                console.log(data);
                $.each(errors, function (k, v) {
                    form.find('input[name="' + k + '"], select[name="' + k + '"]').addClass('error_input').attr('placeholder', v);
                });
            }
        });
    });

    $(document).on('click', '.mentor_list a', function(e){
        e.preventDefault();

        var type = $(this).data('type');  console.log(type);
        $.ajax({
            url: '/type',
            data: {type: type},
            type: "POST",
            success: function (data) {
               location.reload();
            }, error: function (data) {
                console.log(data);
            }

        });
    });

});