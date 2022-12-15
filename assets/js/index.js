// const { route } = require("../../server/routes/router")



$("#add_user").submit(event => {
    Swal.fire(
        'User successfully added'
    ) || alert('User Successfully added!')
})


$("#update_user").submit(function (event) {
    event.preventDefault()

    let unindexed_array = $(this).serializeArray()
    let data = {}

    $.map(unindexed_array, function (n, i) {
        data[n['name']] = n['value']
    })

    console.log(data)


    let req = {
        // use ajax to make req to the server and get a res from the server
        'url': `http://localhost:3000/api/users/${data.id}`, // here we're specifing the targeted user 
        'method': 'PUT',
        'data': data,
    }

    // using jQuery ajax (XHR) we will make the request , pass the req variable we created and when it's done Alert that update the done without further action to the response 
    $.ajax(req).done(res => {

        Swal.fire({
            title: `User ${data.name} updated successfully!`,
            icon: 'success',
            focusConfirm: false,
            confirmButtonText: 'Ok',
            confirmButtonColor: '#06d6a0',
        })


    })
})

if (window.location.pathname == '/') {
    $ondelete = $("table tbody tr td a.delete") // selects the button of <a> tag of the delete
    $ondelete.click(function(){
        let id = $(this).attr("data-id") // get the value of the attribute data-id which holds the current user's id
        console.log(id)
        let req = {
            // use ajax to make req to the server and get a res from the server
            'url': `http://localhost:3000/api/users/${id}`, // here we're specifing the targeted user 
            'method': 'DELETE',
        }

        if (confirm("Are you sure to delete this user permanently?")) {
            $.ajax(req).done(res => {

                Swal.fire({
                    title: `User was deleted`,
                    icon: 'Icon',
                    focusConfirm: false,
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#06d6a0',
                })
                location.reload()
            })
        }

    })
}