/**
 * Created by vidaluson on 2/9/15.
 */

var initialCats = [
    {
        name: 'Cat1',
        imgSrc: 'images/cat1.jpg',
        clickCount: 0,
        nicknames: ['Cookie Monster','Big Bird','Oscar The Grouch']
    },
    {
        name: 'Cat2',
        imgSrc: 'images/cat2.jpg',
        clickCount: 0,
        nicknames: ['Wolverine','Cyclops']
    },
    {
        name: 'Cat3',
        imgSrc: 'images/cat3.jpg',
        clickCount: 0,
        nicknames: ['Superman','Batman','SpiderMan']
    },
    {
        name: 'Cat4',
        imgSrc: 'images/cat4.jpg',
        clickCount: 0,
        nicknames: ['Joker','Riddler','Penguin','Two-Face']
    },
    {
        name: 'Cat5',
        imgSrc: 'https://placekitten.com/g/200/300',
        clickCount: 0,
        nicknames: ['Spongebob Squarepants','Gary','Squidwork','Patrick']
    },
    {
        name: 'Cat6',
        imgSrc: 'https://placekitten.com/g/250/350',
        clickCount: 0,
        nicknames: ['Iron Man','Thor','Hulk','Captain America']
    }
];

var Cat = function (data) {
    this.clickCount = ko.observable(data.clickCount);
    this.name = ko.observable(data.name);
    this.imgSrc = ko.observable(data.imgSrc);
    this.nicknames = ko.observableArray(data.nicknames);
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
};


var ViewModel = function () {
    var self = this;

    this.catList = ko.observableArray([]);

    initialCats.forEach(function (catItem) {
        self.catList.push(new Cat(catItem));
    });

    this.currentCat = ko.observable(this.catList()[0]);

    this.incrementCounter = function () {
        self.currentCat().clickCount(self.currentCat().clickCount() + 1);
    };

    this.changeCat = function (clickedCat) {
        self.currentCat(clickedCat);
    }
};

ko.applyBindings(new ViewModel());