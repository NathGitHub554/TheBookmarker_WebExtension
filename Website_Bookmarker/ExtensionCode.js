function start() {
  // Source - https://stackoverflow.com/a/26308552
  // Posted by chintan adatiya, modified by community. See post 'Timeline' for change history
  // Retrieved 2026-08-19, License - CC BY-SA 3.0
  let btn = document.querySelector("#btn");
  console.log(btn);

  async function saveBookmark() {
    const message = await chrome.runtime.sendMessage("getID");
    console.log(message);

    //define link same as above.
    let pageLink = window.location.href;
    //recieve parentElement from content script
    let bookmarkLink = pageLink + "#" + parentID;

    let container = document.querySelector("#bookmarks");
    console.log(container);

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

  btn.addEventListener("click", saveBookmark);
}

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
