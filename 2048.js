function fireKeyEvent(el, evtType, keyCode){
	var doc = el.ownerDocument,
		win = doc.defaultView || doc.parentWindow,
		evtObj;
	if(doc.createEvent){
		if(win.KeyEvent) {
			evtObj = doc.createEvent('KeyEvents');
			evtObj.initKeyEvent( evtType, true, true, win, false, false, false, false, keyCode, 0 );
		}
		else {
            evtObj = doc.createEvent('UIEvents');
            
			Object.defineProperty(evtObj, 'keyCode', {
		        get : function() { return this.keyCodeVal; }
		    });     
		    Object.defineProperty(evtObj, 'which', {
		        get : function() { return this.keyCodeVal; }
            });
        
			evtObj.initUIEvent( evtType, true, true, win, 1 );
			evtObj.keyCodeVal = keyCode;
			if (evtObj.keyCode !== keyCode) {
		        console.log("keyCode " + evtObj.keyCode + " 和 (" + evtObj.which + ") 不匹配");
		    }
		}
		el.dispatchEvent(evtObj);
	} 
	else if(doc.createEventObject){
		evtObj = doc.createEventObject();
		evtObj.keyCode = keyCode;
		el.fireEvent('on' + evtType, evtObj);
	}
}

function importJquery(){
    var head = document.getElementsByTagName('head')[0]
    var script = document.createElement('script');

    script.type = 'text/javascript';

    script.src = "http://code.jquery.com/jquery.js";

    head.appendChild(script);
}


function left(){
    fireKeyEvent($(".game-container"), "click", 37);
}
function right(){
    fireKeyEvent($(".game-container"), "click", 39);
}
function up(){
    fireKeyEvent($(".game-container"), "click", 38);
}
function down(){
    fireKeyEvent($(".game-container"), "click", 40);
}

function getPostion(position_string) {
    position_string = position_string.split(" ")[2];
    position_string = position_string.split("-");

    return {//网页中的地址中前一个数字是纵坐标，后一个是横坐标。position-2-1
        y : position_string[2],
        x : position_string[3]
    }
}

function getSumScore(keyDownType) {
    var nodes = [[]];

    var nodes_context = $(".tile");

    for(var i = 0; i < nodes_context.length; i++){
        var position = getPostion( nodes_context[i].className )

        nodes[position.x][position.y] = nodes_context[i].innerText;
    }

    switch(keyDownType){
        case "up" :  
            for(var column = 0; column < nodes[0].length ; column++){//以列为单位,从左往右
                for(var row = nodes.length-1; row >= 0 ; row--){//以行为单位，从下往上
                    console.log("row:" + row + ", column:" + column);

                    if(nodes[row][column] != undefined && nodes[row][column] != 0){
                    
                        var temp = nodes[row][column];
                    
                        for(var index = (row-1); index >= 0; index-- ){
                            if(nodes[index][column] == undefined || nodes[index][column] == 0){//是空节点的话就跳过
                                continue;
                            }
                        
                            if( nodes[index][column] == temp ){ //当两个节点的值相等时，把下面的值合并上去，并清除下面的值
                                nodes[index][column] = parseInt( nodes[index][column] ) * 2;
                            
                                nodes[row][column] = undefined;

                                row = index;//遍历下一个元素（合并后的下一个元素）
                            }

                            break;
                        }
                    }
                }
            
                for(var index_check = nodes.length-1; index_check > 0; index_check--){
                    var present = nodes[index_check][column];
                    var next = nodes[index_check-1][column];
                
                    if(present == undefined || present == 0){
                        continue;
                    }
                
                    if( next == undefined || next == 0 ){
                        nodes[index_check-1][column] = present;
                        nodes[index_check][column] = undefined;
                    }
                }
            }

            break;
        case "down" : 
            for(var column = 0; column < nodes[0].length ; column++){//以列为单位,从左到右
                for(var row = 0; row <nodes.length ; row++){//以行为单位，从上到下
                    console.log("row:" + row + ", column:" + column);

                    if(nodes[row][column] != undefined && nodes[row][column] != 0){
                    
                        var temp = nodes[row][column];
                    
                        for(var index = (row+1); index < nodes.length; index++ ){
                            if(nodes[index][column] == undefined || nodes[index][column] == 0){//是空节点的话就跳过
                                continue;
                            }
                        
                            if( nodes[index][column] == temp ){ //当两个节点的值相等时，把下面的值合并上去，并清除下面的值
                                nodes[index][column] = parseInt( nodes[index][column] ) * 2;
                            
                                nodes[row][column] = undefined;

                                row = index;//遍历下一个元素（合并后的下一个元素）
                            }

                            break;
                        }
                    }
                }

                for(var index_check = 0; index_check < nodes.length-1; index_check++){
                    var present = nodes[index_check][column];
                    var next = nodes[index_check+1][column];

                    if(present == undefined || present == 0){
                        continue;
                    }
                
                    if( next == undefined || next == 0 ){
                        nodes[index_check+1][column] = present;
                        nodes[index_check][column] = undefined;
                    }
                }

            }

            break;
        case "left" : 
            for(var column = 0; column < nodes[0].length ; column++){//以列为单位,向上移动
            for(var row = nodes.length-1; row >= 0 ; row--){
                console.log("row:" + row + ", column:" + column);

                if(nodes[row][column] != undefined || nodes[row][column] == 0){
                
                    var temp = nodes[row][column];
                
                    for(var index = (row-1); index >= 0; index-- ){
                        if(nodes[index][column] == undefined || nodes[index][column] == 0){//是空节点的话就跳过
                            continue;
                        }
                    
                        if( nodes[index][column] == temp ){ //当两个节点的值相等时，把下面的值合并上去，并清除下面的值
                            nodes[index][column] = parseInt( nodes[index][column] ) * 2;
                        
                            nodes[row][column] = undefined;

                            row = index;//遍历下一个元素（合并后的下一个元素）
                        }

                        break;
                    }
                }
            }
        
            for(var index_check = nodes.length-1; index_check > 0; index_check--){
                var present = nodes[index_check][column];
                var next = nodes[index_check-1][column];
            
                if(present == undefined || present == 0){
                    continue;
                }
            
                if( next == undefined || next == 0 ){
                    nodes[index_check-1][column] = present;
                    nodes[index_check][column] = undefined;
                }
            }
        }


            break;
        case "right" : 
        for(var column = 0; column < nodes[0].length ; column++){//以列为单位,向上移动
            for(var row = nodes.length-1; row >= 0 ; row--){
                console.log("row:" + row + ", column:" + column);

                if(nodes[row][column] != undefined){
                
                    var temp = nodes[row][column];
                
                    for(var index = (row-1); index >= 0; index-- ){
                        if(nodes[index][column] == undefined || nodes[index][column] == 0){//是空节点的话就跳过
                            continue;
                        }
                    
                        if( nodes[index][column] == temp ){ //当两个节点的值相等时，把下面的值合并上去，并清除下面的值
                            nodes[index][column] = parseInt( nodes[index][column] ) * 2;
                        
                            nodes[row][column] = undefined;

                            row = index;//遍历下一个元素（合并后的下一个元素）
                        }

                        break;
                    }
                }
            }
        
            for(var index_check = nodes.length-1; index_check > 0; index_check--){
                var present = nodes[index_check][column];
                var next = nodes[index_check-1][column];
            
                if(present == undefined || present == 0){
                    continue;
                }
            
                if( next == undefined || next == 0 ){
                    nodes[index_check-1][column] = present;
                    nodes[index_check][column] = undefined;
                }
            }
        }


            break;
    }
}

function runTheGame(){

}

