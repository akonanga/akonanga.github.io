/**
 * Created by vidaluson on 2/4/15.
 */
$(document).ready(function () {
    var model = {
        shownCat: null,
        cats: [
            {
                'name': 'Cat1',
                'image': 'images/cat1.jpg',
                'clickCnt': 0
            },
            {
                'name': 'Cat2',
                'image': 'images/cat2.jpg',
                'clickCnt': 0
            },
            {
                'name': 'Cat3',
                'image': 'images/cat3.jpg',
                'clickCnt': 0
            },
            {
                'name': 'Cat4',
                'image': 'images/cat4.jpg',
                'clickCnt': 0
            },
            {
                'name': 'Cat5',
                'image': 'https://placekitten.com/g/200/300',
                'clickCnt': 0
            },
            {
                'name': 'Cat6',
                'image': 'https://placekitten.com/g/250/350',
                'clickCnt': 0
            }
        ]
    };

    var controller = {
        init: function () {
            model.shownCat = 0;
            view_catList.init();
            view_catDetail.init();
        },
        getCats: function () {
            return model.cats;
        },
        getShownCat: function() {
            return model.cats[model.shownCat];
        },
        setShownCat: function (cat) {
            model.shownCat = cat;
        },
        incrementClickCnt: function () {
            view_catDetail.render(++model.cats[model.shownCat].clickCnt);
        }
    };

    var view_catList = {
        init: function () {
            this.catList = document.getElementById('catList');
            this.render();
        },
        render: function () {
            var catArray = controller.getCats();
            this.catList.innerHTML = '';
            for (var cat in catArray) {
                // Replace template markers with data
                var liElement = document.createElement('li');
                liElement.textContent = catArray[cat].name;
                // Delegated event to listen for LI click
                liElement.addEventListener('click', (function (cat) {
                    return function() {
                        controller.setShownCat(cat);
                        view_catDetail.render();
                    }
                })(cat));
                this.catList.appendChild(liElement);
            }
        }
    };

    var view_catDetail = {
        init: function () {
            this.catDetail = document.getElementById('catDetail');
            this.catHeading = document.getElementById('catHeading');
            this.catImage = document.getElementById('catImage');
            this.catClickCnt = document.getElementById('catClickCnt');
            // Delegated event to listen for image click
            this.catImage.addEventListener('click', function (evt) {
                controller.incrementClickCnt();
            });
            this.render();
        },
        render: function () {
            var shownCat = controller.getShownCat();
            this.catHeading.textContent = shownCat.name;
            this.catImage.src = shownCat.image;
            this.catClickCnt.textContent = shownCat.clickCnt;
        }
    }

    controller.init();
});
