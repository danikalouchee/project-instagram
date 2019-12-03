//dani
var token = "17958203.1677ed0.fdbc1bcade154c1aa344e67ec7e012e6"
//shock
//var token = "262002496.1677ed0.5cd6baeee9f84ec9984b7e4b43b58c3a"
var url = 'https://api.instagram.com/v1/users/self/media/recent'
var param = "access_token="+token


var likeDataSet = [];
var friendMap = new Map();



var request = new XMLHttpRequest()
request.open('GET',url + '?' +param , true)

request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)


    
    for (var i = 0; i < 20; i++) {
        if(data.data[i].users_in_photo.length != 0)
        {
            for (var k = 0; k < data.data[i].users_in_photo.length; k++)
            {
                if(!friendMap.has(data.data[i].users_in_photo[k].user.username))
                {
                    friendMap.set(data.data[i].users_in_photo[k].user.username,1)
                }
                else
                {
                    friendMap.set(data.data[i].users_in_photo[k].user.username,friendMap.get(data.data[i].users_in_photo[k].user.username)+1)
                }
            }
        }
    }
    var newMapJawn = new Map([...friendMap.entries()].sort((a, b) => b[1] - a[1]));
    var iterator1 = newMapJawn.entries()

    document.getElementById('bestFriend1').textContent = iterator1.next().value[0]
    document.getElementById('bestFriend2').textContent = iterator1.next().value[0]
    document.getElementById('bestFriend3').textContent = iterator1.next().value[0]
    
}
    request.send()       