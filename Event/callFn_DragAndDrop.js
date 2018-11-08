/*
 * The DnD API is quite complicated, and browsers are not fully interoperable.
 * This example gets the basics right, but each browser is a little different
 * and each one seems to have its own unique bugs. This code does not attempt
 * browser-specific workarounds.
 */
 /*
  * 为什么dragenter/dragleave event需要注意 bubble?本例中使用entered变量的作用是什么?
  * 因为当用户拖动element进入target时，会触发 ondrayenter 事件。如果像本例中，ondrayenter事件是注册在ul上，
  * 而这个ul又包含了若干个li,设想一下这种情况，用户的鼠标先进入了一个li，又进入另一个li，
  * 这两个li上的ondrayenter都会引起bubble。导致 ul 上的ondrayenter 事件被触发，
  * 而我们希望实现当鼠标进入第一个li时，这个li高亮，当鼠标离开时，这个li恢复之前的状态。
  * 所以需要区别对待每个 li。
  * 所以这个问题可以总结为：一个注册在一堆elementes的父节点上的event handler，如何分别对待每个elementes？
  * 答案是通过entered. entered 初始值是0，当第一次进入一个 li 时，entered+1, 再次进入另一个 li ，entered会再+1
  * 这里也利用闭包特性 closure ,每次进入的 li 对应着各个 entered ，所以我们可以通过 entered 的值判断现在鼠标是否是第一次进入
  * 如果是第一次进入，需要判断dataTransfer.types 来判断是否需要做出反应
  * 如果不是第一次进入，就直接返回false .
  */
whenReady(
    function() {  // Run this function when the document is ready
    // Find all <ul class='dnd'> elements and call the dnd() function on them
    var lists = document.getElementsByTagName("ul");
    var regexp = /\bdnd\b/;
    for(var i = 0; i < lists.length; i++)
        if (regexp.test(lists[i].className)) dnd(lists[i]);
    // Add drag-and-drop handlers to a list element
    function dnd(list) {
        var original_class = list.className;  // Remember original CSS class
        var entered = 0;                      // Track enters and leaves
        // This handler is invoked when a drag first enters the list. It checks
        // that the drag contains data in a format it can process and, if so,
        // returns false to indicate interest in a drop. In that case, it also
        // highlights the drop target to let the user know of that interest.
        list.ondragenter = function(e) {
            e = e || window.event;  // Standard or IE event
            var from = e.relatedTarget; 
            // dragenter and dragleave events bubble, which makes it tricky to
            // know when to highlight or unhighlight the element in a case like
            // this where the <ul> element has <li> children. In browsers that
            // define relatedTarget we can track that.
            // Otherwise, we count enter/leave pairs
            // If we entered from outside the list or if
            // this is the first entrance then we need to do some stuff
            entered++;
            if ((from && !ischild(from, list)) || entered == 1) {
                // All the DnD info is in this dataTransfer object
                var dt = e.dataTransfer; 
                // The dt.types object lists the types or formats that the data
                // being dragged is available in. HTML5 says the type has a
                // contains() method. In some browsers it is an array with an
                // indexOf method. In IE8 and before, it simply doesn't exist.
                var types = dt.types;    // What formats data is available in
                // If we don't have any type data or if data is
                // available in plain text format, then highlight the
                // list to let the user know we're listening for drop
                // and return false to let the browser know.
                if (!types ||                                           // IE
                    (types.contains && types.contains("text/plain")) || //HTML5
                    (types.indexOf && types.indexOf("text/plain")!=-1)) //Webkit
                {
                    list.className = original_class + "droppable";
                    return false;
                }
                // If we don't recognize the data type, we don't want a drop
                return;   // without canceling
            }
            return false; // If not the first enter, we're still interested
        };
        // This handler is invoked as the mouse moves over the list.
        // We have to define this handler and return false or the drag
        // will be canceled.
        list.ondragover = function(e) { return false; };
        // This handler is invoked when the drag moves out of the list
        // or out of one of its children. If we are actually leaving the list
        // (not just going from one list item to another), then unhighlight it.
        list.ondragleave = function(e) {
            e = e || window.event;
            var to = e.relatedTarget;
            // If we're leaving for something outside the list or if this leave
            // balances out the enters, then unhighlight the list
            entered--;
            if ((to && !ischild(to,list)) || entered <= 0) {
                list.className = original_class;
                entered = 0;
            }
            return false;
        };
        // This handler is invoked when a drop actually happens.
        // We take the dropped text and make it into a new <li> element
        list.ondrop = function(e) {
            e = e || window.event;       // Get the event
            // Get the data that was dropped in plain text format.
            // "Text" is a nickname for "text/plain". 
            // IE does not support "text/plain", so we use "Text" here.
            var dt = e.dataTransfer;       // dataTransfer object
            var text = dt.getData("Text"); // Get dropped data as plain text.
            // If we got some text, turn it into a new item at list end.
            if (text) {
                var item = document.createElement("li"); // Create new <li>
                item.draggable = true;                   // Make it draggable
                item.appendChild(document.createTextNode(text)); // Add text
                list.appendChild(item);                  // Add it to the list
                // Restore the list's original style and reset the entered count
                list.className = original_class;
                entered = 0;
                return false;
            }
        };
        // Make all items that were originally in the list draggable
        var items = list.getElementsByTagName("li");
        for(var i = 0; i < items.length; i++)
            items[i].draggable = true;
        // And register event handlers for dragging list items.
        // Note that we put these handlers on the list and let events
        // bubble up from the items.
        // This handler is invoked when a drag is initiated within the list.
        list.ondragstart = function(e) {
            var e = e || window.event;
            var target = e.target || e.srcElement;
            // If it bubbled up from something other than a <li>, ignore it
            if (target.tagName !== "LI") return false;
            // Get the all-important dataTransfer object
            var dt = e.dataTransfer;
            // Tell it what data we have to drag and what format it is in
            dt.setData("Text", target.innerText || target.textContent) ;
            // Tell it we know how to allow copies or moves of the data
            dt.effectAllowed = "copyMove";
        };
        // This handler is invoked after a successful drop occurs
        list.ondragend = function(e) {
            e = e || window.event;
            var target = e.target || e.srcElement;
            // If the drop was a move, then delete the list item.
            // In IE8, this will be "none" unless you explicitly set it to
            // move in the ondrop handler above.  But forcing it to "move" for
            // IE prevents other browsers from giving the user a choice of a
            // copy or move operation.
            if (e.dataTransfer.dropEffect === "move")
                target.parentNode.removeChild(target);
        }
        // This is the utility function we used in ondragenter and ondragleave.
        // Return true if a is a child of b.
        function ischild(a,b) {
            for(; a; a = a.parentNode) if (a === b) return true;
            return false;
        }
    }
});