document.addEventListener("contextmenu", function(event) {

    let element = event.target;
    if(element.className.match(/UywwFc-mRLv6 UywwFc-RLmnJb/)) {  //"Join with Google Meet" buttons. "uqM3cb" buttones are where you create or edit an event. "w1OTme" buttons are where you see details of your event.
    	element = element;
    } else {
	    return;
    }

    const html = element.outerHTML;
	let suffix;
	if(html.match(/[a-z]{3}-[a-z]{4}-[a-z]{3}/)) {
		suffix = html.match(/[a-z]{3}-[a-z]{4}-[a-z]{3}/)[0];
	} else {
		return;
	}
	const url = "https://meet.google.com/" + suffix;

	toastr.options = {
	  "closeButton": true,
	  "debug": false,
	  "newestOnTop": false,
	  "progressBar": false,
	  "positionClass": "toast-bottom-right",
	  "preventDuplicates": false,
	  "onclick": null,
	  "showDuration": "300",
	  "hideDuration": "1000",
	  "timeOut": "5000",
	  "extendedTimeOut": "5000",
	  "showEasing": "swing",
	  "hideEasing": "linear",
	  "showMethod": "fadeIn",
	  "hideMethod": "fadeOut"
	};

	navigator.clipboard.writeText(url)
		.then(
			function() {
				return toastr["success"](chrome.i18n.getMessage("toastDescriptionSuccess"), chrome.i18n.getMessage("toastTitleSuccess"));
			}, function() {
				return toastr["error"](chrome.i18n.getMessage("toastDescriptionFailure"), chrome.i18n.getMessage("toastTitleFailure"));
			}
		);
});
