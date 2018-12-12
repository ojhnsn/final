// To make sure we can uniquely identify each screenshot tab, add an id as a
// query param to the url that displays the screenshot.
// Note: It's OK that this is a global variable (and not in localStorage),
// because the event page will stay open as long as any screenshot tabs are
// open.
var glitchId = 100;

chrome.browserAction.onClicked.addListener(function () { // on extension icon

  chrome.tabs.captureVisibleTab(function (screenshotDataUrl) {
    var viewTabUrl = chrome.extension.getURL('screenshot.html?id=' + glitchId++)
    var targetId = null;

    chrome.tabs.onUpdated.addListener(function listener (tabId, changedProps) {
      // Check that the tab's id matches the tab we opened, and it's done loading.
      if (tabId != targetId || changedProps.status != 'complete') {
        return;
      }

      chrome.tabs.onUpdated.removeListener(listener);

      // Look through all views to find the window which will display the screenshot.
      // The url of the tab which will display the screenshot includes a query parameter with a unique id,
      // which ensures that exactly one view will have the matching URL.
      var views = chrome.extension.getViews();
      for (var i = 0, len = views.length; i < len; i++) {
        var view = views[i];
        if (view.location.href == viewTabUrl) {
          view.setScreenshotUrl(screenshotDataUrl);
          break;
        }
      }
    });

    // Open screenshot in new tab
    chrome.tabs.create({url: viewTabUrl}, function (tab) {
      targetId = tab.id;
    });
  });
});
