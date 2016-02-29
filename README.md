# ContextMenu
MooTools Context Menu

slightly based on Simple Context Menu from http://www.webtoolkit.info]http://www.webtoolkit.info

Created By Pieter-Jan Piro - http://www.piro.ws

Edited to add simple touch handling

No longer requires MooTools with Compatibility


Sample Usage: (This code itself is for example - cut/paste won't work)

    Tasks.each(function(t) {
      tr = new Element('tr');
      tbody.adopt(tr.adopt(
        new Element('td').set('text',t.status_desc)).adopt(
        new Element('td',{'title':com}).set('text',t.name)).adopt(
        new Element('td',{'class':'atc'}).set('text',t.owner_name)).adopt(
        new Element('td',{'class':'atc'}).set('text',t.executant_name)).adopt(
        new Element('td',{'class':'atc' + t.due_class}).set('text', t.end_desc))
        .addEvent('click', function(){
        // show menu on touch for touchscren
          if ('ontouchstart' in document.documentElement) {
              return false;
          } else {
             Tasks.view(t.objectId)
          }
       })
      );
   // create context menu for row
      Tasks.createMenu(tr, t);
    });
      
//
// Create a context menu for the task
    Tasks.createMenu = function(tr, task) {
        menu = new Element('div', {'class':'ContextMenu'}).inject(document.getElement('body'));
        new Element('div', {'class':'close', 'style':'color:white'})
            .addEvent('click', function(){
                Tasks.Context.hide();
            }).inject(menu);

      // view, comment, child task buttons (no checks)
        new Element('a', {'href':'#Task_' + task.objectId, 'class':'ViewTask'})
            .set('text', 'View Task')
            .addEvent('click', function(){
                Tasks.view(task.objectId);
                if (Tasks.Context.currentMenu) Tasks.Context.hide();
            }).inject(menu);

      // new task form with parent area set
        new Element('a', {'href':'#Task_' + task.objectId, 'class':'ChildTask'})
            .set('text', 'Create Child Task')
            .addEvent('click', function(){
                Tasks.setChild(task.objectId, task.name);
                if (Tasks.Context.currentMenu) Tasks.Context.hide();
            }).inject(menu);

      // add a comment
        new Element('a', {'href':'#Task_' + task.objectId, 'class':'CommentTask'})
            .set('text', 'Add Comment')
            .addEvent('click', function(){
                Tasks.comment(task, {'title': 'Add A Comment', 'status': 'comment'});
                if (Tasks.Context.currentMenu) Tasks.Context.hide();
            }).inject(menu);

      // done button, must be creator or owner, must not be marked done or archived already
        if ( task.status != '25_done' && task.status != '30_archived' && task.status != '10_archived'){
            new Element('a', {'href':'#Task_' + task.objectId, 'class':'DoneTask'})
            .set('text', 'Mark As Done').addEvent('click', function(){
                Tasks.comment(task, {'title': 'Mark As Done', 'status': 'done'});
                if (Tasks.Context.currentMenu) Tasks.Context.hide();
            }).inject(menu);
        }
    // add the menu to the row
        tr.getChildren().each(function(c){ Tasks.Context.attachMenu(c, menu); });
    }
