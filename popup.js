chrome.storage.sync.get(["toggleOn"], function (result) {
  // Set button to correct state
  $('#toggleOn').prop("checked", result.toggleOn);
});


$(document).ready(function () {
  $('#toggleOn').on('change', function (e) {
    chrome.storage.sync.set({
      'toggleOn': ($(this).is(":checked"))
    }, function () {});
    //console.log(this.checked)
  })
})