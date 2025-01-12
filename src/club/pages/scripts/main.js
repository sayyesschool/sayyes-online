const { meetings, packs } = window.data;
const { Accordion, Form, Modal, Slider } = window.ui;
const { CalendarIsland, PaymentIsland, MeetingIsland } = window.islands;

Accordion.init();
Form.init();
Modal.init();

const packagesSection = document.querySelector('#packages');

const paymentModal = new Modal('#payment-modal');
const meetingModal = new Modal('#meeting-modal');

const calendarIsland = new CalendarIsland('#calendar-island');
const paymentIsland = new PaymentIsland('#payment-view');
const meetingIsland = new MeetingIsland('#meeting-view');

const events = meetings.map(meeting => {
    const startDate = new Date(meeting.startDate);
    const endDate = new Date(meeting.endDate);

    const startTime = {
        hours: startDate.getHours(),
        minutes: startDate.getMinutes()
    };
    const endTime = {
        hours: endDate.getHours(),
        minutes: endDate.getMinutes()
    };

    return {
        ...meeting,
        date: startDate,
        startDate,
        startTime,
        endDate,
        endTime
    };
});

function handleEventClick(event) {
    meetingIsland.render({ meeting: event });
    meetingModal.open();
}

calendarIsland.render({
    events,
    onEventClick: handleEventClick
});

// Modals

const state = {};

document.querySelectorAll('.pack-btn').forEach(button => {
    button.addEventListener('click', () => {
        const pack = packs.find(p => p.id === button.dataset.packId);

        if (!pack) return;

        paymentIsland.render({ pack, meetingId: state.meetingId });
        paymentModal.on('closed', () => paymentIsland.destroy());
        paymentModal.open();
    });
});

document.querySelectorAll('.meeting-btn').forEach(button => {
    button.addEventListener('click', () => {
        const meeting = meetings.find(m => m.id === button.dataset.meetingId);

        if (!meeting) return;

        meetingIsland.render({
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
        meetingModal.on('close', () => paymentIsland.destroy());
        meetingModal.open();
    });
});

// Sliders

new Slider('.meetings-slider', {
    breakpoints: {
        768: {
            slidesPerView: 3,
            slidesPerGroup: 3
        },
        360: {
            slidesPerView: 1,
            slidesPerGroup: 1
        }
    }
});

new Slider('.testimonials-slider', {
    breakpoints: {
        1024: {
            slidesPerView: 2
        },
        360: {
            slidesPerView: 1
        }
    }
});