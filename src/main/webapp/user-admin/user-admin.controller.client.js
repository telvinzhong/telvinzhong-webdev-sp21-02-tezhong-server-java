var $tableRows
var $createBtn
var $updateBtn

var $titleFld
var $sectionFld
var $seatsFld
var $semesterFld

var userService = new UserServiceClient()

var users = [
  {title: "CS4550", section: "02", seats: 23, semester: "Spring"},
  {title: "CS2345", section: "03", seats: 34, semester: "Spring"},
  {title: "CS3456", section: "04", seats: 45, semester: "Spring"},
  {title: "CS5610", section: "05", seats: 56, semester: "Spring"},
  {title: "CS5200", section: "06", seats: 67, semester: "Spring"},
]

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
//   alert("create user")
  var newUser = {
    title: $titleFld.val(),
    section: $sectionFld.val(),
    seats: $seatsFld.val(),
    semester: $semesterFld.val()
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
  $titleFld.val(selectedUser.title)
  $seatsFld.val(selectedUser.seats)
  $semesterFld.val(selectedUser.semester)
}

function updateUser() {
  selectedUser.title = $titleFld.val()
  selectedUser.semester = $semesterFld.val()
  selectedUser.seats = $seatsFld.val()
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
          <td>${user.title}</td>
          <td>${user.section}</td>
          <td>${user.seats}</td>
          <td>${user.semester}</td>
          <td>
              <button id="${i}" class="neu-delete-btn">Delete</button>
              <button id="${user._id}" class="wbdv-select-btn">Select</button>
          </td>
      </tr>
      `)
  }
  $(".neu-delete-btn").click(deleteUser)
  $(".wbdv-select-btn").click(selectUser)
}

function main() {
  $tableRows = jQuery("#table-rows")
  $createBtn = $(".jga-create-btn")
  $updateBtn = $(".wbdv-update-btn")

  $titleFld = $(".wbdv-title-fld")
  $seatsFld = $(".wbdv-seats-fld")
  $sectionFld = $(".wbdv-section-fld")
  $semesterFld = $(".wbdv-semester-fld")

  $updateBtn.click(updateUser)
  $createBtn.click(createUser)
  userService.findAllUsers().then(function(actualUsers) {
    users = actualUsers
    renderUsers(users)
  })
}
$(main)
