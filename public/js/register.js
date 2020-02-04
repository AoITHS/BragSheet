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
        cpass: ''
}

doc('#btn-one').addEventListener('click', function(){

    info.school = doc('.school').value.trim();
    info.grade = doc('.grade').value.trim();
    info.osis = doc('.osis').value.trim();

    if(info.school === '' || info.grade === '' || info.osis === ''){
        doc('.part-one .error').innerHTML = `Something is blank. Please check your code.`;
    }else{
        doc(".part-two.d-none").setAttribute("class", "part-two");
        doc(".part-one").style.display = 'none';
    }

});

doc('#submit').addEventListener('click', function(evt){
    info.first = doc('.first').value;
    info.last = doc('.last').value;
    info.email = doc('.email').value;
    info.pass = doc('.pass').value;
    info.cpass = doc('.cpass').value;

    if(info.first === '' || info.last === '' || info.email === '' || info.pass === '' || info.cpass === ''){
        doc('.part-two .error').innerHTML = `Something is blank. Please check your code.`;
        evt.preventDefault();
        evt.stopPropogation();
    }else{
        doc('form').submit();
    }
});