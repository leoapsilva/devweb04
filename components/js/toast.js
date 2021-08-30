const toast = {

    template: `
    <div class= "position-fixed bottom-0 end-0" style="z-index: 11" >
        <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header" :class="headerClasses">
                <svg class="bi me-2 rounded-4" width="24" height="24"> 
                    <use :xlink:href="headerIcon" />
                </svg>
                <strong class="me-auto">{{ headerText }}</strong>
                <small>agora</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                {{ messageText }}
            </div>
        </div>
    </div>
    `,
    computed: {
        headerClasses() {
            return this.headerTextColor + ' ' + this.headerBgColor;
        },
    },

    props: [
        'headerIcon',
        'headerText',
        'headerBgColor',
        'headerTextColor',
        'messageText',
    ]
}
