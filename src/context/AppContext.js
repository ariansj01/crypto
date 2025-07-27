import { createContext } from "react";

const Contextariable = createContext({
    marketPrice : 'usd',
    setMarketPrice : () => {},
    validate : false,
    setValidate : () => {},
    prices : null,
    setPrices : () => {},
    currency : [],
    setCurrency : () => {},
    deepCurrency : [],
    setDeepCurrency : () => {},
    dataIntresting : [],
    setDataIntresting : () => {},
    currencyItem : [],
    setCurrencyItem : () => {},
    validateLogin : false,
    setValidateLogin : () => {},
    authenticate : false,
    setAuthenticate : () => {},
    showcap : 'none',
    setShowcap : () => {},
    showcap2 : 'block',
    setShowcap2 : () => {},
    answer : {},
    setAnswer : () => {}

})
export default Contextariable;

