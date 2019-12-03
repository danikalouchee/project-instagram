//var token = "17958203.1677ed0.fdbc1bcade154c1aa344e67ec7e012e6"  //dani
//var token = "262002496.1677ed0.5cd6baeee9f84ec9984b7e4b43b58c3a" //shak
var token = "874965359.1677ed0.0ef8792ec67c4817a198a0415c5cc335"  //max

var param = "access_token=" + token

var urlSelf = 'https://api.instagram.com/v1/users/self'

var urlRecent = 'https://api.instagram.com/v1/users/self/media/recent'




//RECENT - friendJS
var likeDataSet = [];
var friendMap = new Map();


//RECENT - profileFeedbackJS
var likesFeedback = [];
var averagelikes;
var Max;
var Min;
var Followers;
var AverageActivity=0;
var good;
var bad;

//RECENT - analyticalJS
var likeCharts = [];
var comentDataSet = [];


//SELF-SELF-SELF-SELF-SELF-SELF-SELF-SELF-SELF-SELF-SELF-SELF-SELF-SELF-SELF-SELF-SELF-SELF-SELF-SELF-SELF-SELF
var request = new XMLHttpRequest()
    request.open('GET',urlSelf + '?' +param , true)
    request.onload = function() {
    var data = JSON.parse(this.response)
//instagram.js
    document.getElementById('followers').textContent = data.data.counts.followed_by
    document.getElementById('instagram').textContent = data.data.counts.follows
    document.getElementById('user').textContent = data.data.username
    document.getElementById('fullname').textContent = data.data.full_name
    document.getElementById('posts').textContent = data.data.counts.media
    Followers=data.data.counts.followed_by
    
    var img = document.createElement("img");
    img.src = data.data.profile_picture;
    var src = document.getElementById("avatar")
    src.appendChild(img);
//***instagram.js
    }
    request.send()
//***SELF-SELF-SELF-SELF-SELF-SELF-SELF-SELF-SELF-SELF-SELF-SELF-SELF-SELF-SELF-SELF-SELF-SELF-SELF-SELF-SELF-SELF




//RECENT-RECENT-RECENT-RECENT-RECENT-RECENT-RECENT-RECENT-RECENT-RECENT-RECENT-RECENT-RECENT-RECENT-RECENT-RECENT
var request = new XMLHttpRequest()
    request.open('GET',urlRecent + '?' +param , true)
    request.onload = function() {
        var data = JSON.parse(this.response)






        //friendJS
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

        //***friendJS





        //recentPostsJS

        for (var i = 0; i < 5; i++)
        {
            var img = document.createElement("img");
            img.src = data.data[i].images.standard_resolution.url
            var src = document.getElementById("avatar"+(i+1))
            src.appendChild(img);
        }

        //***recentPostsJS




        //profileFeedbackJS

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
            Max = Math.max(...likesFeedback);
        }
        
        
        function minimum() {
            Min = Math.min(...likesFeedback);
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
        //***profileFeedbackJS






        //analyticalJS

        
        for (var i = 0; i < 20; i++) {
            likeCharts.push(data.data[i].likes.count);
            comentDataSet.push(data.data[i].comments.count)
        }
    
        likeCharts=likeCharts.reverse();
        comentDataSet = comentDataSet.reverse();
        //analitycal chart for last 20 posts
    
        var ct = document.getElementById('Growth');
        var lineChart = new Chart(ct, {
            type: 'line',
            data: {
                labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
                datasets: [
                                        //enabling or disabling history on graph
    
                    {
                        label: "Like History",
                        fill: true,
                        backgroundColor: '#c9e8fa',
                        borderColor: '#9cb2eb',
                        pointBackgroundColor: '#7b68d7',
                        data: likeCharts 
                    }
                ]
            },
            options: {
                responsive: false
            }
        });
    
    
        var ct2 = document.getElementById('commentTrend');
        var lineChart2 = new Chart(ct2, {
            type: 'bar',
            data: {
                labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
                datasets: [
                                        //enabling or disabling history on graph
    
                    {
                        label: "Comments",
                        fill: true,
                        backgroundColor: '#c9e8fa',
                        borderColor: '#9cb2eb',
                        pointBackgroundColor: '#7b68d7',
                        data: comentDataSet 
                    }
                ]
            },
            options: {
                responsive: false
            }
        });
    
    
        
        //***analyticalJS








    }
    request.send()


//RECENT-RECENT-RECENT-RECENT-RECENT-RECENT-RECENT-RECENT-RECENT-RECENT-RECENT-RECENT-RECENT-RECENT-RECENT-RECENT