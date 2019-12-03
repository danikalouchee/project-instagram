//Instagram api and token (facebook)
var token = "262002496.1677ed0.5cd6baeee9f84ec9984b7e4b43b58c3a"
var url = 'https://api.instagram.com/v1/users/self/media/recent'
var param = "access_token="+token
//initializing variables
var likesFeedback = [];
var averagelikes;
var Max;
var Min;
var Followers=100;
var AverageActivity=0;
var good;
var bad;
var request = new XMLHttpRequest();
request.open('GET',url + '?' +param , true);


request.onload = function() {
    // Begin accessing JSON data here

    var data = JSON.parse(this.response);
    console.log(data);


    for (var i = 0; i < 20; i++) {
        likesFeedback.push(data.data[i].likes.count);
    }

    average();
    relation();
    maximum();
    minimum();

    function average() {
        var sum = likesFeedback.reduce((a, b) => a + b, 0);
        var length = likesFeedback.length;
        averagelikes = sum / length;
    }

    function maximum() {
        Max = Math.max(...likeDataSet);
    }
    
    
    function minimum() {
        Min = Math.min(...likeDataSet);
    }

    function relation() {
        AverageActivity = (averagelikes / Followers)*100;
    }
    good = likesFeedback.indexOf(Max);
    bad = likesFeedback.indexOf(Min);
    if(AverageActivity<34)
    {
        document.getElementById('suggestion').textContent = "Your profile analysis reveals that your profile is slowing down. The follower engagment is low. A few notes we would like you to observe is that you have " + averagelikes + " average likes. Your best content that you have posted was " + good + " posts ago. We recommend posting more content like that as it accrued a large amount of likes. Also, we recommend against posting a picture like " + bad + " posts ago. That received the lowest number of likes and did not bode well with the audience. We highly recommend finding new content as your content in general has not been doing well."
        document.getElementById('healthStatus').textContent = "Poor"
    }
    else if(AverageActivity>67)
    {
        document.getElementById('suggestion').textContent = "Your profile analysis reveals that your profile is at a active state. It shows higher engagment as time goes on. A few notes we would like you to observe is that you have " + averagelikes + " average likes. Your best content that you have posted was " + good + " posts ago. We recommend posting more content like that as it accrued a large amount of likes. Also, we recommend against posting a picture like " + bad + " posts ago. That received the lowest number of likes and did not bode well with the audience."
        document.getElementById('healthStatus').textContent = "Good"
    }

    else
    {
        document.getElementById('suggestion').textContent = "Your profile analysis reveals that your profile is neutral. It shows an a steady engagement with no growth or decline. A few notes we would like you to observe is that you have " + averagelikes + " average likes. Your best content that you have posted was " + good + " posts ago. We recommend posting more content like that as it accrued a large amount of likes. Also, we recommend against posting a picture like " + bad + " posts ago. That received the lowest number of likes and did not bode well with the audience. We recommend spicing things up a little and trying new things."
        document.getElementById('healthStatus').textContent = "Neutral"
    }

}
request.send()