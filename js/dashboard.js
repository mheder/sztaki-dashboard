//Copyright 2012 Milán Unicsovics, MTA SZTAKI

//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at

//       http://www.apache.org/licenses/LICENSE-2.0

//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

$(document).ready(function() { 

//INIT FROM XML
$.ajax({
    type: "GET",
    //dashboard init config file
    url: "dashboard_config.xml ",
    dataType: "xml",
    success: function(xml) {
        $(xml).find('box').each(function(){
            //get attributes
            var id          = $(this).attr('id'); //box unique ID
            var url         = $(this).attr('url'); //load box from url
            var bname       = $(this).attr('bname'); //box name
            var serverside  = $(this).attr('serverside'); //server or client side loading required
            
            //check if client side loading required
            if (serverside=='false') {
                var text        = ''; //box text
                if (url!='_') {
                    //get text from url
                    $.ajax({ type: "GET",   
                    url: url,   
                    async: false,
                    success : function(html)
                    {
                        text = html;
                    }
                    });
                }

                //add box
                $(".restraint").append('<div id="'+bname+'" class="box obstacle"'+'status="show"><div class="content"><div class="incontent"><div class="incontentheader"/>'+text+'</div></div></div>');
            }
        });

        //set resizable and draggable properties
        $(".content")
            .resizable({ handles: "all", autoHide: true })
            .parent()
            .draggable({ start: function(event, ui) { $(this).removeClass('obstacle'); },stop: function(event, ui) { $(this).addClass('obstacle'); }, obstacle: ".obstacle", preventCollision: true, restraint: ".restraint", preventProtrusion: true },{ handle: '.incontentheader' });
        
        //call toolbar init
        inittoolbar();
    }
});

//DASHTOOLBAR INIT
function inittoolbar(){
    //add logo
    $('#dashtoolbar').append('<img src="img/logo.jpg" alt="logo"/>');

    //add tools to dashtoolbar
    var i=0;
    $(".box").each(function(){
        $('#dashtoolbar').append('<div class="tool" id="tool'+this.id.substring(3)+'">'+'<div class="checkbox-clicked" /> <span class="toolname">'+this.id+'</span></div>');
        i++;
    });

    //onclick function
    $(".tool").click(function(e){
    //if box is visible then hide it
    if ($('#box'+e.currentTarget.id.substring(4)).attr('status')=='show')
    {
        $('#box'+e.currentTarget.id.substring(4)).fadeOut();
        $('#box'+e.currentTarget.id.substring(4)).attr('status','hide');
        $('#tool'+e.currentTarget.id.substring(4)).html('<div class="checkbox" /> '+'<span class="toolname">box'+e.currentTarget.id.substring(4)+'</span>');
    }
    //else show the box
    else
    {
        $('#box'+e.currentTarget.id.substring(4)).fadeIn();
        $('#box'+e.currentTarget.id.substring(4)).attr('status','show');
        $('#tool'+e.currentTarget.id.substring(4)).html('<div class="checkbox-clicked" /> '+'<span class="toolname">box'+e.currentTarget.id.substring(4)+'</span>');
    }
    });
    
    //checkbox function
    $('.checkbox').click(function(e){
        if ($(this).hasClass('checkbox')) {
            $(this).removeClass('checkbox');
            $(this).addClass('checkbox-clicked');
        }
        else {
            $(this).removeClass('checkbox-clicked');
            $(this).addClass('checkbox');
        }
    });
}
      
//RIGHT CLICK
$('#wall').contextMenu('myMenu1', {
    //example bindings
    bindings:   {
        'open': function(t) {
            alert('Trigger was '+t.id+'\nAction was Open');
                            },
        'save': function(t) {
            alert('Trigger was '+t.id+'\nAction was Save');
                            },
        'delete': function(t) {
            alert('Trigger was '+t.id+'\nAction was Delete');
                            }
                }
    });
});

//AJAX LOAD
//load content into div from url
function reloadBoxHtml(id,html_address) {
    $.ajax({
          type: 'GET',
          url: html_address,
          dataType: "html",
          success: function(html) {
          $('#'+id).children().children().append(html);
          //remove loading cursor
          $('#wall').removeClass('loading');
      }
    });
}
//load content into div from text
function reloadBoxText(id,text) {
    $('#'+id).children().children().append(text);
}

//list of boxes
function listBox() {
    var list=new Array();
    $(".box").each(function(){
    list.push($(this).attr('id'));
    });
    alert(list.toString());
}
