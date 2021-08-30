function initToast() {
    var toastElList = [].slice.call(document.querySelectorAll('.toast'))
    var toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl, { autohide: true, delay: 7000 })
    });
}

function triggerToast() {
    var toastTrigger = document.getElementById('confirmBtn')
    var toastLiveExample = document.getElementById('liveToast')
    if (toastTrigger) {
        toastTrigger.addEventListener('click', function () {
            var toast = new bootstrap.Toast(toastLiveExample)

            toast.show()
        })
    }
}

initToast();
triggerToast();