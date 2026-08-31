function start() {
let clickableLink;

//Things to do:
// 1. set content script so that when you click the link, it goes to that element on the page, without reloading
// 2. Figure out a way to save bookmark links.

//Future Update: grab closest section heading, so I have a id'd element to scroll down to. For example, if paragraph text is selected instead of a heading.

  let btn = document.querySelector("#btn");

  async function saveBookmark() {
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    const message = await chrome.tabs.sendMessage(tab.id, 'getInfo');
    
    console.log("message.parentID = " + message.parentID);
    console.log("message.pageLink = " + message.pageLink);

    let pageLink = message.pageLink;
    let parentID = message.parentID;

    //recieve parentElement from content script
    let bookmarkLink = pageLink + "#" + parentID;
    console.log("bookmarkLink = " + bookmarkLink);

    let container = document.querySelector("#bookmarks");

    let wrapper = document.createElement("div");
    wrapper.classList.add("bookmarkWrapper");

    // let name = document.createElement("p");
    // name.classList.add("name");

    let link = document.createElement("a");
    link.classList.add("link");
    link.href = bookmarkLink;
    link.innerHTML = pageLink;

    //add elements to their parent elements.
    wrapper.appendChild(link);
    container.appendChild(wrapper);
  }

  function clickLink() {
    clickableLink = document.querySelectorAll(".link");
    clickableLink.forEach(() => {
      parentID.scrollIntoView();
      console.log(parentID)
    });
  }

  btn.addEventListener("click", saveBookmark);
  clickableLink.addEventListener('click', clickLink)
};

window.addEventListener("load", start);

//NOTES:

//----------------------------------------------------------------------------------//

// Content Scripts: https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts

// also, have 2 scripts: one for popup, that manages button and adding elements (is linked in the popup itself), and one for running on the page (content script, it isn't linked to the popup, it runs separately) where it would grab the parent element and ID. Messages would be passed between the two scripts.

// Chrome Message Passing Docs: https://developer.chrome.com/docs/extensions/develop/concepts/messaging
// Program Flow:
// 1. User selects text, clicks "save bookmark."
// 2. Popup JS sends message to content script to grab ID
// 3. Content script grabs ID and sends response with ID
// 4. Extension script recieves ID and makes link, saves link in Chrome storage API. (Link: https://developer.chrome.com/docs/extensions/reference/api/storage)
