/*

    <link rel="stylesheet" href="tmp.css" media="screen and (max-width: 992px)">
    <script src="tmp.js"></script>

<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" media="screen and (max-width: 992px)">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>

*/

// loading and init
$(window).load(function() {
    var totalWidth = window.innerWidth;
    var colWidth = Math.round(totalWidth / 12);
    var elements = [];
    $('.editable-style').each(function(){
        var numCol = Math.max(1, Math.round($(this).width() / colWidth));
        // console.log('www', $(this).get(0), $(this).width(), numCol);
        elements.push({
            element: this,
            numCol: numCol
        });
    });
    for(var idx in elements){
/*
        $(elements[idx].element).addClass('col-xs-' + Math.max(1, Math.round(elements[idx].numCol/4)));
        $(elements[idx].element).addClass('col-sm-' + Math.max(1, Math.round(elements[idx].numCol/2)));
        $(elements[idx].element).addClass('col-md-' + Math.max(1, Math.round(elements[idx].numCol)));
*/
        $(elements[idx].element).addClass('col-sm-' + elements[idx].numCol);
        $(elements[idx].element).addClass('col-md-' + Math.max(1, Math.round(elements[idx].numCol/2)));
        $(elements[idx].element).addClass('col-xs-' + Math.min(12, elements[idx].numCol*2));
    }
    $('body').addClass('tmp');
});
