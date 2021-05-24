ActiveTabId = "TAB_ID_NONE";

async function muteTab(tabId, state) {
  let muted = state
  await chrome.tabs.update(tabId, {
    muted
  });
}

chrome.storage.onChanged.addListener(function (changes, namespace) {
  chrome.tabs.query({}, function (tabs) {
    
    if (!changes.toggleOn.newValue) {
      // Unmute all tabs when turned off 
      tabs.forEach(function (tab) {
        muteTab(tab.id, false);
      });
    } else {
      // Mute every tab except current one when turned on
      tabs.forEach(function (tab) {
        (tab.active) ? muteTab(tab.id, false) : muteTab(tab.id, true);
      });
    }
  });
});

chrome.tabs.onActivated.addListener((tab) => {
  chrome.storage.sync.get(["toggleOn"], function (result) {
    // Return if not enabled
    if (!result.toggleOn) return
    // Mute previous tab
    muteTab(ActiveTabId, true);
    // Unmute current tab
    muteTab(tab.tabId, false);
    // Save current tab
    ActiveTabId = tab.tabId;
  });
});