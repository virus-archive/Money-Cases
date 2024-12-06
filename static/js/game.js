// Состояние игры
const state = {
    money: 0,
    clickPower: 0.01,
    settings: {
        currency: 'RUB',
        numberFormat: 'full'
    },
    businesses: [
        { id: 1, name: 'Раздача листовок', count: 0, baseCost: 100, baseIncome: 0.01, multiplier: 1.15, icon: 'fa fa-bullhorn' },
        { id: 2, name: 'Темки в Telegram', count: 0, baseCost: 1000, baseIncome: 0.15, multiplier: 1.15, icon: 'fab fa-telegram' },
        { id: 3, name: 'YouTube канал', count: 0, baseCost: 5000, baseIncome: 1, multiplier: 1.15, icon: 'fab fa-youtube' },
        { id: 4, name: 'Перепродажа техники Apple', count: 0, baseCost: 10000, baseIncome: 2.5, multiplier: 1.15, icon: 'fab fa-apple' },
        { id: 5, name: 'Дропшипинг', count: 0, baseCost: 100000, baseIncome: 30, multiplier: 1.2, icon: 'fa fa-shopping-bag' },
        { id: 6, name: 'Супермаркет', count: 0, baseCost: 500000, baseIncome: 200, multiplier: 1.25, icon: 'fa fa-shopping-basket' },
        { id: 7, name: 'Торговый центр', count: 0, baseCost: 2500000, baseIncome: 1250, multiplier: 1.3, icon: 'fa fa-building' },
        { id: 8, name: 'Сеть магазинов', count: 0, baseCost: 10000000, baseIncome: 6000, multiplier: 1.35, icon: 'fa fa-store-alt' },
        { id: 9, name: 'Завод', count: 0, baseCost: 50000000, baseIncome: 35000, multiplier: 1.4, icon: 'fa fa-industry' },
        { id: 10, name: 'Банк', count: 0, baseCost: 250000000, baseIncome: 175000, multiplier: 1.45, icon: 'fa fa-landmark' },
        { id: 11, name: 'Нефтяная компания', count: 0, baseCost: 1000000000, baseIncome: 1000000, multiplier: 1.5, icon: 'fa fa-gas-pump' },
        { id: 12, name: 'IT-корпорация', count: 0, baseCost: 5000000000, baseIncome: 7500000, multiplier: 1.55, icon: 'fa fa-laptop-code' },
        { id: 13, name: 'Космическая корпорация', count: 0, baseCost: 25000000000, baseIncome: 50000000, multiplier: 1.6, icon: 'fa fa-rocket' }
    ],
    cases: [
        { id: 1, name: 'Обычный кейс', cost: 5, minReward: 0, maxReward: 10, icon: 'box' },
        { id: 2, name: 'Улучшенный кейс', cost: 25, minReward: 0, maxReward: 50, icon: 'box' },
        { id: 3, name: 'Вип кейс', cost: 100, minReward: 0, maxReward: 200, icon: 'box' },
        { id: 4, name: 'Бронзовый кейс', cost: 1000, minReward: 0, maxReward: 2000, icon: 'box' },
        { id: 5, name: 'Серебряный кейс', cost: 10000, minReward: 0, maxReward: 20000, icon: 'box' },
        { id: 6, name: 'Золотой кейс', cost: 100000, minReward: 0, maxReward: 200000, icon: 'box' },
        { id: 7, name: 'Платиновый кейс', cost: 1000000, minReward: 0, maxReward: 2000000, icon: 'box' },
        { id: 8, name: 'Алмазный кейс', cost: 10000000, minReward: 0, maxReward: 20000000, icon: 'gem' },
        { id: 9, name: 'Изумрудный кейс', cost: 50000000, minReward: 0, maxReward: 100000000, icon: 'gem' },
        { id: 10, name: 'Рубиновый кейс', cost: 200000000, minReward: 0, maxReward: 400000000, icon: 'gem' },
        { id: 11, name: 'Супер кейс', cost: 1000000000, minReward: 0, maxReward: 2000000000, icon: 'rocket' }
    ],
    items: [
        { id: 1, name: 'Жвачка', cost: 1, icon: 'Жвачка', count: 0 },
        { id: 2, name: 'Печенки Oreo', cost: 3, icon: 'Печенки Oreo', count: 0 },
        { id: 3, name: 'BigMac', cost: 4, icon: 'BigMac', count: 0 },
        { id: 4, name: 'Пицца', cost: 15, icon: 'Пицца', count: 0 },
        { id: 5, name: 'Подписка ChatGPT', cost: 20, icon: 'Подписка ChatGPT', count: 0 },
        { id: 6, name: 'Тостер', cost: 30, icon: 'Тостер', count: 0 },
        { id: 7, name: 'Обед в ресторане', cost: 50, icon: 'Обед в ресторане', count: 0 },
        { id: 8, name: 'Худи Tommy Hilfiger', cost: 99, icon: 'Худи Tommy Hilfiger', count: 0 },
        { id: 9, name: 'AirPods Pro', cost: 250, icon: 'AirPods Pro', count: 0 },
        { id: 10, name: 'Air Jordans', cost: 600, icon: 'Air Jordans', count: 0 },
        { id: 11, name: 'Велосипед', cost: 800, icon: 'Велосипед', count: 0 },
        { id: 12, name: 'IPhone 16 Pro Max', cost: 2500, icon: 'IPhone 16 Pro Max', count: 0 },
        { id: 13, name: 'Сумка Gucci', cost: 3500, icon: 'Сумка Gucci', count: 0 },
        { id: 14, name: 'BMW E60', cost: 5000, icon: 'BMW E60', count: 0 },
        { id: 15, name: 'BMW F10', cost: 15000, icon: 'BMW F10', count: 0 },
        { id: 16, name: 'Робот гуманоид', cost: 20000, icon: 'Робот гуманоид', count: 0 },
        { id: 17, name: 'Rolex', cost: 50000, icon: 'Rolex', count: 0 },
        { id: 18, name: 'Tesla Model S', cost: 75000, icon: 'Tesla Model S', count: 0 },
        { id: 19, name: 'BMW M5 F90', cost: 100000, icon: 'BMW M5 F90', count: 0 },
        { id: 20, name: 'Квартира', cost: 300000, icon: 'Квартира', count: 0 },
        { id: 20, name: 'Слиток золота', cost: 700000, icon: 'Слиток золота', count: 0 },
        { id: 22, name: 'Яхта', cost: 7500000, icon: 'Яхта', count: 0 },
        { id: 23, name: 'Вилла', cost: 30000000, icon: 'Вилла', count: 0 },
        { id: 24, name: 'Снять фильм', cost: 100000000, icon: 'Снять фильм', count: 0 },
        { id: 25, name: 'Boeing 747', cost: 148000000, icon: 'Boeing 747', count: 0 }
    ]
};

// Функции для работы с сервером
let lastAutoSave = Date.now();
let totalPlaytime = 0;
let lastPlaytimeUpdate = Date.now();

// Автоматическое сохранение
async function autoSave() {
    const now = Date.now();
    if (now - lastAutoSave >= 60000) { // каждую минуту
        await saveGameToServer();
        lastAutoSave = now;
        showNotification('Игра автоматически сохранена');
    }

    // Обновляем время в игре
    totalPlaytime += Math.floor((now - lastPlaytimeUpdate) / 1000);
    lastPlaytimeUpdate = now;
    updateAccountInfo();
}

// Сохранение на сервер
async function saveGameToServer() {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            window.location.href = '/';
            return;
        }

        const response = await fetch('/api/save-progress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                ...state,
                totalPlaytime
            })
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Ошибка сохранения');
        }
    } catch (error) {
        showNotification('Ошибка сохранения: ' + error.message, 'error');
    }
}

// Загрузка с сервера
// А также обновим функцию загрузки, чтобы она применяла сохраненные настройки
async function loadGameFromServer() {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            window.location.href = '/';
            return;
        }

        // Загружаем игровое состояние
        const response = await fetch('/api/load-progress', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        const data = await response.json();
        if (response.ok) {
            // Получаем последние транзакции
            const transResponse = await fetch('/api/transactions/history', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            const transData = await transResponse.json();
            
            // Проверяем, есть ли новые входящие транзакции
            if (transData.length > 0) {
                const lastTrans = transData[0];
                const currentUsername = localStorage.getItem('username');
                
                // Если последняя транзакция входящая и новее текущего состояния
                if (lastTrans.receiver === currentUsername && 
                    new Date(lastTrans.timestamp) > new Date(data.last_save)) {
                    // Обновляем состояние из базы данных
                    Object.assign(state, data.game_state);
                    showNotification(`Получен перевод: +${formatMoney(lastTrans.amount)}`);
                } else {
                    // Если новых транзакций нет, используем текущее состояние
                    Object.assign(state, data.game_state);
                }
            } else {
                Object.assign(state, data.game_state);
            }
            
            totalPlaytime = data.total_playtime || 0;
            lastPlaytimeUpdate = Date.now();
            
            document.getElementById('currencySelect').value = state.settings.currency;
            document.getElementById('numberFormatSelect').value = state.settings.numberFormat;
            
            updateUI();
            updateAccountInfo();
        } else if (response.status === 404) {
            updateUI();
            updateAccountInfo();
            await saveGameToServer();
        } else {
            throw new Error(data.error || 'Ошибка загрузки');
        }
    } catch (error) {
        showNotification('Ошибка загрузки: ' + error.message, 'error');
        updateUI();
    }
}

// Функция для проверки новых транзакций
async function checkNewTransactions() {
    try {
        const response = await fetch('/api/transactions/history', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            }
        });
        
        const transactions = await response.json();
        const currentUsername = localStorage.getItem('username');
        
        if (transactions.length > 0) {
            const lastTrans = transactions[0];
            
            // Если есть входящая транзакция и она новее последней проверки
            if (lastTrans.receiver === currentUsername && 
                new Date(lastTrans.timestamp) > lastTransactionCheck) {
                // Обновляем состояние из базы
                await loadGameFromServer();
                lastTransactionCheck = new Date(lastTrans.timestamp);
            }
        }
    } catch (error) {
        console.error('Ошибка проверки транзакций:', error);
    }
}

// Добавим глобальную переменную для отслеживания последней проверки
let lastTransactionCheck = new Date();
// Обновление информации об аккаунте
async function updateAccountInfo() {
    try {
        const response = await fetch('/api/user-stats', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            }
        });

        const data = await response.json();
        if (response.ok) {
            document.getElementById('accountUsername').textContent = data.username;
            document.getElementById('accountCreated').textContent = new Date(data.created_at).toLocaleString();
            document.getElementById('accountPlaytime').textContent = formatPlaytime(totalPlaytime);
            document.getElementById('accountMaxBalance').textContent = formatMoney(data.max_balance);
        }
    } catch (error) {
        console.error('Ошибка получения статистики:', error);
    }
}

// Форматирование времени
function formatPlaytime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours} ч ${minutes} мин`;
}

// Выход из аккаунта
async function logout() {
    try {
        // Сначала сохраняем прогресс
        await saveGameToServer();
        // Затем очищаем данные авторизации
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        // И перенаправляем на страницу входа
        window.location.href = '/';
    } catch (error) {
        showNotification('Ошибка при сохранении прогресса', 'error');
        // Даже при ошибке сохранения, всё равно выходим
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        window.location.href = '/';
    }
}

// Основные функции игры
function showNotification(message, type = 'success') {
    const element = document.getElementById('notification');
    element.textContent = message;
    element.className = `notification ${type}`;
    element.style.display = 'block';
    setTimeout(() => {
        element.style.display = 'none';
    }, 3000);
}

function formatMoney(amount) {
    amount = Number(amount).toFixed(2);
    
    if (state.settings.numberFormat === 'short') {
        const suffixes = ['', 'K', 'M', 'B', 'T', 'q', 'Q', 's', 'S', 'O', 'N', 'd', 'U', 'D'];
        let suffixNum = 0;
        while (amount >= 1000 && suffixNum < suffixes.length - 1) {
            amount /= 1000;
            suffixNum++;
        }
        return amount.toFixed(2) + suffixes[suffixNum];
    }

    const formatted = Number(amount).toLocaleString('ru-RU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    switch (state.settings.currency) {
        case 'USD': return '$' + formatted;
        case 'EUR': return '€' + formatted;
        default: return formatted + '₽';
    }
}

// ... (остальные функции игры остаются без изменений)
        function calculateIncome() {
            const income = state.businesses.reduce((total, business) => {
                return total + (business.baseIncome * business.count);
            }, 0);
            return Number(income.toFixed(2));
        }


    function updateUI() {
        const moneyElement = document.getElementById('money');
        const incomeElement = document.getElementById('income');
        const earnBtn = document.getElementById('earnBtn');

        if (!moneyElement || !incomeElement || !earnBtn) {
            console.error('Необходимые элементы интерфейса не найдены');
            return;
        }

        moneyElement.textContent = formatMoney(state.money);
        incomeElement.textContent = `Доход в секунду: ${formatMoney(calculateIncome())}`;
        earnBtn.innerHTML = `<i class="fa fa-coins"></i> +${formatMoney(state.clickPower)}`;

        // Проверяем какая вкладка активна
        const activeTab = document.querySelector('.tab-content.active');
        if (activeTab) {
            const tabId = activeTab.id;
            if (tabId === 'businessesTab') {
                renderBusinesses();
            } else if (tabId === 'casesTab') {
                renderCases();
            } else if (tabId === 'shopTab') {
                renderShop();
            } else if (tabId === 'transactionsTab') {
                loadTransactionHistory();
            }
        }
    }
    function renderBusinesses() {
        console.log('Rendering businesses:', state.businesses.length); // Добавим для отладки
        const businessesContainer = document.getElementById('businesses');
        businessesContainer.innerHTML = state.businesses.map(business => {
            console.log('Rendering business:', business.name); // Добавим для отладки
            const cost = Math.floor(business.baseCost * Math.pow(business.multiplier, business.count));
            const disabled = state.money < cost ? 'disabled' : '';
            
            return `
                <button class="business" ${disabled} onclick="buyBusiness(${business.id})">
                    <div class="business-info">
                        <div class="business-header">
                            <i class="${business.icon}"></i>
                            <span>${business.name} (x${business.count})</span>
                        </div>
                        <div class="business-income">
                            +${formatMoney(business.baseIncome)}/сек
                        </div>
                    </div>
                    <div class="business-cost">
                        ${formatMoney(cost)}
                    </div>
                </button>
            `;
        }).join('');
    }

    // Также проверьте, что state.businesses содержит все 10 бизнесов:
    console.log('Initial stae:', state);

        function renderCases() {
            const casesContainer = document.getElementById('cases');
            casesContainer.innerHTML = state.cases.map(case_ => {
                const disabled = state.money < case_.cost ? 'disabled' : '';
                return `
                    <button class="case" ${disabled} onclick="openCase(${case_.id})">
                        <i class="fa fa-${case_.icon}"></i>
                        <div>${case_.name}</div>
                        <div>${formatMoney(case_.cost)}</div>
                    </button>
                `;
            }).join('');
        }

        function earnMoney() {
            state.money = Number((state.money + state.clickPower).toFixed(2));
            updateUI();
        }

        function upgradeClick() {
            const cost = state.clickPower * 100;
            if (state.money >= cost) {
                state.money -= cost;
                state.clickPower *= 2;
                showNotification(`Сила клика увеличена до ${formatMoney(state.clickPower)}!`);
                updateUI();
            }
        }

    function buyBusiness(businessId) {
        const business = state.businesses.find(b => b.id === businessId);
        const cost = Math.floor(business.baseCost * Math.pow(business.multiplier, business.count));
        
        if (state.money >= cost) {
            state.money = Number((state.money - cost).toFixed(2));
            business.count += 1;
            showNotification(`Куплен бизнес "${business.name}"!`);
            updateUI();
        }
    }
    function openCase(caseId) {
        const case_ = state.cases.find(c => c.id === caseId);
        if (state.money >= case_.cost) {
            state.money = Number((state.money - case_.cost).toFixed(2));
            
            const openingDiv = document.createElement('div');
            openingDiv.className = 'case-opening';
            openingDiv.innerHTML = `
                <i class="fas fa-spinner case-spinner"></i>
                <div>Открываем ${case_.name}...</div>
            `;
            document.body.appendChild(openingDiv);

            let spinDuration = 3000;
            let spinInterval = setInterval(() => {
                // Генерируем случайное число с центами
                const tempReward = Number((
                    Math.random() * (case_.maxReward - case_.minReward) + case_.minReward
                ).toFixed(2));
                
                openingDiv.innerHTML = `
                    <i class="fas fa-spinner case-spinner"></i>
                    <div class="case-reward">${formatMoney(tempReward)}</div>
                `;
            }, 50); // Уменьшил интервал для более плавной анимации

            setTimeout(() => {
                clearInterval(spinInterval);
                // Финальная награда тоже с центами
                const reward = Number((
                    Math.random() * (case_.maxReward - case_.minReward) + case_.minReward
                ).toFixed(2));
                
                state.money = Number((state.money + reward).toFixed(2));
                openingDiv.innerHTML = `
                    <i class="fas fa-check-circle" style="font-size: 5rem; color: #4ade80;"></i>
                    <div class="case-reward">Вы выиграли ${formatMoney(reward)}!</div>
                `;
                
                setTimeout(() => {
                    document.body.removeChild(openingDiv);
                    updateUI();
                }, 2000);
            }, spinDuration);
        }
    }

    // Функция для отображения магазина
    function renderShop() {
       const shopContainer = document.getElementById('shop');
       shopContainer.innerHTML = state.items.map(item => {
           const buyDisabled = state.money < item.cost;
           const sellDisabled = item.count === 0;
           
           return `
               <div class="shop-item ${item.count > 0 ? 'owned' : ''}">
                   <div class="shop-item-header">
                       <img src="static/img/${item.icon}.png">
                   </div>
                   <div>
                       <p><b>${item.name} (x${item.count})</b></p>
                       <div class="shop-item-actions">
                           <button 
                               class="btn-buy" 
                               onclick="buyItem(${item.id})" 
                               ${buyDisabled ? 'disabled' : ''}
                           >
                               ${formatMoney(item.cost)}
                           </button>
                           <button 
                               class="btn-sell" 
                               onclick="sellItem(${item.id})" 
                               ${sellDisabled ? 'disabled' : ''}
                           >
                               ${formatMoney(item.cost * 0.75)}
                           </button>
                       </div>
                    </div>
               </div>
           `;
       }).join('');
    }

    // Функции для покупки и продажи
    function buyItem(itemId) {
        const item = state.items.find(i => i.id === itemId);
        if (state.money >= item.cost) {
            state.money = Number((state.money - item.cost).toFixed(2));
            item.count += 1;
            showNotification(`Вы купили ${item.name}!`);
            updateUI();
        }
    }

    function sellItem(itemId) {
        const item = state.items.find(i => i.id === itemId);
        if (item.count > 0) {
            state.money = Number((state.money + item.cost * 0.75).toFixed(2));
            item.count -= 1;
            showNotification(`Вы продали ${item.name}!`);
            updateUI();
        }
    }

    // Обновляем функцию switchTab
    function switchTab(tabName) {
        if (!tabName) return;
        
        // Находим все вкладки и контенты
        const tabs = document.querySelectorAll('.tab');
        const contents = document.querySelectorAll('.tab-content');
        
        // Убираем активный класс у всех
        tabs.forEach(tab => tab.classList.remove('active'));
        contents.forEach(content => content.classList.remove('active'));
        
        // Находим нужную вкладку и контент
        const selectedTab = document.querySelector(`.tab[onclick*="${tabName}"]`);
        const selectedContent = document.getElementById(`${tabName}Tab`);
        
        if (selectedTab && selectedContent) {
            selectedTab.classList.add('active');
            selectedContent.classList.add('active');
            
            // Если открыта вкладка транзакций, загружаем данные
            if (tabName === 'transactions') {
                // loadUsers();
                loadTransactionHistory();
            }
        }
    }

        function openSettings() {
            document.getElementById('settingsModal').style.display = 'block';
            document.getElementById('currencySelect').value = state.settings.currency;
            document.getElementById('numberFormatSelect').value = state.settings.numberFormat;
        }

        function closeSettings() {
            document.getElementById('settingsModal').style.display = 'none';
        }

        async function updateSettings() {
            // Обновляем настройки в state
            state.settings.currency = document.getElementById('currencySelect').value;
            state.settings.numberFormat = document.getElementById('numberFormatSelect').value;
            
            // Обновляем UI
            updateUI();
            
            // Сохраняем изменения на сервере
            try {
                await saveGameToServer();
                showNotification('Настройки сохранены');
            } catch (error) {
                showNotification('Ошибка сохранения настроек', 'error');
            }
        }


// Функция загрузки списка пользователей
// async function loadUsers() {
//     try {
//         const response = await fetch('/api/users/list', {
//             headers: {
//                 'Authorization': 'Bearer ' + localStorage.getItem('authToken')
//             }
//         });
        
//         const users = await response.json();
//         const select = document.getElementById('receiverSelect');
//         select.innerHTML = '<option value="">Выберите получателя</option>' +
//             users.map(user => `<option value="${user.id}">${user.username}</option>`).join('');
//     } catch (error) {
//         showNotification('Ошибка загрузки пользователей', 'error');
//     }
// }

async function makeTransfer() {
    const transferButton = document.querySelector('.btn-transfer');
    if (transferButton.disabled) return; // Предотвращаем повторное выполнение
    
    const receiverUsername = document.getElementById('receiverUsername').value.trim();
    const amount = parseFloat(document.getElementById('transferAmount').value);
    
    if (!receiverUsername) {
        showNotification('Введите логин получателя', 'error');
        return;
    }
    
    if (!amount || amount <= 0) {
        showNotification('Введите корректную сумму', 'error');
        return;
    }
    
    if (amount > state.money) {
        showNotification('Недостаточно средств', 'error');
        return;
    }

    try {
        // Блокируем кнопку
        transferButton.disabled = true;
        transferButton.textContent = 'Отправка...';
        
        const response = await fetch('/api/transactions', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                receiver_username: receiverUsername, 
                amount: amount,
                current_balance: state.money,
                transaction_id: Date.now() // Добавляем уникальный идентификатор транзакции
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            state.money = data.new_balance;
            updateUI();
            showNotification('Перевод выполнен успешно');
            document.getElementById('transferAmount').value = '';
            document.getElementById('receiverUsername').value = '';
            loadTransactionHistory();
            lastTransactionCheck = new Date();
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        showNotification(error.message, 'error');
    } finally {
        // Разблокируем кнопку
        transferButton.disabled = false;
        transferButton.textContent = 'Перевести';
    }
}

// Функция загрузки истории транзакций
// Обновляем функцию loadTransactionHistory
async function loadTransactionHistory() {
    const historyContainer = document.getElementById('transactionHistory');
    if (!historyContainer) {
        console.error('Container for transaction history not found');
        return;
    }

    try {
        const response = await fetch('/api/transactions/history', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            }
        });
        
        const transactions = await response.json();
        const currentUsername = localStorage.getItem('username');
        
        historyContainer.innerHTML = transactions.map(t => {
            const isSender = t.sender === currentUsername;
            const type = isSender ? 'sent' : 'received';
            const sign = isSender ? '-' : '+';
            
            return `
                <div class="transaction-item ${type}">
                    <div class="transaction-details">
                        <div>${isSender ? `Перевод для ${t.receiver}` : `Получено от ${t.sender}`}</div>
                        <div class="transaction-date">${new Date(t.timestamp).toLocaleString()}</div>
                    </div>
                    <div class="transaction-amount ${type}">
                        ${sign}${formatMoney(t.amount)}
                    </div>
                </div>
            `;
        }).join('') || '<div class="no-transactions">Нет транзакций</div>';
        
    } catch (error) {
        showNotification('Ошибка загрузки истории', 'error');
        historyContainer.innerHTML = '<div class="error-message">Ошибка загрузки истории транзакций</div>';
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    // Проверяем авторизацию
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = '/';
        return;
    }

    // Добавляем обработчики событий
    document.getElementById('earnBtn').addEventListener('click', earnMoney);
    
    // Инициализируем игру
    await loadGameFromServer();

    // Запускаем игровой цикл
    setInterval(() => {
        state.money = Number((state.money + calculateIncome()).toFixed(2));
        updateUI();
        autoSave();
    }, 1000);

    // Запускаем игровой цикл
    setInterval(() => {
        state.money = Number((state.money + calculateIncome()).toFixed(2));
        updateUI();
        autoSave();
    }, 1000);

    // Добавляем проверку новых транзакций каждые 5 секунд
    setInterval(checkNewTransactions, 5000);

    // Сохраняем перед закрытием
    window.addEventListener('beforeunload', () => {
        saveGameToServer();
    });

    // Инициализируем первую активную вкладку
    const activeTab = document.querySelector('.tab.active');
    if (activeTab) {
        switchTab(activeTab.getAttribute('onclick').match(/'(.*?)'/)[1]);
    }
});
