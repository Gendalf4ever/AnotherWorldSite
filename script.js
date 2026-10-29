const modal = document.getElementById('arenaModal');
const stepSelectArena = document.getElementById('stepSelectArena');
const stepBookingForm = document.getElementById('stepBookingForm');
const selectedArenaTitle = document.getElementById('selectedArenaTitle');

let chosenArena = '';

function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    backToArenas();
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function selectArena(arenaName) {
    chosenArena = arenaName;
    selectedArenaTitle.textContent = arenaName;
    
    stepSelectArena.style.display = 'none';
    stepBookingForm.style.display = 'block';
}

function backToArenas() {
    stepBookingForm.style.display = 'none';
    stepSelectArena.style.display = 'block';
}

// Автоматическая маска для телефона 
const phoneInput = document.getElementById('clientPhone');

if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
        
        if (!x[2]) {
            e.target.value = x[1] ? '+7 (' + x[1] : '';
        } else if (!x[3]) {
            e.target.value = '+7 (' + x[2];
        } else if (!x[4]) {
            e.target.value = '+7 (' + x[2] + ') ' + x[3];
        } else if (!x[5]) {
            e.target.value = '+7 (' + x[2] + ') ' + x[3] + '-' + x[4];
        } else {
            e.target.value = '+7 (' + x[2] + ') ' + x[3] + '-' + x[4] + '-' + x[5];
        }
    });
}

// Функция отправки заявки
function submitBooking(event) {
    event.preventDefault();

    const name = document.getElementById('clientName').value;
    const phone = document.getElementById('clientPhone').value;
    const email = document.getElementById('clientEmail').value;
    const game = document.getElementById('clientGame').value || 'Не указана (выберут на месте)';

    // Определяем почту в зависимости от выбранной арены
    let targetEmail = 'anotherworldprometey@mail.ru'; // По умолчанию Прометей
    
    if (chosenArena.includes('Прометей')) {
        targetEmail = 'anotherworldprometey@mail.ru';
    } else if (chosenArena.includes('Пик')) {
        targetEmail = 'почта_пика@mail.ru'; // <-- Заменить потом
    } else if (chosenArena.includes('Июнь')) {
        targetEmail = 'почта_июня@mail.ru'; // <-- Заменить потом
    }

    // Данные для отправки в шаблон EmailJS
    const templateParams = {
        to_email: targetEmail,
        arena_name: chosenArena,
        client_name: name,
        client_phone: phone,
        client_email: email,
        client_game: game
    };

    // Отправка через EmailJS 
    emailjs.send('service_m2zk18t', 'template_o1n05mi', templateParams)
        .then(function(response) {
            alert(`Спасибо, ${name}! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.`);
            closeModal();
            document.getElementById('bookingForm').reset();
        }, function(error) {
            console.error('Ошибка отправки:', error);

            
            let arenaPhone = '+7 (999) 000-00-00';
            
            if (chosenArena.includes('Прометей')) {
                arenaPhone = '+7 (931) 008-05-07'; 
            } else if (chosenArena.includes('Пик')) {
                arenaPhone = '+7 (931) 247-08-06';
            } else if (chosenArena.includes('Июнь')) {
                arenaPhone = '+7 (931) 008-08-06';
            }

            alert(`Произошла ошибка при отправке. Пожалуйста, позвоните нам напрямую на арену «${chosenArena}» по номеру:\n${arenaPhone}`);
        });
}

function handleOutsideClick(event) {
    if (event.target === modal) {
        closeModal();
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});