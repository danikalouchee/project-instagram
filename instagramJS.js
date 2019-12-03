var token = "262002496.1677ed0.5cd6baeee9f84ec9984b7e4b43b58c3a"
var url = 'https://api.instagram.com/v1/users/self'
var param = "access_token="+token

var request = new XMLHttpRequest()
    request.open('GET',url + '?' +param , true)
    request.onload = function() {
    
    var data = JSON.parse(this.response)
    console.log(data.data.id)
    
    document.getElementById('followers').textContent = data.data.counts.followed_by
    document.getElementById('instagram').textContent = data.data.counts.follows
    document.getElementById('user').textContent = data.data.username
    document.getElementById('fullname').textContent = data.data.full_name

    }

    request.send()