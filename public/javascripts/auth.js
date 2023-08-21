$(function(){
    //Cau truc cua jQuery: doi cho den khi trang load xong thi moi chay
    AUTH.bindingEvent();
});
const AUTH = {
    bindingEvent: ()=>{
        $('#btn-login-submit').unbind();
        $('#btn-login-submit').click(function (e){
            AUTH.action.SignIn(); 
        });
        // $('#btn-login-submit').unbind();
        // $('#btn-register-submit').click(function(e){
        //     AUTH.action.SignUp();
        // });
    },
    action:{
        signUp: ()=>{
            let username = $('#username').val();
            let password = $('#password').val();
            let repassword = $('#repassword').val();
            let email = $('#email').val();
            let phone = $('#phone').val();
            //Validate input data

            //call api
            let url = "http://localhost:6868/v1/api/auth/SignUp";
            fetch(url,{
                method: 'POST',
                headers: {
                    'content-type':'application/json'
                },
                body:JSON.stringify({
                    username,
                    password,
                    email,
                    phone
                })
            }).then((res)=>{
                console.log(res);
                if(res.status === 201){
                    Toastify({
                      text: "Đăng ký thành công",
                      duration: 3000,
                    }).showToast();
                } else {
                    
                    Toastify({
                      text: "Đăng ký thất bại",
                      duration: 3000,
                    }).showToast();
                }
            }).catch((e)=>{
                console.log(e);
                Toastify({
                  text: "Đăng ký thất bại",
                  duration: 3000,
                }).showToast();

            });
        },
        SignIn: ()=>{
            let username = $('#username').val();
             let password = $('#password').val();
             //Validate

             //Call api signIn
              let url = "http://localhost:6868/v1/api/auth/SignIn";
              fetch(
                url,
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                }
            ).then(async (res) => {
                let responseBody = await res.json();
                let token = responseBody.data.token;
                // lưu token vào local storage
                localStorage.setItem('access_token', token);
                Toastify({
                  text: "Đăng nhập thành công",
                  duration: 2000,
                }).showToast();
                setTimeout(() => {
                    // ridirect đến trang chủ
                    window.location = '/';
                }, 2010);
            })
        }
    }
}
