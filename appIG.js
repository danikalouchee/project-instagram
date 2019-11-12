
var token = "262002496.1677ed0.5cd6baeee9f84ec9984b7e4b43b58c3a"
var url = 'https://api.instagram.com/v1/users/self'
var param = "access_token="+token

var request = new XMLHttpRequest()
document.querySelector('.btn-new').addEventListener('click',function()
{
    
    request.open('GET',url + '?' +param , true)
    request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
    console.log(data.data.id)
    document.getElementById('following').textContent = data.data.counts.follows
    document.getElementById('followers').textContent = data.data.counts.followed_by
/*
    if (request.status >= 200 && request.status < 400) {
        data.forEach(data => {
        console.log(data.id)
        })
    } else {
        console.log('error')
    }*/
    }

    request.send()
})	
		//url:'https://api.instagram.com/oauth/authorize?app_id=990602627938098&redirect_uri=https%3A%2F%2Fsocialsizzle.herokuapp.com%2Fauth%2F&scope=user_profile,user_media&response_type=code',


        //https://api.instagram.com/oauth/authorize?app_id=990602627938098&redirect_uri=https%3A%2F%2Fsocialsizzle.herokuapp.com%2Fauth%2F&scope=user_profile,user_media&response_type=code