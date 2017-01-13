Meteor.startup(function() {
    toolManager.addTool('bidirectional', {
        mouse: cornerstoneTools.bidirectional,
        touch: cornerstoneTools.bidirectionalTouch
    });

    toolManager.addTool('nonTarget', {
        mouse: cornerstoneTools.nonTarget,
        touch: cornerstoneTools.nonTargetTouch
    });

    toolManager.addTool('scaleOverlayTool', {
        mouse: cornerstoneTools.scaleOverlayTool,
        touch: cornerstoneTools.scaleOverlayTool
    });

    toolManager.addTool('deleteLesionKeyboardTool', {
        mouse: cornerstoneTools.deleteLesionKeyboardTool,
        touch: cornerstoneTools.deleteLesionKeyboardTool
    });

    toolManager.addTool('targetCR', {
        mouse: cornerstoneTools.targetCR,
        touch: cornerstoneTools.targetCRTouch
    });

    toolManager.addTool('targetUN', {
        mouse: cornerstoneTools.targetUN,
        touch: cornerstoneTools.targetUNTouch
    });

    toolManager.addTool('targetEX', {
        mouse: cornerstoneTools.targetEX,
        touch: cornerstoneTools.targetEXTouch
    });

    // Update default state for tools making sure each tool is only inserted once
    let currentDefaultStates = toolManager.getToolDefaultStates();
    let newDefaultStates = {
        enable: [ 'scaleOverlayTool' ],
        deactivate: ['bidirectional', 'nonTarget', 'length', 'targetCR', 'targetUN', 'targetEX'],
        activate: [] // 'deleteLesionKeyboardTool'
    };

    for (let state in newDefaultStates) {
        newDefaultStates[state].forEach(function(tool) {
            let tools = currentDefaultStates[state];
            // make sure each tool is only inserted once
            if (tools && tools.indexOf(tool) < 0) {
                tools.push(tool);
            }
        });
    }

    toolManager.setToolDefaultStates(currentDefaultStates);

});
