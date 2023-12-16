export function displaySignupMessage(message, type) {
    $('#signupMessage').html('<div class="alert alert-' + type + '">' + message + '</div>');
}

export function displaySigninMessage(message, type) {
    $('#signinMessage').html('<div class="alert alert-' + type + '">' + message + '</div>');
    $('#signupBtn').hide();
    $('#loginBtn').hide();
    $('#logoutBtn').show();
    }

    export function displayEditedUser(name, job, timeEdited, type){
        $('#signinMessage').html(`<div class="alert alert- ' + ${type} + '"> Your new name is: ${name}. Job: ${job} 
        This was created at ${timeEdited}</div>`);
        $('#signupMessage').hide()
        $('#signinMessage').show();
        $('#myModal').modal('hide');
    }

    export function displayNewUser(name, job, id, time, type){
       
        $('#signinMessage').html(`<div class="alert alert-success' + ${type} + '"> Your name is: ${name}.   Job: ${job} 
            Your id is: ${id}. This was created at ${time}</div>`);
        $('#signinMessage').show();
       
        
        $('#createUserForm').modal('hide');
    }