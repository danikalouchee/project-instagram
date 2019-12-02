//Instagram api and token (facebook)
var token = "262002496.1677ed0.5cd6baeee9f84ec9984b7e4b43b58c3a"
var url = 'https://api.instagram.com/v1/users/self/media/recent'
var param = "access_token="+token
//initializing variables
var likeDataSet = [];
var dataLength = [1];


var request = new XMLHttpRequest()
request.open('GET',url + '?' +param , true)

request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
    console.log(data)
    //pushing data from the page to the graph
    for (var i = 0; i < 20; i++) {
        likeDataSet.push(data.data[i].likes.count);
    }
    likeDataSet=likeDataSet.reverse()
    //analitycal chart for last 20 posts
    var lineChart = new Chart(ct, {
        type: 'line',
        data: {
            labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
            datasets: [
                                    //enabling or disabling history on graph

                {
                    label: "Like History",
                    fill: true,
                    data: likeDataSet
                }
            ]
        },
        options: {
            responsive: false
        }
    })
}
    request.send()       
//getting the posts info
var ct = document.getElementById('Growth');