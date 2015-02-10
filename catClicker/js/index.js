/**
 * Created by vidaluson on 2/4/15.
 */


var clickCnt = 0;

document.getElementById('my-name1').innerHTML = 'cat1';
var elem1 = document.getElementById('my-elem1');
elem1.addEventListener('click', function(){
    //the element has been clicked... do stuff here
    document.getElementById('numClick').innerHTML = ++clickCnt;
}, false);

document.getElementById('my-name2').innerHTML = 'cat2';
var elem2 = document.getElementById('my-elem2');
elem2.addEventListener('click', function(){
    //the element has been clicked... do stuff here
    document.getElementById('numClick').innerHTML = ++clickCnt;
}, false);

// clear the screen for testing
document.body.innerHTML = '';
document.body.style.background="white";

var nums = [1,2,3];

// Let's loop over the numbers in our array
for (var i = 0; i < nums.length; i++) {

    // This is the number we're on...
    var num = nums[i];

    // We're creating a DOM element for the number
    var elem = document.createElement('div');
    elem.textContent = num;

    // ... and when we click, alert the value of `num`
    //elem.addEventListener('click', function() {
    //    alert(num);
    //});
    // ... and when we click, alert the value of `num`
    elem.addEventListener('click', (function(numCopy) {
        return function() {
            alert(numCopy);
        };
    })(num));

    // finally, let's add this element to the document
    document.body.appendChild(elem);
};