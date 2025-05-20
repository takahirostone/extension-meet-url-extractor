document.addEventListener("contextmenu", function(event) {

	let url;
    let element = event.target;
    if(element.className.match(/UywwFc-mRLv6 UywwFc-RLmnJb/)) {  //"Join with Google Meet" buttons. "uqM3cb" buttones are where you create or edit an event. "w1OTme" buttons are where you see details of your event.
    	const html = element.outerHTML;
    	if(html.match(/https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}/)) {
			url = html.match(/https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}/)[0];
		} else {
			return;
		}
    } else {
	    while(!element.className.match(/GTG3wb ChfiMc rFUW1c EiZ8Dd/)) {  //Event cells on the calendar view.
	    	element = element.parentNode;
	    	if(element === window.document) {
	    		return;
	    	}
	    }
	    const eventId = element.getAttribute('data-eventid');
	    const eventUrl = 'https://www.google.com/calendar/event?eid=' + eventId;
	    const sliceEventUrl = eventUrl.slice(0, 75);
	    const html = document.body.innerHTML;
	    const targetStr = html.match(/<script type="application\/json" id="initialdata" nonce="">[\s\S]*?<\/script>/)[0];
	    const arrStr = targetStr.replaceAll('<script type="application/json" id="initialdata" nonce="">', '').replaceAll('</script>', '');
	    const arr = JSON.parse(arrStr);

	    function findUrlContainingArray(arr) {
		    let targetArr = null;
		    for(const item of arr) {
		        if(Array.isArray(item)) {
		            const found = findUrlContainingArray(item);
		            if (found) return found; // 最初に見つかったら即終了
		        }
		    }

		    if(arr.some(item => typeof item === 'string' && item.includes(sliceEventUrl))) {
		        return arr;
		    }

		    return targetArr;
		}

		const targetArr = findUrlContainingArray(arr);

		url = targetArr.find(item => typeof item === 'string' && item.match(/https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}/)) || null;

		if(!url) {
			return;
		}

    }

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
