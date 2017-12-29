$(function() {
    var old_money = 0;
    var old_account = 0;
    $("#box_line3 input").bind('click', function() {
        if ( $(this).val() == 'update') {
            $(this).parents("table").find('input').removeAttr('readonly');
        }
    });
    $("#box_line3 input").focusin(function() {
        if ( Number.isFinite(Number($(this).val())) ) {
            old_money = $(this).val();
        }
        if ( $(this).attr("id") == 'payment') {
            old_account = $(this).val();
        }
    });
    $("#box_line3 input").focusout(function() {
        if ( $(this).val() < 0 ) {
            $(this).css('color', 'red');
        } else {
            $(this).css('color', 'black');
        }
    });


    $("#box_line3 form").on('submit', function(e) {
        e.preventDefault();
        var data_v = $(this).serializeArray();

        $.post({
            url: '/ajax_post/',
            data: data_v,
            success: function(content, data) {
                //var obj = JSON.parse(content);
                //console.log(content.accounts['principal']['money__sum']);
                //console.log(content.whats_left);
                // account - index | currency - value['money__sum']
                $.each(content.accounts, function(index, value) {
                    console.log(index);
                    console.log(value['money__sum']);
                })
                function red_css(number, id_name) {
                    if (Number(number) < 0) {
                        $(id_name).css('color', 'red');
                    } else {
                        $(id_name).css('color', 'black');
                    }
                }
                function whats_left() {
                    // update value
                    var tentativa = $('#box_line1').text().trim();
                    tentativa = tentativa.split(' ');
                    tentativa = tentativa.filter(Number);
                    tentativa.pop();
                    var total_left = 0;
                    for (var i = 0; i < tentativa.length; i++) {
                        tentativa[i] = tentativa[i].trim();
                        total_left = total_left + Number(tentativa[i]);
                    }
                    $('#left').text(total_left);
                    red_css(total_left, "#left");
                }
                function old_account_value(val) {
                    // update value
                    old_account_money = $("[id='"+old_account+"']").text().trim();
                    old_actual_money = Number(old_account_money) - Number(val);
                    $("[id='"+old_account+"']").text(old_actual_money);
                    red_css(old_actual_money, "[id='"+old_account+"']");
                }
                function total_value(old_v, new_v) {
                    // update Total in line3.html
                    var old_total_value = $("#total").text().trim();
                    var old_total_value_less_old_money = Number(old_total_value) - Number(old_v);
                    var new_total_value = Number(old_total_value_less_old_money) + Number(new_v);
                    $("#total").text(new_total_value);
                    red_css(new_total_value, "#total");
                }
                if ( data_v[8].value == 'remove' ) {
                    $('#'+data_v[2].value).remove();
                    // update value. line1.html
                    var old_total_account = $("[id='"+data_v[7].value+"']").text().trim();
                    var less_old_money = Number(old_total_account) - Number(data_v[4].value);
                    $("[id='"+data_v[7].value+"']").text(less_old_money);
                    red_css(less_old_money, "[id='"+data_v[7].value+"']");
                    total_value(data_v[4].value, 0);
                    whats_left();
                }
                if ( data_v[8].value == 'update' ) {
                    // form back to default
                    $('#'+data_v[2].value + ' input:radio[name=update_rm]')[1].checked = true;
                    $('#'+data_v[2].value + " input").attr('readonly', 'true');
                    // update line1.html
                    if ( old_account ) {
                        if ( old_money ) {
                            old_account_value(old_money);
                            old_money = 0;
                        } else {
                            old_account_value(data_v[4].value);
                        }
                        var new_account_money = $("[id='"+data_v[7].value+"']").text().trim();
                        var new_actual_money = Number(new_account_money) + Number(data_v[4].value);
                        $("[id='"+data_v[7].value+"']").text(new_actual_money);
                        red_css(new_actual_money, "[id='"+data_v[7].value+"']");
                        total_value(old_money, data_v[4].value);
                        whats_left();
                        old_account = 0;
                    } else if ( old_money ) {
                        var old_total_account = $("[id='"+data_v[7].value+"']").text().trim();
                        var less_old_money = Number(old_total_account) - Number(old_money);
                        var account_1 = Number(less_old_money) + Number(data_v[4].value);
                        $("[id='"+data_v[7].value+"']").text(account_1);
                        red_css(account_1, "[id='"+data_v[7].value+"']");
                        //whats_left();
                        //old_money = 0;
                        // update Total in line3.html
                        total_value(old_money, data_v[4].value);
                        //var old_total_value = $("#total").text().trim();
                        //var old_total_value_less_old_money = Number(old_total_value) - Number(old_money);
                        //var new_total_value = Number(old_total_value_less_old_money) + Number(data_v[4].value);
                        //$("#total").text(new_total_value);
                        //red_css(new_total_value, "#total");
                        whats_left();
                        old_money = 0;
                    }
                }
            },
            error: function(content) {
                console.log(content);
            },
        });
    });
});