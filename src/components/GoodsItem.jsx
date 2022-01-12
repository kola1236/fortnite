function GoodsItem(props) {
    const {
        // ключи из айпи масива
        id,
        name,
        description,
        price,
        full_background,
        addToBasket = Function.prototype,
    } = props;

    return (
        // карточка стили из материалай ксс
        <div className='card'>
            <div className='card-image'>
                <img src={full_background} alt={name} />
                {/* сирси картинка */}
            </div>
            <div className='card-content'>
                <span className='card-title'>{name}</span>
                <p>{description}</p>
            </div>
            <div className='card-action'>
                <button
                    className='btn'
                    onClick={() =>
                        addToBasket({
                            id,
                            name,
                            price,
                        })
                    }
                >
                    buy
                </button>
                <span className='right' style={{ fontSize: '1.8rem' }}>
                    {price} coin
                </span>
            </div>
        </div>
    );
}

export { GoodsItem };
