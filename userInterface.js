import { logIn, signUp, changePage, deleteUser, loadUsers, pageNum, createUser, editUser} from './userActions.js';

        // Now you can use these functions
        $('#signupBtn').on('click', function() {
            signUp();
            $('#signinMessage').hide(); 
            $('#signupMessage').show();
        });

        $('#loginBtn').on('click', function() {
            logIn();
            $('#signupMessage').hide(); 
            $('#signinMessage').show(); 
        });

        $('#logoutBtn').on('click', function() {
            logOut();
        })
        
        $(".page-button").on("click", function () {
            changePage(this);
        });

        $('#user-info').on('click', '.editBtn', function (){
            $('#myModal').modal('show');

            editUser(this);
        });

        $('#user-info').on('click', '.deleteBtn', function(){
            var userId = $(this).data('userid');
            deleteUser(userId);
        });
        
        $('#loadUsersBtn').on('click', function (){
            loadUsers(pageNum);
        });

        $('#createUserBtn').on('click', function (){
            $('#createUserModal').modal('show');
        });

        $('#submitBtn').on('click', function (){
            createUser();
            $('#signupMessage').hide();
            $('#signinMessage').hide();
        });

        export function logOut(){
            $('#signupBtn').show();
            $('#loginBtn').show();
            $('#logoutBtn').hide();
            $('#signinMessage').hide();
            };
            



