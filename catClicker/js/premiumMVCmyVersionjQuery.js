/**
 * Created by vidaluson on 2/4/15.
 */
$(document).ready(function () {
    var model = {
        shownCat: null,
        isAdminEntryShown: false,
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
            view_catAdmin.init();
        },
        getCats: function () {
            return model.cats;
        },
        getShownCat: function() {
            if(model.isAdminEntryShown) {
                view_catAdmin.renderEntry(model.cats[model.shownCat]);
            }
            return model.cats[model.shownCat];
        },
        setShownCat: function (cat) {
            model.shownCat = cat;
        },
        incrementClickCnt: function () {
            view_catDetail.render(++model.cats[model.shownCat].clickCnt);
        },
        showEntry: function () {
            model.isAdminEntryShown = true;
            view_catAdmin.$adminButton.attr('disabled', model.isAdminEntryShown);
            this.getShownCat();
        },
        hideEntry: function () {
            model.isAdminEntryShown = false;
            view_catAdmin.$adminButton.attr('disabled', model.isAdminEntryShown);
            view_catAdmin.$catAdminEntry.hide();
        },
        updateCat: function () {
            model.cats[model.shownCat].name = view_catAdmin.$catAdminName.val();
            model.cats[model.shownCat].image = view_catAdmin.$catAdminImageSource.val();
            model.cats[model.shownCat].clickCnt = view_catAdmin.$catAdminClickCnt.val();
            this.hideEntry();
            view_catList.render();
            view_catDetail.render();
        }
    };

    var view_catList = {
        init: function () {
            this.$catList = $('#catList');
            this.render();
        },
        render: function () {
            var catArray = controller.getCats();
            this.$catList.empty();
            var liElement = '';
            for (var cat in catArray) {
                liElement += '<li data-id="' + cat + '">' + catArray[cat].name + '</li>';
            }
            this.$catList.append(liElement)
                .children('li')
                .off('click')
                .on('click', function (evt) {
                    controller.setShownCat($(this).data('id'));
                    view_catDetail.render();
                });
        }
    };

    var view_catDetail = {
        init: function () {
            this.$catDetail = $('#catDetail');
            this.$catHeading = $('#catHeading');
            this.$catImage = $('#catImage');
            this.$catClickCnt = $('#catClickCnt');
            // Delegated event to listen for image click
            this.$catImage
                .off('click')
                .on('click', function (evt) {
                    controller.incrementClickCnt();
                });
            this.render();
        },
        render: function () {
            var shownCat = controller.getShownCat();
            this.$catHeading.html(shownCat.name);
            this.$catImage.attr('src', shownCat.image);
            this.$catClickCnt.html(shownCat.clickCnt);
        }
    };

    var view_catAdmin = {
        init: function () {
            this.$adminButton = $('#adminButton');
            this.$catAdminEntry = $('#catAdminEntry');
            this.$catAdminName = $('#catAdminName');
            this.$catAdminImageSource = $('#catAdminImageSource');
            this.$catAdminClickCnt = $('#catAdminClickCnt');
            this.$catAdminCancel = $('#catAdminCancel');
            this.$catAdminSave = $('#catAdminSave');
            this.render();
        },
        render: function () {
            this.$catAdminEntry.hide();
            this.$adminButton
                .off('click')
                .on('click', function () {
                    controller.showEntry();
                });
            this.$catAdminCancel
                .off('click')
                .on('click', function () {
                    controller.hideEntry();
                });
            this.$catAdminSave
                .off('click')
                .on('click', function () {
                    controller.updateCat();
                });
        },
        renderEntry: function (cat) {
            this.$catAdminName.val(cat.name);
            this.$catAdminImageSource.val(cat.image);
            this.$catAdminClickCnt.val(cat.clickCnt);
            this.$catAdminEntry.show();
        }
    };

    controller.init();
});
