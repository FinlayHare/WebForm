import {displaySignupMessage, displaySigninMessage, displayEditedUser, displayNewUser} from "./displayInfo.js";

export function signUp() {
    $.post('https://reqres.in/api/register', { email: 'eve.holt@reqres.in', password: 'pistol' })
                .done(function(response, jqXHR) {
                    console.log(`Registration successfull! Status: ${jqXHR}. Token: ${response.token}. ID ${response.id}`);
                    displaySignupMessage(`Registration successfull! Your email is 'eve.holt@reqres.in'. Status: ${jqXHR}. Token: ${response.token}. ID ${response.id}`);
                })
                .fail(function(error) {
                    console.error('Registration failed:', error);
                    displaySignupMessage('Registration failed');
                });
        }   

export function logIn() {
    $.post('https://reqres.in/api/login', { email: 'eve.holt@reqres.in', password: 'pistol' })
                .done(function(response, jqXHR) {
                console.log('You are logged in as user:', response, jqXHR);
                displaySigninMessage(`You are logged in as user: 'eve.holt@reqres.in'. Token is: ${response.token}. ${jqXHR}`);
             })
            .fail(function(error) {
                console.error('Signing in failed:', error);
                displaySigninMessage('Signing in failed', 'danger');
             }); 
}

export function loadUsers(page) {
    console.log("Hey");
    $("#user-info").empty();
    var startId = (page - 1) * 6 + 1;
    var endId = startId + 5;

    var requests = [];

    for (let i = startId; i <= endId; i++) {
        requests.push(
            $.ajax({
                url: `https://reqres.in/api/users/${i}`,
                method: 'GET'
            })
        );
    }

    Promise.all(requests)
        .then(function (responses) {
            responses.forEach(function (response) {
                let user = response.data;
                let row = `
                    <tr>
                        <td>${user.id}</td>
                        <td><img src="${user.avatar}" alt="user avatar" class="avatarPic"></td>
                        <td>${user.email}</td>
                        <td>${user.first_name}</td>
                        <td>${user.last_name}</td>
                        <td><button type="button" class="btn btn-info editBtn">Edit</button>
                            <button type="button" class="btn btn-danger deleteBtn" data-userid="${user.id}">Delete</button></td>
                    </tr>
                `;
                $("#user-info").append(row);
            });
        })
        .catch(function () {
            $("#user-info").append("<tr><td colspan='6'>Error Error Error</td></tr>");
        });
}

window.loadUsers = loadUsers;
loadUsers(1);

export var pageNum = 1;
export function changePage(clickedPageBtn) {
    pageNum = $(clickedPageBtn).data("page");
    // Use the globally defined loadUsers function
    loadUsers(pageNum);
}


export function editUser(clicked) {
    var userId = $(clicked).closest('tr').find('.deleteBtn').data('userid');
    $.get(`https://reqres.in/api/users/${userId}`, function (response, jqXHR) {
        var user = response.data;
        console.log(userId);
        console.log(jqXHR);
      
        $('#editFirstName').val(user.first_name);
        

        $('#saveChangesBtn').on('click', function () {
            
            var editedFirstName = $('#editFirstName').val();
            var editedLastName = $('#editLastName').val();
        
            $.ajax({
                url: `https://reqres.in/api/users/${userId}`,
                type: "PATCH",
                data: {name: editedFirstName, 
                        job: editedLastName},
                success: function (response, jqXHR) {
                    console.log("Hello", response, jqXHR);
                    displayEditedUser(response.name, response.job, response.updatedAt);
                                       
                },
                error: function (error) {
                    console.error("Error deleting user:", error);
                    alert("Error Error Error");
                    
                }
            });

            console.log("Edited First Name:", editedFirstName);
            console.log("Edited Last Name:", editedLastName);
            $('#myModal').modal('hide');
            
        });
    })
    .fail(function () {
        console.error("Error fetching user data:", error);
        alert("Käyttäjän tietoja ei voitu noutaa.");
    });
}

export function deleteUser(userId) {
    // Find the row corresponding to the deleted user
    var $deletedRow = $(`#user-info .deleteBtn[data-userid="${userId}"]`).closest('tr');
    console.log(userId);

      $.ajax({
        url: `https://reqres.in/api/users/${userId}`,
        type: "DELETE",
        success: function (response) {
            console.log("User deleted successfully:", response);

            // Remove the deleted user's row from the table
            $deletedRow.remove();
        },
        error: function (error) {
            console.error("Error deleting user:", error);
            alert("Käyttäjää ei voitu poistaa.");
            // Handle the error case as needed
        }
    });
}

export function createUser() {
       
    var firstName = $('#firstName').val();
    var job = $('#lastName').val();

    $.post('https://reqres.in/api/users', {name: firstName, job: job}, function(response){
        console.log(response);
        firstName = response.name;
        job = response.job;
        var id = response.id;
        var createdAt = response.createdAt;
        
        displayNewUser(firstName, job, id, createdAt);

    })
    $('#createUserModal').modal('hide');

}















