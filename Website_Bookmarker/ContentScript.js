function handleMessages(message, sender, sendResponse) {
    if (message !== 'getID') return;

    let parentID = window.getSelection().anchorNode.parentElement.id;

    sendResponse('this is a response for the message');

    return true;

}

chrome.runtime.onMessage.addListener(handleMessages);