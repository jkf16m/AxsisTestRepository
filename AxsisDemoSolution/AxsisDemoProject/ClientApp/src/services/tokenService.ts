import Cookies from 'js-cookie';
import { Token } from './entities/Token';

const sessionToken = 'axsiswebsite-sessionToken';
const sessionTokenExpirationDate = `${sessionToken}-expirationDate}`;
const tokenService = {
    updateSessionToken: (token: Token) => {
        Cookies.set(sessionToken, token.props.value, {
            expires: token.props.expirationDate
        });
        if(token.props.expirationDate === undefined) return;
        Cookies.set(sessionTokenExpirationDate, token.props.expirationDate.toUTCString(), {
            expires: token.props.expirationDate
        })
    },
    getSessionToken: () => {
        var tokenString = Cookies.get(sessionToken);
        var expirationDateString = Date.parse(Cookies.get(sessionTokenExpirationDate) ?? '');
        return new Token({value: tokenString ?? '', expirationDate: new Date(expirationDateString)});
    },
    removeSessionToken: () => {
        Cookies.remove(sessionToken);
        Cookies.remove(sessionTokenExpirationDate);
    }
}
export default tokenService;