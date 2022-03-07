import dayjs from "dayjs";


export async function dataHandlerRentals(req, res, next){

    const {price} = res.locals.price


    res.locals.rentals = {
        customerId : req.body.customerId,
        gameId : req.body.gameId,
        rentDate : dayjs().format('YYYY-MM-DD'),
        daysRented : req.body.daysRented,
        originalPrice : (price*req.body.daysRented),
        returnDate: null,
        delayFee: null,
    }
    next()
}

export async function dataHandlerRentalsReturn(req, res, next){

    const {rentDate, originalPrice, daysRented} = res.locals.rentals
    
    const diffDays = dayjs().diff(dayjs(rentDate).add(daysRented, 'day'), 'day')
    const isDelayed = diffDays > 0 ? true : false;
    const delayFeeCalc = isDelayed ? (originalPrice/daysRented)*diffDays : 0;
    res.locals.rentals = {
        ...res.locals.rentals,
        returnDate: dayjs().format('YYYY-MM-DD'),
        delayFee: delayFeeCalc,
    }
    next()
}