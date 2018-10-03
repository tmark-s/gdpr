$(document).ready(function($) {
    $('#mobile').mask("999-999-9999");
    //check checkbox have click change textbox mobile number
    $("#count").click(function() {
        if ($('#count').prop('checked')) {
            $('#mobile').unmask();
        } else {
            $('#mobile').mask("999-999-9999");
        }
    });
    /*check form email*/
    $("form#formEmail").on('submit', function(e) {
        if ($('form#formEmail [name="email"]').val()) {
            if (validEmail($('form#formEmail [name="email"]').val())) {} else {
                setBorder()
                alert("กรุณากรอกอีเมลให้ถูกต้อง");
                return false;
            }
        } else {
            setBorder()
            alert("กรุณากรอกอีเมล");
            return false;
        }
        if ($('form#formEmail').find('input[type=checkbox]:checked').length == 0) {
            alert('กรุณาเลือกอย่างน้อย 1 ประเภท');
            return false;
        } else {
            return true;
        }
    });
    /*check form mobile*/
    $("form#formSms").on('submit', function(e) {
        if ($('form#formSms [name="mobile"]').val()) {

        } else {
            setBorder()
            alert("กรุณากรอกเบอร์โทรศัพท์");
            return false;
        }
        if ($('form#formSms').find('input[type=checkbox]:checked').length == 0) {
            alert('กรุณาเลือกอย่างน้อย 1 ประเภท');
            return false;
        } else {
            return true;
        }
    });
    /*check form call centre 2.1*/
      $("form#channel").on('submit', function(e) {
        if ($('form#channel').find('input[type=checkbox]:checked').length == 0) {
            alert('กรุณาเลือกอย่างน้อย 1 ช่องทาง');
            return false;
        } else {
            return true;
        }
    });
    function setBorder() {
        if (!$('form#formSms [name="mobile"]').val()) {
            $('form#formSms [name="mobile"]').css('border', '1px solid RED');
        } else {
            $('form#formSms [name="mobile"]').css('border', '1px solid #e4ddca');
        }

        if (!$('form#formEmail [name="email"]').val()) {
            $('form#formEmail [name="email"]').css('border', '1px solid RED');
        } else {
            if (validEmail($('form#formEmail [name="email"]').val())) {
                $('form#formEmail [name="email"]').css('border', '1px solid #e4ddca');
            } else {
                $('form#formEmail [name="Email"]').css('border', '1px solid RED');
            }
        }
    }

});

function validEmail(v) {
    var r = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
    return (v.match(r) == null) ? false : true;
}
