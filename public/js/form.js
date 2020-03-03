function d ( name )
{
    return document.querySelector(name);
}

var partOne = {
    firstName: null,
    lastName: null,
    middileInitial: null,
    email: null,
    dob: null,
    gender: null,
    race: null,
    languages: null     
};

var gen = document.getElementsByName('gender');

gen.forEach( (v, i) => {
    gen[i].onchange = function (){
        if( v.value === 'other' ) d('.g-other-v').classList.remove('d-none');
        else {
            d('.g-other-v').classList.add('d-none');
            partOne.gender = v.value;
            console.log(partOne);
        }
    }
});

d('.part-one').addEventListener('click', () => {

    partOne.firstName = d('.fname').value;
    partOne.lastName = d('.lname').value;
    partOne.middileInitial = d('.mi').value;
    partOne.email = d('.email').value;
    partOne.dob = d('.dob').value;

    

});