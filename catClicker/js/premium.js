/**
 * Created by vidaluson on 2/4/15.
 */
$(document).ready(function () {
    var catArray = [
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
        },
    ];
    var catActiveNdxPos = null;

    var tempLI = [];
    tempLI.push('<ul>');
    for (var cat in catArray) {
        tempLI.push('<li id="' + catArray[cat].name + '"><a href="#" class="catCLA" data-ndxPos="' + cat + '">' + catArray[cat].name + '</a></li>');
    }
    tempLI.push('</ul>');
    $('#catList').append(tempLI.join(''));

    $('.catCLA').click(function () {
        var $this = $(this);
        catActiveNdxPos = $this.attr('data-ndxPos');
        $('#catDetails').empty()
            .append('<h3>' + catArray[catActiveNdxPos].name + '</h3>'
                    + '<div class="catImageCLA"><img src="' + catArray[catActiveNdxPos].image + '"/></div>'
                    + '<div>Number of clicks: <span class="numClickCLA">' + catArray[catActiveNdxPos].clickCnt + '</span></div>'
        );

        $('.catImageCLA').off('click').on('click',function () {
            $('.numClickCLA').text(++catArray[catActiveNdxPos].clickCnt);
        })
    })

});
