
/**
 * [RemoveBookmarks : Remove All bookmarks from PDF]
 */
function RemoveBookmarks() {

    if (event.target == null) {
        app.alert('There is not open document to process', 1, 0);
        return; 
    }
    var bm = this.bookmarkRoot;
    this.pane = "nobookmarks";
    if (this.bookmarkRoot.children != null) {
        try {

            var bmToDeleteArray = [];
            var subBmToDeleteArray = [];
            var ibmLength = bm.children.length;

            for (var i = 0; i < ibmLength; i++) {
                var bmToCheck = bm.children[i];
                if ((bm.children[i].children != null)) {
                    if (bm.children[i].children[0].children != null) {
                        var mycount = bm.children[i].children[0].children.length;
                        for (var k = 0; k < mycount; k++) {
                            subBmToDeleteArray[k] = bm.children[i].children[0].children[k];
                        }
                        for (var k = 0; k < mycount; k++) {
                            subBmToDeleteArray[k].remove();
                        }
                    }
                    bm.insertChild(bmToCheck.children[0], bm.children.length);
                    bmToDeleteArray[bmToDeleteArray.length] = bmToCheck;
                }
            }
            for (var i = 0; i < bmToDeleteArray.length; i++) {
                bmToDeleteArray[i].remove();
            }
            delete bmToDeleteArray;
            delete subBmToDeleteArray;
        } finally {
            this.pane = "bookmarks";
        } 
    }; 
    return;
}
app.addMenuItem({
    cName: "Clean Bookmarks",
    cParent: "File",
    cExec: "RemoveBookmarks()",
    cEnable: "event.rc = event.target != null",
    nPos: 0
});