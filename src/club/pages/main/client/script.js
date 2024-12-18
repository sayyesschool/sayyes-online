const { meetings, packs } = window.data;
const { Accordion, Form, Modal, Slider } = window.ui;
const { PaymentView, MeetingView } = window.views;

Accordion.init();
Form.init();
Modal.init();

const packagesSection = document.querySelector('#packages');

const paymentModal = new Modal('#payment-modal');
const meetingModal = new Modal('#meeting-modal');

const paymentView = new PaymentView('#payment-view');
const meetingView = new MeetingView('#meeting-view');

// Modals

const state = {};

document.querySelectorAll('.pack-btn').forEach(button => {
    button.addEventListener('click', () => {
        const pack = packs.find(p => p.id === button.dataset.packId);

        if (!pack) return;

        paymentView.render({ pack, meetingId: state.meetingId });
        paymentModal.on('closed', () => paymentView.destroy());
        paymentModal.open();
    });
});

document.querySelectorAll('.meeting-btn').forEach(button => {
    button.addEventListener('click', () => {
        const meeting = meetings.find(m => m.id === button.dataset.meetingId);

        if (!meeting) return;

        meetingView.render({
            meeting,
            onRegister: () => {
                state.meetingId = meeting.id;

                meetingModal.close();

                packagesSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
        meetingModal.on('close', () => paymentView.destroy());
        meetingModal.open();
    });
});

// Sliders

new Slider('.meetings-slider', {
    breakpoints: {
        768: {
            enabled: true,
            slidesPerView: 3
        },
        360: {
            enabled: false
        }
    }
});

new Slider('.testimonials-slider', {
    breakpoints: {
        1024: {
            slidesPerView: 2
        },
        360: {
            slidesPerView: 'auto',
            centeredSlides: true
        }
    }
});