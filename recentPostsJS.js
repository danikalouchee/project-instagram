var token = "262002496.1677ed0.5cd6baeee9f84ec9984b7e4b43b58c3a"
var url = 'https://api.instagram.com/v1/users/self/media/recent'
var param = "access_token="+token

var request = new XMLHttpRequest()
    request.open('GET',url + '?' +param , true)
    request.onload = function() {
    
    var data = JSON.parse(this.response)
    console.log(data)

        for (var i = 0; i < 5; i++)
        {
            var img = document.createElement("img");
            img.src = data.data[i].images.standard_resolution.url
            var src = document.getElementById("avatar"+(i+1))
            src.appendChild(img);
        }
    }

    request.send()