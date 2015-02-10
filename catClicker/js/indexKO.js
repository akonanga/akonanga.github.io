/**
 * Created by vidaluson on 2/9/15.
 */
var ViewModel = function () {
    this.clickCount = ko.observable(0);
    this.name = ko.observable('Tabby');
    this.imgSrc = ko.observable('images/cat1.jpg');
    this.level = ko.observable('Infant');
    this.nicknames = ko.observableArray([
            {nickname: 'Cookie Monster'},
            {nickname: 'Big Bird'},
            {nickname: 'Oscar The Grouch'}
        ]);

    this.incrementCounter = function () {
        this.clickCount(this.clickCount() + 1);
        if(this.clickCount() > 2 && this.clickCount() <= 12) {
            this.level('Toddler');
        } else
        if(this.clickCount() > 12 && this.clickCount() <= 20) {
            this.level('Teen');
        } else
        if(this.clickCount() > 20) {
            this.level('Adult');
        }
    };
};

ko.applyBindings(new ViewModel());