/**
 * Created by vidaluson on 2/9/15.
 */
var ViewModel = function () {
    this.clickCount = ko.observable(0);
    this.name = ko.observable('Tabby');
    this.imgSrc = ko.observable('images/cat1.jpg');
    this.nicknames = ko.observableArray([
            {nickname: 'Cookie Monster'},
            {nickname: 'Big Bird'},
            {nickname: 'Oscar The Grouch'}
        ]);
    this.level = ko.computed(function () {
        var level;
        var clickCnt = this.clickCount();
        if(clickCnt < 2) {
            level = 'Infant';
        } else
        if(clickCnt < 4) {
            level = 'Toddler';
        } else
        if(clickCnt < 13) {
            level = 'Child';
        } else
        if(clickCnt < 20) {
            level = 'Teen';
        } else
        if(clickCnt >= 20) {
            level = 'Adult';
        }
        return level;
    }, this);

    this.incrementCounter = function () {
        this.clickCount(this.clickCount() + 1);
    };
};

ko.applyBindings(new ViewModel());