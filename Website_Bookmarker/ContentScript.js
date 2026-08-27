function handleMessages(message, sender, sendResponse) {
    if (message !== 'getInfo') return;

    let parentID = window.getSelection().anchorNode.parentElement.id;
    let pageLink = window.location.href;

    sendResponse({
        parentID: parentID,
        pageLink: pageLink
    });

    return true;

}

chrome.runtime.onMessage.addListener(handleMessages);