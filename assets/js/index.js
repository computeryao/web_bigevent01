$(function(){

    $('#logout').on('click',function(){
        layer.confirm('是否确定退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            
            layer.close(index);
            localStorage.removeItem('token')
            location.href='/login.html'
          });
    })
    getUserInfo()
    function getUserInfo(){
        $.ajax({
            method:'get',
            url:'/my/userinfo',
            // headers:{
            //     Authorization:  localStorage.getItem('token')
            // },
            success:function(res){
                if(res.status !==0)return layer.msg(res.message)
                renderUser(res.data)
            }
        })
    }

    function renderUser(user){
        var uname = user.nickname||user.username
        $('#welcome').html('欢迎&nbsp;&nbsp;'+uname)
        if(user.user_pic !==null){
            $('.layui-nav-img').attr('src',user.user_pic).show()
            $('.text-avatar').hide()
        }else{
            $('.layui-nav-img').hide()
            $('.text-avatar').html(uname[0].toUpperCase()).show()
        }
    }
})