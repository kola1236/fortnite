import { useState, useEffect } from 'react'; // хуки
import { API_KEY, API_URL } from '../config';

import { Preloader } from './Preloader';
import { GoodsList } from './GoodsList';
import { Cart } from './Cart';
import { BasketList } from './BasketList';
import { Alert } from './Alert';

function Shop() {
    const [goods, setGoods] = useState([]); // хуки useState управление состоянием
    //
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]); //  список наших заказов
    const [isBasketShow, setBasketSow] = useState(false); // показует карзину
    const [alertName, setAlertName] = useState('');

    const addToBasket = (item) => {
        const itemIndex = order.findIndex(
            (orderItem) => orderItem.id === item.id
            // метод findIndex ищет индекс в массиве
            // сравивае ордер айтем с тем что пришло с наружи тоесть айтем
        );
        // ^ проверочный индекса
        if (itemIndex < 0) {
            const newItem = {
                // информация о количестве
                ...item,
                quantity: 1,
            };
            setOrder([...order, newItem]); // возращает список и добавдяет новый обьект
            // ^ это если в первый раз
        } else {
            const newOrder = order.map((orderItem, index) => {
                if (index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1,
                    };
                } else {
                    return orderItem;
                }
            });

            setOrder(newOrder); // отправляем в наш стейт
        }
        setAlertName(item.name);
    };

    const removeFromBasket = (itemId) => {
        const newOrder = order.filter((el) => el.id !== itemId);
        setOrder(newOrder);
    };

    const handleBasketShow = () => {
        setBasketSow(!isBasketShow);
    };

    const incQuantity = (itemId) => {
        const newOrder = order.map((el) => {
            if (el.id === itemId) {
                const newQuantity = el.quantity + 1;
                return {
                    ...el,
                    quantity: newQuantity,
                };
            } else {
                return el;
            }
        });
        setOrder(newOrder);
    };
    const decQuantity = (itemId) => {
        const newOrder = order.map((el) => {
            if (el.id === itemId) {
                const newQuantity = el.quantity - 1;
                return {
                    ...el,
                    quantity: newQuantity >= 0 ? newQuantity : 0,
                };
            } else {
                return el;
            }
        });
        setOrder(newOrder);
    };

    const closeAlert = () => {
        setAlertName('');
    };

    useEffect(function getGoods() {
        fetch(API_URL, {
            headers: {
                Authorization: API_KEY,
                // Authorization ключь к айпи ай кей кот хранится локал енв
            },
        })
            .then((response) => response.json()) // получиные данные переобразуй джейсон
            .then((data) => {
                data.featured && setGoods(data.featured); // проверка что товар пришол
                // featured клюк к тому массиву их айпи
                setLoading(false);
            });
    }, []);
    return (
        <main className='container content'>
            <Cart quantity={order.length} handleBasketShow={handleBasketShow} />
            {/* добавление корзины */}
            {loading ? ( // если тру возращаем прелоадер
                <Preloader />
            ) : (
                <GoodsList goods={goods} addToBasket={addToBasket} />
            )}
            {isBasketShow && ( //  добавляем список заказов в корзину если актив
                <BasketList
                    order={order}
                    handleBasketShow={handleBasketShow}
                    removeFromBasket={removeFromBasket}
                    incQuantity={incQuantity}
                    decQuantity={decQuantity}
                />
            )}
            {alertName && <Alert name={alertName} closeAlert={closeAlert} />}
        </main>
    );
}

export { Shop };
