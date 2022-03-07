import dayjs from "dayjs";

export async function dataHandlerRentals(req, res, next){

    const {price} = res.locals.gamePrice


    res.locals.rentals = {
        ...req.body,
        rentDate : dayjs().format('YYYY-MM-DD'),
        originalPrice : (price*req.body.daysRented),
        returnDate: null,
        delayFee: null,
    }
    next()
}