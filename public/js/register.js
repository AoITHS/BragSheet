function doc(name){
    return document.querySelector(name);
}
var info = {
        school: '',
        grade: 0,
        osis: 0,
        first: '',
        last: '',
        email: '',
        pass: '',
}

doc('#btn-one').addEventListener('click', function(){

    info = {
        school: doc('.school').value,
        grade: doc('.grade').value,
        osis: doc('.osis').value
    };

    if(info.school === '' || info.grade === '' || info.osis === ''){
        doc('.part-one .error').innerHTML = `Something is blank. Please check your code.`;
    }else{
        doc(".part-two.d-none").setAttribute("class", "part-two");
        doc(".part-one").style.display = 'none';
    }
});

doc('#submit').addEventListener('click', function(evt){
    cpass = doc('.cpass').value;
    info.first = doc('.first').value;
    info.last = doc('.last').value;
    info.email = doc('.email').value;
    info.pass = doc('.pass').value;

    // cpass should compare against password
    if(info.first === '' || info.last === '' || info.email === '' || info.pass === '' || info.cpass === ''){
        doc('.part-two .error').innerHTML = `Something is blank. Please check your code.`;
    }else{
        if(info.pass !== cpass){
            doc('.part-two .error').innerHTML = `The password does not match.`;
        }else{
            doc('.part-two .error').innerHTML = ``;
            fetch('/account/register-ap', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                }, 
                body: JSON.stringify(info)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if(data.error.length > 0){
                    doc('.part-two .error').innerHTML = data.error;
                }
                else
                {
                    window.location.replace("/account/login");
                }
            });
        }
    }
});