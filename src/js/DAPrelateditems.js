var imageViewTracking = null;

$( document ).ready(function() {
    imageViewTracking = {
        curPos: 1,
        numImages: 0,
        request: null,
        setFwdNext: function() {
            if(this.curPos == 0) { //first image, hide left arrow
                $('.mainImageLeft').hide();
            } else {
                var left = $('.mainImageLeft');
                left.show();
                left.attr('data-related-items-index', (parseInt(this.curPos) - 1) );
            }

            if(this.curPos == (parseInt(this.numImages) - 1) )  {//last image, hide right arrow
                $('.mainImageRight').hide();
            } else {
                var right = $('.mainImageRight');
                right.show();
                right.attr('data-related-items-index', (parseInt(this.curPos) + 1) );
            }
        },
        setMainDisplay : function(inIndex) {
            if( parseInt(inIndex) != inIndex || inIndex < 0 || inIndex >= relatedItemsList.length ) return false;
            var thisun = relatedItemsList[inIndex];
            if(!thisun) return false;
            if(thisun.type == 'image') {
                var dlstring = '/download/image/' + thisun.root + '/' + thisun.root + '_size4.jpg';
                $('.mainImageItself').attr('src', thisun.url);
                $('.mainImageTitle').html(thisun.show);
                $('.mainImageTitle').attr('title', thisun.title);
                $('.mainImageItself').attr('alt', thisun.title);
                $('.mainImageItself').attr('title', thisun.title);
                $('.mainImageFileSize').html(thisun.size);
                $('.mainImageDownload').attr('href', dlstring);
                $('.mainImage').show();
                $('.mainOembed').hide();
            } else if(thisun.type == 'missing_image') {
                /*
                var dlstring = 'http://placehold.it/200x200';
                $('.mainImageItself').attr('src', dlstring);
                $('.mainImageTitle').html(thisun.show);
                $('.mainImageTitle').attr('title', thisun.title);
                $('.mainImageItself').attr('alt', thisun.title);
                $('.mainImageItself').attr('title', thisun.title);
                $('.mainImageFileSize').html('This image is not yet imported.');
                $('.mainImageDownload').attr('href', dlstring);
                $('.mainImage').show();
                $('.mainOembed').hide();
                */
            } else if(thisun.type == 'oembed') {
                try {
                    //cancel anything going on request-wise
                    if (this.request && this.request.transport) {
                        this.request.transport.abort();
                    }
                    var query = {
                        url: thisun.url.trim(),
                        nowrap: 'on'
                    };
                    this.request = $.ajax({
                        url: 'https://noembed.com/embed',
                        type: 'GET',
                        data: query,
                        dataType: 'json',
                        success: function (res) {
                            if (res.html) {
                                var myembed = res.html;
                                myembed = myembed.replace('width=" 480"', '').replace('height="270"', '');
                                $('.Article-image.oembed-target').html(myembed);
                            } else {
                                console.log('no oembed for ' + thisun.url);
                                $('.Article-image.oembed-target').html('<iframe class="oembedfallback" src="' + thisun.url + '" sandbox"></iframe>');
                            }
                        }
                    });
                    //title info below display
                    $('.mainImageTitle').html(thisun.show);
                    $('.mainImageTitle').attr('title', thisun.title)
                    $('.mainImageItself').attr('alt', thisun.title);
                    $('.mainImageFileSize').html(thisun.size);
                    $('.Table-action .omebed-goto').attr('href', thisun.url);
                    $('.Table-action.omebed-goto').show();
                } catch(e) {
                    console.log('No oembed for ' + thisun.url)
                    $('.Article-image.oembed-target').html('<iframe class="oembedfallback" src="'+ thisun.url +'" sandbox style=""></iframe>');
                    //title info below display
                    $('.mainImageTitle').html(thisun.show);
                    $('.mainImageTitle').attr('title', thisun.title)
                    $('.mainImageItself').attr('alt', thisun.title);
                    $('.mainImageFileSize').html(thisun.size);
                    $('.Table-action .omebed-goto').attr('href', thisun.url);
                    $('.Table-action.omebed-goto').show();
                }
                $('.mainOembed').show();
                $('.mainImage').hide();
            } else if(thisun.type == 'audio' || thisun.type == 'sound') {
                $('.Article-image.oembed-target').html('<audio controls><source src="' + thisun.url + '"></audio>');//title info below display
                $('.mainImageTitle').html(thisun.show);
                $('.mainImageTitle').attr('title', thisun.title)
                $('.mainImageItself').attr('alt', thisun.title);
                $('.mainImageFileSize').html(thisun.size);
                $('.Table-action.omebed-goto').hide();
                $('.mainOembed').show();
                $('.mainImage').hide();
            } else if(thisun.type == 'video') {
                $('.Article-image.oembed-target').html('<video controls><source src="' + thisun.url + '"></video>');//title info below display
                $('.mainImageTitle').html(thisun.show);
                $('.mainImageTitle').attr('title', thisun.title)
                $('.mainImageItself').attr('alt', thisun.title);
                $('.mainImageFileSize').html(thisun.size);
                $('.Table-action.omebed-goto').hide();
                $('.mainOembed').show();
                $('.mainImage').hide();
            }
            imageViewTracking.curPos = inIndex;

            imageViewTracking.setFwdNext();
        },
        buildRelatedItemsList: function() {
            var outString = '';
            this.numImages = relatedItemsList.length;
            for(var i = 0; i < this.numImages; i++ ) {
                var myItem = relatedItemsList[i];
                var title, url;
                switch(myItem.type) {
                    case 'image':
                        url = myItem.url
                        break;
                    case 'missing_image':
                        continue;
                        //url = 'http://placehold.it/200x200';
                    case 'oembed':
                    case 'audio':
                    case 'video':
                    case 'partofcollection':
                        if(!myItem.show || myItem.show == '') {
                            myItem.show = myItem.type;
                        }
                        break;
                    default:
                        continue; //if not something we know how to handle, skip it
                }
                outString += '<tr class="related-items-list-item" data-related-items-index="' + i + '">';
                outString += '<td class="Table-fileTitle" title="' + myItem.title + '">'+ myItem.show + '</td>';
                outString += '<td class="Table-fileType">' + myItem.filetype.toLowerCase() + '</td>'
                outString += '<td class="Table-fileType">' + myItem.filesize + '</td>';
                if(myItem.type != 'missing_image') {
                    outString += '<td class="Table-actions"><a href="' + myItem.download + '" class="Table-action';
                    if (myItem.type == 'image') {
                        outString += 'Table-action--download">';
                    } else {
                        outString += '">Visit';
                    }
                    outString += '</a></td>';
                } else {
                    outString += '<td></td>';
                }
                outString += '</tr>';
            }
            $('.related-items-list tbody').html(outString);
            //set click events
            $('tr.related-images-list-item,tr.related-items-list-item, a.mainImageLeft, a.mainImageRight').unbind('click');
            $('tr.related-images-list-item,tr.related-items-list-item, a.mainImageLeft, a.mainImageRight').click(function() {
                imageViewTracking.setMainDisplay($(this).attr('data-related-items-index'));
            });
            setTimeout(function(){imageViewTracking.setMainDisplay(0);}, 10); //avoids duplication issue for first load
        }
    };

    imageViewTracking.curPos = 0;
    imageViewTracking.numImages = 0;
    if(typeof collectionList !== 'undefined' && collectionList && collectionList.length > 0) {
        $('.related-items-list.Table.Table--files').hide();
        wrangleCollection();
    } else if(typeof relatedItemsList !== 'undefined' && relatedItemsList.length > 0) {
        imageViewTracking.buildRelatedItemsList(); //also displays first item
        imageViewTracking.setFwdNext();
    }

});

function wrangleCollection() {
    if(!collectionList) {
        console.log('wrangleCollection: no collection');
        return;
    }
    var outString = '';
    for (var i=0; i< collectionList.length; i++) {
        var thisun = collectionList[i];
        outString += '<li class="entriesArchive-entry">';
        outString += '<figure class="EntriesArchive-picture">';
        outString += '<a href="/dap/item/' + thisun.dapID + '">';
        outString += '<img class src="' + thisun.thumbnail + '" alt="' + thisun.name + '">';
        outString += '</a></figure>';
        outString += '<summary class="EntriesArchive-summary">';
        outString += '<a href="/dap/item/' + thisun.dapID +'" class>' + thisun.name + '</a>';
        outString += '</summary>';
        outString += '<div class="EntriesArchive-metadata">';
        if(thisun.date) {
            outString += '<div><label>Date: </label><span>' + thisun.date + '</span></div>';
        }
        if(thisun.mediaFormat) {
            outString += '<div><label>Media Format: </label><span>' + thisun.mediaFormat + '</span></div>';
        }
        if(thisun.location) {
            outString += '<div><label>Location: </label><span>' + thisun.location + '</span></div>';
        }
        outString += '<li>';
    }

    outString = '<section class="EntriesArchive col-md-9 col-md-offset-1"><h4>Collection:</h4><ul class="EntriesArchive-list">' + outString + '</ul></section>';

    $('figure.Article-image').html(outString);

}
