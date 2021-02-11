var $tableRows
var $createBtn
var $updateBtn

var $usernameFld
var $passwordFld
var $firstnameFld
var $lastnameFld
var $roleFld

var userService = new UserServiceClient()

function deleteUser(event) {
  var button = $(event.target)
  var index = button.attr("id")
  var id = users[index]._id
  userService.deleteUser(id)
    .then(function (status) {
      users.splice(index, 1)
      renderUsers(users)
    })
}

function createUser() {

  var newUser = {
    username: $usernameFld.val(),
    password: $passwordFld.val(),
    firstname: $firstnameFld.val(),
    lastname: $lastnameFld.val(),
    role: $roleFld.val()
  }

  userService.createUser(newUser)
    .then(function (actualUser) {
      users.push(actualUser)
      renderUsers(users)
    })
}

var selectedUser = null
function selectUser(event) {
  var id = $(event.target).attr("id")
  console.log(id)
  selectedUser = users.find(user => user._id === id)
  $usernameFld.val(selectedUser.username)
  $passwordFld.val(selectedUser.password)
  $firstnameFld.val(selectedUser.firstname)
  $lastnameFld.val(selectedUser.lastname)
  $roleFld.val(selectedUser.role)
}

function updateUser() {
  selectedUser.username = $usernameFld.val()
  selectedUser.password = $passwordFld.val()
  selectedUser.firstname = $firstnameFld.val()
  selectedUser.lastname = $lastnameFld.val()
  selectedUser.role = $roleFld.val()
  userService.updateUser(selectedUser._id, selectedUser)
    .then(status => {
      var index = users.findIndex(user => user._id === selectedUser._id)
      users[index] = selectedUser
      renderUsers(users)
    })
}

function renderUsers(users) {
  $tableRows.empty()
  for(var i=0; i<users.length; i++) {
    var user = users[i]
    $tableRows
      .prepend(`
      <tr>
          <td>${user.username}</td>
          <td>${user.password}</td>
          <td>${user.firstname}</td>
          <td>${user.lastname}</td>
          <td>${user.role}</td>
          <td>
              <button id="${i}" class="fa-2x fa fa-trash neu-delete-btn"> Delete</button>
              <button id="${user._id}" class="fa-2x fa fa-pencil wbdv-select-btn"> Edit</button>
          </td>
      </tr>
      `)
  }
  $(".neu-delete-btn").click(deleteUser)
  $(".wbdv-select-btn").click(selectUser)
}

function main() {
  $tableRows = jQuery("#table-rows")
  $createBtn = $(".wbdv-create-btn")
  $updateBtn = $(".wbdv-update-btn")

  $usernameFld = $(".wbdv-username-fld")
  $passwordFld = $(".wbdv-password-fld")
  $firstnameFld = $(".wbdv-firstname-fld")
  $lastnameFld = $(".wbdv-lastname-fld")
  $roleFld = $(".wbdv-role-fld")

  $updateBtn.click(updateUser)
  $createBtn.click(createUser)
  userService.findAllUsers().then(function(actualUsers) {
    users = actualUsers
    renderUsers(users)
  })
}
$(main)
