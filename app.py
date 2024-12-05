import os
from flask import Flask, request, jsonify, render_template, send_from_directory, redirect
import psycopg2
from psycopg2.extras import DictCursor
import bcrypt
import jwt
from datetime import datetime, timedelta
from functools import wraps

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key-123')

# Инициализируем БД при старте
init_db()

# Получаем URL базы данных из переменной окружения (будет установлена в Render)
DATABASE_URL = os.environ.get('DATABASE_URL')
if DATABASE_URL and DATABASE_URL.startswith('postgres://'):
    DATABASE_URL = DATABASE_URL.replace('postgres://', 'postgresql://', 1)

def get_db_connection():
    """Создает соединение с базой данных PostgreSQL"""
    return psycopg2.connect(DATABASE_URL)

def get_db_connection():
    """Создает соединение с базой данных PostgreSQL"""
    return psycopg2.connect(DATABASE_URL)

def init_db():
    """Инициализация базы данных"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            # Создаем таблицу пользователей
            cur.execute('''
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    username TEXT UNIQUE NOT NULL,
                    password TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            # Создаем таблицу игрового прогресса
            cur.execute('''
                CREATE TABLE IF NOT EXISTS game_progress (
                    user_id INTEGER PRIMARY KEY REFERENCES users(id),
                    game_state TEXT NOT NULL,
                    last_save TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    total_playtime INTEGER DEFAULT 0,
                    max_balance REAL DEFAULT 0
                )
            ''')
            
            # Создаем таблицу транзакций
            cur.execute('''
                CREATE TABLE IF NOT EXISTS transactions (
                    id SERIAL PRIMARY KEY,
                    sender_id INTEGER NOT NULL REFERENCES users(id),
                    receiver_id INTEGER NOT NULL REFERENCES users(id),
                    amount REAL NOT NULL,
                    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            conn.commit()

def is_valid_username(username):
    return len(username) >= 3 and len(username) <= 20

# Декоратор для проверки JWT токена
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        auth_header = request.headers.get('Authorization')
        
        if auth_header:
            try:
                token = auth_header.split(" ")[1]
            except IndexError:
                return jsonify({'error': 'Неверный формат токена'}), 401

        if not token:
            token = request.args.get('token')

        if not token:
            return redirect('/')

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = data
        except:
            return redirect('/')

        return f(current_user, *args, **kwargs)

    return decorated

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/game')
@token_required
def game(current_user):
    return render_template('game.html', username=current_user['username'])

@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'Отсутствуют данные'}), 400
            
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({'error': 'Логин и пароль обязательны'}), 400
        
        if not is_valid_username(username):
            return jsonify({'error': 'Логин должен быть от 3 до 20 символов'}), 400
        
        # Начальное состояние игры
        initial_state = {
            "money": 0,
            "clickPower": 0.01,
            "settings": {
                "currency": "RUB",
                "numberFormat": "full"
            },
            "businesses": [
                {"id": 1, "name": "Раздача листовок", "count": 0, "baseCost": 100, "baseIncome": 0.01, "multiplier": 1.15, "icon": "fa fa-bullhorn"},
                {"id": 2, "name": "Темки в Telegram", "count": 0, "baseCost": 1000, "baseIncome": 0.15, "multiplier": 1.15, "icon": "fab fa-telegram"},
                {"id": 3, "name": "YouTube канал", "count": 0, "baseCost": 5000, "baseIncome": 1, "multiplier": 1.15, "icon": "fab fa-youtube"},
                {"id": 4, "name": "Перепродажа техники Apple", "count": 0, "baseCost": 10000, "baseIncome": 2.5, "multiplier": 1.15, "icon": "fab fa-apple"},
                {"id": 5, "name": "Дропшипинг", "count": 0, "baseCost": 100000, "baseIncome": 30, "multiplier": 1.2, "icon": "fa fa-shopping-bag"},
                {"id": 6, "name": "Супермаркет", "count": 0, "baseCost": 500000, "baseIncome": 200, "multiplier": 1.25, "icon": "fa fa-shopping-basket"},
                {"id": 7, "name": "Торговый центр", "count": 0, "baseCost": 2500000, "baseIncome": 1250, "multiplier": 1.3, "icon": "fa fa-building"},
                {"id": 8, "name": "Сеть магазинов", "count": 0, "baseCost": 10000000, "baseIncome": 6000, "multiplier": 1.35, "icon": "fa fa-store-alt"},
                {"id": 9, "name": "Завод", "count": 0, "baseCost": 50000000, "baseIncome": 35000, "multiplier": 1.4, "icon": "fa fa-industry"},
                {"id": 10, "name": "Банк", "count": 0, "baseCost": 250000000, "baseIncome": 175000, "multiplier": 1.45, "icon": "fa fa-landmark"},
                {"id": 11, "name": "Нефтяная компания", "count": 0, "baseCost": 1000000000, "baseIncome": 1000000, "multiplier": 1.5, "icon": "fa fa-gas-pump"},
                {"id": 12, "name": "IT-корпорация", "count": 0, "baseCost": 5000000000, "baseIncome": 7500000, "multiplier": 1.55, "icon": "fa fa-laptop-code"},
                {"id": 13, "name": "Космическая корпорация", "count": 0, "baseCost": 25000000000, "baseIncome": 50000000, "multiplier": 1.6, "icon": "fa fa-rocket"}
            ],
            "cases": [
                {"id": 1, "name": "Обычный кейс", "cost": 5, "minReward": 0, "maxReward": 10, "icon": "box"},
                {"id": 2, "name": "Улучшенный кейс", "cost": 25, "minReward": 0, "maxReward": 50, "icon": "box"},
                {"id": 3, "name": "Вип кейс", "cost": 100, "minReward": 0, "maxReward": 200, "icon": "box"},
                {"id": 4, "name": "Бронзовый кейс", "cost": 1000, "minReward": 0, "maxReward": 2000, "icon": "box"},
                {"id": 5, "name": "Серебряный кейс", "cost": 10000, "minReward": 0, "maxReward": 20000, "icon": "box"},
                {"id": 6, "name": "Золотой кейс", "cost": 100000, "minReward": 0, "maxReward": 200000, "icon": "box"},
                {"id": 7, "name": "Платиновый кейс", "cost": 1000000, "minReward": 0, "maxReward": 2000000, "icon": "box"},
                {"id": 8, "name": "Алмазный кейс", "cost": 10000000, "minReward": 0, "maxReward": 20000000, "icon": "gem"},
                {"id": 9, "name": "Изумрудный кейс", "cost": 50000000, "minReward": 0, "maxReward": 100000000, "icon": "gem"},
                {"id": 10, "name": "Рубиновый кейс", "cost": 200000000, "minReward": 0, "maxReward": 400000000, "icon": "gem"},
                {"id": 11, "name": "Супер кейс", "cost": 1000000000, "minReward": 0, "maxReward": 2000000000, "icon": "rocket"}
            ],
            "items": [
                {"id": 1, "name": "Жвачка", "cost": 1, "icon": "Жвачка", "count": 0},
                {"id": 2, "name": "Печенки Oreo", "cost": 3, "icon": "Печенки Oreo", "count": 0},
                {"id": 3, "name": "BigMac", "cost": 4, "icon": "BigMac", "count": 0},
                {"id": 4, "name": "Пицца", "cost": 15, "icon": "Пицца", "count": 0},
                {"id": 5, "name": "Подписка ChatGPT", "cost": 20, "icon": "Подписка ChatGPT", "count": 0},
                {"id": 6, "name": "Тостер", "cost": 30, "icon": "Тостер", "count": 0},
                {"id": 7, "name": "Обед в ресторане", "cost": 50, "icon": "Обед в ресторане", "count": 0},
                {"id": 8, "name": "Худи Tommy Hilfiger", "cost": 99, "icon": "Худи Tommy Hilfiger", "count": 0},
                {"id": 9, "name": "AirPods Pro", "cost": 250, "icon": "AirPods Pro", "count": 0},
                {"id": 10, "name": "Air Jordans", "cost": 600, "icon": "Air Jordans", "count": 0},
                {"id": 11, "name": "Велосипед", "cost": 800, "icon": "Велосипед", "count": 0},
                {"id": 12, "name": "IPhone 16 Pro Max", "cost": 2500, "icon": "IPhone 16 Pro Max", "count": 0},
                {"id": 13, "name": "Сумка Gucci", "cost": 3500, "icon": "Сумка Gucci", "count": 0},
                {"id": 14, "name": "BMW E60", "cost": 5000, "icon": "BMW E60", "count": 0},
                {"id": 15, "name": "BMW F10", "cost": 15000, "icon": "BMW F10", "count": 0},
                {"id": 16, "name": "Робот гуманоид", "cost": 20000, "icon": "Робот гуманоид", "count": 0},
                {"id": 17, "name": "Rolex", "cost": 50000, "icon": "Rolex", "count": 0},
                {"id": 18, "name": "Tesla Model S", "cost": 75000, "icon": "Tesla Model S", "count": 0},
                {"id": 19, "name": "BMW M5 F90", "cost": 100000, "icon": "BMW M5 F90", "count": 0},
                {"id": 20, "name": "Квартира", "cost": 300000, "icon": "Квартира", "count": 0},
                {"id": 21, "name": "Слиток золота", "cost": 700000, "icon": "Слиток золота", "count": 0},
                {"id": 22, "name": "Яхта", "cost": 7500000, "icon": "Яхта", "count": 0},
                {"id": 23, "name": "Вилла", "cost": 30000000, "icon": "Вилла", "count": 0},
                {"id": 24, "name": "Снять фильм", "cost": 100000000, "icon": "Снять фильм", "count": 0},
                {"id": 25, "name": "Boeing 747", "cost": 148000000, "icon": "Boeing 747", "count": 0}
            ]
        }
        
        try:
            hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            
            with get_db_connection() as conn:
                with conn.cursor() as cur:
                    # Создаем пользователя
                    cur.execute(
                        'INSERT INTO users (username, password) VALUES (%s, %s) RETURNING id',
                        (username, hashed.decode('utf-8'))
                    )
                    user_id = cur.fetchone()[0]
                    
                    # Создаем начальное состояние игры
                    cur.execute(
                        'INSERT INTO game_progress (user_id, game_state) VALUES (%s, %s)',
                        (user_id, str(initial_state))
                    )
                    conn.commit()
            
            return jsonify({
                'message': 'Регистрация успешна',
                'username': username
            }), 201
        
        except psycopg2.IntegrityError:
            return jsonify({'error': 'Такой логин уже занят'}), 409
            
    except Exception as e:
        return jsonify({'error': 'Ошибка сервера: ' + str(e)}), 500

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'Отсутствуют данные'}), 400
        
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Логин и пароль обязательны'}), 400

    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute('SELECT * FROM users WHERE username = %s', (username,))
                user = cur.fetchone()

        if user and bcrypt.checkpw(password.encode('utf-8'), 
                                 user[2].encode('utf-8')):
            token = jwt.encode({
                'user_id': user[0],
                'username': user[1],
                'exp': datetime.utcnow() + timedelta(days=1)
            }, app.config['SECRET_KEY'], algorithm='HS256')
            
            return jsonify({
                'token': token,
                'username': user[1],
                'message': 'Вход выполнен успешно'
            }), 200
        else:
            return jsonify({'error': 'Неверный логин или пароль'}), 401

    except Exception as e:
        return jsonify({'error': 'Ошибка сервера'}), 500

@app.route('/api/save-progress', methods=['POST'])
@token_required
def save_progress(current_user):
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'Нет данных для сохранения'}), 400

    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute('''
                    UPDATE game_progress 
                    SET game_state = %s, last_save = CURRENT_TIMESTAMP,
                        max_balance = GREATEST(max_balance, %s)
                    WHERE user_id = %s
                ''', (str(data), data.get('money', 0), current_user['user_id']))
                conn.commit()
        
        return jsonify({'message': 'Прогресс сохранен'}), 200
    except Exception as e:
        return jsonify({'error': 'Ошибка сохранения'}), 500

@app.route('/api/load-progress', methods=['GET'])
@token_required
def load_progress(current_user):
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute('''
                    SELECT game_state, created_at, last_save, total_playtime, max_balance
                    FROM game_progress g
                    JOIN users u ON u.id = g.user_id
                    WHERE user_id = %s
                ''', (current_user['user_id'],))
                result = cur.fetchone()
            
            if result:
                return jsonify({
                    'game_state': eval(result[0]),
                    'created_at': result[1],
                    'last_save': result[2],
                    'total_playtime': result[3],
                    'max_balance': result[4]
                }), 200
            else:
                return jsonify({'error': 'Прогресс не найден'}), 404
    except Exception as e:
        return jsonify({'error': 'Ошибка загрузки'}), 500

@app.route('/api/user-stats', methods=['GET'])
@token_required
def get_user_stats(current_user):
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute('''
                    SELECT u.username, u.created_at, g.total_playtime, g.max_balance
                    FROM users u
                    JOIN game_progress g ON u.id = g.user_id
                    WHERE u.id = %s
                ''', (current_user['user_id'],))
                result = cur.fetchone()
            
            if result:
                return jsonify({
                    'username': result[0],
                    'created_at': result[1],
                    'total_playtime': result[2],
                    'max_balance': result[3]
                }), 200
            else:
                return jsonify({'error': 'Статистика не найдена'}), 404
    except Exception as e:
        return jsonify({'error': 'Ошибка получения статистики'}), 500

@app.route('/api/users/list', methods=['GET'])
@token_required
def get_users(current_user):
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute('SELECT id, username FROM users WHERE id != %s', 
                         (current_user['user_id'],))
                users = [{'id': row[0], 'username': row[1]} for row in cur.fetchall()]
                return jsonify(users), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/transactions', methods=['POST'])
@token_required
def make_transaction(current_user):
    data = request.get_json()
    receiver_username = data.get('receiver_username')
    amount = float(data.get('amount', 0))

    if not receiver_username or amount <= 0:
        return jsonify({'error': 'Неверные данные'}), 400

    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                # Находим получателя по логину
                cur.execute('SELECT id FROM users WHERE username = %s', (receiver_username,))
                receiver = cur.fetchone()
                
                if not receiver:
                    return jsonify({'error': 'Получатель не найден'}), 404
                    
                receiver_id = receiver[0]
                
                if receiver_id == current_user['user_id']:
                    return jsonify({'error': 'Нельзя перевести деньги самому себе'}), 400
                
                # Получаем актуальный баланс отправителя
                send_amount = float(data.get('current_balance', 0))
                
                if send_amount < amount:
                    return jsonify({'error': 'Недостаточно средств'}), 400
                    
                # Получаем состояние получателя
                cur.execute('SELECT game_state FROM game_progress WHERE user_id = %s', 
                         (receiver_id,))
                receiver_data = cur.fetchone()
                receiver_state = eval(receiver_data[0])
                
                # Обновляем баланс получателя
                receiver_state['money'] = float(receiver_state['money']) + amount
                
                # Обновляем состояние получателя
                cur.execute('UPDATE game_progress SET game_state = %s WHERE user_id = %s',
                         (str(receiver_state), receiver_id))
                         
                # Записываем транзакцию
                cur.execute('''
                    INSERT INTO transactions (sender_id, receiver_id, amount)
                    VALUES (%s, %s, %s)
                ''', (current_user['user_id'], receiver_id, amount))
                
                conn.commit()
                
                return jsonify({
                    'message': 'Перевод выполнен успешно',
                    'new_balance': send_amount - amount
                }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/transactions/history', methods=['GET'])
@token_required
def get_transactions(current_user):
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute('''
                    SELECT 
                        t.id,
                        sender.username as sender_name,
                        receiver.username as receiver_name,
                        t.amount,
                        t.timestamp
                    FROM transactions t
                    JOIN users sender ON t.sender_id = sender.id
                    JOIN users receiver ON t.receiver_id = receiver.id
                    WHERE sender_id = %s OR receiver_id = %s
                    ORDER BY t.timestamp DESC
                    LIMIT 50
                ''', (current_user['user_id'], current_user['user_id']))
                
                transactions = [{
                    'id': row[0],
                    'sender': row[1],
                    'receiver': row[2],
                    'amount': row[3],
                    'timestamp': row[4]
                } for row in cur.fetchall()]
                
                return jsonify(transactions), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    init_db()
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
