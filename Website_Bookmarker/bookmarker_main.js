
function start() {
  // Source - https://stackoverflow.com/a/26308552
  // Posted by chintan adatiya, modified by community. See post 'Timeline' for change history
  // Retrieved 2026-08-19, License - CC BY-SA 3.0
  const btn = document.querySelector("#btn");

  //check out CONTENT SCRIPTS, which run on the actual page that's being visited: https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts

  //also, have 2 scripts: one for popup, that manages button and adding elements (is linked in the popup itself), and one for running on the page (content script, it isn't linked to the popup, it runs separately) where it would grab the parent element and ID. Messages would be passed between the two scripts.
  function saveBookmark() {
        //define link same as above.
    let pageLink = window.location.href;
    let parentID = window.getSelection().anchorNode.parentElement.id;

    let bookmarkLink = pageLink + "#" + parentID;


    let container = document.querySelector("#bookmarks");
    console.log(container)

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
