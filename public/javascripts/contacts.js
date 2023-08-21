$(function(){
    //Cau truc cua Jquery: doi cho den khi trang load xong thi moi chay
    
});
const CONTACT = {
    bindingEvent:()=>{
      $("#btn-send").unbind();
      $("#btn-send").click(function (e) {
        CONTACT.action.send();
      });
    },
    action: {
        send: ()=>{
          let fullname = $("#fullname").val();
          let phone = $("#phone").val();
          let email = $("#email").val();
          let address = $("#address").val();
          let title = $("#title").val();
          let content = $("#content").val();
          // Validate input data
          // Call api
            let url = 'http://localhost:6868/v1/api/sendEmail';
            fetch(
                url,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('acess_token')
                    },
                    body: JSON.stringify({
                        fullname,
                        phone,
                        email,
                        address,
                        title,
                        content
                    })
                } ).then((res) => {
                console.log(res);
                if (res.status === 201) {
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
            }).catch((e) => {
                console.log(e);
                Toastify({
                  text: "Đăng ký thất bại",
                  duration: 3000,
                }).showToast();
            });

        },
        SignIn: ()=>{
            let username = $("#username").val();
            let password = $("#password").val();

            // Validate

            // Call api signIn
            let url = "http://localhost:6868/v1/api/auth/SignIn";
            fetch(url, {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                username,
                password,
              }),
            }).then(async (res) => {
              let responseBody = await res.json();
              let token = responseBody.data.token;
              // lưu token vào local storage
              localStorage.setItem("token", token);
              Toastify({
                text: "Đăng nhập thành công",
                duration: 2000,
              }).showToast();
              setTimeout(() => {
                // ridirect đến trang chủ
                window.location = "/";
              }, 2010);
            });
        }
        }
    }

    

 