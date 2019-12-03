

var likeDataSet = [267, 160, 188, 217, 125, 294, 254, 298, 142, 205, 220, 265, 362, 260, 316, 242, 318, 224, 347, 343];
var averagelikes;
var Max;
var Min;
var Followers = 1000;
var AverageActivity;
average();
maximum();
minimum();
relation();

function average() {
    var sum = likeDataSet.reduce((a, b) => a + b, 0);
    console.log(sum);
    var length = likeDataSet.length;
    averagelikes = sum / length;
 
}
console.log(averagelikes);

function maximum() {
    Max = Math.max(...likeDataSet);
}
console.log(Max);

function minimum() {
    Min = Math.min(...likeDataSet);
}
console.log(Min);

function relation() {
    AverageActivity = (averagelikes / Followers)*100;
}
console.log(AverageActivity+ "%");   
 