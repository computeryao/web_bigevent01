$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()

    })
    var form = layui.form;
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        rePwd: function(val) {
            if (val !== $('#repwd').val()) return ('两次密码不一致！')
        }

    })
    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message)
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
    $('#form_reg').submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: 'get',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                $('#link_login').click()
                $('#form_reg')[0].reset()
            }
        })
    })
})